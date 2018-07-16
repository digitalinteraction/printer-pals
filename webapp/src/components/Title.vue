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
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
                  <title>power</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                      <g id="Artboard-4" transform="translate(-708.000000, -203.000000)" stroke="#333333" stroke-width="2">
                          <g id="56" transform="translate(708.000000, 203.000000)">
                              <path d="M8.0419548,6.04615725 C5.62763156,7.42332452 4,10.0215854 4,13 C4,17.418278 7.581722,21 12,21 L12,21 C16.418278,21 20,17.418278 20,13 C20,10.0407857 18.3932858,7.45683963 16.0046386,6.07294293" id="Oval-57" stroke-linejoin="round"></path>
                              <path d="M12,3 L12,12" id="Path-137"></path>
                          </g>
                      </g>
                  </g>
              </svg>
              </a>

              <a class="button is-rounded is-info volume-button" @click="volume('down')">
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
                    <title>volume-down</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <g id="Artboard-4" transform="translate(-48.000000, -159.000000)" stroke="#333333" stroke-width="2">
                            <g id="21" transform="translate(48.000000, 159.000000)">
                                <path d="M2,8.99703014 C2,8.4463856 2.44335318,8 3.0093689,8 L6,8 L12,4 L12,20 L6,16 L3.0093689,16 C2.45190985,16 2,15.5469637 2,15.0029699 L2,8.99703014 Z" id="Rectangle-415" stroke-linejoin="round"></path>
                                <path d="M16,8 C16,8 18,9.5 18,12 C18,14.5 16,16 16,16" id="Path-26"></path>
                            </g>
                        </g>
                    </g>
                </svg>
              </a>

              <a class="button is-rounded is-info volume-button" @click="volume('up')">
                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <g id="Artboard-4" transform="translate(-884.000000, -115.000000)" stroke="#333333" stroke-width="2">
                            <g id="20" transform="translate(884.000000, 115.000000)">
                                <path d="M2,8.99703014 C2,8.4463856 2.44335318,8 3.0093689,8 L6,8 L12,4 L12,20 L6,16 L3.0093689,16 C2.45190985,16 2,15.5469637 2,15.0029699 L2,8.99703014 Z" id="Rectangle-415" stroke-linejoin="round"></path>
                                <path d="M16,8 C16,8 18,9.5 18,12 C18,14.5 16,16 16,16" id="Path-26"></path>
                                <path d="M16.0734116,20 C19.3093571,18.9698098 22.0000001,15.5773201 22.0000001,12 C22.0000001,8.43619491 19.2903975,5.04132966 16.0734116,4" id="Oval-33"></path>
                            </g>
                        </g>
                    </g>
                </svg>
              </a>

            </div>
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
        await api.system.shutdown()
      }
    },
    async volume (state) {
      try {
        await api.system.volume(state)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shutdown-button {
  margin-top: 10%;
}

svg {
  g {
    #Artboard-4 {
      transition: all .1s ease-in;
      stroke: white;
    }
  }
}
.volume-button {
  transition: all .1s ease-in;
  margin-top: 10%;
}

.volume-button:active {
  background: white;

  #Artboard-4 {
    stroke: hsl(48, 100%, 67%);
  }
}
</style>
