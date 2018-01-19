/**
 Created:  13/04/17
 Author:   Daniel Welsh
 Description:
  - Model a log record.
 */

const mongoose = require('mongoose')

let trafficModel = {
  ip: 'string',
  method: 'string',
  path: 'string',
  user_agent: 'string',
  time_stamp: 'date'
}

module.exports = mongoose.Schema(trafficModel)
