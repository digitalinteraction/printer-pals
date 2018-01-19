/**
  Created:  13/04/17
  Author:   Daniel Welsh
  Description:
   - Start an instance of the server.
  */

const server = require('./server')

async function main () {
  try {
    let app = server.getServerInstance()
    console.log('Getting basic server instance')

    app = await server.initDatabase(app)
    console.log('Attaching database connection')

    app = server.addLogging(app)
    console.log('Adding logging middleware')

    app = server.addRoutes(app)
    console.log('Attaching routes')

    app = server.addErrorHandler(app)
    console.log('Adding error handler')

    app.enable('trust proxy')

    app.listen(8888)
    console.log('Listening on port: ' + 8888)
  } catch (e) {
    console.error(e)
  }
}

main()
