<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell"
  >
    <v-chip
      v-if="!!value"
      v-bind="chipOptions"
    >
      {{ value }}
    </v-chip>
  </div>
</template>

<script>
import { contrastTextColor, getObjectField } from '../../../helpers';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'ChipColumn',
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    empty: {
      type: String,
      default: '',
    },
    colorField: {
      type: (String | null),
      default: null,
    },
    chipProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    value() {
      return getObjectField(this.item, this.field) || this.empty;
    },
    chipColor() {
      return this.colorField ? getObjectField(this.item, this.colorField) || '#e0e0e0' : '#e0e0e0';
    },
    textColor() {
      return contrastTextColor(this.chipColor) || '#000000';
    },
    item() {
      return this.$parent.item || this.$attrs.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
    chipOptions() {
      const defaultProps = {
        color: this.chipColor,
        textColor: this.textColor,
        label: true,
        small: true,
      };
      if (this.$getType(this.chipProps) !== 'Object') return defaultProps;
      return {
        ...defaultProps,
        ...this.chipProps,
      };
    },
  },
};
</script>
