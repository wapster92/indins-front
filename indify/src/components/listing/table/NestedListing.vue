<template>
  <div
    class="nested-table-rows-container"
    @click="allClicksHandler($event)"
    @mouseover="setHover($event)"
    @mouseout="removeHover($event)"
  >
    <div v-show="state !== 'close'" class="nested-table-rows-wrapper">
      <div
        v-if="state === 'pending'"
        style="height: 100px">
        <slot name="nested-preloader">
          <SimplePreloader value="true"></SimplePreloader>
        </slot>
      </div>
      <div
        v-if="state === 'empty'"
        class="nested-table_empty">
        <slot name="no-nested-items">
          <span class="nested-table_empty_text">
            К сожалению, ничего не найдено
          </span>
        </slot>
      </div>
      <TableItem
        v-else
        :key="parentCheckboxState + index"
        :readonly="readonly"
        v-for="(item, index) in listOfItems"
        :style="coloredRows(item)"
        :grid="itemGrid"
        :multiple="massiveActions"
        :item="item"
        :index="index"
        :visible-columns="visibleColumns"
        :depth="computedDepth"
        @click="itemController($event)"
      >
        <slot :item="item">
        </slot>
        <template #nested-listing>
          <slot name="nested-listing"/>
        </template>
      </TableItem>
    </div>
  </div>
</template>

<script>
import TableItem from './TableItem';
import { getObjectField } from '../../../helpers';
import SimplePreloader from "../../ui-kit/SimplePreloader";


