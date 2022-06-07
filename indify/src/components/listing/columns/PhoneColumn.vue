<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell"
  >
    {{ value | phone }}
  </div>
</template>

<script>
import { getObjectField } from '../../../helpers';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'PhoneColumn',
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
      const result = getObjectField(this.item, this.field);
      return (result && result.toString()) || this.empty;
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
