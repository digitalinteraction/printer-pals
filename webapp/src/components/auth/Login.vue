<template lang="html">
  <div id="login">
    <section class="section">
      <div class="container">
        <h1 class="is-size-3">Login</h1>
        <div class="columns">
          <div class="column is-half">
            <!-- <form class="form"> -->
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input class="input" type="text" placeholder="johnsmith" v-model="username">
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="secret" value="" v-model="password">
                </div>
              </div>

              <div class="control">
                <button class="button is-primary" @click="login">Login</button>
              </div>
            <!-- </form> -->
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import api from './../../api'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: async function () {
      console.log(this.username)
      console.log(this.password)

      const response = await api.user.authenticate(this.username, this.password)
      console.log(response)
    }
  }
}
</script>

<style lang="scss">
  input {
  }
</style>
