/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Model a log record.
 */

const mongoose = require('mongoose')

let userModel = {
  username: {
    type: 'String',
    unique: true,
    required: true,
    dropDups: true
  },
  password: {
    type: 'String',
    required: true
  },
  iv: {
    type: 'String'
  }
}

module.exports = mongoose.Schema(userModel)
