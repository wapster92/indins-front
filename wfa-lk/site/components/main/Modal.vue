<template>
  <div
    class="modal"
  >
    <div
      class="modal__cancel"
      @click="closeModal"
    >
      <svg-icon name="UI/cancel" />
    </div>
    <div class="modal__body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  mounted() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },
  methods: {
    closeModal() {
      this.$store.dispatch('modal/close');
      this.$emit('close:modal');
    },
  },
};
</script>

<style lang="stylus">
.modal
  background: $white-main;
  position fixed
  z-index: 1000;
  top: 50%
  left: 50%
  transform translate(-50%, -50%)
  width: 90vw;
  max-width 800px;
  height: 90vh;
  max-height 600px
  padding: 40px;
  box-shadow: 0 0 30px rgba(39, 55, 112, .3);
  &__cancel
    position: absolute;
    top: 0
    right: 0
    width: 55px;
    height: 55px;
    padding: 15px;
    fill: $blue-main
    cursor: pointer;
    transition fill .3s
    &:hover, &:focus
      fill $black-main
    .icon
      height: 100%;
  &__body
    width: 100%
    height: 100%;
    overflow auto
</style>
