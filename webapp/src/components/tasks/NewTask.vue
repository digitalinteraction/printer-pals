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

          <div class="control">
            <button class="button is-primary" @click="createTask">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from './../../api'
export default {
  name: 'new-task',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    /**
     * Create and store a task remotely
     * @return {void}
     */
    createTask: async function () {
      let response

      try {
        response = await api.task.createTask(this.title, this.description, this.$cookie.get('token'))
      } catch (e) {
        console.error(e)
      }

      const task = response.data.payload.task
      console.log(task)
      this.$store.commit('addTask', task)
    }
  }
}
</script>

<style lang="scss" scoped>
  #new-task {
    margin-top: 2%;
  }
</style>
