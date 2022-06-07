<template>
  <div :class="{'listing-table_items-showed': listStatus === 'show'}">
    <div
      :class="{
      'is-selected': item.selected,
      'readonly': readonly,
      'colored': bgColor,
    }"
      :style="rowAdditionalStyle"
      :data-index="index"
      class="table-row"
    >
      <div
        v-if="state['nested']"
        class="listing-table-nested"
        @click="openNested"
      >
        <div
          v-if="listStatus === 'show'"
          class="listing-table-nested_icon showed"
        >
          <span>_</span>
        </div>
        <div
          v-else
          class="listing-table-nested_icon">
          <span>+</span>
        </div>
      </div>
      <IMultipleCheckbox
        class="listing-table-checkbox"
        v-if="state.multiple"
        :state="checkboxState"
        @click="selectController"
      />
      <slot />
    </div>
    <slot
      name="nested-listing"
      :state="state"
      :index="index"
    />
  </div>
</template>

<script>
import IMultipleCheckbox from "../../ui-kit/IMultipleCheckbox";

export default {
  name: 'TableItem',
  inject: {
    selectItem: {
      default: null,
    },
    selectNestedItem: {
      default: null
    }
  },
  provide() {
    return {
      hoveredCell: this.hoveredCell,
      // parentIndex: `${this.item.id}`,
      emitCheckboxState: (items, child) => this.setCheckboxState(items, child),
      emitNestedList: state => this.setChildList(state)
    }
  },
  components: {
    IMultipleCheckbox
  },
  props: {
    item: {
      type: [Object, null],
      default: null,
    },
    visibleColumns: {
      type: Object,
      default: () => ({}),
    },
    multiple: {
      type: Boolean,
      default: true
    },
    grid: {
      type: [String, null],
      default: null
    },
    depth: {
      type: Number,
      default: 0
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: -1,
    },
    bgColor: {
      type: [String, null],
      default: null,
    }
  },
  data() {
    return {
      hoveredCell: {
        field: null,
        group: null,
      },
      listStatus: 'close',
      checkboxState: 'unselected',
      childList: [],
    };
  },
  watch: {
    'item.selected': {
      handler(val) {
        this.checkboxState = (val) ? 'selected' : 'unselected'
      },
      immediate: true,
    },
  },
  computed: {
    state() {
      let initialState = {}
      if (this.multiple && this.$slots['nested-listing']) initialState["all"] = true
      if (this.multiple) initialState["multiple"] = true
      if (this.$slots['nested-listing']) initialState["nested"] = true
      if (initialState.nested) {
        let isChildrensGettingByQuery = this.$slots['nested-listing'][0]?.componentOptions?.propsData?.query
        if (isChildrensGettingByQuery) initialState["query"] = true
      }
      return initialState
    },
    rowAdditionalStyle() {
      return `${this.currentGrid} ${this.paddingLeftVal} ${this.backgroundColor}`
    },
    currentGrid() {
      return this.grid ? `grid-template-columns: ${this.grid};` : '--grid-template-columns;'
    },
    paddingLeftVal() {
      if (!this.grid) return ''
      let val = this.depth * 29
      if (!this.state['nested'] && this.state['multiple']) val = 29 + val
      return `padding-left: ${val}px;`
    },
    backgroundColor() {
      return (this.bgColor) ? this.bgColor : ''
    }
  },
  methods: {
    setChildList(items) {
      this.childList = items
    },
    setCheckboxState(state, childValue) {
      if (!state || typeof state !== 'string') return
      this.checkboxState = state
      this.selectItem(this.item, { state, childValue });
    },
    selectController() {
      if (this.$getType(this.selectItem) === 'Function') {
        this.selectItem(this.item);
      }
      this.checkboxState = (this.checkboxState !== 'selected') ? 'selected' : 'unselected'
      if (this.childList.length) {
        this.childList.map(el => {el.selected = (this.checkboxState === 'selected')})
      }
    },
    openNested() {
      if (this.state['nested']) {
        this.listStatus = (this.listStatus === 'show') ? 'close' : 'show'
        this.$emit('click', {type: 'nested', item: this.item})
      }
    }
  },
};
</script>

<style lang="stylus">

.table-listing.has-selection
  .table-row
    &.is-selected
      background-color: #F3F5F8

.table-row
  cursor: pointer
  position: relative
  display: grid
  grid-template-rows: 100%
  grid-template-columns: var(--grid-template-columns)
  grid-gap: 0
  align-items: center
  min-height: 36px
  height: auto
  //min-width: 100%
  border-bottom: 1px solid #DADADA
  background: #ffffff
  &:not(.is-header):hover
    &:hover
      background: #F3F5F8
      & > .listing-table-checkbox
        border-color: var(--info-color)
        outline-color: var(--info-color)
      & > .listing-table-nested
        outline-color: var(--info-color)
        & > .listing-table-nested_icon
          color: var(--info-color)
    .table-cell.action-column
      visibility: visible
      position: sticky
      height 100%
      right: 0
      padding 0 8px
      background: linear-gradient(90deg, rgba(255, 255, 255, 0%) 0%, 30%, #dcdcdc);
  &.readonly
    cursor default
  .checkbox-button
    align-self: center
    justify-self end
    position: static
  &.colored
    border-bottom: none

.listing-table-checkbox
  position: static
  width: 14px
  height: 14px
  border: none
  border-radius: 2px
  display flex
  justify-self end
  outline: 1px solid #D2D2D2
  outline-offset: -1px
  background: transparent
  &:hover
    outline-color: var(--info-color)
    cursor: pointer

.listing-table-nested
  position: static
  display flex
  justify-self end
  width: 14px
  height: 14px
  border: none
  border-radius: 2px
  outline: 1px solid #D2D2D2
  outline-offset: -1px
  background: transparent
  user-select: none;
  &_icon
    position relative
    font-size 16px
    display flex
    top: -6px;
    left: 2.5px;

.listing-table_items-showed
  .listing-table-nested_icon
    position: relative;
    left: 2.5px;
    top: -6px;
    font-size: 16px;
    font-weight: 400;
  .listing-table-nested_icon
    &.showed
      left: 3px;
      top: -13.5px;

.table-cell
  height: 36px
  padding: 7px 15px
  font-size: 14px
  color: #202124
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis
  & > *
    min-width: 0
  &.action-column
    visibility: hidden
  &.is-hovered
    background: #FFF8E8
    cursor: pointer
    .file-column-item
      background-color: #ffffff

.action-column
  display: flex
  flex-flow: row nowrap
  align-items center
  justify-content: flex-end
  cursor default
  .listing-icon-button
    margin-left: 5px
</style>
