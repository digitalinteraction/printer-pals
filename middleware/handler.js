/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
    Handle errors passed on from the API
    TODO: log errors to files
 */

require('dotenv').config()

module.exports = function (app) {
  // Print stack traces when in debugging mode
  if (process.env.DEBUG) {
    app.use(function (err, req, res, next) {
      console.error(err)
      res.status(err.status || 500)

      return res.json({
        status: err.status || 500,
        errors: true,
        data: {
          error: {
            message: err.message,
            trace: err.stack
          }
        }
      })
    })
  } else {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500)
      return res.json({
        status: err.status || 500,
        errors: true,
        data: {}
      })
    })
  }

  return app
}
