<template>
  <div
    v-if="listingIsChosen"
    :class="{
      'has-selection': massiveActions,
      'is-hidden': hideTable,
      'is-resizable': resizableColumns,
    }"
    :style="tableStyles"
    class="table-listing"
  >
    <div class="table-listing_scrollable-part">
      <ScrollComponent
        v-model="scrollPosition"
        vertical
        horizontal
        wheel-scroll-distance="60"
      />
      <TableHeader
        :class="headersClasses"
        v-show="list.length !== 0 && !hideHeaders"
        :table-name="name"
        :massive-actions="massiveActions"
        :selected="selected"
        :list="visibleList"
        :headers="headers"
        :resizable-columns="resizableColumns"
        :visible-columns="calculatedVisibleColumns"
        :orders="orders"
        @rotate-selection="rotateSelection"
        @get-list="getList"
        @set-table-styles="setTableStyles($event)"
      />
      <TableListingContent
        :table-name="name"
        :list="visibleList"
        :row-color="rowColor"
        :readonly="readonly"
        :massive-actions="massiveActions"
        :visible-columns="calculatedVisibleColumns"
        :is-loading="isLoading"
        v-on="$listeners"
      >
        <template #default="{ item }">
          <slot
            :item="item"
            name="columns"
          />
        </template>
        <template #nested-listing="{item}">
          <slot :item="item" name="nested-listing">

          </slot>
        </template>
        <template #empty-table-warning>
          <slot name="empty-table-warning" />
        </template>
      </TableListingContent>
    </div>

    <slot
      v-if="!bottomIsHidden"
      name="replace-bottom"
    >
      <TableListingBottom
        :table-name="name"
        :list="visibleList"
        :selected="selected"
        :clear-selection="clearSelection"
        :massive-actions="massiveActions"
        :allow-pagination="allowPagination"
        :allow-items-per-page="allowItemsPerPage"
        @page-change="pageChanged($event)"
        @get-list="getList"
      >
        <template #default>
          <slot
            :list="list"
            :selected="selected"
            :clear-selection="clearSelection"
            name="bottom-slot"
          />
        </template>
        <template #massive-actions>
          <slot
            :list="list"
            :selected="selected"
            :clear-selection="clearSelection"
            name="massive-actions"
          />
        </template>
      </TableListingBottom>
    </slot>
  </div>
</template>

<script>
import TableHeader from './TableHeader';
import TableListingBottom from './TableListingBottom';
import TableListingContent from './TableListingContent';
import ScrollComponent from '../../ui-kit/ScrollComponent';
import {throttle} from "indify/src/helpers/decorators";

