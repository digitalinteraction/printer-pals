<template lang="html">
  <div id="profile">
    <section class="section">
      <div class="container">
        <h1 class="is-size-3">Hi {{ user.username }}! <span class="hand">👋</span></h1>
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
@keyframes wave {
  from {
    transform: rotate(10deg);
  }
  to {
    transform: rotate(-10deg);
  }
}
.hand {
  display: inline-block;
  animation: wave 0.3s ease-in-out infinite;
  animation-direction: alternate;
}
</style>
