<template>
  <v-chip
    v-bind="options"
    class="default-canban-element-chip"
    draggable
    @dragstart.native="elementIsDragged"
    @dblclick.native="itemClick"
  >
    {{ name }}
  </v-chip>
</template>

<script>
import { getObjectField, contrastTextColor } from '../../../helpers';

export default {
  name: 'DefaultCalendarElement',
  props: {
    item: {
      type: [Object, null],
      default: null,
    },
    nameField: {
      type: String,
      default: 'name',
    },
    colorField: {
      type: String,
      default: 'color',
    },
    chipProps: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    name() {
      return getObjectField(this.item, this.nameField) || '-';
    },
    color() {
      return getObjectField(this.item, this.colorField) || '#dadada';
    },
    textColor() {
      return contrastTextColor(this.color);
    },
    options() {
      const result = {
        color: this.color || '#dadada',
        textColor: this.textColor,
        xSmall: true,
        label: true,
      };
      if (this.chipProps) {
        Object.keys(this.chipProps)
          .forEach(key => {
            result[key] = this.chipProps[key];
          });
      }
      return result;
    },
  },
  methods: {
    elementIsDragged() {
      this.$emit('element-is-dragged', this.item);
    },
    itemClick() {
      this.$emit('item-click', this.item);
    },
  },
};
</script>

<style lang="stylus">
.default-canban-element-chip
  width: 100%
  font-size: 10px
  line-height: 10px
  &.v-chip
    &.v-size--x-small
      height: 12px
      padding: 0 6px
      font-weight: 400
    &.v-chip--label
      border-radius: 3px !important
</style>
