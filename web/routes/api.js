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
const printer = require('./../../printer/print.js')

let responses = require('./../response')
let upload = multer({ dest: './../uploads/' })

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
    const { title, description } = req.body

    // store task
    let task
    try {
      task = await app.schemas.Task.create({
        userId: req.user.id,
        title,
        description
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
   * Update a task
   * @type {Object}
   */
  routes.post('/task/update', async (req, res, next) => {
    const { id, title, description } = req.body

    console.log(title, description)

    let task

    try {
      task = await app.schemas.Task.update({_id: id}, {$set: {
        title: title,
        description: description
      }})
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

  /**
   * Delete a task by id
   * @type {[type]}
   */
  routes.delete('/task/destroy/:id', async (req, res, next) => {
    let id = req.params.id

    let task

    try {
      task = await app.schemas.Task.findOne({_id: id})
    } catch (e) {
      return next(e)
    }

    if (task.path) {
      fs.stat(path.join('', task.path), function (err, stats) {
        if (err) {
          return next(err)
        }

        fs.unlink(path.join('', task.path), function (err) {
          if (err) return next(err)
        })
      })
    }

    try {
      await app.schemas.Task.remove({_id: id})
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let response = responses.success
    response.messages = `Task ${id} deleted`
    return res.json(response)
  })
  /**
   * Print a task by its id.
   * @type {[type]}
   */
  routes.get('/task/print/:id', async (req, res, next) => {
    let id = req.params.id

    let task
    try {
      task = await app.schemas.Task.findOne({_id: id})
    } catch (e) {
      return next(e)
    }

    // Should print the task asynchronously
    if (/image/.test(task.mimetype)) { // Check if the task is an image
      printer.prepareImage(task).then((path) => {
        printer.printImage(path).then(() => {
          console.log(`Printed task: ${task._id}`)
        }).catch((err) => {
          console.error(err)
        })
      }).catch((err) => {
        console.err(err)
      })
    } else if (/audio/.test(task.mimetype)) { // check if the task is a sound
      // Print the task and play the file
      printer.printSound(task).then(() => {
        console.log('printing sound task')
      }).catch((err) => {
        console.error(err)
      })
    } else {
      console.log('unknown mimetype')
    }

    let response = responses.success
    response.messages = 'Printing your task!'
    return res.json(response)
  })

  /**
   * Upload a file
   * @type {[type]}
   */
  routes.post('/media/upload', upload.single('file'), async (req, res, next) => {
    const mimetype = req.file.mimetype
    const ext = mimetype.split('/')[1]

    const filepath = path.join(__dirname, `/../${req.file.path}.${ext}`)

    try {
      await fs.unlink(filepath, () => {
        fs.rename(req.file.path, filepath)
      })
    } catch (e) {
      return next(e)
    }

    const taskId = req.headers['task-id']
    let task

    try {
      task = await app.schemas.Task.update({_id: taskId}, {$set: {
        mimetype: mimetype,
        path: filepath
      }})
    } catch (e) {
      e.status = 500
      return next(e)
    }

    let repsonse = responses.success
    responses.payload = task
    res.json(repsonse)
  })

  return routes
}
