<template lang="html">
  <div id="all-tasks">
    <section class="section">
      <div class="container">
        <div class="new-task-container">
          <a class="button is-rounded" @click="toggleIsAddingNew" v-bind:class="{'is-primary': isAddingNew}">
            <span>New Task</span>
          </a>
          <new-task class="new-task" v-if="isAddingNew"></new-task>
        </div>
        <div class="all-tasks" v-if="hasTasks">
          <task v-for="task in tasks" :task="task" :key="task._id"></task>
        </div>
        <div class="no-tasks" v-else>
          <div class="container">
            <h1 class="is-size-4">You have no tasks yet, please add a new one!</h1>
          </div>
        </div>
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
      isAddingNew: false
    }
  },
  computed: {
    tasks () {
      return this.$store.getters.getTasks
    },
    hasTasks () {
      return this.$store.getters.getTasks.length > 0
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

    let tempTasks = tasks
    tasks = []
    for (let i = 0; i < tempTasks.length; i++) {
      if (!tempTasks[i].public) {
        tasks.push(tempTasks[i])
      }
    }
    this.$store.commit('setTasks', tasks)
  },
  methods: {
    toggleIsAddingNew: function () {
      this.isAddingNew = !this.isAddingNew
    }
  }
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

 .isAddingNew {
   background-color: red;
 }

 .no-tasks {
   h1 {
     margin-top: 1%;
   }
 }

</style>
