<template lang="html">
  <div id="register">
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

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="secret" value="" v-model="confPassword">
              </div>
            </div>

            <div class="control">
              <button class="button is-primary" @click="register">Register</button>
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
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      confPassword: ''
    }
  },
  methods: {
    register: async function () {
      // try and register user
      if (this.password !== this.confPassword) {
        alert('Passwords must match')
        return
      }

      let response
      try {
        response = await api.user.register(this.username, this.password)
      } catch (e) {
        console.log('Registration Failed')
        alert('The username is already taken')
        return
      }

      const user = {
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
</style>
