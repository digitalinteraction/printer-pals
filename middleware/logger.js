/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
 - Logging middlware.
 */
module.exports = function (app) {
  app.use(function (req, res, next) {
    let ip
    if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(',')[0]
    } else if (req.connection && req.connection.remoteAddress) {
      ip = req.connection.remoteAddress
    } else {
      ip = req.ip
    }

    app.schemas.Traffic.create({
      ip: ip,
      method: req.method,
      path: req.path,
      user_agent: req.headers['user-agent'],
      time_stamp: new Date()
    }).catch(error => {
      console.log(error)
    })

    return next()
  })

  return app
}
