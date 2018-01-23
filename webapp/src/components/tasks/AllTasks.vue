<template lang="html">
  <div id="all-tasks">
    <section class="section">
      <div class="container">
        <div id="new-task-container">
          <a class="button is-rounded" @click="toggleIsAddingNew" v-bind:class="{'is-primary': isAddingNew}">
            <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
            <span>New Task</span>
          </a>
          <new-task v-if="isAddingNew"></new-task>
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
      isAddingNew: false
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
   span {
     padding-right: 4px;
   }
 }

 .isAddingNew {
   background-color: red;
 }
</style>
