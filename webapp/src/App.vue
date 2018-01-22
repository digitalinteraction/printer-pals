<template>
  <div id="app">
    <title-bar></title-bar>
    <login></login>
    <router-view/>
  </div>
</template>

<script>
import TitleBar from './components/Title.vue'
import Login from './components/auth/Login.vue'
// import bulma from 'bulma'
export default {
  name: 'App',
  components: {
    TitleBar,
    Login
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
