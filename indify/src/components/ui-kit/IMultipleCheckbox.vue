<template>
  <button
    class="checkbox-button"
    :class="state"
    @click="rotateSelection"
  >
    <v-icon
      v-if="state === 'selected'"
      size="14"
      color="light-info"
      class="info"
    >
      check
    </v-icon>
    <v-icon
      v-else-if="state === 'part-selected'"
      size="14"
      color="light-info"
      class="info"
    >
      remove
    </v-icon>
  </button>
</template>

<script>
export default {
  name: "IMultipleCheckbox",
  props: {
    state: {
      type: String,
      default: 'unselected'
    }
  },
  data() {
    return {
      // stages: ['unselected', , '']
    }
  },
  methods: {
    rotateSelection() {
      if (this.state !== 'selected') return this.$emit('click', 'selected')
      this.$emit('click', 'unselected')
    }
  }
}
</script>

<style lang="stylus">
.checkbox-button
  left: 16px
  z-index: 2
  display: inline-flex
  flex-flow: row nowrap
  justify-content: center
  align-items: center
  width: 14px
  height: 14px
  border: 1px solid var(--info-color)
  border-radius: 2px
  background: var(--info-color)
  outline: none
  box-shadow: none
  &.unselected
    border-color: #a6a7ac
    background: transparent
  &:hover
    border-color: var(--info-color)
    //.v-icon
    //  border-radius: 2px

  .v-icon
    border-radius: 2px




</style>