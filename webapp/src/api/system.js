import axios from 'axios'
import commons from './../commons'
const URL = commons.URL

/**
 * Shutdown the printer
 * @return {Promise}
 */
const shutdown = async () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/system/shutdown`, (response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

module.exports = {
  shutdown
}
