<template>
  <div class="animate-logo">
    <div
      class="logo"
      :style="`background-image: url('` + localProjectLogo + `')`"
    />
  </div>
</template>

<script>
export default {
  name: 'AppLogo',
  props: {
    projectLogo: {
      type: String,
      default: '',
    },
  },
  computed: {
    localProjectLogo() {
      return this.projectLogo || `${this.$router.options.base}logo-min.svg`;
    },
  },
};
</script>

<style lang="stylus">
.animate-logo
  position: relative
  display: inline-block
  width: 250px
  height: 250px
  margin: auto

.logo
  position: absolute
  width: 100%
  height: 100%
  top: 0
  background-repeat: no-repeat
  background-position: center
  background-size: contain
  background-image: url('/logo-min.svg')
  opacity: 0
  transform: scale(.8)
  animation: openLogo 2s cubic-bezier(0.645, 0.045, 0.355, 1) forwards 1s

@keyframes openLogo
  100%
    opacity: 1
    transform: scale(1)
</style>
