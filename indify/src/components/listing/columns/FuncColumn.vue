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
  name: 'FuncColumn',
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    func: {
      type: [Function, null],
      default: null,
    },
    maxValueLength: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    item() {
      return this.$parent.item;
    },
    value() {
      if (!this.item || !this.field || !this.func) return '';
      return this.cutValue(this.func(this.item));
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
  },
  methods: {
    cutValue(val) {
      const len = +this.maxValueLength;
      if (isNaN(len) || len === 0 || val.length <= len) return val;
      return `${val.slice(0, (len - 2) || 0)}...`;
    },
  },
};
</script>
