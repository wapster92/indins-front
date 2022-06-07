<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell icon-column"
  >
    <v-icon
      v-bind="iconOptions"
      class="mr-1"
    >
      {{ value }}
    </v-icon>
    {{ text }}
  </div>
</template>

<script>
import clickableGroup from './clickableGroup.js';

export default {
  name: 'IconColumn',
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    getIcon: {
      type: Function,
      required: true,
    },
    getText: {
      type: [Function, null],
      default: null
    },
    color: {
      type: String,
      default: '',
    },
    iconProps: {
      type: [Object, Function],
      default: () => ({}),
    },
  },
  computed: {
    value() {
      if (!this.getIcon) return '';
      return this.getIcon(this.item);
    },
    text() {
      if (this.$getType(this.getText).match('Function') === null) return '';
      return this.getText(this.item);
    },
    defaultColor() {
      return this.color || this.$defaultConfig.color;
    },
    item() {
      return this.$parent.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
    iconOptions() {
      const type = this.$getType(this.iconProps);
      const defaultProps = {
        small: true,
        size: '25',
        color: this.defaultColor,
      };
      let props = null;
      if (type === 'Object') {
        props = this.iconProps;
      }
      if (type === 'Function') {
        props = this.iconProps(this.item);
      }
      if (this.$getType(props) !== 'Object') return defaultProps;
      return {
        ...defaultProps,
        ...props,
      };
    },
  },
};
</script>
