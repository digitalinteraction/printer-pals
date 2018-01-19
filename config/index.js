/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Config for express.
 */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use('/static', express.static(path.join(__dirname, '/../static')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

module.exports = app
