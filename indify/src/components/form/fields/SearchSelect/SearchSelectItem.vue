<template>
  <div
    :class="{ 'search-select-item-chosen': isSelected && multiple }"
    class="search-select-item"
    @click.capture.stop="selectItem"
  >
    <div
      v-if="multiple"
      :class="{ 'is-selected': isSelected }"
      class="search-select-checkbox"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#416FC8"
          d="M1.75 0.25H12.25C13.075 0.25 13.75 0.925 13.75 1.75V12.25C13.75 13.075 13.075 13.75 12.25 13.75H1.75C0.925 13.75 0.25 13.075 0.25 12.25V1.75C0.25 0.925 0.925 0.25 1.75 0.25ZM4.97502 10.2175C5.26752 10.51 5.74002 10.51 6.03252 10.2175L11.7175 4.525C12.01 4.2325 12.01 3.76 11.7175 3.4675C11.425 3.175 10.9525 3.175 10.66 3.4675L5.50002 8.6275L3.34002 6.4675C3.04752 6.175 2.57502 6.175 2.28252 6.4675C2.14208 6.60762 2.06315 6.79786 2.06315 6.99625C2.06315 7.19463 2.14208 7.38487 2.28252 7.525L4.97502 10.2175Z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      v-html="nameText"
      class="search-select-item-name"
    />
  </div>
</template>

<script>
import { getObjectField } from '../../../../helpers';

export default {
  name: 'SearchSelectItem',
  props: {
    item: {
      type: [Object, String, Number],
      default: () => ({}),
    },
    itemText: {
      type: String,
      default: 'name',
    },
    localValue: {
      type: [Object, String, Number, Array, null],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    searchValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  computed: {
    nameText() {
      const name = this.item ? this.getName(this.item) : '';
      if (!this.searchValue) return name;
      return name.replace(
        new RegExp(this.searchValue, 'gi'),
        (match, offset) => {
          let resultInsert = match
            .split('')
            .reduce((acc, letter, index) => acc + name[offset + index], '');
          return `<span class="search-matched-part">${resultInsert}</span>`;
        }
      );
    },
  },
  watch: {
    localValue: {
      immediate: true,
      deep: true,
      handler(value) {
        this.isSelected = this.checkSelected(this.item, value);
      },
    },
    multiple(val) {
      this.isSelected = this.checkSelected(this.item, this.localValue);
    },
  },
  methods: {
    getName(value) {
      const type = this.$getType(value);
      if (type === 'String' || type === 'Number') return value;
      return type === 'Object' ? getObjectField(value, this.itemText) : '';
    },
    selectItem() {
      this.$emit('select-item', this.item);
    },
    checkSelected(item, currentValue) {
      if (this.multiple) return this.checkSelectedMultiple(item, currentValue);
      if (!item || !currentValue) return false;
      const type = this.$getType(item);
      if (type === 'String' || type === 'Number') return item === currentValue;
      if (type === 'Object') return item.id === currentValue.id;
      return false;
    },
    checkSelectedMultiple(item, currentValues) {
      if (!item || !currentValues || (Array.isArray(currentValues) && currentValues.length === 0)) {
        return false;
      }
      const type = this.$getType(item);
      if (type === 'String' || type === 'Number') return currentValues.includes(item);
      if (type === 'Object') return currentValues.some(value => value.id === item.id);
      return false;
    },
  },
};
</script>

<style lang="stylus">
.search-select-item
  padding: 7px 17px
  background: #ffffff
  height: 36px
  display: flex
  align-items: center
  font-size: 14px
  line-height: 14px
  color: #313131
  &.no-items
    height: 48px
    padding: 4px 17px 16px
    color: #202124
    text-align: center
  &.search-select-item-chosen, &:hover:not(.no-items)
    background: #F3F5F8
    cursor: pointer
  &:focus
    background: #F3F5F8
    color: #202124

  .search-select-item-name
    display: inline-block
    max-width: 100%
    padding: 3px 0
    text-overflow: ellipsis
    overflow: hidden

.search-select-checkbox
  width: 14px
  height: 14px
  border: 2px solid #dadada
  border-radius: 2px
  margin: 0 16px 0 4px
  &.is-selected
    width: 14px
    height: 14px
    border: none

    svg
      display: block

  svg
    display: none

.search-matched-part
  color: #416FC8
</style>
