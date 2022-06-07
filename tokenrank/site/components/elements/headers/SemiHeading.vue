<template>
  <h3 class="semi-heading">
    <slot/>
  </h3>
</template>

<script>
export default {
  name: 'SemiHeading',
};
</script>

<style lang="scss" scoped>
.semi-heading {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 22px;
  color: $primary-blue;
  margin: 0;
  // padding-bottom: 15px;
  line-height: 26px;
  @include min-media($md) {
    font-size: 32px;
    // padding-bottom: 35px;
    line-height: 37px;
  }
}
</style>
