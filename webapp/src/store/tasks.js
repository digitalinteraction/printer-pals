//
const state = {
  tasks: []
}

const mutations = {
  setTasks (state, payload) {
    state.tasks = payload
  }
}

const actions = {}

const getters = {
  getTasks: (state) => {
    return state.tasks
  },
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
