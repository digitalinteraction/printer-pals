/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
    Authentication middleware for protected routes
    Adapted from: https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
 */

const jwt = require('jsonwebtoken')

module.exports = (app) => (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('secret'), (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      } else {
        // if everything is good, save to request for use in other routes
        req.user = user
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
}
