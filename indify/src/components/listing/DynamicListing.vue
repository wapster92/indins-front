<template>
  <div class="listing-wrapper">
    <div class="listing-top-wrapper">
      <slot
        :filter-change="filterChange"
        :listing-name="listingName"
        :view-list="viewTypes"
        :chosen-listing="chosenListing"
        name="listing-top"
      >
        <div
          v-if="!topIsHidden"
          :class="listingTopClass"
          class="listing-top"
        >
          <ListingViewSwitch
            v-if="viewTypes.length > 1"
            v-model="chosenListing.chosen"
            :view-list="viewTypes"
            :default-view="defaultView"
            @input="$emit('view-switch-change', $event)"
          />
          <div class="listing-filters-wrapper">
            <slot
              :filter-change="filterChange"
              name="filter-component"
            >
              <DynamicFilters
                :multiple-search-field="multipleSearch"
                :persistent-filters="persistentFilters"
                :name="listingName"
                ref="listingFilter"
                @filter-change="filterChange($event)"
              >
                <slot
                  :filter-change="filterChange"
                  name="filters"
                />
              </DynamicFilters>
            </slot>
          </div>
          <GetSlotComponents bus-event-name="set-listing-actions">
            <slot
              name="actions"
              :listing-name="listingName"
              :chosen-listing="chosenListing"
              :current-view="currentView"
            />
          </GetSlotComponents>
          <SetSlotComponents
            v-show="showActions"
          />
        </div>
      </slot>
    </div>

    <div class="listing-main">
      <slot
        :list="visibleList"
        :change-pagination="changePagination"
        :chosen-listing="chosenListing"
      />
    </div>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import { debounce, throttle } from '../../helpers/decorators';
import { getType, makeHash } from '../../helpers';
import StringSearch from './StringSearch';
import ListingViewSwitch from './ListingViewSwitch';
import GetSlotComponents from './listActions/GetSlotComponents';
import SetSlotComponents from './listActions/SetSlotComponents';

const defaultItemsPerPage = 100;

