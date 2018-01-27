<template lang="html">
  <div id="new-task">
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="update-form">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Fly Me to The Moon" v-model="title">
            </div>
          </div>

          <div class="field">
            <label class="label">Task</label>
            <div class="control">
              <textarea class="textarea" placeholder="Lets sing it together!" rows="3" v-model="description"></textarea>
            </div>
          </div>

          <div class="file has-name">
            <label class="file-label">
              <input class="file-input" type="file" name="file" @change="assignFile($event)">
              <span class="file-cta">
                <span class="file-label">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
                      <g id="Artboard-4" transform="translate(-752.000000, -115.000000)" stroke="#333333" stroke-width="2">
                        <g id="17" transform="translate(752.000000, 115.000000)">
                            <path d="M5,5.00087166 L5,18.9991283 C5,20.1073512 5.89622639,21 7.00247329,21 L16.9975267,21 C18.0978553,21 19,20.1021477 19,18.9975267 L19,8 L19,7.58542907 L18.7066753,7.29246203 L14.7017925,3.29246203 L14.4089735,3 L13.9951172,3 L6.9964216,3 C5.89821103,3 5,3.89808444 5,5.00087166 Z" id="Rectangle-410"></path>
                            <polyline id="Path-25" stroke-linecap="round" points="12 6 12 10 16 10"></polyline>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Choose a file…
                </span>
              </span>
              <span class="file-name" v-show="hasFile">
                {{ filename }}
              </span>
            </label>
          </div>

          <div class="control">
            <button class="button is-primary" @click="createTask">Save</button>
          </div>
        </div>
        <div class="dummy-card" v-if="hasTitle">
          <div class="card">
            <div class="card-content">
              <div class="container">
                <span class="tag" :style="{'background-color': tag.colour}">{{ tag.text }}</span>
                <span class="tag" style="background-color: #666666;">Draft</span>
                <p class="title">
                  {{ title }}
                </p>
              </div>
              <div class="container">
                <p>
                  {{ description }}
                </p>
              </div>
              <!-- <div class="columns is-mobile">
                <div class="column is-two-thirds">
                  <p class="title">
                    {{ title }}
                  </p>
                </div>
                <div class="column" style="text-align: right;">
                  <span class="tag" :style="{'background-color': tag.colour}">{{ tag.text }}</span>
                  <span class="tag" style="background-color: #666666;">Draft</span>
                </div>
              </div>
              <img :src="dummyQRURL" class="qr-code"/> -->
            </div>
            <footer class="card-footer">
              <!-- Icons from: https://robbiepearce.com/softies/ -->
              <p class="card-footer-item">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Artboard-4" transform="translate(-224.000000, -159.000000)">
                          <g id="25" transform="translate(224.000000, 159.000000)">
                              <path d="M5,7 L5,20.0081158 C5,21.1082031 5.89706013,22 7.00585866,22 L16.9941413,22 C18.1019465,22 19,21.1066027 19,20.0081158 L19,7" id="Path-296" stroke="#333333" stroke-width="2"></path>
                              <rect id="Rectangle-424" fill="#333333" x="2" y="4" width="20" height="2" rx="1"></rect>
                              <path d="M9,10.9970301 C9,10.4463856 9.44386482,10 10,10 C10.5522847,10 11,10.4530363 11,10.9970301 L11,17.0029699 C11,17.5536144 10.5561352,18 10,18 C9.44771525,18 9,17.5469637 9,17.0029699 L9,10.9970301 Z M13,10.9970301 C13,10.4463856 13.4438648,10 14,10 C14.5522847,10 15,10.4530363 15,10.9970301 L15,17.0029699 C15,17.5536144 14.5561352,18 14,18 C13.4477153,18 13,17.5469637 13,17.0029699 L13,10.9970301 Z" id="Combined-Shape" fill="#333333"></path>
                              <path d="M9,5 L9,2.99895656 C9,2.44724809 9.45097518,2 9.99077797,2 L14.009222,2 C14.5564136,2 15,2.44266033 15,2.99895656 L15,5" id="Path-33" stroke="#333333" stroke-width="2" stroke-linejoin="round"></path>
                          </g>
                      </g>
                  </g>
                </svg>
              </p>
              <p class="card-footer-item">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <!-- Generator: Sketch 43.2 (39069) - http://www.bohemiancoding.com/sketch -->
                  <title>new</title>
                  <desc>Created with Sketch.</desc>
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" class="edit-icon">
                      <g id="Artboard-4" transform="translate(-92.000000, -203.000000)" stroke="#333333" stroke-width="2">
                          <g id="42" transform="translate(92.000000, 203.000000)">
                              <path d="M7,20.0000003 L7,16 L17.8893663,5.11063365 C19.0596382,3.94036178 20.9543008,3.94158745 22.1210495,5.11320627 L21.8872816,4.87846259 C23.0541037,6.05015528 23.044079,7.95592095 21.8823924,9.11760756 L11,20.0000003 L7,20.0000003 Z" id="Path-74" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path d="M16.5,6.5 L20.5,10.5" id="Path-75"></path>
                              <path d="M1,20 L4,20" id="Path-78" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                      </g>
                  </g>
                </svg>
              </p>
              <p class="card-footer-item">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <defs></defs>
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Artboard-4" transform="translate(-136.000000, -335.000000)">
                          <g id="103" transform="translate(136.000000, 335.000000)">
                              <path d="M6.01757812,18 L4.99596383,18 C3.89362344,18 3,17.1125667 3,16.000385 L3,9.99961498 L3,9.99961498 C3,8.89525812 3.8926228,8 4.99508929,8 L19.0049107,8 C20.1067681,8 21,8.88743329 21,9.99961498 L21,16.000385 C21,17.1047419 20.1024307,18 18.9913592,18 L18.0616455,18" id="Rectangle-250" stroke="#333333" stroke-width="2"></path>
                              <path d="M6,3.99980749 C6,3.44762906 6.45576096,3 7.00247329,3 L16.9975267,3 C17.5511774,3 18,3.44371665 18,3.99980749 L18,8 L6,8 L6,3.99980749 Z" id="Rectangle-53" stroke="#333333" stroke-width="2"></path>
                              <path d="M6,14 L18,14 L18,19.9970707 C18,20.5509732 17.544239,21 16.9975267,21 L7.00247329,21 C6.44882258,21 6,20.5621186 6,19.9970707 L6,14 Z" id="Rectangle-53" stroke="#333333" stroke-width="2"></path>
                              <rect id="Rectangle-54" fill="#333333" x="9" y="16" width="6" height="1"></rect>
                              <rect id="Rectangle-54" fill="#333333" x="9" y="18" width="6" height="1"></rect>
                              <circle id="Oval-32" fill="#333333" opacity="0.5" cx="7" cy="11" r="1"></circle>
                              <circle id="Oval-32" fill="#333333" opacity="0.5" cx="10" cy="11" r="1"></circle>
                          </g>
                      </g>
                  </g>
                </svg>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from './../../api'
