<template>
  <button
    :type="typeofButton"
    disabled
    class="button-tk-tag">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'TkTag',
  props: {
    typeofButton: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="scss" scoped>
.button-tk-tag {
  @include flex-center;
  background-color: $primary-blue;
  min-width: max-content;
  height: auto;
  padding: 2px 3px;
  border-radius: 5px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  color: $secondary-white;
  font-size: $default-mobile;
  border: none;
  text-align: center;
  text-transform: uppercase;
  @include min-media($md + 1) {
    font-size: 14px;
    min-width: max-content;
    border-radius: 6px;
    padding: 4px 8px;
    box-shadow: none;
  }
}
</style>
