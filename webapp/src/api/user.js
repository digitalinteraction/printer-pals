//
import axios from 'axios'
import commons from './../commons'
const URL = commons.URL

/**
 * Authenicate the user from a username and password
 * @param  {string} username Username
 * @param  {string} password Password
 * @return {Object}          User
 */
const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/authenticate`, {
      username: username,
      password: password
    }).then((response) => {
      resolve(response)
    }).catch((error) => {
      error.status = 400
      reject(error)
    })
  })
}

/**
 * Register an account
 * @param  {string} username Username
 * @param  {string} password Password
 * @return {Object}          User
 */
const register = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(`${URL}/register`, {
      username: username,
      password: password
    }).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Get the user from a token
 * @param  {string} token JWT token
 * @return {User}         User
 */
const getUser = (token) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'x-access-token': token
      }
    }
    axios.get(`${URL}/user`, options).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  register,
  authenticate,
  getUser
}
