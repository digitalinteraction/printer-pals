/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Error handler middlerware.
 */

require('dotenv').config()

module.exports = function (app) {
  // TODO change this for deployment
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
