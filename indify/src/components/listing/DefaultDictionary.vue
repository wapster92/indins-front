<template>
  <DynamicListing
    :list="list"
    :query="query"
    :filter-type="filterType"
    :orders="orders"
    :default-orders="defaultOrders"
    :skip-first-request="skipFirstRequest"
    :multiple-search="multipleSearch"
    :subscribe="subscribe"
    :allow-deleted="allowDeleted"
    :persistent-filters="persistentFilters"
    :name="tableName"
  >
    <template #actions="{ listingName: localListingName }">
      <slot
        :listing-name="localListingName"
        name="actions"
      />
    </template>
    <template #filters="{ filterChange }">
      <slot
        name="filters"
        :filter-change="filterChange"
      />
    </template>
    <template #default="{ list: visibleList }">
      <TableListing
        ref="__listingInDictionary"
        :list="visibleList"
        :name="name"
        :headers="headers"
        :massive-actions="massiveActions"
        :row-color="rowColor"
        :sort-multiple="sortMultiple"
        :react-to-headers="reactToHeaders"
        :hide-empty-table="hideEmptyTable"
        :hide-headers="hideHeaders"
        :hide-bottom="hideBottom"
        :resizable-columns="resizableColumns"
        :allow-pagination="allowPagination"
        :allow-items-per-page="allowItemsPerPage"
        @item-click="$emit('item-click', $event)"
      >
        <template #columns="{ item }">
          <slot
            :item="item"
            name="columns"
          />
        </template>
        <template #empty-table-warning>
          <slot name="empty-table-warning" />
        </template>
        <template #bottom-slot="{ list: tableList }">
          <slot
            :list="tableList"
            name="bottom-slot"
          />
        </template>
        <template #massive-actions="{ selected, clearSelection }">
          <slot
            :selected="selected"
            :clear-selection="clearSelection"
            name="massive-actions"
          />
        </template>
      </TableListing>
    </template>
  </DynamicListing>
</template>

<script>
export default {
  name: 'DefaultDictionary',
  provide() {
    return {
      defaultDictionaryName: this.name,
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
    filterType: {
      type: String,
      default: 'multiple',
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
    multipleSearch: {
      type: [Boolean, Array, String],
      default: false,
    },
    tableName: {
      type: String,
      default: '',
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
    reactToHeaders: {
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
    resizableColumns: {
      type: Boolean,
      default: false,
    },
    subscribe: {
      type: [String, Array, null],
      default: null,
    },
    allowPagination: {
      type: Boolean,
      default: false,
    },
    allowItemsPerPage: {
      type: Boolean,
      default: false,
    },
    allowDeleted: {
      type: Boolean,
      default: false,
    },
    persistentFilters: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$refs.__listingInDictionary._data.readonly = !this.$listeners['item-click']
  },
  computed: {
    name() {
      if (this.tableName) return this.tableName;
      if (!this.query) return '';
      const query = this.$getType(this.query) === 'String'
        ? this.query
        // eslint-disable-next-line no-underscore-dangle
        : this.query?._key || '';
      return `table-${query}`;
    },
  },
};
</script>