export default {
  name: 'DynamicListing',
  components: {
    StringSearch,
    ListingViewSwitch,
    GetSlotComponents,
    SetSlotComponents,
  },
  provide() {
    return {
      listingName: this.listingName,
      chosenListing: this.chosenListing,
      apiPagination: {
        info: this.apiPagination,
        resetPagination: () => this.resetPagination(),
        nextInfinitePage: () => this.nextInfinitePage(),
        previousInfinitePage: () => this.previousInfinitePage(),
        nextPage: () => this.nextPage(),
        previousPage: () => this.previousPage(),
        toggleInfinitePagination: value => this.toggleInfinitePagination(value),
        pageWereRequested: page => this.pageWereRequested(page),
        addRequestedPage: page => this.addRequestedPage(page),
        clearRequestedPages: (...args) => this.clearRequestedPages(...args),
        setTotalItems: count => this.setTotalItems(count),
        setTotalPages: count => this.setTotalPages(count),
        setItemsPerPage: count => this.setItemsPerPage(count),
      },
      usesApi: !!this.query,
      loadingProcess: this.loadingProcess,
      getRequest: customRequest => this.getRequest(customRequest),
      getNextPage: () => this.getNextPage(),
      getPreviousPage: () => this.getPreviousPage(),
      setOrders: (field, direction, makeRequest) => this.setOrders(field, direction, makeRequest),
      localOrders: this.localOrders,
      registerScrollResetter: (name, func) => this.$set(this.scrollResetters, name, func),
      unregisterScrollResetter: name => this.$delete(this.scrollResetters, name),
    };
  },
  props: {
    list: {
      type: Array,
      default: () => ([]),
    },
    query: {
      type: [Object, String, null],
      default: null,
    },
    subscribe: {
      type: [String, Array, null],
      default: null,
    },
    multipleSearch: {
      type: [Boolean, Array, String],
      default: false,
    },
    filterType: {
      type: String,
      default: 'multiple',
    },
    name: {
      type: [String, null],
      default: null,
    },
    viewTypes: {
      type: Array,
      default: () => [],
    },
    defaultView: {
      type: String,
      default: '',
    },
    orders: {
      type: Object,
      default: () => ({}),
    },
    defaultOrders: {
      type: Object,
      default: () => ({}),
    },
    skipFirstRequest: {
      type: Boolean,
      default: false,
    },
    allowDeleted: {
      type: Boolean,
      default: false,
    },
    hideTop: {
      type: [Boolean, Function],
      default: false,
    },
    persistentFilters: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      watingFilters: 0,
      chosenListing: { chosen: null },
      localList: [],
      currentFilters: {},
      mandatoryFilters: [],
      apiPagination: {
        currentPage: 1,
        totalPages: 1,
        requestedPages: [],
        infinite: false,
        infiniteFirst: 1,
        infiniteLast: 1,
        totalItems: 0,
        itemsPerPage: defaultItemsPerPage,
      },
      subscribeEntity: [],
      showActions: false,
      showFilters: false,
      localOrders: {},
      scrollResetters: {},
      listingName: null,
      loadingProcess: { value: false },
    };
  },
  computed: {
    visibleList() {
      return this.localList && this.localList.length !== 0 ? this.localList : this.list;
    },
    listingTopClass() {
      const result = ['no-search'];
      // no-views
      if (this.viewTypes.length <= 1) result.push('no-views');
      // no-search
      // if (!this.multipleSearch || this.$vuetify.breakpoint.smAndDown) result.push('no-search');
      // no-filters
      if (!this.multipleSearch && !this.showFilters) result.push('no-filters');
      // no-actions
      if (!this.showActions) result.push('no-actions');
      // no-views no-search
      // no-views no-filters
      // no-views no-actions
      // no-search no-filters
      // no-search no-actions
      // no-filters no-actions
      if (result.length < 3) return result.reduce((acc, cls) => `${acc + cls} `, '').slice(0, -1);
      // only-view
      if (!result.includes('no-views')) return 'only-view';
      // only-search
      if (!result.includes('no-search')) return 'only-search';
      // only-filters
      if (!result.includes('no-filters')) return 'only-filters';
      // only-actions
      if (!result.includes('no-actions')) return 'only-actions';
      return 'shrink-top';
    },
    currentView() {
      return this.chosenListing?.chosen?.name;
    },
    topIsHidden() {
      const type = this.$getType(this.hideTop);
      if (type === 'Boolean') return this.hideTop;
      if (type === 'Function') return this.hideTop(this.localList);
      return false;
    },
    isLoading: {
      get() {
        return this.loadingProcess.value;
      },
      set(value) {
        this.loadingProcess.value = value;
      },
    },
  },
  watch: {
    itemsPerPage() {
      this.filterWatchers();
    },
    name: {
      immediate: true,
      handler(value) {
        this.listingName = value || makeHash(10);
      },
    },
  },
  created() {
    this.filterWatchers = debounce(this.filterWatchers, 700);
    this.checkInfinite = throttle(this.checkInfinite, 400);
    if (this.query) this.startLoadingAnimation();
  },
  async mounted() {
    this.hideFiltersBlockIfEmpty();
    this.hideActionsBlockIfEmpty();
    await this.makeFirstRequest();
    this.subscribeToEntities();
  },
  methods: {
    startLoadingAnimation() {
      this.isLoading = true;
      this.$nextTick(() => this.$nuxt.$loading?.start());
    },
    stopLoadingAnimation() {
      this.isLoading = false;
      this.$nextTick(() => this.$nuxt.$loading?.finish());
    },
    hideFiltersBlockIfEmpty() {
      this.showFilters = this.$getType(this.$scopedSlots.filters) === 'Function'
        && this.$getType(this.$scopedSlots.filters()) === 'Array'
        && this.$scopedSlots.filters().length !== 0;
    },
    hideActionsBlockIfEmpty() {
      this.showActions = this.$getType(this.$scopedSlots.actions) === 'Function'
        && this.$getType(this.$scopedSlots.actions()) === 'Array'
        && this.$scopedSlots.actions().length !== 0;
    },
    subscribeToEntities() {
      if (this.$getType(this.$subscribe).match('Function')) {
        this.$subscribe(() => this.subscribeEntity, () => this.getRequest());
      }
    },
    filterWatchers() {
      this.resetPagination();
      this.resetRegisteredScrolls();
      this.getRequest();
    },
    resetRegisteredScrolls() {
      Object.keys(this.scrollResetters)
        .forEach(resetter => this.scrollResetters[resetter]());
    },
    itemClick(item) {
      this.$emit('item-click', item);
    },
    filterChange(filters) {
      if (!this.filtersDidChange(filters)) return;
      this.$emit('filter-change', filters);
      this.currentFilters = filters;
      this.filterWatchers();
    },
    filtersDidChange(filters) {
      const found = Object.keys(filters).some(key => {
        const incoming = filters[key];
        const current = this.currentFilters[key];
        return !current || incoming.value !== current.value;
      });

      return found || Object.keys(this.currentFilters).some(key => !filters[key]);
    },
    setOrders(field, direction, makeRequest) {
      if (!field || direction === undefined) return;
      this.$set(this.localOrders, field, direction);
      if (makeRequest) this.getRequest();
    },
    getMandatoryFilters(request) {
      return request._filter.filter(filter => filter.mandatory) || [];
    },
    getCurrentFilters(filters) {
      if (this.$getType(this.currentFilters) !== 'Object') return [];

      const result = [];
      if (this.$getType(this.query) === 'String' && !this.allowDeleted) {
        result.push(new Filter('deletedAt', 'exists', false));
      }
      Object.keys(this.currentFilters).forEach(key => {
        const currentFilter = this.currentFilters[key];
        if (currentFilter === undefined || currentFilter.value === undefined) {
          return;
        }

        const {field, filter} = currentFilter;
        const overlapedFilterIndex = filters
          .findIndex(item => item.field === field && item.filter === filter);

        if (overlapedFilterIndex === -1) {
          result.push(currentFilter);
          return;
        }

        currentFilter.mandatory = true;
        filters.splice(overlapedFilterIndex, 1);
        result.push(currentFilter);
      });

      return result;
    },
    getFilters(request) {
      const mandatoryFilters = this.getMandatoryFilters(request);
      return [
        ...mandatoryFilters,
        ...this.getCurrentFilters(mandatoryFilters),
      ]
    },
    getOrders() {
      let hashMap = {};
      let ordersKeys = Object.keys(this.orders);
      const localOrdersKeys = Object.keys(this.localOrders);
      let addOrderForClick = Object.keys(this.localOrders).some(n => !!this.localOrders[n]);
      if (addOrderForClick) ordersKeys = [];
      let i = 0;
      let j = 0;
      while (i < ordersKeys.length && j < localOrdersKeys.length) {
        const value = this.orders[ordersKeys[i]];
        const localValue = this.localOrders[localOrdersKeys[j]];
        if (value) hashMap[ordersKeys[i]] = value;
        if (localValue) hashMap[localOrdersKeys[j]] = localValue;
        i++;
        j++;
      }
      while (i < ordersKeys.length) {
        const value = this.orders[ordersKeys[i]];
        if (value) hashMap[ordersKeys[i]] = this.orders[ordersKeys[i]];
        i++;
      }
      while (j < localOrdersKeys.length) {
        const localValue = this.localOrders[localOrdersKeys[j]];
        if (localValue) hashMap[localOrdersKeys[j]] = localValue;
        j++;
      }

      if(Object.keys(this.defaultOrders).length) {
        Object.keys(this.defaultOrders).forEach(n => {
          hashMap = {...this.defaultOrders, ...hashMap}
        })
      }

      return Object.keys(hashMap).map(field => ({
        direction: hashMap[field],
        field,
      }));
    },
    changePagination(info) {
      if (this.$getType(info) !== 'Object') return;
      Object.keys(info).forEach(key => {
        if (this.apiPagination[key] === undefined) return;
        this.apiPagination[key] = info[key];
      });
      this.getRequest();
    },
    async getRequest(customRequest, dontAssign) {
      let request = customRequest || this.query;
      const type = this.$getType(request);
      if (!this.$xhr || (type !== 'Object' && type !== 'String')) return;

      request = type === 'Object' ? request : new Get(request);
      this.startLoadingAnimation();

      if (!customRequest) {
        const {currentPage, itemsPerPage} = this.apiPagination;
        request
          .setFilter(this.getFilters(request))
          .setOrder(this.getOrders())
          .pagination(true)
          .count(true)
          .subscribe(true)
          .limitStart((currentPage - 1) * itemsPerPage)
          .limitShown(itemsPerPage);
      }

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler());
      this.stopLoadingAnimation();

      if (!response) return false;

      const { data } = response.data;

      if (!dontAssign) this.localList = data.result;

      if (!customRequest) {
        this.setTotalPages(+data.pagination.all);
        this.setTotalItems(+data.pagination.count);
        if (data.entity !== undefined && this.subscribe === null) {
          this.subscribeEntity = data.entity;
        } else {
          this.subscribeEntity = Array.isArray(this.subscribe)
            ? this.subscribe
            : [this.subscribe];
        }
        this.addRequestedPage(this.apiPagination.currentPage);
      }

      return data.result;
    },
    async getNextPage() {
      if (!this.nextInfinitePage()) return;
      if (this.pageWereRequested(this.apiPagination.currentPage)) return;
      const result = await this.getRequest(null, true);
      if (Array.isArray(result)) {
        result.forEach(item => this.localList.push(item));
      }
      await this.$nextTick();
    },
    async getPreviousPage() {
      if (!this.previousInfinitePage()) return;
      if (this.pageWereRequested(this.apiPagination.currentPage)) return;
      const result = await this.getRequest(null, true);
      if (Array.isArray(result)) {
        this.localList = this.localList.splice(0, 0, ...result);
      }
    },
    makeFirstRequest() {
      if (this.skipFirstRequest) return;
      if (!this.$scopedSlots.filters) return this.getRequest();
      const filters = this.$scopedSlots.filters();
      if (!Array.isArray(filters) || filters.length === 0) {
        return this.getRequest();
      }

      let count = 0;
      filters.forEach(filter => {
        if (!filter.componentOptions?.tag?.match('Filter')) return;
        if (filter.componentOptions.propsData.active === undefined) return;
        count++;
      });
      if (count === 0) return this.getRequest();
    },
    // Pagination methods.
    resetPagination() {
      this.apiPagination.currentPage = 1;
      this.apiPagination.totalPages = 1;
      this.apiPagination.infinite = false;
      this.apiPagination.infiniteFirst = 1;
      this.apiPagination.infiniteLast = 1;
      this.apiPagination.totalItems = 0;
      this.apiPagination.itemsPerPage = defaultItemsPerPage;
      this.clearRequestedPages();
    },
    nextInfinitePage() {
      const value = this.apiPagination.infiniteLast + 1;
      if (value > this.apiPagination.totalPages) return false;
      this.toggleInfinitePagination(true);
      this.apiPagination.infiniteLast = value;
      this.apiPagination.currentPage = value;
      return true;
    },
    previousInfinitePage() {
      const value = this.apiPagination.infiniteFirst - 1;
      if (value <= 0) return false;
      this.toggleInfinitePagination(true);
      this.apiPagination.infiniteFirst = value;
      this.apiPagination.currentPage = value;
      return true;
    },
    nextPage() {
      const next = this.apiPagination.currentPage + 1;
      if (next > this.apiPagination.totalPages) return false;
      this.apiPagination.currentPage = next;
      return true;
    },
    previousPage() {
      const previous = this.apiPagination.currentPage - 1;
      if (previous <= 0) return false;
      this.apiPagination.currentPage = previous;
      return true;
    },
    toggleInfinitePagination(value) {
      this.apiPagination.infinite = value === undefined
        ? !this.apiPagination.infinite
        : value;
      if (!this.apiPagination.infinite) {
        this.apiPagination.infiniteFirst = this.apiPagination.currentPage;
        this.apiPagination.infiniteLast = this.apiPagination.currentPage;
      }
    },
    pageWereRequested(page) {
      return this.apiPagination.requestedPages.includes(page);
    },
    addRequestedPage(page) {
      if (getType(page) !== 'Number') {
        console.warn('В список запрошенных страниц нельзя добавить не число!');
        return false;
      }
      const value = Math.floor(page);
      if (value <= 0) {
        console.warn('Номер страницы должен быть больше 0!');
        return false;
      }
      if (this.apiPagination.requestedPages.includes(value)) return false;
      this.apiPagination.requestedPages.push(value);
      return true;
    },
    clearRequestedPages(...saved) {
      this.apiPagination.requestedPages
        .splice(0, this.apiPagination.requestedPages.length, ...saved);
    },
    setTotalItems(count) {
      if (getType(count) !== 'Number') {
        return console.warn('Кол-во элементов в списке должно быть числом!');
      }
      const value = Math.floor(count);
      if (value < 0) {
        return console.warn('Кол-во элементов в списке не может быть отрицательным!');
      }
      this.apiPagination.totalItems = value;
    },
    setTotalPages(count) {
      if (getType(count) !== 'Number') {
        return console.warn('Кол-во страниц в пагинации должно быть числом!');
      }
      const exactCount = Math.floor(count);
      if (exactCount < 0) {
        return console.warn('Кол-во страниц в пагинации не может быть отрицательным!');
      }
      this.apiPagination.totalPages = exactCount;
    },
    setItemsPerPage(count) {
      if (getType(count) !== 'Number') {
        return console.warn('Кол-во элементов на странице должно быть числом!');
      }
      const exactCount = Math.floor(count);
      if (exactCount < 0) {
        return console.warn('Кол-во элементов на странице не может быть отрицательным!');
      }
      this.apiPagination.itemsPerPage = exactCount;
      this.apiPagination.currentPage = 1;
      this.toggleInfinitePagination(false);
      this.clearRequestedPages();
      this.getRequest();
    },
  },
};
</script>

