//
const state = {
  tasks: []
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
    for (let i = 0; i < state.tasks.length; i++) {
      if (state.tasks[i]._id === payload) {
        state.tasks.splice(i, 1)
        break
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
