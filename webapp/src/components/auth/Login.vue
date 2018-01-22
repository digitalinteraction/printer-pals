<template lang="html">
  <div id="login">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
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
      // try and authenticate user
      let response
      try {
        response = await api.user.authenticate(this.username, this.password)
      } catch (e) {
        console.error(e)
        if (e.status === 400) {
          console.log('auth failed')
          alert('The username or password was incorrect')
        }
      }

      let user = {
        username: this.username,
        token: response.data.payload.token
      }

      this.$store.commit('setUser', user)
      this.$cookie.set('token', user.token, 1)
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style lang="scss">
  input {
  }
</style>
