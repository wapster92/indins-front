<template>
  <h3 class="semi-title">
    {{ text }}
  </h3>
</template>

<script>
export default {
  name: 'SemiTitle',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
  .semi-title
    font-size: 24px;
    font-weight: 400;
    color: $black-main;
</style>