export default {
  name: 'TableListing',
  components: {
    TableListingContent,
    TableHeader,
    TableListingBottom,
    ScrollComponent,
  },
  inject: {
    getRequest: {
      default: null,
    },
    chosenListing: {
      default: null,
    },
    listingName: {
      default: null,
    },
    usesApi: {
      default: false,
    },
    loadingProcess: {
      default: false,
    },
    getNextPage: {
      default: null,
    },
    getPreviousPage: {
      default: null,
    },
  },
  provide() {
    return {
      selectItem: (item, child) => this.selectItemController(item, child),
      clearSelection: () => this.clearSelection(),
      // selectNestedItem: item => this.selectNestedItem(item)
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      default: () => ([]),
    },
    headers: {
      type: Array,
      default: () => ([]),
    },
    massiveActions: {
      type: Boolean,
      default: false,
    },
    rowColor: {
      type: [Function, null],
      default: null,
    },
    sortMultiple: {
      type: Boolean,
      default: false,
    },
    hideEmptyTable: {
      type: Boolean,
      default: false,
    },
    hideHeaders: {
      type: Boolean,
      default: false,
    },
    hideBottom: {
      type: [Boolean, Function, null],
      default: null,
    },
    orders: {
      type: Object,
      default: () => ({}),
    },
    resizableColumns: {
      type: Boolean,
      default: false,
    },
    allowPagination: {
      type: Boolean,
      default: false,
    },
    allowItemsPerPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [],
      tableStyles: '',
      localIsLoading: false,
      visibleColumns: {},
      readonly: false,
      selectedNestedItems: {},
      blockHandler: false,
      scrollPosition: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
    };
  },
  computed: {
    headersClasses() {
      if (this.$slots['nested-listing']) return "nested"
      return ''
    },
    listingIsChosen() {
      // нужен при переключении типа листинга
      return this.chosenListing === null
        || this.chosenListing.chosen === null
        || this.chosenListing.chosen.name === this.name;
    },
    storeName() {
      if (this.name) return this.name;
      let current = this;
      const searchFunc = matched => matched.instances.default === current;
      while (current) {
        const index = this.$route.matched.findIndex(searchFunc);
        if (index !== -1) {
          return `${this.$route.matched[index].path}>tableColumns`;
        }
        current = current.$parent;
      }
      return null;
    },
    defaultVisibleColumns() {
      const result = {};
      this.headers.forEach(head => result[head.field] = true);
      return result;
    },
    calculatedVisibleColumns() {
      if (!this.visibleColumns || Object.keys(this.visibleColumns).length === 0) {
        return this.defaultVisibleColumns;
      }
      const columns = { ...this.visibleColumns };
      const action = 'special:listing-actions';
      const shouldHaveActions = this.headers
        .some(head => head.field === action);
      if (shouldHaveActions && !columns[action]) {
        columns[action] = true;
      }
      return columns;
    },
    allSelected() {
      return this.selected.length === this.visibleList.length && this.selected.length !== 0;
    },
    hideTable() {
      return this.hideEmptyTable && this.$getType(this.list) === 'Array'
        && this.list.length === 0;
    },
    visibleList() {
      return this.list;
    },
    bottomIsHidden() {
      const type = this.$getType(this.hideBottom);
      if (type === 'Boolean') return this.hideBottom;
      if (type === 'Function') return this.hideBottom(this.visibleList, this.selected);
      return this.visibleList.length === 0;
    },
    isLoading: {
      get() {
        return this.loadingProcess ? this.loadingProcess.value : this.localIsLoading;
      },
      set(value) {
        return this.loadingProcess ? this.loadingProcess.value = value : this.localIsLoading = value;
      },
    },
  },
  watch: {
    // selected() {
    //   this.$emit('selection-change', this.selected);
    // },
    headers: {
      immediate: true,
      deep: true,
      handler() {
        this.sendHeadersToColumnToggler();
      },
    },
    // eslint-disable-next-line func-names
    'scrollPosition.y': function (val, oldVal) {
      if (val === oldVal) return;
      this.checkInfinite(val);
    },
  },
  created() {
    this.checkInfinite = throttle(this.checkInfinite, 400);
    this.$eventBus.on('table-listing:get-table-headers', this.sendHeadersToColumnToggler);
    this.$eventBus.on('table-listing:set-table-columns', this.changeVisibleColumns);
    this.readonly = !this.$listeners['item-click']
  },
  beforeDestroy() {
    this.$eventBus.off('table-listing:get-table-headers', this.sendHeadersToColumnToggler);
    this.$eventBus.off('table-listing:set-table-columns', this.changeVisibleColumns);
  },
  methods: {
    async checkInfinite(y) {
      if (
        this.blockHandler
        || this.$getType(this.getNextPage).match('Function') === null
        || this.$getType(this.getPreviousPage).match('Function') === null
      ) return;
      const { yScrollDistance } = this.scrollPosition;
      if (y > yScrollDistance * 0.9) {
        this.blockHandler = true;
        await this.getNextPage();
      }
      this.blockHandler = false;
    },
    // Обертка, чтобы не писать проверку существования попровайженной функции
    // при каждом вызове.
    async getList() {
      if (this.$getType(this.getRequest).match('Function') !== null) {
        await this.getRequest();
      }
    },
    setTableStyles(event) {
      if (this.$getType(event) !== 'String') return;
      this.tableStyles = event;
    },
    sendHeadersToColumnToggler() {
      this.$eventBus.emit('column-toggler:take-headers', {
        tableName: this.name,
        listingName: this.listingName,
        headers: this.headers,
      });
    },
    changeVisibleColumns({ tableName, listingName, columns }) {
      if (tableName && tableName !== this.name) return;
      if (!listingName || listingName !== this.listingName) return;
      const result = {};
      Object.keys(columns).forEach(field => {
        result[field] = columns[field];
      });
      this.visibleColumns = result;
    },
    selectItemController(item, childPayload) {
      if (!item && item.id === undefined && item.name === undefined) return;
      const field = item.id !== undefined ? 'id' : 'name';

      let index = false;
      for (let i = 0; i < this.selected.length; i++) {
        if (this.selected[i][field] === item[field]) {
          index = i;
          break;
        }
      }
      if (!childPayload) {
        if (index === false) {
          this.selected.push(item);
          this.$set(item, 'selected', true);
        } else {
          this.selected.splice(index, 1);
          this.$set(item, 'selected', false);
        }
        this.$emit('selection-change', this.selected);
        return;
      }

      this.selectedNestedItems[item.id] = childPayload.childValue.selectedItems

      if (index === false && childPayload.state === 'selected') {
        this.selected.push(item);
        this.$set(item, 'selected', true);
      }
      if (index !== false && childPayload.state === 'selected') {
        this.selected.splice(index, 1);
        this.$set(item, 'selected', true);
        this.selected.push(item);
      }
      if (index !== false && childPayload.state === 'part-selected') {
        this.selected.splice(index, 1);
        let i = this.setChild(item, childPayload.childValue.selectedItems, childPayload.childValue.field)
        this.selected.push(i)
      }
      if (index === false && childPayload.state === 'part-selected') {
        let i = this.setChild(item, childPayload.childValue.selectedItems, childPayload.childValue.field)
        this.selected.push(i)
      }
      if (index !== false && childPayload.state === 'unselected') {
        this.selected.splice(index, 1);
        this.$set(item, 'selected', false)
        this.selectedNestedItems = {};
      }
      this.$emit('selection-change', this.selected);
      this.$emit('nested-selection-change', this.selectedNestedItems);
    },
    setChild(item, childs, field) {
      let i = {...item};
      let key = field || 'selectedItems';
      if (!childs || !childs.length) {
        i[key] = []
      } else {
        i[key] = [...childs]
      }
      return i
    },
    // selectNestedItem(item) {
    //   if (!item || !item.id) return
    //   this.selected.map(el => {
    //     if (Number(el.id) !== Number(item.id)) return el
    //     if (item.field) {
    //       el[item.field] = item.items
    //     } else {
    //       el.selectedItems = item.items
    //     }
    //     return el
    //   })
    //   if (!item.items || !item.items.length) {
    //     delete this.selectedNestedItems[item.id]
    //     this.$emit('nested-selection-change', this.selectedNestedItems);
    //     this.$emit('selection-change', this.selected);
    //     return;
    //   }
    //   this.selectedNestedItems[item.id] = item.items
    //   this.$emit('selection-change', this.selected);
    //   this.$emit('nested-selection-change', this.selectedNestedItems);
    // },
    rotateSelection() {
      let toSet = true;
      if (this.allSelected) {
        toSet = false;
      }
      this.selected = [];
      this.visibleList.forEach(item => {
        this.$set(item, 'selected', toSet);
        if (toSet) {
          this.selected.push(item);
        }
      });
      this.$emit('selection-change', this.selected);
    },
    pageChanged(event) {
      this.$emit('page-change', event);
    },
    clearSelection() {
      // eslint-disable-next-line no-return-assign
      this.selected.forEach(el => el.selected = false);
      this.selected.splice(0, this.selected.length);
    },
  },
};
</script>

<style lang="stylus">
.table-listing
  flex-grow: 2
  //position: relative
  display: flex
  flex-flow: column nowrap
  padding: 0
  height: 100%
  margin: 4px 0 0 4px
  background #F3F5F8
  overflow: hidden
  border-left: 1px solid #D3D4DB
  border-top: 1px solid #D3D4DB
  &_scrollable-part
    position: relative
    overflow: hidden
    height: 100%
  &.is-hidden
    display: none

.listing-icon-button
  display: inline-flex
  justify-content: center
  align-items: center
  width: 28px
  height: 28px
  border: none
  border-radius: 50%
  outline: none
  box-shadow: none
  background: #ffffff
  text-decoration: none
  .v-icon
    color: #888A91
  &:hover
    .v-icon
      color: #416fc8
  &.more_horiz
    background: black
    .v-icon
      color: white
    &:hover
      .v-icon
        color: white
</style>
