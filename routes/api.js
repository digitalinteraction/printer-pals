/**
 * Endpoints for api.
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = require('./../middleware/authenticate')

let upload = multer({ dest: 'uploads/' })
let last = {}

const filepath = path.join(__dirname, '/../uploads/last_file')

module.exports = function (app) {
  let routes = new express.Router()

  /**
   * Register an account
   * @param  {[type]}   req  request
   * @param  {[type]}   res  response
   * @param  {Function} next next
   * @return {Object}        return a user object
   */
  routes.post('/register', async function (req, res, next) {
    const username = req.body.username
    let password = req.body.password

    if (!username || !password) {
      let e = new Error()
      e.status = 400
      return next(e)
    }

    let sUser = await app.schemas.User.findOne({username})
    if (sUser) {
      let e = new Error()
      e.status = 400
      return next(e)
    }

    // Hash user's password
    let iv
    const hash = crypto.createHash('sha256')
    try {
      iv = crypto.randomBytes(16).toString('ascii')
      hash.update(`${iv}${password}`)
      password = hash.digest(password).toString('ascii')
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let user

    try {
      user = await app.schemas.User.create({username, password, iv})
    } catch (e) {
      e.status = 400
      return next(e)
    }

    return res.send(user)
  })

  /**
   * Upload a file
   * @type {[type]}
   */
  routes.post('/upload', upload.single('myfile'), async (req, res, next) => {
    last.mimetype = req.file.mimetype

    fs.unlink(filepath, () => {
      fs.rename(req.file.path, filepath)
    })

    res.redirect('/')
  })

  /**
   * Upload a file
   * @type {[type]}
   */
  routes.post('/authenticate', async (req, res, next) => {
    const username = req.body.username
    let password = req.body.password

    let user
    try {
      user = await app.schemas.User.findOne({username}, (user))
    } catch (e) {
      return next(e)
    }

    if (!user) {
      return next(new Error())
    }

    const hash = crypto.createHash('sha256')
    try {
      hash.update(`${user.iv}${password}`)
      password = hash.digest(password).toString('ascii')
      if (user.password !== password) {
        let e = new Error()
        e.message = 'Incorrect password'
        e.status = 403
        return next(e)
      }
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let payload = {
      username: user.username
    }
    var token = jwt.sign(payload, app.get('secret'), {
      expiresIn: '1 day' // expires in 24 hours
    })

    // return the information including token as JSON
    return res.json({
      success: true,
      token: token
    })
  })

  // **********************************************************************************
  // PROTECTED ROUTES ONLY BELOW
  // **********************************************************************************
  routes.use(authMiddleware(app))

  routes.get('/protected', async (req, res, next) => {
    res.send('protected route')
  })

  return routes
}
