//
import axios from 'axios'
const URL = 'http://localhost:8888/api'

/**
 * Get all of the user's uploaded tasks
 * @return {Object[]} An array of tasks
 */
const getTasks = (token) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'x-access-token': token
      }
    }
    axios.get(`${URL}/task/all`, options).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  getTasks
}
