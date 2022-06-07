<template>
  <button
    :type="typeofButton"
    class="button-outline">
    <slot>
      <span class="button-outline__text">еще</span>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'TkOutlineButton',
  props: {
    typeofButton: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
.button-outline {
  width: 30px;
  height: 30px;
  font-size: $default-mobile;
  border-radius: 50%;
  border: 1px solid $primary-blue;
  transition: $transition-linear;
  background: $secondary-white;
  position: relative;
  @include flex-center;
  @media screen and (min-width: $md + 1) {
    width: 45px;
    height: 45px;
    font-size: $default-logo;
  }
  &:hover, &:focus {
    background: #E5EBF5;
    cursor: pointer;
  }
  &:active {
    background: $primary-blue;
    color: $secondary-white;
  }
  &__text {
    font-size: 12px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @include min-media($md + 1) {
      font-size: 14px;
    }
  }
}
</style>
