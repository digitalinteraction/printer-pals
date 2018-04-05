<template lang="html">
  <section class="section hero is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="title-bar is-large">
          <div class="columns">
            <div class="column is-two-fifths">
              <h1 class="title">Printer Pals 🖨</h1>
              <h2 class="subtitle">Print and Play</h2>
              <p>
                <strong>Let's play a game together! Use Printer Pals to upload a sound or a picture and add a task you can do together.</strong>
                <br />
                <br />
                Upload a song with lyrics and sing along together 🎤
                <br/>
                Upload a picture of somewhere you recognise start a pop quiz 🏆
              </p>

              <a class="button is-rounded is-danger shutdown-button" @click="shutdown">
                Shutdown
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-footer">
      <div class="container">
        <div class="columns">
          <div class="column">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from './../api'
export default {
  name: 'TitleBar',
  methods: {
    async shutdown () {
      const confirmed = confirm('This will shutdown the printer.')
      if (confirmed) {
        console.log(api)
        const response = await api.system.shutdown()
        console.log(response.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shutdown-button {
  margin-top: 10%;
}
</style>
