<template>
  <button
    :type="typeofButton"
    :class="{ active: isActive }"
    class="button-filter"
    @click="emitIdx">
    <slot>фильтр</slot>
  </button>
</template>

<script>
export default {
  name: 'TkFilterButton',
  props: {
    typeofButton: {
      type: String,
      default: 'button',
    },
    idx: {
      type: Number || null,
      default: null,
    },
    activeIdx: {
      type: Number || null,
      default: null,
    },
  },
  computed: {
    isActive() {
      return this.idx != null && this.activeIdx === this.idx;
    },
  },
  methods: {
    emitIdx() {
      if (this.idx != null) {
        this.$emit('change-filter', this.idx);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button-filter {
  min-width: 135px;
  min-height: 32px;
  border-radius: 6px;
  border: 1px solid $primary-blue;
  color: $primary-blue;
  background: $secondary-white;
  @include flex-center;
  &:hover, &:focus {
    background: $primary-light-blue;
    cursor: pointer;
  }
  &:active {
    background: $primary-blue;
    color: $secondary-white;
  }
  &.active {
    background: $primary-blue;
    color: $secondary-white;
    &:hover, &:focus, &:active {
      background: $primary-blue;
      color: $secondary-white;
    }
  }
}

</style>
