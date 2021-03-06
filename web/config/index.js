/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
  - Config for express.
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')

require('dotenv').config({path: './../.env'})

const app = express()

app.use('/static', express.static(path.join(__dirname, '/../../webapp/dist/static')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Cross site referencing
app.use(cors())
app.options('*', cors())

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.set('secret', process.env.APP_SECRET)

module.exports = app
