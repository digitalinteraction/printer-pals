<template>
  <div id="app">
    <title-bar></title-bar>
    <login v-if="!isLoggedIn"></login>
    <h1 v-else>{{ user.username }}</h1>
    <router-view/>
  </div>
</template>

<script>
// Components
import TitleBar from './components/Title.vue'
import Login from './components/auth/Login.vue'

// Packages
import api from './api'

export default {
  name: 'App',
  components: {
    TitleBar,
    Login
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.getUser ? true : false
    },
    user () {
      return this.$store.getters.getUser ? this.$store.getters.getUser : undefined
    }
  },
  async mounted () {
    if (this.$cookie.get('token')) {
      let response
      try {
        response = await api.user.getUser(this.$cookie.get('token'))
        const user = response.data.payload
        this.$store.commit('setUser', user)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
