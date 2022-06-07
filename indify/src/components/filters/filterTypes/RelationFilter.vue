<template>
  <div
    v-show="isActive"
    class="filter-item"
  >
    <v-menu
      v-model="open"
      :close-on-content-click="false"
      transition="scale-transition"
      attach=".listing-filters"
      content-class="relation-filter-dropdown"
      nudge-bottom="41"
    >
      <template #activator="{ on }">
        <v-chip
          label
          :close="!mandatory"
          close-icon="mdi-close"
          color="primary"
          text-color="dark-secondary"
          small
          @click="opener(on, $event)"
          @click:close="reset"
        >
          <span class="filter-label">{{ label }}:</span>
          <span class="filter-value">{{ textSelected }}</span>
        </v-chip>
      </template>

      <TextInput
        v-model="multipleSearch"
        input-type="standart"
        class="relation-filter-search-field"
      >
        <template #append>
          <v-icon
            size="20"
            color="#DADADA"
            @click="clearMultipleSearch"
          >
            {{ multipleSearch ? 'close' : 'search' }}
          </v-icon>
        </template>
      </TextInput>
      <v-list>
        <ScrollComponent
          handle-color="rgba(136, 138, 145, 0.2)"
          path-color="rgba(0, 0, 0, 0)"
          handle-width="6"
          dont-hide
          vertical
        />
        <v-list-item
          v-for="(item, index) in filteredList"
          :key="'selection-' + index"
          dense
          @click="changeValue(item)"
        >
          <div v-html="getEntityName(item)"></div>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { Get, Filter } from 'core-xhr';
import { getObjectField, makeHash } from '../../../helpers';
import { debounce } from "../../../helpers/decorators";

