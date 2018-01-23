//
import axios from 'axios'
import commons from './../commons'
const URL = commons.URL

/**
 * Get all of the user's uploaded tasks
 * @param  {string} token   Session token
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

/**
 * Update a task remotely
 * @param  {string} id          task id
 * @param  {string} title       new title
 * @param  {string} description new description
 * @param  {string} token       session token
 * @return {Promise}
 */
const updateTask = (id, title, description, token) => {
  return new Promise((resolve, reject) => {
    const data = {
      token,
      id,
      title,
      description
    }
    axios.post(`${URL}/task/update`, data).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Delete a task
 * @param  {string} id    Task id
 * @param  {string} token Session token
 * @return {Promise}
 */
const destroyTask = (id, token) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'x-access-token': token
      }
    }
    axios.delete(`${URL}/task/destroy/${id}`, options).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  getTasks,
  updateTask,
  destroyTask
}
