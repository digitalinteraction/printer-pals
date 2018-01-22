<template>
  <div id="app">
    <navigation-bar></navigation-bar>

    <title-bar></title-bar>

    <div v-if="!isLoggedIn">
      <div class="container auth-header-container">
        <h1 class="is-size-3">
          <span v-bind:class="{ 'active': !isRegistering }" class="auth-header" @click="toggleRegistering">Login</span>
          <span> | </span>
          <span v-bind:class="{ 'active': isRegistering }" class="auth-header" @click="toggleRegistering">Register</span>
        </h1>
      </div>

      <login v-if="!isRegistering"></login>
      <register v-else></register>
    </div>

    <profile :user="user" v-else></profile>
    <tasks></tasks>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// Components
import NavigationBar from './components/Navigation.vue'
import TitleBar from './components/Title.vue'
import Login from './components/auth/Login.vue'
import Register from './components/auth/Register.vue'
import Profile from './components/user/Profile.vue'
import Tasks from './components/tasks/AllTasks.vue'

// Packages
import api from './api'

export default {
  name: 'App',
  data () {
    return {
      isRegistering: false
    }
  },
  components: {
    TitleBar,
    Login,
    Register,
    Profile,
    NavigationBar,
    Tasks
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
  },
  methods: {
    toggleRegistering: function () {
      this.isRegistering = !this.isRegistering
    }
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .auth-header {
    color: #AAAAAA
  }

  .auth-header:hover {
    color: #666666
  }

  .auth-header-container {
    margin-top: 20px;
  }

  .active {
    color: black
  }
}
</style>
