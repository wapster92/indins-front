<template>
  <div class="massive-actions">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'MassiveActions'
}
</script>

<style lang="stylus">
.massive-actions
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  width: 100%
  padding: 0 9px
  @media (max-width: 960px)
    flex-grow: 2
    justify-content: center

  & > *
    margin: 0 8px
</style>