/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Model a log record.
 */

const mongoose = require('mongoose')

let userModel = {
  name: 'string',
  password: 'string'
}

module.exports = mongoose.Schema(userModel)
