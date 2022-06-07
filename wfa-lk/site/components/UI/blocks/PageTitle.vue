<template>
  <h1 class="page-title">
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">
.page-title
  font-size: 28px;
  font-weight: 700;
  color: $black-main;
  @media screen and (min-width: $tablet)
    font-size: 30px;
</style>