export default {
  name: 'NestedListing',
  components: {
    TableItem,
    SimplePreloader
  },
  inject: {
    emitNestedList: {
      default: null
    },
    emitCheckboxState: {
      default: null
    },
    checkboxState: {
      default: 'unselected'
    },
    // parentIndex: {
    //   default: '0.0'
    // },
    // selectNestedItem: {
    //   default: null
    // },
    // localOrders: {
    //   default: {}
    // }
  },
  provide() {
    return {
      // перезаписываем provide из tableListing.vue
      // для то чтобы tableItem.vue работал со своим родителем
      selectItem: item => this.selectItem(item),
    };
  },
  props: {
    list: {
      type: [Array, null],
      default: null,
    },
    field: {
      type: [String, null],
      default: null
    },
    query: {
      type: [Object, null],
      default: null
    },

    grid: {
      type: [String, null],
      default: null
    },
    parentItem: {
      type: [Object, null],
      default: null
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    massiveActions: {
      type: Boolean,
      default: false
    },
    depth: {
      type: Number,
      default: 0
    },
    rowColor: {
      type: [Function, null],
      default: null,
    },
  },
  data() {
    return {
      listOfItems: [],
      selectedItemsList: {},
      selectedItems: [],
      visibleColumns: {},
      itemGrid: null,
      state: 'close'
    }
  },
  watch: {
    listOfItems: {
      handler(val, oldVal) {
        if (!val || !val.length) return
        if (val.length !== oldVal.length) {
          this.setVisibleColumns(val)
          this.setGrid(val[0])
          if (this.emitNestedList) this.emitNestedList(val)
          this.listOfItems = this.listOfItems.map(item => {
            if(this.parentItem){
              item.parentItem = this.parentItem
            }
            return this.setItemId(item)
          })
        }
        // if (this.emitCheckboxState) this.setParentState
      },
      immediate: true,
      deep: true
    },
    parentCheckboxState: {
      handler(val) {
        this.setSelectedByParent(val)
      },
      immediate: true
    },
    parentListStatus: {
      handler(val) {
        this.state = (val === 'show') ? 'open' : 'close'
        if (this.state === 'open' && !this.query && !this.listOfItems.length) {
          this.state = 'empty'
        }
      },
      immediate: true
    },
    parentItemChanged: {
      handler() {
        if (this.field) this.listOfItems =  getObjectField(this.$parent.item, this.field) || []
      },
      deep: true
    }
    // 'selectedItems': {
    //   handler(val) {
    //     this.selectNestedItem({id: this.parentIndex, field: this.field, items: val})
    //     this.$emit('nested-selection-change', this.selectNestedItem)
    //   },
    //   deep: true
    // }
  },
  async mounted() {
    if (this.query && typeof this.query === 'object') {
      this.listOfItems = await this.getItemsByRequest()
    }
    if (!this.computedList.length) return
    this.$nextTick(() => {
      this.setSelectedByParent(this.parentCheckboxState)
      this.$watch('selectedItemsList', function (val){
        console.log(val)
      })
    })
  },
  beforeDestroy() {
    this.state = 'close'
  },
  computed: {
    computedDepth() {return (this.$parent._props.depth || this.depth) + 1},
    parentCheckboxState() {
      return this.$parent?.checkboxState
    },
    parentListStatus() {
      return this.$parent?.listStatus
    },
    parentItemChanged() {
      return this.$parent?.item
    },
    computedList() {
      if (this.list && this.list.constructor === Array) {
        this.listOfItems = this.list || []
        return false
      }
      if (this.field) {
        this.listOfItems =  getObjectField(this.$parent?.item, this.field) || []
        return false
      }
      if (this.query && typeof this.query === 'object') {
        this.listOfItems = []
        return false
      }
      console.error('Передайте метод получение списка!')
      return true
    },
  },
  methods: {
    itemController(val) {
      if (val.type === 'nested') return this.getItemsByRequest()
      // if (val.type === 'multiple') return this.selectItems(val.item)
    },
    // selectItems(item) {
    //   if (this.emitCheckboxState && item && item.constructor === Object) {
    //     let allItems = this.listOfItems.length
    //   }
    // },
    selectItem(item, notEmit) {
      if (!item || item.constructor !== Object) return
      item.selected = Boolean(item.selected)
      let key = item.id
      if (this.selectedItemsList[key]) {
        this.$set(item, 'selected', false)
        delete this.selectedItemsList[key]
      } else {
        this.$set(item, 'selected', true)
        this.selectedItemsList[key] = item
      }
      if (this.emitCheckboxState && !notEmit) {
        this.setParentState(item)
      }
    },
    setItemId(item) {
      if (item.id) {
        return item
      } else {
        item.id = Object.values(item).join('')
        return item
      }
    },
    setParentState(item) {
      this.selectedItems = Object.values(this.selectedItemsList)
      let valueToEmit = {
        item,
        field: this.field,
        selectedItems: [...this.selectedItems]
      };
      let hasNoSelectedItems = !((Object.keys(this.selectedItemsList)).length)
      if (hasNoSelectedItems) return this.emitCheckboxState('unselected', valueToEmit)
      let state = (Object.keys(this.selectedItemsList).length === this.listOfItems.length) ? 'selected' : 'part-selected'
      this.emitCheckboxState(state, valueToEmit)
    },
    setSelectedByParent(val) {
      if (val === 'unselected') {
        this.listOfItems.forEach(el => {
          this.$set(el, 'selected', false)
          delete this.selectedItemsList[el.id]
        })
      }
      if (val === 'selected') {
        this.listOfItems.forEach(el => {
          this.$set(el, 'selected', true)
          this.selectedItemsList[el.id] = el
        })
      }
      this.selectedItems = Object.values(this.selectedItemsList)
    },
    async setGrid() {
      let useParentGrid = (!this.grid && typeof this.grid === "string") || (this.grid === 'parent')
      if (useParentGrid) {
        this.itemGrid = null
        return
      }
      if (this.grid) {
        this.itemGrid = this.grid
        return
      }
      let itemsInSlot = this.$slots.default.filter(el => el.tag)
      let result =  Object.keys(itemsInSlot).reduce((acc) => { return acc + '1fr '}, '')
      if (this.massiveActions) result = "29px " + result
      await this.$nextTick(() => {
        if (this.$slots['nested-listing']) {
          result = "29px " + result
        }
        this.itemGrid = result
        return;
      })
      this.itemGrid = result
    },
    async getItemsByRequest() {
      if (!this.query) return
      this.state = 'pending'
      let res = this.$xhr.send(this.query)
        .then(res => res.data.data.result)
        .catch(this.$errorHandler('Не удалось получить список!'))

      if (res && res.constructor === Array) {
        return res
      }
      this.state = 'empty'
    },
    setVisibleColumns(items) {
      // прописываем чтоб все переданные колонки были видимыми,
      // так как во вложенных колонках нет column toggle
      let noItems = !items[0] || items[0].constructor !== Object
      if (noItems) {
        // console.error('no items to NestedListing.vue', items)
        this.$emit('no-items')
        return
      }
      if (!this.$slots.default) {
        console.error('no columns to NestedListing.vue', this.$slots.default)
        return;
      }
      this.visibleColumns = this.$slots.default.reduce((acc, obj) => {
        let slotItemField = obj?.componentOptions?.propsData?.field
        if (slotItemField) {
          acc[slotItemField] = true
        }
        return acc
      }, {})
    },
    coloredRows(item) {
      const type = this.$getType(this.rowColor);
      if (type === 'Function') {
        return `background-color: ${this.rowColor(item)}`;
      }
      return '';
    },
    setHover(event) {
      if (!event.target.closest) return;
      const cell = event.target.closest('.table-cell');
      const row = event.target.closest('.table-row');
      if (!cell || !row) return;

      const { field, group } = cell.dataset;
      const { index } = row.dataset;
      const rowComponent = this.$children.find(component => {
        if (component?.$options?._componentTag !== 'TableItem') return false;
        return component?.$options?.propsData?.index === +index;
      });
      if (!rowComponent) return;
      rowComponent.hoveredCell.field = field;
      rowComponent.hoveredCell.group = group;
    },
    removeHover(event) {
      if (!event.target.closest) return;
      const row = event.target.closest('.table-row');
      if (!row) return;

      const { index } = row.dataset;
      const rowComponent = this.$children.find(component => {
        if (component?.$options?._componentTag !== 'TableItem') return false;
        return component?.$options?.propsData?.index === +index;
      });
      if (!rowComponent) return;
      rowComponent.hoveredCell.field = null;
      rowComponent.hoveredCell.group = null;
    },
    allClicksHandler(event) {
      if (
        event.target.closest('.js-ignore-clicks')
        || event.target.closest('.action-column')
      ) return;

      if (this.massiveActions) {
        const checkbox = event.target.closest('.listing-table-checkbox');
        if (checkbox) return;
      }

      const cell = event.target.closest('.table-cell');
      if (!cell) return;
      const { field } = cell.dataset;
      const row = event.target.closest('.table-row');
      const { index } = row.dataset;

      const rowComponent = this.$children
        .find(component => {
          if (component?.$options?._componentTag !== 'TableItem') return false;
          return component?.$options?.propsData?.index === +index;
        });
      if (!rowComponent) return;

      this.$emit('item-click', {
        item: rowComponent?.$options?.propsData?.item,
        field,
        event,
      });
    },
  },
}
</script>

<style lang="stylus">
.nested-table-rows-container
  position: static
  display: block

  //.table-row
  //  grid-template-columns: var()

  .preloader
    position: relative;
    max-height 100px
    max-width 1000px
    img
      height 100px

  .nested-table_empty
    height 34px
    max-width 1000px
    display flex
    justify-content center
    align-items center
    &_text
      display block
      font-size 14px

@keyframes nested-table-row-loading
  100%
    background-position: 120% 0

.nested-table-row-is-loading
  background-color: #E7E7E7
  height: 100%

  &:after
    position: absolute
    transform: translateY(-50%)
    top: 50%
    left: 0
    content: ""
    display: block
    width: 100%
    height: 100%
    background-image: linear-gradient( 100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0) 80% )
    background-size: 200px 36px
    background-position: -100px 0
    background-repeat: repeat-y
    animation: nested-table-row-loading 2s infinite
</style>