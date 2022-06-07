<template>
  <h1 class="main-header">
    <slot/>
  </h1>
</template>

<script>
export default {
  name: 'MainHeading',
};
</script>

<style lang="scss" scoped>
.main-header {
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 26px;
  color: $primary-blue;
  margin: 0;
  padding-bottom: 15px;
  line-height: 34px;
  @include min-media($md) {
    font-size: 40px;
    padding-bottom: 35px;
    line-height: 52px;
  }
}
</style>
