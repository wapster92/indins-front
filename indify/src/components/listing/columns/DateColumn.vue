<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell"
  >
    {{ formattedValue }}
  </div>
</template>

<script>
import moment from 'moment';
import { getObjectField } from '../../../helpers';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'DateColumn',
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
    format: {
      type: String,
      default: 'DD.MM.YYYY',
    },
    inputFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  computed: {
    value() {
      if (!this.item || !this.field) return '';
      return getObjectField(this.item, this.field);
    },
    formattedValue() {
      const date = moment(this.value, this.inputFormat);
      if (!this.value || !date.isValid()) return this.empty;
      return date.format(this.format);
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
