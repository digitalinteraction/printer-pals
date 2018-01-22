<template lang="html">
  <div id="profile">
    <section class="section">
      <div class="container">
        <h1 class="is-size-1">Hi {{ user.username }}!</h1>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'profile',
  props: ['user']
}
</script>

<style lang="scss">
</style>
