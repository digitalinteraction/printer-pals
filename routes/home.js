/**
 Created:  13/04/2017
 Author:   Daniel
 Description:
    -   Router for the home path.
 */

const express = require('express')

module.exports = function (app) {
  let routes = new express.Router()

  routes.get('/', async function (req, res, next) {
    return res.render('./../views/index.html')
  })

  return routes
}