import commons from './../../commons'
export default {
  name: 'new-task',
  data () {
    return {
      title: '',
      description: '',
      file: null,
      filename: '',
      mimetype: ''
    }
  },
  computed: {
    dummyQRURL () {
      return `${commons.URL}/task/qr/temp?token=${this.$cookie.get('token')}`
    },
    hasTitle () {
      return this.title.length > 0
    },
    hasFile () {
      return this.filename.length > 0
    },
    tag () {
      let tag = {}

      if (this.mimetype || this.mimetype.length > 0) {
        switch (this.mimetype.split('/')[0]) {
          case 'audio':
            tag.text = 'Sound 🎵'
            tag.colour = '#23d160'
            break
          case 'image':
            tag.text = 'Image 📷'
            tag.colour = '#209cee'
            break
          default:
            tag.text = 'Unkown'
            tag.colour = '#363636'
        }
      } else {
        tag = {
          text: 'No Media',
          colour: '#ff3860'
        }
      }
      return tag
    }
  },
  methods: {
    /**
     * Create and store a task remotely
     * @return {void}
     */
    async createTask () {
      if (this.title === '' || this.description === '' || this.file === undefined) {
        alert('A task needs a title, description, and a file.')
        return
      }
      let response

      try {
        response = await api.task.createTask(this.title, this.description, this.$cookie.get('token'))
      } catch (e) {
        console.error(e)
      }

      const task = response.data.payload.task

      // Upload the file
      if (this.file) {
        try {
          response = await api.task.uploadMedia(task, this.file, this.$cookie.get('token'))
        } catch (e) {
          console.error(e)
        }
      }

      task.mimetype = this.mimetype

      this.$store.commit('addTask', task)

      this.title = ''
      this.description = ''
      this.filename = ''
    },
    assignFile (event) {
      this.file = event.target.files[0]
      if (/audio/.test(this.file.type) || /image/.test(this.file.type)) {
        this.filename = this.file.name
        this.mimetype = this.file.type
      } else {
        this.file = null
        this.filename = ''
        this.mimetype = ''
        alert('You can only upload images and sounds.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #new-task {
    margin-top: 2%;
  }
  .card {
    margin-top: 5%;
    .card-header {
      text-align: right;
      padding: 1%;
    }
  }
  .title {
    margin-top: 5px;
      // padding-left: 1.5%;
  }
  .file {
    margin-bottom: 2%;
  }
  .tag {
    // margin: 1.5%;
    // font-size: 1em;
    color: white;
  }
</style>
