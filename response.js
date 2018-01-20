/**
 Created:  19/01/18
 Author:   Daniel Welsh
 Description:
  - Template for api responses
 */

const success = {
  status: 'ok',
  messages: '',
  code: 200,
  payload: {}
}

const error = {
  status: 'error',
  messages: '',
  code: 500,
  payload: {}
}

module.exports = { success, error }
