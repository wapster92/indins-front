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
import { getObjectField } from '../../../helpers';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'RelationColumn',
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
      return getObjectField(this.item, this.field) || this.empty;
    },
    item() {
      return this.$parent.item || this.$attrs.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
  },
};
</script>
