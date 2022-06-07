<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell"
  >
    {{ value }}
  </div>
</template>

<script>
import clickableGroup from './clickableGroup.js';

export default {
  name: 'TextColumn',
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    empty: {
      type: String,
      default: '-',
    },
  },
  computed: {
    value() {
      return (this.item[this.field] && this.item[this.field].toString())
        || this.empty;
    },
    item() {
      return this.$parent.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
  },
};
</script>
