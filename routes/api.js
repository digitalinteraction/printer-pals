/**
 * Endpoints for api.
 */

const express = require('express')
const path = require('path')
const fs = require('fs')
const multer = require('multer')

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
    return res.render('./../views/index.html')
  })
  routes.post('/upload', upload.single('myfile'), async (req, res, next) => {
    last.mimetype = req.file.mimetype

    fs.unlink(filepath, () => {
      fs.rename(req.file.path, filepath)
    })

    res.redirect('/')
  })

  return routes
}
