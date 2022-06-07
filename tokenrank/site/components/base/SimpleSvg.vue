<template>
  <span
    class="simple-svg">
    <svg-icon
      :name="iconName"
      class="icon"/>
  </span>
</template>

<script>
export default {
  name: 'SimpleSvg',
  props: {
    iconName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.simple-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: $transition-ease;
}
svg, path {
  fill: inherit;
  height: inherit;
}
</style>
