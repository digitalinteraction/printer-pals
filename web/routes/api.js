/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
  Endpoints for API
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authMiddleware = require('./../middleware/authenticate')
const qr = require('qr-image')
let responses = require('./../response')

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
    // Get username and password
    const username = req.body.username
    let password = req.body.password

    // abort if either username or password are null
    if (!username || !password) {
      let e = new Error()
      e.status = 400
      return next(e)
    }

    // check for an existing user
    let sUser = await app.schemas.User.findOne({username})
    if (sUser) {
      let e = new Error()
      e.status = 400
      return next(e)
    }

    // Hash user's given password after mixing with a random id
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

    // create the user
    let user
    try {
      user = await app.schemas.User.create({username, password, iv})
    } catch (e) {
      e.status = 500
      return next(e)
    }

    // create a payload
    const payload = {
      id: user.id,
      username: user.username
    }
    // create and sign token against the app secret
    const token = jwt.sign(payload, app.get('secret'), {
      expiresIn: '1 day' // expires in 24 hours
    })

    let response = responses.success
    response.payload = { user, token }
    return res.json(response)
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
   * Authenticate a user and return a JWT token
   * @type {Object}
   */
  routes.post('/authenticate', async (req, res, next) => {
    // Get username and password from request
    const username = req.body.username
    let password = req.body.password

    // Look for user with matching username
    let user
    try {
      user = await app.schemas.User.findOne({username}, (user))
    } catch (e) {
      return next(e)
    }

    if (!user) {
      let e = new Error()
      e.status = 400
      return next(e)
    }

    // Hash given password with matching user's stored iv
    const hash = crypto.createHash('sha256')
    try {
      hash.update(`${user.iv}${password}`)
      password = hash.digest(password).toString('ascii')
      // Compare passwords and abort if no match
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

    // create a payload
    let payload = {
      id: user.id,
      username: user.username
    }

    // create and sign token against the app secret
    const token = jwt.sign(payload, app.get('secret'), {
      expiresIn: '1 day' // expires in 24 hours
    })

    let response = responses.success
    response.payload = { token }
    return res.json(response)
  })

  // **********************************************************************************
  // PROTECTED ROUTES ONLY BELOW
  // **********************************************************************************
  // Add in authentication middleware to route
  // All routes below require a valid JWT token
  routes.use(authMiddleware(app))

  /**
   * Get the user from a token
   * @type {Object} User
   */
  routes.get('/user', async (req, res, next) => {
    let user
    try {
      user = await app.schemas.User.findOne({_id: req.user.id})
      user.password = ''
      user.iv = ''
    } catch (e) {
      return next(e)
    }

    let response = responses.success
    response.payload = user
    return res.json(response)
  })
  /**
   * Return a qr code for a user's profile
   * @type {[type]}
   */
  routes.get('/user/qr', async (req, res, next) => {
    // set file type
    const fileType = 'svg'

    // generate qr code as svg
    const qrSVG = qr.image(`user:${req.user.id}`, { type: fileType })

    // set headers
    res.setHeader('Content-Type', 'image/svg+xml')

    // pipe qr code into the response
    qrSVG.pipe(res)
  })

  /**
   * Store a task
   * @type {[type]}
   */
  routes.post('/task/create', async (req, res, next) => {
    // populate task details from request body
    const { title, mediaType, filePath } = req.body

    // store task
    let task
    try {
      task = await app.schemas.Task.create({
        userId: req.user.id,
        title,
        mediaType,
        filePath
      })
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let response = responses.success
    response.payload = { task }
    return res.json(response)
  })

  /**
   * View all tasks associated with the user
   * @type {Object}
   */
  routes.get('/task/all', async (req, res, next) => {
    let tasks
    try {
      tasks = await app.schemas.Task.find({userId: req.user.id})
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let response = responses.success
    response.payload = { tasks }
    return res.json(response)
  })

  /**
   * Get a task by id
   * @param {string} id task id
   * @type {Task}
   */
  routes.get('/task/:id', async (req, res, next) => {
    // get id from request params
    const id = req.params.id
    let task
    try {
      task = await app.schemas.Task.findOne({_id: id})
    } catch (e) {
      e.status = 500
      return next(e)
    }

    // abort if task not found
    if (!task) {
      let e = new Error()
      e.message = 'Resource not found'
      e.status = 404
      return next(e)
    }

    let response = responses.success
    response.payload = { task }
    return res.json(response)
  })

  /**
   * Get a qr code for a task by id
   * @param {string} id task id
   * @type {Task}
   */
  routes.get('/task/qr/:id', async (req, res, next) => {
    // Get QR code from request
    let id = req.params.id

    // set file type
    const fileType = 'svg'

    // generate qr code as svg
    const qrSVG = qr.image(`task:${id}`, { type: fileType })

    // set headers
    res.setHeader('Content-Type', 'image/svg+xml')

    // pipe qr code into the response
    qrSVG.pipe(res)
  })

  return routes
}
