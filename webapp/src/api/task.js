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
 * Get public tasks
 * @return {Object[]} Public tasks
 */
const getPublicTasks = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${URL}/task/public`).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Create a task
 * @param  {string} title       Task title
 * @param  {string} description Task description
 * @param  {string]} token      Session token
 * @return {Promise}
 */
const createTask = (title, description, isPublic, token) => {
  return new Promise((resolve, reject) => {
    const payload = {
      token,
      title,
      description,
      public: isPublic,
      mediaType: 'image',
      filePath: ''
    }
    axios.post(`${URL}/task/create`, payload).then((response) => {
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

/**
 * Print a task
 * @param  {[type]} id
 * @param  {[type]} token
 * @return {[type]}
 */
const printTask = (id, token) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'x-access-token': token
      }
    }
    axios.get(`${URL}/task/print/${id}`, options).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * Upload media to attach to a task.
 * @param  {Object} task  Task to attach the media to
 * @param  {[type]} file  File from form submissions
 * @param  {[type]} token Session token
 * @return {Promise}
 */
const uploadMedia = (task, file, token) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token': token,
        'task-id': task._id
      }
    }

    axios.post(`${commons.URL}/media/upload`, formData, config).then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  getTasks,
  getPublicTasks,
  createTask,
  updateTask,
  destroyTask,
  printTask,
  uploadMedia
}
