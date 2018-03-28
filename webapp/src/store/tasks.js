//
const state = {
  tasks: [],
  publicTasks: []
}

const mutations = {
  /**
   * Set the tasks array
   * @param {store} state
   * @param {Task[]} payload Array of tasks
   */
  setTasks (state, payload) {
    state.tasks = payload
  },
  /**
   * Remove a task
   * @param  {store} state
   * @param  {string} payload id of the task
   * @return {void}
   */
  removeTask (state, payload) {
    let task = {}
    for (let i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i]._id === payload) {
        task = state.tasks[i]._id
        state.tasks.splice(i, 1)
        break
      }
    }

    // Check public tasks if not found
    if (!task) {
      for (let i = 0; i < state.publicTasks.length; i++) {
        if (state.publicTasks[i]._id === payload) {
          task = state.publicTasks[i]._id
          state.publicTasks.splice(i, 1)
          break
        }
      }
    }
  },
  /**
   * Add a task to the start of the array of tasks in the store
   * @param {store} state
   * @param {Task} payload Task to be added
   */
  addTask (state, payload) {
    state.tasks.unshift(payload)
  },

  /**
   * Set the public tasks
   * @param {Object} state   Current state of the store
   * @param {Object[]} payload An array of public tasks
   */
  setPublicTasks (state, payload) {
    state.publicTasks = payload
  },

  /**
   * Add a public task
   * @param {Object} state   Current state of the store
   * @param {Object[]} payload Public task
   */
  addPublicTask (state, payload) {
    state.publicTasks.unshift(payload)
  }
}

const actions = {}

const getters = {
  /**
   * Get all tasks
   * @param  {store} state
   * @return {Task[]}
   */
  getTasks: (state) => {
    return state.tasks
  },
  /**
   * Get task by id
   * @param  {store}  state
   * @param  {string} id    task id
   * @return {Task}         task with matching id
   */
  getTask: (state) => (id) => {
    for (let i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i]._id === id) {
        return state.tasks[i]
      }
    }
    for (let i = 0; i < state.publicTasks.length; i++) {
      if (state.publicTasks[i]._id === id) {
        return state.publicTasks[i]
      }
    }
  },

  /**
   * Get all public tasks
   * @param  {Object} state Current state of the store
   * @return {Object[]}     Public Tasks
   */
  getPublicTasks: (state) => {
    return state.publicTasks
  },

  /**
   * Get a public task
   * @param  {Object} state Current state of the store
   * @return {Object}       Task matching given id
   */
  getPublicTask: (state) => (id) => {
    for (let i = 0; i < state.publicTasks.length; i++) {
      if (state.publicTasks[i]._id === id) {
        return state.publicTasks[i]
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
