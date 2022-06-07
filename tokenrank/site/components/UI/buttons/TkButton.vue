<template>
  <button
    :class="{ 'button-main--small-font': small }"
    class="button-main">
    <slot>Регистрация</slot>
  </button>
</template>
<script>
export default {
  name: 'TkButton',
  props: {
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button-main {
  border-radius: 4px;
  border: none;
  background: $primary-yellow;
  transition: $transition-linear;
  cursor: pointer;
  width: 100%;
  min-height: 38px;
  padding: 12px 8px;
  @media screen and (min-width: $md) {
    min-height: 46px;
    min-width: 224px;
    font-size: 16px;
    padding: 12px 16px;
  }
  @include flex-center;
  &:hover, &:focus  {
    background: $gradient-main--button
  }
  &:active{
    background: $primary-logo;
  }
  &--small-font {
    width: 100%;
    padding: 8px;
    min-height: 30px;
    @media screen and (min-width: $md) {
      min-height: 36px;
      font-size: $default-logo;
    }
  }
}
</style>
