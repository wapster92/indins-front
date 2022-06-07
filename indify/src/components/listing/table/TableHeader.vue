<template>
  <div class="header-row_wrapper">
    <div
      :class="{
      'has-massive-actions': massiveActions,
      'is-resizable': resizableColumns,
    }"
      class="table-row is-header"
    >
      <div v-if="hasNested"></div>
      <IMultipleCheckbox
        v-if="massiveActions"
        :state="checkboxState"
        @click="changeCheckbox"
      />
      <div
        v-for="item in visibleHeaders"
        :key="'header-' + item.name"
        class="table-cell"
      >
        <button
          v-if="!item.noSort"
          class="table-column-title"
          @click="changeSort(item)"
        >
          {{ item.name }}
          <v-icon
            v-if="item.sort === 'DESC'"
            size="20"
            color="#000000"
          >
            arrow_drop_down
          </v-icon>
          <v-icon
            v-else-if="item.sort === 'ASC'"
            size="20"
            color="#000000"
          >
            arrow_drop_up
          </v-icon>
          <v-icon
            v-else
            size="20"
            color="#dadada"
          >
            arrow_drop_up
          </v-icon>
        </button>
        <div
          v-if="item.noSort"
          class="table-column-title just-text"
        >
          {{ item.name }}
        </div>
        <button
          v-if="resizableColumns"
          :style="getResizeHandleStyles(item)"
          :class="{ 'is-active': currentItem && item.field === currentItem.field }"
          class="resize-handle"
          @mousedown="setCurrentItem(item, $event)"
        />
      </div>
    </div>
  </div>

</template>

<script>
import IMultipleCheckbox from "../../ui-kit/IMultipleCheckbox";

export default {
  name: 'TableHeader',
  inject: {
    setOrders: {
      default: null,
    },
  },
  components: {
    IMultipleCheckbox
  },
  props: {
    tableName: {
      type: String,
      default: '',
    },
    massiveActions: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    orders: {
      type: Object,
      default: () => ({}),
    },
    resizableColumns: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    visibleColumns: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentItem: null,
      mouseX: 0,
      difference: 0,
      currentHandlePosition: {
        x: 0,
        y: 0,
      },
      sortMap: ['ASC', 'DESC', false],
      columnSizes: null,
      modifiedHeaders: [],
    };
  },
  computed: {
    checkboxState() {
      if (this.selected.length === this.list.length && this.selected.length !== 0) return 'selected'
      if (this.selected.length !== 0) return 'part-selected'
      return 'unselected'
    },
    hasNested() {
      return Boolean(this.$parent.$scopedSlots['nested-listing'])
    },
    visibleHeaders() {
      return this.modifiedHeaders
        .filter(head => this.visibleColumns[head.field]);
    },
    gridTemplateColumns() {
      // В рамках задачи #391 this.modifiedHeaders поменял на this.visibleHeaders
      let result = this.visibleHeaders.reduce((acc, header) => {
        const {
          field, grow, space, minSpace,
        } = header;
        const value = field.match('special:listing-actions') !== null
                          || grow === false
                          || this.resizableColumns
                          ? `${space > minSpace ? space : minSpace}px`
                          : `minmax(${space}px, 1fr)`;
        return `${acc} ${value}`;
      }, '');
      if (this.massiveActions) result = '29px ' + result
      if (this.hasNested) result = '29px ' + result
      return result
    },
  },
  watch: {
    resizableColumns: {
      immediate: true,
      handler(value) {
        if (!value) {
          this.modifyHeaders(this.orders || {});
          return;
        }
        this.loadColumnSizes();
      },
    },
    columnSizes: {
      deep: true,
      handler(value) {
        this.modifiedHeaders.forEach(head => {
          if (!value || !value[head.field]) return;
          head.space = `${value[head.field] || head.space}px`;
          head.grow = false;
        });
      },
    },
    gridTemplateColumns: {
      immediate: true,
      handler(value) {
        this.$emit('set-table-styles', `--grid-template-columns: ${value}`);
      },
    },
    orders: {
      immediate: true,
      handler(value) {
        this.modifyHeaders(value || {});
      },
    },
  },
  mounted() {
    this.$eventBus.on('table-listing:scroll-header', this.scrollHeader);
    this.loadColumnSizes();
  },
  methods: {
    modifyHeaders(orders) {
      this.modifiedHeaders = [];
      this.headers.forEach(head => {
        const newHead = {
          name: head.name || '',
          field: head.field,
          space: head.space || 200,
          minSpace: head.minSpace || 200,
          grow: head.grow !== undefined ? head.grow : true,
          noSort: head.noSort !== undefined ? head.noSort : false,
          hidden: false,
          sort: orders[head.field] || false,
          sortField: head.sortField || head.field,
        };
        if (newHead.field.match('special:')) newHead.noSort = true;
        this.modifiedHeaders.push(newHead);
        this.setOrders(newHead.sortField, newHead.sort);
      });
    },
    changeCheckbox() {
      this.$emit('rotate-selection');
    },
    changeSort(item) {
      item.sort = this.getNextDirection(item.sort);
      const { field, sortField, sort } = item;

      this.setOrder(sortField, sort);
      if (this.sortMultiple) {
        this.getList();
        return;
      }
      this.modifiedHeaders.forEach(head => {
        if (head.field === field) return;
        head.sort = false;

        this.setOrder(head.sortField, false);
      });
      this.apiPagination?.resetPagination();
      this.getList();
    },
    getList() {
      this.$emit('get-list');
    },
    // Обертка, чтобы не писать проверку существования попровайженной функции
    // при каждом вызове.
    setOrder(...args) {
      if (this.$getType(this.setOrders).match('Function') === null) return;
      this.setOrders(...args);
    },
    getResizeHandleStyles(item) {
      if (!this.currentItem || this.currentItem.field !== item.field) return '';
      return {
        left: `${this.currentHandlePosition.x}px`,
        top: `${this.currentHandlePosition.y}px`,
      };
    },
    getNextDirection(direction) {
      const index = this.sortMap
        .findIndex(sort => sort === direction) + 1;
      return index >= this.sortMap.length
        ? this.sortMap[0]
        : this.sortMap[index];
    },
    setCurrentItem(item, event) {
      this.currentItem = item;
      this.mouseX = event.pageX;
      this.currentHandlePosition.y = event.target.getBoundingClientRect().top;
      event.preventDefault();
      document.addEventListener('mousemove', this.dragging);
      document.addEventListener('mouseup', this.resetDrag);
    },
    dragging(event) {
      if (!this.currentItem) return;
      this.difference += Math.floor(event.pageX) - Math.floor(this.mouseX);
      this.currentHandlePosition.x = event.pageX;
      this.mouseX = Math.floor(event.pageX);
    },
    resetDrag() {
      this.setColumnSizes({
        field: this.currentItem.field,
        difference: this.difference,
      });
      this.currentItem = null;
      this.mouseX = 0;
      this.difference = 0;
      this.currentHandlePosition.x = 0;
      this.currentHandlePosition.y = 0;
      document.removeEventListener('mousemove', this.dragging);
      document.removeEventListener('mouseup', this.resetDrag);
    },
    loadColumnSizes() {
      if (!this.resizableColumns || !process.client) return;
      let columnSizes = localStorage.getItem(`${this.tableName}-column-sizes`);
      if (!columnSizes) return;
      columnSizes = JSON.parse(columnSizes);
      this.modifiedHeaders.forEach(head => {
        if (columnSizes[head.field]) head.space = columnSizes[head.field];
      });
    },
    setColumnSizes({ field, difference }) {
      if (!this.tableName) return;
      const head = this.modifiedHeaders
        .find(elem => elem.field === field);
      let headSpace = head.space + difference;
      if (headSpace < head.minSpace) headSpace = head.minSpace;
      this.$set(head, 'space', headSpace);

      const sizes = this.modifiedHeaders.reduce((acc, item) => {
        acc[item.field] = item.space;
        return acc;
      }, {});
      localStorage.setItem(`${this.tableName}-column-sizes`, JSON.stringify(sizes));
      this.$eventBus.emit('table-listing:reset-scroll', this.tableName);
    },
    scrollHeader({ x, tableName }) {
      if (tableName !== this.tableName) return;
      this.$el.scrollTo({
        top: 0,
        left: x,
      });
    },
  },
};
</script>

