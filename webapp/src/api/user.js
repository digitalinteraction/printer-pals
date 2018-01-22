//
import axios from 'axios'
const URL = 'http://localhost:8888'
const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/api/autheticate`, {
      username,
      password
    }).then((response) => {
      console.log(response)
      resolve(response.body)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  authenticate
}
