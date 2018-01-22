<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <title-bar></title-bar>
    <login v-if="!isLoggedIn"></login>
    <profile :user="user" v-else></profile>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// Components
import NavigationBar from './components/Navigation.vue'
import TitleBar from './components/Title.vue'
import Login from './components/auth/Login.vue'
import Profile from './components/user/Profile.vue'

// Packages
import api from './api'

export default {
  name: 'App',
  components: {
    TitleBar,
    Login,
    Profile,
    NavigationBar
  },
  computed: {
    isLoggedIn () {
      return !(this.$store.getters.getUser == null)
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
