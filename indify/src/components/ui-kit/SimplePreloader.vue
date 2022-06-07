<template>
  <transition name="fade">
    <div
      v-if="show"
      class="preloader"
      :class="{'preloader--full-screen':fullscreen}"
    >
      <img :src="preloaderImg" alt="preloader">
    </div>
  </transition>
</template>

<script>
import preloaderImg from '../../icons/preloader.svg';

export default {
  name: 'SimplePreloader',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    preloaderImg() {
      if (this.isImage) return this.$store.getters['preloader/preloadOptions'].image
      return preloaderImg;
    },
    show() {
      return this.value || this.$store.getters['preloader/show'];
    },
    fullscreen() {
      return this.$store.getters['preloader/preloadOptions'].fullscreen;
    },
    isImage() {
      return !!this.$store.getters['preloader/preloadOptions'].image
    }
  },
};
</script>

<style lang="stylus" scoped>
.preloader
  background: rgba(256, 256, 256, .5);
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  z-index: 9999;
  position absolute
  display flex
  justify-content center
  align-items center

  &--full-screen
    position fixed

.fade-enter-active, .fade-leave-active
  transition: opacity .3s;

.fade-enter, .fade-leave-to
  opacity: 0;
</style>
