<template lang="html">
  <div id="all-tasks">
    <section class="section">
      <div class="container">
        <div id="new-task-container">
          <a class="button is-rounded">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
            <span>New Task</span>
          </a>
          <new-task></new-task>
        </div>
        <task v-for="task in tasks" :task="task" :key="task._id"></task>
      </div>
    </section>
  </div>
</template>

<script>
import Task from './Task.vue'
import NewTask from './NewTask.vue'
import api from './../../api'
export default {
  name: 'AllTasks',
  components: {
    Task,
    NewTask
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

<style lang="scss" scoped>
 .button {
   span {
     padding-right: 4px;
   }
 }
</style>
