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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-footer">
      <div class="container">
        <a class="button is-rounded is-danger" @click="shutdown">
          Shutdown
        </a>
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
      console.log(api)
      const response = await api.system.shutdown()
      console.log(response)
    }
  }
}
</script>

<style lang="scss">
</style>
