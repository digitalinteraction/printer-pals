/**
  Created:  19/01/18
  Author:   Daniel Welsh
  Description:
   - Start an instance of the server.
  */

const server = require('./server')

async function main () {
  try {
    let app = server.getServerInstance()
    app = await server.initDatabase(app)
    app = server.addLogging(app)
    app = server.addRoutes(app)
    app = server.addErrorHandler(app)

    app.enable('trust proxy')

    app.listen(8888)
    console.log('Listening on port: ' + 8888)
  } catch (e) {
    console.error(e)
  }
}

main()
