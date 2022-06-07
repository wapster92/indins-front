<template>
  <div
    :data-scroll="randomDataScrollNumber"
    class="table-rows-container"
    @click="allClicksHandler($event)"
    @mouseover="setHover($event)"
    @mouseout="removeHover($event)"
  >
    <!--    <ScrollComponent-->
    <!--      v-model="scrollPosition"-->
    <!--      vertical-->
    <!--      horizontal-->
    <!--      wheel-scroll-distance="60"-->
    <!--    />-->
    <div class="table-rows-wrapper">
      <div
        v-if="false"
        class="table-row-is-loading"
      />
      <TableItem
        :readonly="readonly"
        v-for="(item, index) in list"
        :key="'row-' + index"
        :bg-color="coloredRows(item)"
        :item="item"
        :index="index"
        :multiple="massiveActions"
        :visible-columns="visibleColumns"
        @nested-click="openNestedList($event)"
      >
        <slot :item="item" />
        <template #nested-listing>
          <slot :item="item" name="nested-listing">

          </slot>
        </template>
      </TableItem>
    </div>
    <slot
      v-if="showWarning"
      name="empty-table-warning"
    >
      <p class="listing-warning">
        По данному запросу подходящих результатов не найдено<br>
        Измените параметры поиска или сбросьте фильтры
      </p>
    </slot>
  </div>
</template>

<script>
import { throttle } from '../../../helpers/decorators';
import TableItem from './TableItem';
import ScrollComponent from '../../ui-kit/ScrollComponent';

export default {
  name: 'TableListingContent',
  components: {
    TableItem,
    ScrollComponent,
  },
  inject: {
    chosenListing: {
      default: null,
    },
    registerScrollResetter: {
      default: null,
    },
    unregisterScrollResetter: {
      default: null,
    },
    // getNextPage: {
    //   default: null,
    // },
    // getPreviousPage: {
    //   default: null,
    // },
  },
  props: {
    tableName: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      defalut: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
    rowColor: {
      type: [Function, null],
      default: null,
    },
    visibleColumns: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    massiveActions: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      blockHandler: false,
      randomDataScrollNumber: Math.random(),
      // scrollPosition: {
      //   x: 0,
      //   y: 0,
      //   xScrollDistance: 0,
      //   yScrollDistance: 0,
      // },
      nestedState: 'close'
    };
  },
  computed: {
    listingIsChosen() {
      return this.chosenListing === null
        || this.chosenListing.chosen === null
        || this.chosenListing.chosen.name === this.name;
    },
    showWarning() {
      return this.list.length === 0 && !this.isLoading;
    },
  },
  watch: {
    // listingIsChosen() {
    //   this.resetScroll();
    // },
    // eslint-disable-next-line func-names
    // 'scrollPosition.y': function (val, oldVal) {
    //   if (val === oldVal) return;
    //   this.checkInfinite(val);
    // },
    // eslint-disable-next-line func-names
    'scrollPosition.x': function (val, oldVal) {
      if (val === oldVal) return;
      this.$eventBus.emit('table-listing:scroll-header', { x: val, tableName: this.tableName});
    },
  },
  // created() {
    // this.checkInfinite = throttle(this.checkInfinite, 400);
    // if (this.registerScrollResetter) {
    //   this.registerScrollResetter(this.name, () => this.resetScroll());
    // }
  // },
  // mounted() {
  //   this.$eventBus.on('table-listing:reset-scroll', this.tryResettingScroll);
  // },
  beforeDestroy() {
    if (this.unregisterScrollResetter) {
      this.unregisterScrollResetter(this.name);
    }
    // this.$eventBus.off('table-listing:reset-scroll', this.tryResettingScroll);
  },
  methods: {
    openNestedList() {
      this.nestedState = 'open'
    },
    // resetScroll() {
    //   this.scrollPosition.x = 0;
    //   this.scrollPosition.y = 0;
    //   this.randomDataScrollNumber = Math.random();
    // },
    // tryResettingScroll(tableName) {
    //   if (tableName !== this.tableName) return;
    //   this.resetScroll();
    // },
    coloredRows(item) {
      const type = this.$getType(this.rowColor);
      if (type === 'Function') {
        return `background-color: ${this.rowColor(item)}`;
      }
      return '';
    },
    // async checkInfinite(y) {
    //   if (
    //     this.blockHandler
    //     || this.$getType(this.getNextPage).match('Function') === null
    //     || this.$getType(this.getPreviousPage).match('Function') === null
    //   ) return;
    //   const { yScrollDistance } = this.scrollPosition;
    //   if (y > yScrollDistance * 0.9) {
    //     this.blockHandler = true;
    //     this.$emit('bottom-reached');
    //     await this.getNextPage();
    //   } else if (y < yScrollDistance * 0.1 && this.apiPagination?.infinite) {
    //     this.blockHandler = true;
    //     this.$emit('top-reached');
    //     await this.getPreviousPage();
    //   }
    //   this.blockHandler = false;
    // },
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
.table-rows-container
  //position: relative
  //flex-grow: 2
  display: flex

.table-rows-wrapper
  position: relative
  flex-grow: 2
  //display: flex
  flex-flow: row wrap
  align-content: flex-start
  height: inherit

.listing-warning
  width: 100%
  margin-top: 16px
  font-size: 13px
  text-align: center

  span
    display: inline-block
    margin-top: 15px
    color: #416FC8
    cursor: pointer

@keyframes table-row-loading
  100%
    background-position: 120% 0

.table-row-is-loading
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
    animation: table-row-loading 2s infinite
</style>