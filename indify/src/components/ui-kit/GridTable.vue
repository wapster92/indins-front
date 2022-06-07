<template>
  <div
    :class="{ 'use-grid': useGrid }"
    :style="{ 'grid-template-columns': columns }"
    class="grid-table"
  >
    <div
      v-for="(element, index) in list"
      :key="'grid-table-item-' + index"
      class="grid-table-item"
    >
      <div class="grid-table-title">
        {{ element.title }}
      </div>
      <div class="grid-table-value">
        {{ element.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { getObjectField } from './../../helpers';

export default {
  name: 'GridTable',
  props: {
    fieldNames: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    useGrid: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: String,
      default: '',
    },
  },
  computed: {
    list() {
      if (this.$getType(this.fieldNames) !== 'Object') return [];
      return Object.keys(this.fieldNames).map(key => ({
        title: this.fieldNames[key],
        value: getObjectField(this.item, key),
      }));
    },
  },
};
</script>

<style lang="stylus">
.grid-table
  display: flex
  flex-flow: row wrap
  align-items: flex-start
  justify-content: space-between
  &.use-grid
    display: grid
    grid-gap: 16px
    justify-content: space-between

.grid-table-item
  display: flex
  flex-flow: column nowrap
  justify-content: flex-start
  align-items: flex-start

.grid-table-title
  font-size: 12px
  color: #888888

.grid-table-value
  font-size: 14px
</style>
