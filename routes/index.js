/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  -	Initialise routes.
 */

const fs = require('fs')
const path = require('path')

module.exports = function (app) {
  fs.readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js")
    })
    .forEach(function(file) {

      let routeName = "/" + file.split('.')[0];
      if (routeName === '/home') {
        routeName = '/'
      }

      let routes = require(path.join(__dirname, file))
      let initRoutes = routes(app)

      app.use(routeName, initRoutes)
    })

  return app
}
