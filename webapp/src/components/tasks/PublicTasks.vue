<template lang="html">
  <div id="public-tasks">
    <section class="section">
      <div class="container">
        <div class="all-tasks" v-if="hasTasks">
          <task v-for="task in tasks" :task="task" :key="task._id"></task>
        </div>
        <div class="no-tasks" v-else>
          <div class="container">
            <h1 class="is-size-4">There are no public tasks 💔</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Task from './Task.vue'
import api from './../../api'
export default {
  name: 'PublicTasks',
  components: {
    Task
  },
  data () {
    return {}
  },
  computed: {
    tasks () {
      return this.$store.getters.getPublicTasks
    },
    hasTasks () {
      return this.$store.getters.getPublicTasks.length > 0
    }
  },
  async mounted () {
    let tasks = []

    try {
      let response = await api.task.getPublicTasks()
      tasks = response.data.payload.tasks
    } catch (e) {
      console.error(e)
      return
    }
    this.$store.commit('setPublicTasks', tasks)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
section {
  margin-top: 0;
  padding-top: 0;
}
 .button {
   transition: all ease 0.5s;
   span {
     padding-right: 4px;
   }
 }

 .no-tasks {
   h1 {
     margin-top: 1%;
   }
 }

</style>
