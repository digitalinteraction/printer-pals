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
  mimetype: {
    type: 'String'
  },
  path: {
    type: 'String'
  },
  description: {
    type: 'String'
  },
  public: {
    type: 'Boolean',
    required: true,
    default: () => {
      return false
    }
  }
}

module.exports = mongoose.Schema(taskModel)
