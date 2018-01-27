/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
    Set up the home page routes
 */

const express = require('express')
const path = require('path')

module.exports = function (app) {
  let routes = new express.Router()

  routes.get('/', async function (req, res, next) {
    return res.render(path.join(__dirname, '/../../webapp/dist/index.html'))
  })

  return routes
}