<style lang="stylus">
.listing-wrapper
  display: grid
  grid-template: auto 1fr auto \/ 100%
  grid-gap: 0
  width: 100%
  height: 100%
  background: #eeeeee

.listing-filters-wrapper
  width: auto
  min-width: 0
  height: 42px

  &:nth-of-type(1)
    border-left: none

.listing-top
  display: grid
  grid-template: auto \/ auto 230px 1fr auto
  border-bottom: 1px solid #DADADA
  background: #ffffff

  &.shrink-top
    grid-template: 100% \/ 100%
    height: 0
    margin-bottom: 0
    border-bottom: none
    .listing-filters-wrapper
      display: none

  &.no-views
    .listing-view
      display: none

    .listing-search
      grid-column: span 2

    &.no-search
      .listing-filters-wrapper
        grid-column: span 3
        border-left: none

    &.no-actions
      .listing-filters-wrapper
        grid-column: span 2
        border-left: none

    &.no-filters
      .listing-search
        grid-column: span 3

  &.no-search
    .listing-search
      display: none

    .listing-filters-wrapper
      grid-column: span 2

    &.no-filters
      .listing-actions
        grid-column: -1 \/ -2

    &.no-actions
      .listing-filters-wrapper
        grid-column: span 3


  &.no-filters
    .listing-filters-wrapper
      display: none

    .listing-search
      grid-column: span 2

    &.no-actions
      .listing-search
        grid-column: span 3

  &.no-actions
    .listing-actions
      display: none

    .listing-filters-wrapper
      grid-column: span 2

  &.only-view
    .listing-search, .listing-filters-wrapper, .listing-actions
      display: none

  &.only-search
    .listing-view, .listing-filters-wrapper, .listing-actions
      display: none

    .listing-search
      grid-column: 1 \/ -1

  &.only-filters
    .listing-view, .listing-actions
      display: none

    .listing-filters-wrapper
      grid-column: 1 \/ -1
      border-left: none

  &.only-actions
    .listing-search, .listing-filters-wrapper, .listing-view
      display: none

    .listing-actions
      grid-column: -1 \/ -2

