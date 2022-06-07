<template>
  <div
    class="listing-filters"
    :class="{
      'has-filter': hasActiveFilters,
      'all-filters': allFiltersAreActive,
    }"
    @wheel.capture="scrollHandler($event)"
  >

    <div
      :class="{ 'is-visible': showActiveFilters }"
      class="listing-filters-inner-wrapper"
      @click.self="toggleActiveFilters"
    >
      <div class="listing-filters-items">
        <div
          v-if="hasMultipleSearch"
          class="filter-item"
        >
          <v-chip
            close
            label
            close-icon="mdi-close"
            color="primary"
            text-color="dark-secondary"
            small
            @click:close="removeFilter('special:multiple-filter')"
          >
            <span class="filter-value">
              {{ multipleSearchFilter && multipleSearchFilter.value }}
            </span>
          </v-chip>
        </div>
        <slot />
        <FilterAddPopup
          v-model="addPopupSecond"
          :hide-button="hideSecondAdd"
          :has-active-filters="hasActiveFilters"
          :all-filters-are-active="allFiltersAreActive"
          :inactive-filters="inactiveFilters"
          :classes="addPopupClass"
          :is-mobile="isMobile"
          @open-filter="openFilter($event)"
          @set-multiple-filter="setMultipleFilter($event)"
        />
      </div>
    </div>
    <FilterAddPopup
      v-model="addPopup"
      :hide-button="!hideSecondAdd"
      :has-active-filters="hasActiveFilters"
      :all-filters-are-active="allFiltersAreActive"
      :inactive-filters="inactiveFilters"
      :classes="addPopupClass"
      :is-mobile="isMobile"
      @open-filter="openFilter($event)"
      @set-multiple-filter="setMultipleFilter($event)"
    />
    <v-btn
      v-if="hasActiveFilters"
      class="clear-button"
      color="primary"
      icon
      small
      @click="clearAllFilters"
    >
      <v-icon
        color="placeholder-color"
        dense
        size="20"
      >
        close
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { Filter } from 'core-xhr';
import FilterAddPopup from './FilterAddPopup';
import { debounce } from '../../helpers/decorators';

