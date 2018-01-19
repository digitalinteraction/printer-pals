/**
 * Endpoints for api.
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const crypto = require('crypto')
require('dotenv').config()

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
    try {
      const iv = crypto.randomBytes(16).toString('ascii')
      const hash = crypto.createHash('sha256')
      hash.update(`${iv}${password}`)
      password = hash.digest(password).toString('ascii')
    } catch (e) {
      console.error(e)
    }

    let user

    try {
      user = await app.schemas.User.create({username, password})
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

  return routes
}