export default {
  name: 'RelationFilter',
  inject: {
    filtersState: {
      default: null,
    },
    registerFilter: {
      default: null,
    },
    destroyFilter: {
      default: null,
    },
    toggleFilter: {
      default: null,
    },
    changeFilter: {
      default: null,
    },
    getFilter: {
      default: null,
    },
    removeFilter: {
      default: null,
    },
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Фильтр по сущностям',
    },
    defaultValue: {
      type: [Object, null],
      default: null,
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    filterType: {
      type: String,
      default: 'eq',
    },
    itemText: {
      type: String,
      default: 'name',
    },
    query: {
      type: [Object, String, null],
      default: null,
    },
    filterBy: {
      type: String,
      default: 'id',
    },
    multipleFilterType: {
      type: String,
      default: 'ineq',
    },
    multipleSearchField: {
      type: String,
      default: 'name',
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    allowDeleted: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: null,
      list: [],
      multipleSearch: '',
    };
  },
  computed: {
    defaultColor() {
      return this.$defaultConfig.color;
    },
    currentFilter() {
      if (!this.getFilter) return null;
      return this.getFilter(this.name);
    },
    open: {
      get() {
        return this.currentFilter && this.currentFilter.open;
      },
      set(value) {
        const result = !this.listIsEmpty && value;
        if (this.toggleFilter) this.toggleFilter(this.name, result);
      },
    },
    isActive() {
      return this.currentFilter && this.currentFilter.active;
    },
    textSelected() {
      if (this.multiple && this.$getType(this.value) === 'Array') {
        return this.value
          .reduce((acc, item) => `${acc + getObjectField(item, this.itemText)}, `, '')
          .slice(0, -2);
      }
      return getObjectField(this.value, this.itemText);
    },
    filteredList() {
      if (this.multiple) {
        if (this.$getType(this.value) !== 'Array') return this.list;
        return this.list.filter(item => {
          for (const chosen of this.value) {
            if (this.areTheSameItem(item, chosen)) return false;
          }
          return true;
        });
      }
      if (!this.value) return this.list;
      return this.list.filter(item => !this.areTheSameItem(item, this.value));
    },
    listIsEmpty() {
      return this.filteredList.length === 0;
    },
  },
  watch: {
    async open(val) {
      if (val) return;
      if (!this.value || (this.multiple && this.value.length === 0)) {
        this.reset();
      }
    },
    isActive(val) {
      if (!val) {
        this.value = null;
      }
    },
    multipleSearch() {
      this.multipleSearchChanged();
    },
  },
  created() {
    this.multipleSearchChanged = debounce(this.multipleSearchChanged, 500);
    if (!this.registerFilter) return;
    this.registerFilter(this.name, {
      open: false,
      name: this.name,
      active: this.active,
      mandatory: this.mandatory,
      value: getObjectField(this.defaultValue, this.filterBy),
      label: this.label,
      type: this.filterType,
      loadValue: value => {
        if (this.listIsEmpty) {
          const unwatch = this.$watch('listIsEmpty', isEmpty => {
            if (isEmpty) return;
            this.selectLoadedValue(value);
            unwatch();
          });
          return;
        }
        this.selectLoadedValue(value);
      },
    });
    this.value = this.multiple ? [this.defaultValue] : this.defaultValue;
  },
  mounted() {
    this.getList();
  },
  beforeDestroy() {
    if (!this.currentFilter || !this.destroyFilter) return;
    this.destroyFilter(this.name);
  },
  methods: {
    getMandatoryFilters(request) {
      return request._filter.filter(filter => filter.mandatory) || [];
    },
    getFilters(request) {
      const filters = this.getMandatoryFilters(request);

      if (!this.allowDeleted) {
        filters.push(new Filter('deletedAt', 'exists', false));
      }
      if (this.multipleSearch) {
        filters.push(new Filter(this.multipleSearchField, 'multiple', this.multipleSearch));
      }

      return filters;
    },
    multipleSearchChanged() {
      if (!this.query) {
        this.list = this.items.filter(item => {
          const value = getObjectField(item, this.itemText);
          return value.match(new RegExp(this.multipleSearch, 'i')) !== null;
        });
        return;
      }

      this.getList();
    },
    async getList() {
      if (this.items.length > 0) {
        this.list = this.items;
        return;
      }
      if (!this.query) return;

      const request = new Get(this.query);
      request.setFilter(this.getFilters(request));

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler());

      if (!response || !response.data || !response.data.data) {
        return this.list = [];
      }
      this.list = response.data.data.result;
    },
    findItem(id) {
      return this.filteredList.find(item => item.id === id);
    },
    // Вынужден менять active на true, потому что фильтр ждет, пока прогрузится выпадающий список.
    // Если был в localStorage сохранен элемент не из первых 50, то скорее всего не будет его загружать,
    // так как его не будет в полученном изначально списке.
    selectLoadedValue(value) {
      // console.log(value);
      const type = this.$getType(value);
      if (type === 'Number') {
        const item = this.findItem(value);
        if (item) {
          this.changeValue(item);
          this.changeFilter(this.name, { active: true });
        }
        return;
      }
      if (type === 'Array' && this.multiple) {
        value.forEach(id => {
          if (this.$getType(id) !== 'Number') return;
          const item = this.findItem(id);
          if (!item) return;
          this.changeValue(item);
        });
        if (this.value?.length !== 0) {
          this.changeFilter(this.name, { active: true });
        }
        return;
      }
      if (type === 'Object') {
        this.changeValue(value);
        this.changeFilter(this.name, { active: true });
      }
    },
    reset() {
      if (this.mandatory || !this.removeFilter) return;
      this.value = null;
      this.removeFilter(this.name);
    },
    changeValue(item) {
      if (this.multiple) {
        if (this.$getType(this.value) !== 'Array') this.value = [];
        this.value.push(item);
      } else {
        this.value = item;
      }

      if (!this.value && this.value !== 0) {
        this.reset();
      } else {
        this.synchroniseChanges();
      }
      if (!this.multiple || this.listIsEmpty) {
        this.open = false;
      }
    },
    synchroniseChanges() {
      if (this.multiple) {
        let result = null;
        if (this.$getType(this.value) === 'Array') {
          this.value = this.value.filter(item => item);
          result = this.value
            .map(chosen => getObjectField(chosen, this.filterBy));
        }
        this.changeFilter(this.name, {
          value: result,
          type: this.multipleFilterType,
        });
        return;
      }
      this.changeFilter(this.name, {
        value: getObjectField(this.value, this.filterBy),
        type: this.filterType,
      });
    },
    areTheSameItem(first, second) {
      if (this.$getType(first) === 'Object' && this.$getType(second) === 'Object') {
        if (first.id) return first.id === second.id;
        return JSON.stringify(first) === JSON.stringify(second);
      }
      return first === second;
    },
    opener(on, event) {
      if (this.listIsEmpty) return;
      on.click(event);
    },
    clearMultipleSearch() {
      this.multipleSearch = '';
    },
    getEntityName(item) {
      const name = getObjectField(item, this.itemText);
      if (!name) return '';
      return name.replace(
        new RegExp(this.multipleSearch, 'gi'),
        (match, offset) => {
          let resultInsert = match
            .split('')
            .reduce((acc, letter, index) => acc + name[offset + index], '');
          return `<span class="relation-filter-search-match">${resultInsert}</span>`;
        },
      );
    },
  },
};
</script>

<style lang="stylus">
.relation-filter-search-field
  .v-text-field
    padding: 0 0 7px 17px!important
    .v-input__append-inner
      margin-top: 9px
      .v-icon:hover
        color: #416fc8!important

.relation-filter-search-match
  color: #416fc8

.relation-filter-dropdown.v-menu__content
  overflow: hidden
  display: grid
  grid-template: 36px minmax(0, 1fr) \/ 100%
  grid-gap: 5px
  padding: 10px 17px 0 0
  .v-list
    position: relative
    overflow: hidden
    padding-top: 0
    .v-list-item
      padding: 0 0 0 17px
</style>
