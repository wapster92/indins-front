<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    offset-y
    offset-x
    left
    bottom
  >
    <template #activator="{ on }">
      <button
        class="icon-button"
        v-on="on"
      >
        <v-icon
          size="20"
          color="#888A91"
        >
          {{ icon }}
        </v-icon>
      </button>
    </template>
    <v-list class="column-toggler-list">
      <v-list-item
        v-for="header in filteredHeaders"
        :key="'columns-toggler-' + header.field"
        dense
        class="column-toggler-option"
      >
        <SimpleSwitch
          :value="visibleColumns && visibleColumns[header.field]"
          :label="header.name"
          class="column-toggler-item"
          readonly
          hide-details
          @click="toggleColumn(header)"
        />
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ColumnToggler',
  inject: {
    listingName: {
      default: null,
    },
    chosenListing: {
      default: null,
    },
    defaultDictionaryName: {
      default: null,
    },
  },
  props: {
    icon: {
      type: String,
      default: 'settings',
    },
    tableName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
      settings: null,
      headers: [],
      visibleColumns: {},
    };
  },
  computed: {
    storeName() {
      if (this.tableName) return this.tableName;
      if (this.defaultDictionaryName) return this.defaultDictionaryName;
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
    filteredHeaders() {
      return this.headers.filter(head => head.field.match('special:') === null);
    },
    defaultVisibleColumns() {
      const result = {};
      this.filteredHeaders.forEach(head => result[head.field] = true);
      return result;
    },
  },
  created() {
    this.$eventBus.on('column-toggler:take-headers', this.setTableHeaders);
  },
  mounted() {
    this.getTableHeaders();
    if (this.$settings) {
      this.settings = this.$settings(this.storeName);
    }
    if (this.settings && this.settings.listingColumns) {
      const result = {};
      this.filteredHeaders.forEach(head => result[head.field] = this.settings.listingColumns.includes(head.field))
      this.changeVisibleColumns(result);
    } else {
      this.changeVisibleColumns(this.defaultVisibleColumns);
    }
    this.sendColumnsToTable();
  },
  beforeDestroy() {
    this.$eventBus.off('column-toggler:take-headers', this.setTableHeaders);
  },
  methods: {
    changeVisibleColumns(columns) {
      if (this.$getType(columns) !== 'Object') return;
      const result = {};
      Object.keys(columns).forEach(field => {
        result[field] = columns[field];
      });
      this.visibleColumns = result;
    },
    toggleColumn(header) {
      if (
        this.$getType(this.visibleColumns) !== 'Object'
        || !header
        || header.field.match('special:')
      ) return;
      this.$set(this.visibleColumns, header.field, !this.visibleColumns[header.field]);
      if (this.settings) {
        this.settings.listingColumns = Object.keys(this.visibleColumns)
          .filter(column => this.visibleColumns[column] === true);
      }
      this.sendColumnsToTable();
    },
    sendColumnsToTable() {
      this.$eventBus.emit(
        'table-listing:set-table-columns',
        { tableName: this.tableName, listingName: this.listingName, columns: this.visibleColumns }
      );
    },
    getTableHeaders() {
      this.$eventBus.emit(
        'table-listing:get-table-headers',
        { tableName: this.tableName, listingName: this.listingName }
      );
    },
    setTableHeaders({ tableName, listingName, headers }) {
      if (this.tableName && tableName !== this.tableName) return;
      if (!this.tableName && listingName !== this.listingName) return;
      this.headers = headers;
    },
  },
};
</script>

<style lang="stylus">
.column-toggler-option.v-list-item
  padding 0 28px 0 20px

.column-toggler-list
  .v-input--selection-controls
    margin-top: 0
    padding-top: 0

.column-toggler-item
  label
    color: #202124 !important
    font-size: 14px
    margin-left: 6px
</style>
