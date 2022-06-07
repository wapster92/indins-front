<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell"
  >
    <span v-if="!useChips">{{ text }}</span>
    <v-chip
      v-for="listElement in value.item"
      v-else
      v-bind="chipOptions"
      :key="'list-chip-' + listElement.id"
      :color="getChipColor(listElement, item)"
      class="list-column-chip"
    >
      {{ getListItemValue(listElement) }}
    </v-chip>
  </div>
</template>

<script>
import { getObjectField, findArray } from '../../../helpers';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'ListColumn',
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    empty: {
      type: String,
      default: '-',
    },
    chips: {
      type: Boolean,
      default: false,
    },
    chipColorField: {
      type: [String, Function, null],
      default: null,
    },
    chipProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    value() {
      return findArray(this.item, this.field);
    },
    text() {
      if (this.listItems.length === 0) return this.empty;
      const result = this.listItems
        .reduce((acc, item) => `${acc + this.getListItemValue(item)}, `, '');
      return result.slice(0, -2);
    },
    item() {
      return this.$parent.item || this.$attrs.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
    listItems() {
      if (
        this.$getType(this.value) !== 'Object'
        || this.$getType(this.value.item) !== 'Array'
        || this.value.item.length === 0
      ) {
        return [];
      }
      return this.value.item;
    },
    itemQuery() {
      return this.$getType(this.value) === 'Object' && this.value.query
        ? this.value.query
        : this.itemText;
    },
    useChips() {
      return this.chips && this.$getType(this.value) === 'Object'
        && this.$getType(this.value.item) === 'Array'
        && this.value.item.length !== 0;
    },
    chipOptions() {
      const options = {
        label: true,
        small: true,
        ...this.chipProps,
      };
      return options;
    },
  },
  methods: {
    getListItemValue(item) {
      return getObjectField(item, this.itemQuery) || '';
    },
    getChipColor(listElement, item) {
      const type = this.$getType(this.chipColorField);
      if (type !== 'String' && type !== 'Function') return '';
      return type === 'String'
        ? getObjectField(listElement, this.chipColorField)
        : this.chipColorField(listElement, item);
    },
  },
};
</script>

<style lang="stylus">
.list-column-chip
  margin-right: 6px
</style>