export default {
  name: 'DynamicFilters',
  components: {
    FilterAddPopup,
  },
  provide() {
    return {
      filtersState: this.filtersState,
      loadedFilters: this.loadedFilters,
      registerFilter: (name, stateProps) => this.registerFilter(name, stateProps),
      toggleFilter: (name, value) => this.toggleFilter(name, value),
      changeFilter: (name, props) => this.changeFilter(name, props),
      getFilter: name => this.getFilter(name),
      removeFilter: name => this.removeFilter(name),
      destroyFilter: name => this.destroyFilter(name),
    };
  },
  props: {
    multipleSearchField: {
      type: [Boolean, String, Array],
      default: false,
    },
    persistentFilters: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      filtersState: {},
      addPopup: false,
      addPopupSecond: false,
      invisibleFiltersPopup: false,
      isMobile: false,
      showActiveFilters: false,
      scrollTo: 0,
      hideSecondAdd: false,
      loadedFilters: {},
    };
  },
  computed: {
    inactiveFilters() {
      return Object.keys(this.filtersState)
        .filter(key => this.filtersState[key] && !this.filtersState[key].active)
        .map(key => this.filtersState[key]);
    },
    activeFilters() {
      return Object.keys(this.filtersState)
        .filter(key => this.filtersState[key] && this.filtersState[key].active)
        .map(key => this.filtersState[key]);
    },
    hasActiveFilters() {
      return Object.keys(this.filtersState)
        .some(key => this.filtersState[key].active);
    },
    allFiltersAreActive() {
      return !Object.keys(this.filtersState)
        .some(key => !this.filtersState[key].active);
    },
    addPopupClass() {
      // if (this.allFiltersAreActive) return 'no-transition is-hidden';
      if (!this.hasActiveFilters) return 'no-transition icon-text-button';
      if (!this.allFiltersAreActive) return 'no-transition round-icon-button';
      return '';
    },
    multipleSearchFilter() {
      return this.filtersState['special:multiple-filter'];
    },
    hasMultipleSearch() {
      if (!this.multipleSearchField) return false;
      return this.filtersState['special:multiple-filter']?.active;
    },
  },
  watch: {
    activeFilters(val) {
      if (this.$getType(val) !== 'Array' || val.length === 0) {
        this.toggleActiveFilters(false);
      }
    },
    filtersState: {
      immediate: true,
      deep: true,
      async handler() {
        await this.$nextTick();
        if (!this.$el) {
          this.hideSecondAdd = true;
          return;
        }
        const content = this.$el.querySelector('.listing-filters-items');
        const wrapper = this.$el.querySelector('.listing-filters-inner-wrapper');
        if (!wrapper || !content) return;
        this.hideSecondAdd = wrapper.clientWidth < content.clientWidth;
      },
    },
  },
  created() {
    this.firstChange = debounce(this.firstChange.bind(this), 400);
  },
  mounted() {
    if (this.persistentFilters) this.loadFilters();
    this.isMobile = window.innerWidth <= 959;
    document.addEventListener('click', this.clickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickOutside);
  },
  methods: {
    scrollHandler(event) {
      const target = event.target.closest('.listing-filters');
      if (!target) return;
      const parent = target.querySelector('.listing-filters-inner-wrapper');
      const child = target.querySelector('.listing-filters-items');
      if (!parent) return;
      this.scrollTo += (event.deltaY < 0 ? -30 : 30);
      let maxScroll = child.scrollWidth - parent.clientWidth;
      if (this.hideSecondAdd && !this.allFiltersAreActive) maxScroll -= 28;
      if (this.scrollTo > maxScroll) {
        this.scrollTo = maxScroll;
      }
      if (this.scrollTo < 0) {
        this.scrollTo = 0;
      }
      parent.scrollTo(this.scrollTo, 0);
    },
    clearAllFilters() {
      Object.keys(this.filtersState).forEach(key => {
        if (this.filtersState[key].mandatory) return;
        this.filtersState[key].open = false;
        this.filtersState[key].active = false;
        this.filtersState[key].value = null;
      });
      this.changeEvent();
    },
    changeEvent() {
      const filters = {};
      let multipleSearchKey = '';
      Object.keys(this.filtersState).forEach(key => {
        const type = this.$getType(this.filtersState[key].value);
        if (
          type === 'Undefined'
          || type === 'Null'
          || !this.filtersState[key].active
        ) return;
        if (key === 'special:multiple-filter') {
          multipleSearchKey = key;
          return;
        }
        filters[key] = new Filter(
          key,
          this.filtersState[key].type,
          this.filtersState[key].value,
        );
      });
      if (multipleSearchKey) {
        const fieldType = this.$getType(this.multipleSearchField);
        const { value } = this.filtersState[multipleSearchKey];
        if (fieldType === 'Array') {
          const name = this.multipleSearchField.join(',');
          filters[name] = new Filter(name, 'multiple', value)
        }
        if (fieldType === 'String') {
          filters[this.multipleSearchField] = new Filter(
            this.multipleSearchField,
            'multiple',
            value,
          );
        }
        if (fieldType === 'Boolean' && this.multipleSearchField) {
          filters.name = new Filter('name', 'multiple', value);
        }
      }
      this.$nextTick(this.setVisibleNumber);
      this.saveFilters(filters);
      this.$emit('filter-change', filters);
    },
    saveFilters(filters) {
      if (!process.client || !this.persistentFilters) return;
      const name = this.name + '-filters';
      const result = {};
      Object.keys(filters).forEach(field => {
        result[field] = filters[field].value;
      });
      localStorage.setItem(name, JSON.stringify(result));
    },
    loadFilters() {
      if (!process.client) return;
      const name = this.name + '-filters';
      const filters = JSON.parse(localStorage.getItem(name));
      if (this.$getType(filters) !== 'Object') return;

      const remainingFilters = {};
      Object.keys(filters).forEach(field => {
        if (this.filterIsRegistered(field)) {
          this.changeFilter(field, {
            active: true,
            value: filters[field],
          });
          const currentFilter = this.getFilter(field);
          if (currentFilter.loadValue) currentFilter.loadValue(filters[field]);
          return;
        }

        remainingFilters[field] = filters[field];
      });
      this.loadedFilters = remainingFilters;
    },
    clickOutside(event) {
      if (
        event.target.closest('.more-filters')
        || event.target.closest('.v-menu__content')
      ) return;
      this.invisibleFiltersPopup = false;
    },
    toggleActiveFilters(value) {
      this.showActiveFilters = this.$getType(value) === 'Boolean'
        ? value : !this.showActiveFilters;
    },
    filterIsRegistered(name, showError) {
      const result = this.filtersState.hasOwnProperty(name);
      if (!result && showError) {
        console.warn(
          `Попытка взаимодействовать с незарегистрированным фильтром.
          Проверьте имена переданных фильтров: имена должны
          быть уникальными строками у всех используемых фильтров.`
            .replace(/\s\s/g, ''),
        );
      }
      return result;
    },
    registerFilter(name, stateProps) {
      if (this.persistentFilters && this.loadedFilters[name] !== undefined) {
        this.$set(stateProps, 'value', this.loadedFilters[name]);
        this.$set(stateProps, 'active', true);
      }
      this.$set(this.filtersState, name, stateProps);
      if (stateProps.active) this.firstChange();
    },
    destroyFilter(name) {
      if (this.filtersState && this.filtersState[name]) {
        this.$delete(this.filtersState, name);
      }
    },
    toggleFilter(name, value) {
      if (!this.filterIsRegistered(name, true)) return;
      let result = value;
      if (this.$getType(result) !== 'Boolean') {
        result = !this.filtersState[name].open;
        return;
      }
      this.$set(this.filtersState[name], 'open', result);
    },
    changeFilter(name, props, noChange) {
      if (!this.filterIsRegistered(name, true)) return;
      if (this.$getType(props) !== 'Object') return;
      Object.keys(props).forEach(key => {
        this.$set(this.filtersState[name], key, props[key]);
      });
      if (!noChange) this.changeEvent();
    },
    getFilter(name) {
      if (!this.filterIsRegistered(name)) return null;
      return this.filtersState[name];
    },
    openFilter(name) {
      this.changeFilter(name, {
        active: true,
        open: true,
      }, true);
      this.addPopup = false;
      this.addPopupSecond = false;
    },
    removeFilter(name) {
      if (!this.filterIsRegistered(name, true)) return null;
      this.changeFilter(name, {
        value: null,
        active: false,
      });
    },
    firstChange() {
      this.changeEvent();
    },
    setMultipleFilter(value) {
      if (!this.multipleSearchField) return;
      this.registerFilter('special:multiple-filter', {
        active: true,
        label: '',
        mandatory: false,
        name: 'special:multiple-filter',
        type: 'multiple',
        value,
      })
    },
  },
};
</script>

