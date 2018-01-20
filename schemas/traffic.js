/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
  - Schema of a traffic instance
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
