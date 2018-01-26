<template lang="html">
  <div id="task">
    <div class="columns">
      <div class="column is-two-fifths">
        <div class="card">
          <div class="card-content">
            <div class="container">
              <span class="tag" :style="{'background-color': tag.colour}">{{ tag.text }}</span>
              <p class="title">
                {{ title }}
              </p>
            </div>
            <div class="container">
              <p>
                {{ description }}
              </p>
            </div>
            <!-- <img :src="url" class="qr-code"/> -->
          </div>
          <footer class="card-footer">
            <!-- Icons from: https://robbiepearce.com/softies/ -->
            <p class="card-footer-item" @click="printTask">
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
            <p class="card-footer-item" @click="toggleEditing">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" v-bind:class="{'active-icon': isEditing}">
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
            <p class="card-footer-item" @click="printTask">
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
      <div class="column auto" v-if="isEditing">
        <div class="update-form" v-if="!isBusy">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Fly Me to The Moon" v-model="task.title">
            </div>
          </div>

          <div class="field">
            <label class="label">Task</label>
            <div class="control">
              <textarea class="textarea" placeholder="Lets sing it together!" rows="3" v-model="task.description"></textarea>
            </div>
          </div>

          <div class="control">
            <button class="button is-primary" @click="updateTask">Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commons from './../../commons'
import api from './../../api'
export default {
  name: 'task',
  props: ['task'],
  data () {
    return {
      isEditing: false,
      isBusy: false,
      tag: {}
    }
  },
  computed: {
    url () {
      return `${commons.URL}/task/qr/${this.task._id}?token=${this.$cookie.get('token')}`
    },
    title () {
      return this.task.title
    },
    description () {
      return this.task.description
    }
  },
  methods: {
    /**
     * Toggle the editing flag.
     * @return {void}
     */
    toggleEditing: function () {
      this.isEditing = !this.isEditing
    },
    /**
     * Update a task remotely.
     * @return {void}
     */
    updateTask: async function () {
      this.isBusy = true

      try {
        // Probably should be an object rather than a load of parameters but whatevs
        await api.task.updateTask(this.task._id, this.task.title, this.task.description, this.$cookie.get('token'))
      } catch (e) {
        console.log(e)
        alert('Sorry, the task could not be updated.')
      }

      this.isEditing = false
      this.isBusy = false
    },
    /**
     * Delete a task remotely
     * @return {void}
     */
    deleteTask: async function () {
      // Confirm before commiting a destructive action
      const confirmed = confirm('Are you sure you want to delete this task?')

      // Exit if not confirmed
      if (!confirmed) return

      try {
        await api.task.destroyTask(this.task._id, this.$cookie.get('token'))
        // Update store with new tasks
        this.$store.commit('removeTask', this.task._id)
      } catch (e) {
        console.log(e)
      }
    },
    printTask: async function () {
      try {
        await api.task.printTask(this.task._id, this.$cookie.get('token'))
        alert('Printing your task!')
      } catch (e) {
        alert(e)
      }
    }
  },
  mounted () {
    let tag = {}

    if (this.task.mimetype) {
      switch (this.task.mimetype.split('/')[0]) {
        case 'audio':
          tag.text = 'Sound 🎵'
          tag.colour = '#23d160'
          break
        case 'image':
          tag.text = 'Image  📷'
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

    this.tag = tag
  }
}
</script>

<style lang="scss" scoped>
.card {
    margin-top: 20px;
}

.title {
    // padding-left: 1.5%;
}

svg {
    cursor: pointer;
}

.active-icon {
    .edit-icon {
        #Artboard-4 {
            stroke: #00d1b2;
        }
    }
}

.update-form {
  padding-top: 2%;
}

.spinner {
  font-size: 2em;
  text-align: center;
  padding-top: 5%;
  color: #00d1b2;
}
.tag {
  position: relative;
  color: white;
}
</style>