<style lang="stylus">
.listing-filters
  position: relative
  display: grid
  grid-template: 42px \/ 1fr
  grid-gap: 5px
  align-items: center
  width: 100%
  height: 100%
  padding: 0 15px
  &.has-filter
    grid-template: auto \/ minmax(0, calc(100% - 56px)) 28px minmax(28px, 1fr)
    .listing-filters-add
      grid-row: 1
      grid-column: 2
  &.all-filters
    grid-template: auto \/ minmax(0, calc(100% - 56px)) 28px minmax(28px, 1fr)
  .clear-button
    grid-column: 3
    margin-left: auto
    justify-self: end
    &.theme--light::before
      opacity: 1
    &.theme--light:hover
      &::before
        opacity: 1
      //.v-icon
      //  color: #416FC8!important

  .listing-filters-add
    grid-row: 2
    &[disabled]
      display: none
    &.icon-text-button
      justify-content: flex-start
      padding-left: 0
    &.round-icon-button:hover
      background-color: #eaecef

  .round-icon-button
    order: 99
  .v-menu__content
    max-height: 380px
    background-color: #ffffff
    font-size: 14px

.filter-item
  margin-right: 6px
  font-size: 14px
  &.more-filters
    position: relative
    overflow: hidden
    &.is-opened
      overflow: visible
  .v-chip
    font-size: 14px !important
    height: 28px !important
  .v-chip__close:before
    color: #416FC8

.filter-label
  display: inline-block
  margin-right: 8px
  color: #888A91

.listing-filters-inner-wrapper
  grid-row: 1
  grid-column: 1
  align-self: flex-start
  display: flex
  flex-flow: row nowrap
  align-items: center
  height: 100%
  overflow: hidden
  &.mobile-version
    position: fixed
    left: 0
    top: 0
    z-index: 100
    display: none
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.3)
    &.is-visible
      display: flex
      flex-flow: row nowrap
      justify-content: center
      align-items: center
    .listing-filters-items
      flex-flow: column nowrap
      align-items: flex-start
      justify-content: center
      padding: 15px
      background: #ffffff
    .filter-item
      margin: 3px 0

.listing-filters-items
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center

.icon-text-button
  display: inline-flex
  align-items: center
  justify-content: center
  height: 40px
  padding: 0 20px
  border: none
  outline: none
  box-shadow: none
  color: #888A91
  font-size: 14px
  transition: all 0.3s ease
  &:hover
    color: #416FC8
    //.v-icon
    //  color: #416FC8!important

@media (max-width: 959px)
  .listing-filters-wrapper
    height: 42px
    .listing-search
      border-top: none
</style>
