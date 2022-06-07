<template>
  <div class="i-icon">
    <v-icon class="i-icon_icon" v-if="icon" size="20">
      {{ icon }}
    </v-icon>
    <div v-else-if="src" class="i-icon_wrapper_img">
      <img class="i-icon_img" :src="src" alt="icon">
    </div>
    <div v-else class="i-icon_free-space"></div>
  </div>
</template>

<script>
export default {
  name: "IIcon",
  props: {
    icon: {
      type: [String, null],
      default: null
    },
    src: {
      type: [String, null],
      default: null
    }
  }

}
</script>

<style lang="stylus">
.i-icon
  display flex
  &_img
    height 20px
    width: 20px;
  &_wrapper
    &_img
      display flex
      justify-content center

</style>