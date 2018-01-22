// user.js
const state = {
  user: undefined
}

const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

const actions = {}

const getters = {
  getUser: (state) => {
    return state.user
  },
  getToken: (state) => (id) => {
    return state.user.token
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
