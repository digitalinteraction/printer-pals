<template lang="html">
  <div id="footer-bar">
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Printer Pals 🖨</strong> by:
            <br />
            <a href="https://dwelsh.uk">Daniel Welsh</a>, at <a href="https://digitalcivics.io">Open Lab, Newcastle University</a>.
            <br />
            <a href="https://www.ucc.ie/en/apsych/people/">Sarah Foley</a>, at <a href="https://www.ucc.ie/en/apsych/">Applied Psychology, University College Cork</a>.
            <br />
            <br />
            The source code is licensed under the
            <a href="https://opensource.org/licenses/MIT">MIT License</a>.
            <br />
            <br />
            <i class="fa fa-github" aria-hidden="true"></i> Check out the code for the <a href="https://github.com/digitalinteraction/printer-pals">project</a>!
            <br />
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'footer-bar',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
