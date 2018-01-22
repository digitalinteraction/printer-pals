<template lang="html">
  <div id="navigation">
    <nav class="navbar is-primary">
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control logout" @click="logout">
                <p v-if="isLoggedIn">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  computed: {
    isLoggedIn () {
      return !(this.$store.getters.getUser == null)
    },
  },
  methods: {
    logout () {
      this.$cookie.delete('token')
      this.$store.commit('setUser', undefined)
    }
  }
}
</script>

<style lang="scss">
.logout:hover {
  cursor: pointer;
}
</style>
