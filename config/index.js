/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Config for express.
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
require('dotenv').config()

const app = express()

app.use('/static', express.static(path.join(__dirname, '/../static')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.set('secret', process.env.APP_SECRET)

module.exports = app
