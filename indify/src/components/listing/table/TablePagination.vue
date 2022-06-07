<template>
  <div
    v-if="pagination"
    class="listing-navigation"
  >
    <div class="listing-navigation-numbers">
      {{ itemNumbers }}
    </div>
    <div
      v-if="allowItemsPerPage"
      class="listing-navigation-perpage"
    >
      <span>Показывать по: </span>
      <SearchSelect
        :value="itemsPerPage"
        :items="itemsPerPageValues"
        item-text="value"
        hide-search
        list-width="100"
        input-type="standart"
        @input="itemsPerPage = $event"
      />
    </div>
    <div
      v-if="showPagination"
      class="listing-navigation-arrows"
    >
      <v-btn
        :disabled="disablePrev"
        icon
        @click="changePage(true)"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn
        :disabled="disableNext"
        icon
        @click="changePage()"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import SearchSelect from '../../form/fields/SearchSelect/SearchSelect';

export default {
  name: 'TablePagination',
  components: {
    SearchSelect,
  },
  props: {
    apiPagination: {
      type: [Object, null],
      default: null,
    },
    listLength: {
      type: [String, Number],
      default: 0,
    },
    allowPagination: {
      type: Boolean,
      default: false,
    },
    allowItemsPerPage: {
      type: Boolean,
      default: false,
    },
    limitInfiniteLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemsPerPageValues: [10, 25, 50, 75, 100, 200],
      localPagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 100,
      },
    };
  },
  computed: {
    pagination() {
      return this.apiPagination?.info || this.localPagination;
    },
    itemNumbers() {
      if (this.listLength && !this.pagination?.totalItems) return `1-${this.listLength} из ${this.listLength}`
      if (!this.pagination?.totalItems) return '0 из 0';
      const {
        infiniteLast, infiniteFirst, currentPage, itemsPerPage, totalItems,
      } = this.pagination;
      const first = !this.apiPagination ? currentPage : infiniteFirst;
      const last = !this.apiPagination ? currentPage : infiniteLast;
      const from = (first - 1) * itemsPerPage + 1;
      const to = Math.min(totalItems, last * itemsPerPage);

      return `${from}-${to} из ${totalItems}`;
    },
    showPagination() {
      if (!this.pagination || !this.allowPagination) return false;
      if (this.apiPagination) {
        return this.pagination.totalPages !== 1;
      }
      const { infiniteFirst, infiniteLast, totalPages } = this.pagination;
      return (infiniteFirst === infiniteLast && totalPages > 1)
        || (infiniteFirst !== 1 || infiniteLast !== totalPages);
    },
    disablePrev() {
      if (!this.pagination) return true;
      const { infiniteFirst, infiniteLast, currentPage } = this.pagination;
      return (infiniteFirst === infiniteLast && currentPage === 1)
        || infiniteFirst === 1;
    },
    disableNext() {
      if (!this.pagination) return true;
      const {
        infiniteFirst, infiniteLast, currentPage, totalPages,
      } = this.pagination;
      return (infiniteFirst === infiniteLast && currentPage === totalPages)
        || infiniteLast === totalPages;
    },
    itemsPerPage: {
      get() {
        return this.pagination?.itemsPerPage;
      },
      set(value) {
        if (!this.pagination) return;
        if (!this.apiPagination) {
          this.localPagination.itemsPerPage = value;
          return;
        }
        this.apiPagination.setItemsPerPage(value);
      },
    },
  },
  watch: {
    apiPagination: {
      immediate: true,
      handler(value) {
        if (value) return;
        this.totalItems = this.listLength;
      },
    },
  },
  methods: {
    changePage(previous) {
      if (!this.pagination) return;
      if (!this.apiPagination) {
        const { currentPage, totalPages } = this.localPagination;
        const page = currentPage + (previous ? -1 : 1);
        if (page > totalPages || page < 1) return;
        this.localPagination.currentPage = page;
        this.$emit('change', { currentPage: page });
        return;
      }
      if (previous) {
        this.apiPagination.previousPage();
      } else {
        this.apiPagination.nextPage();
      }
      this.apiPagination.toggleInfinitePagination(false);
      this.$emit('change', { currentPage: this.pagination.currentPage });
    },
  },
};
</script>

<style lang="stylus">
.listing-navigation
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: space-between

.listing-navigation-perpage
  display: flex
  flex-flow: row nowrap
  align-items: center
  margin-right: 40px
  color: #888A91
  font-size: 13px
  white-space: nowrap
  .search-select-errors
    display: none

  .search-select
    width: 75px
    height: 28px
    margin-left: 10px
    padding-top: 0

  .search-select-field::before
    opacity: 0

  .search-select-values
    padding: 0 0 9px

  .search-select-triangle
    margin-top: 6px

  .v-input__slot
    &::before, &::after
      opacity: 0

.listing-navigation-numbers
  margin: 0 40px 0 17px
  color: #888A91
  font-size: 13px
  white-space: nowrap
</style>
