<template lang="html">
  <div id="all-tasks">
    <section class="section">
      <div class="container">
        <!-- <div class="columns">
          <div class="column is-two-fifths"> -->
            <task v-for="task in tasks" :task="task" :key="task._id"></task>
          <!-- </div> -->
        <!-- </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import Task from './Task.vue'
import api from './../../api'
export default {
  name: 'AllTasks',
  components: {
    Task
  },
  data () {
    return {
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.getTasks
    }
  },
  async mounted () {
    let tasks

    try {
      let response = await api.task.getTasks(this.$cookie.get('token'))
      tasks = response.data.payload.tasks
    } catch (e) {
      console.error(e)
    }

    this.$store.commit('setTasks', tasks)
  }
}
</script>

<style lang="scss">
</style>
