import axios from 'axios'
import commons from './../commons'
const URL = commons.URL

/**
 * Shutdown the printer
 * @return {Promise}
 */
const shutdown = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/shutdown`).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  shutdown
}
