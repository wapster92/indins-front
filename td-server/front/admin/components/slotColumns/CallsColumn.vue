<template>
  <div class="calls">
    <template v-if="calls.length">
      <span
        v-for="(item, i) of calls"
        :key="i"
      >{{ item }}</span>
    </template>
    <template v-else>
      {{ calls }}
    </template>
  </div>
</template>

<script>
export default {
  name: 'CallsColumn',
  props: {
    calls: {
      type: (Array || Number),
      default: () => ([]),
    },
  },
};
</script>

<style lang="stylus" scoped>
.calls
  span
    color: #8E43B1
    &:nth-child(2)
      color #EBA844
    &:before
      content '/'
      color #ccc
      padding: 0 3px
    &:first-child
      &:before
        display: none
    &:last-child
      color: #202124
</style>