@media (max-width: 959px)
  .listing-view
    padding: 0 25px
  .search-input
    margin-bottom: 0

@media (max-width: 840px)
  .listing-filters-wrapper
    grid-column: 1 \/ -1
    grid-row: -1 \/ -2
    border-left: none
    border-top: 1px solid #DADADA
    border-left: none

  .listing-top
    grid-template: auto auto \/ auto 1fr auto

    &.no-views
      &.no-search
        .listing-filters-wrapper
          grid-column: 1 \/ span 2
          grid-row: 1 \/ 2
          border-top: none

      &.no-filters
        .listing-search
          grid-column: span 2

      &.no-actions
        .listing-search
          grid-column: 1 \/ -1

    &.no-search
      .listing-filters-wrapper
        grid-column: 1 \/ -1
      &.no-actions
        .listing-filters-wrapper
          grid-column: 2 \/ span 2
          grid-row: 1 \/ 2
          border-top: none

    &.no-filters
      &.no-actions
        .listing-search
          grid-column: span 2

    &.only-filters
      .listing-filters-wrapper
        border-top: none

  .listing-view
    grid-column: 1

  .listing-actions
    grid-column: -1 \/ -2

@media (max-width: 500px)
  .listing-top
    grid-template: repeat(3, auto) \/ auto auto
    align-content: start

    &.no-views
      &:not(.no-actions):not(.no-search):not(.no-filters) .listing-filters-wrapper
        grid-column: 1 \/ 2
        grid-row: 1 \/ 2
        border-top: none

      &.no-actions
        .listing-search
          border-top: none
          grid-row: 1 \/ 2

        .listing-filters-wrapper
          grid-column: 1 \/ -1

      &.no-search
        .listing-filters-wrapper
          grid-row: 1 \/ -1
          grid-column: 1 \/ 2

        .listing-actions
          grid-row: 1 \/ -1

    &.no-search
      &.no-actions
        justify-content: start

        .listing-view
          grid-row: 1 \/ -1

        .listing-filters-wrapper
          grid-row: 1 \/ -1

    &.no-actions:not(.no-views):not(.no-search):not(.no-filters)
      grid-template-columns: auto 1fr

      .listing-filters-wrapper
        grid-column: 2 \/ -1
        grid-row: 1 \/ 2
        border-top: none

    &.only-search
      .listing-search
        border-top: none

  .listing-actions
    justify-self: end
    border-left: none
    height: 40px

.listing-actions
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: space-evenly
  width: 100px
  height: 42px
  border-left: 1px solid #DADADA
  &.is-half
    width: 50px

  .action-element
    display: flex
    justify-content: center

  .icon-button
    display: flex
    justify-content: center


.listing-main
  position: relative
  display: flex
  flex-flow: row wrap
  overflow: hidden

  img
    max-width 100%
</style>