<style lang="stylus">
.header-row_wrapper
  display: grid
  //display: flex;


.table-row
  &.is-header
    //min-width 100%
    //position: static
    //grid-template-columns: var(--grid-template-columns)
    //overflow: hidden
    //&.has-massive-actions
    //  grid-template-columns: 22px var(--grid-template-columns)
    &.is-resizable
      .table-cell
        overflow: visible

    .table-cell
      display: flex
      flex-flow: row nowrap
      align-items: center
      /*justify-content: center*/
      position: relative
      height: 36px
      white-space: nowrap
      font-size: 13px
      font-weight: 600

.resize-handle
  position: absolute
  top: 0
  right: -8px
  z-index: 2
  display: flex
  flex-flow: row nowrap
  justify-content: center
  width: 15px
  height: 34px
  opacity: 0
  &:hover
    opacity: 1
    cursor: col-resize
  &::before
    content: ''
    display: block
    width: 1px
    height: 100%
    background: #dadada
  &.is-active
    position: fixed
    z-index: 2
    opacity: 1
    &::before
      height: 100vh
      background: #000000

.table-column-title
  border: none
  background: none
  outline: none
  box-shadow: none
  cursor: pointer
  &.just-text
    cursor: default
  &:hover
    .v-icon
      color: var(--info-color)!important

//.checkbox-button
  //margin-right: 14px
  //position: absolute
  //left: 16px
  //z-index: 2
  //display: inline-flex
  //flex-flow: row nowrap
  //justify-content: center
  //align-items: center
  //width: 14px
  //height: 14px
  //border: 1px solid #416FC8
  //border-radius: 2px
  //background: #416FC8
  //outline: none
  //box-shadow: none
  //&.unselected
  //  border-color: #a6a7ac
  //&:hover
  //  border-color: #416FC8
</style>
