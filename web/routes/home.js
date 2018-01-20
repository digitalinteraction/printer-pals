/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
    Set up the home page routes
 */

const express = require('express')

module.exports = function (app) {
  let routes = new express.Router()

  routes.get('/', async function (req, res, next) {
    return res.render('./../views/index.html')
  })

  return routes
}
