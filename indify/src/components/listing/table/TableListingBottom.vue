<template>
  <div class="listing-bottom">
    <TablePagination
      :api-pagination="apiPagination"
      :list-length="list.length"
      :allow-pagination="allowPagination"
      :allow-items-per-page="allowItemsPerPage"
      @change="pageChanged($event)"
    />
    <div class="listing-bottom-slot">
      <slot
        :list="list"
        :selected="selected"
        :clear-selection="clearSelected"
      />
    </div>
    <MassiveActionsWrapper v-if="massiveActions">
      <slot
        :list="list"
        :selected="selected"
        :clear-selection="clearSelection"
        name="massive-actions"
      />
    </MassiveActionsWrapper>
  </div>
</template>

<script>
import TablePagination from './TablePagination';
import MassiveActionsWrapper from '../massiveActions/MassiveActionsWrapper';

export default {
  name: 'TableListingBottom',
  components: {
    TablePagination,
    MassiveActionsWrapper,
  },
  inject: {
    clearSelection: {
      default: null,
    },
    apiPagination: {
      default: null,
    },
  },
  props: {
    tableName: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Array,
      default: () => [],
    },
    clearSelection: {
      type: Function,
      default: () => null,
    },
    massiveActions: {
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
  methods: {
    clearSelected() {
      if (this.$getType(this.clearSelection).match('Function') === null) return;
      this.clearSelection();
    },
    pageChanged(event) {
      this.$emit('page-change', event);
      this.$emit('get-list');
      this.$eventBus.emit('table-listing:reset-scroll', this.tableName);
    },
  },
};
</script>

<style lang="stylus">
.listing-bottom
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  align-items: center
  min-height: 50px
  padding: 10px 8px
  background: #ffffff

@media(max-width: 959px)
  .listing-bottom
    .listing-navigation, .listing-bottom-slot
      display: none
</style>