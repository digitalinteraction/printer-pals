<template lang="html">
  <div id="task">
    <div class="card">
      <div class="card-content">
        <p class="title">
          {{ task.title }}
        </p>
      </div>
      <footer class="card-footer">
        <p class="card-footer-item">
          <span>
            Edit
          </span>
        </p>
        <p class="card-footer-item">
          <span>
            Delete
          </span>
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  props: ['task']
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 40px;
  }
</style>
