<template>
  <div class="all-cals">
    <span class="all-cals__text">Обработано звонков</span>
    <span class="all-cals__count">{{ allCalls }}</span>
  </div>
</template>

<script>
export default {
  name: 'AllCalls',
  props: {
    allCalls: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="stylus" scoped>
.all-cals
  display: grid
  grid-template-columns 200px 1fr
  &__count
    display: flex
    justify-content flex-end
    font-weight: 700
</style>
