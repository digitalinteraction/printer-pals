/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
  - Schema of a task
 */

const mongoose = require('mongoose')

let taskModel = {
  userId: {
    type: 'String',
    required: true
  },
  title: {
    type: 'String',
    required: true
  },
  mediaType: {
    type: 'String',
    required: true
  },
  filePath: {
    type: 'String'
  }
}

module.exports = mongoose.Schema(taskModel)
