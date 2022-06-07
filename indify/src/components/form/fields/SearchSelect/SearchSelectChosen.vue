<template>
  <div
    class="search-select-chosen"
    :class="{'filled-items' : filledItems && item && isValid }"
    :style="{
      'background-color': filledItems ? backgroundColor : 'transparent',
      'color': textColor,
    }"
  >
    <span>{{ `${name}${showColon ? ', ' : ''}` }}</span>
    <v-btn
      v-if="deletable"
      class="close-btn"
      icon
      plains
      :width="filledItems ? 16 : 25"
      :height="filledItems ? 16 : 25"
      @click="unselectItem"
    >
      <v-icon
        :size="filledItems ? 16 : 20"
        :color="filledItems ? '#416FC8' : '' "
      >
        close
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { getObjectField, contrastTextColor } from "../../../../helpers";

export default {
  name: 'SearchSelectChosen',
  props: {
    item: {
      type: [Object, String, Number, null],
      default: null,
    },
    deletable: {
      type: Boolean,
      default: false,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    filledItems: {
      type: Boolean,
      default: false,
    },
    colorField: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isValid: true,
    };
  },
  computed: {
    name() {
      if (!this.item) return '';
      const type = this.$getType(this.item);
      if (type === 'String' || type === 'Number') return this.item;
      if (type === 'Object' && Object.keys(this.item).length) {
        return getObjectField(this.item, this.itemText) || ''
      }
      return ''
    },
    backgroundColor() {
      if (!this.colorField) return '#F3F5F8';
      return this.item
        ? getObjectField(this.item, this.colorField)
        : '#F3F5F8';
    },
    textColor() {
      return contrastTextColor(this.backgroundColor) || '#000000';
    },
    showColon() {
      return this.readonly && !this.isLast && !this.filledItems;
    },
  },
  watch: {
    item: {
      immediate: true,
      handler(val) {
        const type = this.$getType(val);
        if (
          type !== 'Object'
          && type !== 'String'
          && type !== 'Number'
          && val !== null
        ) {
          console.error('В компонент SearchSelect было передано значение, не являющееся объектом, числом или строкой.');
          this.isValid = false;
          return;
        }
        if (type === 'Object' && Object.keys(val).length === 0) {
          console.error('В компонент SearchSelect был передан пустой объект! Для корректной работы передайте объект с хотя бы одним свойством');
          this.isValid = false;
          return;
        }
        this.isValid = true;
      },
    },
  },
  methods: {
    unselectItem() {
      this.$emit('unselect-item', this.item);
    },
  },
};
</script>

<style lang="stylus">

.search-select-chosen, .search-select-placeholder
  position: relative
  z-index: 3
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: space-between
  max-width: 100%
  height: 23px
  padding: 4px 0 0
  margin: 0 2px 0 -2px
  font-size: 14px
  line-height: 20px
  text-overflow: ellipsis
  & > span
    display: inline-block
    height: 100%
    max-width: 100%
    padding-left: 2px
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
  .close-btn
    margin: 0 0 0 3px

.search-select-chosen.filled-items
  display: inline-flex
  align-items: center
  margin: 2px 6px -1px 0
  font-size: 14px
  padding: 0 6px 0 10px
  height: 20px
  background: #F3F5F8
  border-radius: 3px
  & > span
    height: auto
    margin-bottom: 2px

.search-select-placeholder
  color: #d3d4db!important
</style>
