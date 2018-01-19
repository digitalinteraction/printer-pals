/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
 - An Express server to host the game
 */

// *****************************************************************************
// Routes
// *****************************************************************************
let routes = require('./routes')
let mongoose = require('mongoose')
let schemas = require('./schemas')
// *****************************************************************************
// Middleware
// *****************************************************************************
let loggerMiddleware = require('./middleware/logger')
let handlerMiddleware = require('./middleware/handler')

// *****************************************************************************
// Setup
// *****************************************************************************
module.exports = {
  getServerInstance: () => {
    let app = require('./config')
    return app
  },
  initDatabase: (app) => {
    return new Promise(function (resolve, reject) {
      mongoose.connect(process.env.MONGO_URI)
      mongoose.connection.once('open', () => {
        app.schemas = schemas
        resolve(app)
      })
      mongoose.connection.once('error', reject)
    })
  },

  addLogging: (app) => {
    app = loggerMiddleware(app)
    return app
  },

  addErrorHandler: (app) => {
    app = handlerMiddleware(app)
    return app
  },

  addHeaders: (app) => {
    return app
  },

  addRoutes: (app) => {
    app = routes(app)
    return app
  }
}
