<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
    :nudge-bottom="!hasActiveFilters ? '42px' : '8px'"
    :nudge-right="!hasActiveFilters? '40px' : '0px'"
    offset-y
    bottom
    content-class="filter-add-popup"
    attach=".listing-filters-items"
  >
    <template #activator="{ on }">
      <button
        v-show="hasActiveFilters"
        :class="'listing-filters-add ' + classes"
        :style="{'visibility': hideButton ? 'hidden' : 'visible'}"
        :disabled="allFiltersAreActive"
        v-on="on"
      >
        <v-icon
          :size="hasActiveFilters ? 20 : 18"
          :color="iconColor"
        >
          add
        </v-icon>
        <span v-if="!hasActiveFilters">Добавить фильтр</span>
      </button>
      <StringSearch
        v-show="!hasActiveFilters"
        v-model="multipleSearch"
        :style="{'visibility': hideButton ? 'hidden' : 'visible'}"
        @click.native="show = !show"
        @first-input="show = false"
        @cleared-input="show = true"
        @keydown.native.enter="setMultipleFilter"
      />
    </template>
    <v-list
      v-show="hasActiveFilters || visibleFilters.length !== 0"
      class="filter-popup"
    >
      <TextInput
        v-if="hasActiveFilters"
        v-model="multipleSearch"
        input-type="standart"
        class="filter-popup-search-field"
        autocomplete="new-password"
        @keydown.native.enter="setMultipleFilter"
      >
        <template #append>
          <v-icon
            size="20"
            color="light-accent"
            @click="clearMultipleSearch"
          >
            {{ multipleSearch ? 'close' : 'search' }}
          </v-icon>
        </template>
      </TextInput>
      <v-list-item
        v-for="filter in visibleFilters"
        :key="'options-' + filter.name"
        dense
        @click.stop="openFilter(filter.name)"
      >
        {{ filter.label }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'FilterAddPopup',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    hideButton: {
      type: Boolean,
      default: false,
    },
    hasActiveFilters: {
      type: Boolean,
      default: false,
    },
    allFiltersAreActive: {
      type: Boolean,
      default: false,
    },
    inactiveFilters: {
      type: Array,
      default: () => ([]),
    },
    classes: {
      type: [Object, String],
      default: '',
    },
  },
  data() {
    return {
      show: false,
      multipleSearch: '',
    };
  },
  computed: {
    iconColor() {
      if (this.allFiltersAreActive) return 'light-accent';
      return this.hasActiveFilters ? 'info' : 'placeholder-color';
    },
    visibleFilters() {
      if (!this.multipleSearch) return this.inactiveFilters
        .filter(item => item.name !== 'special:multiple-filter');
      const searchString = this.multipleSearch.replace(/([\{\}\(\)\+\\\,])/g, "\\$&")
      const regex = new RegExp(searchString, 'i');
      return this.inactiveFilters
        .filter(item => item.label.match(regex) !== null && item.name !== 'special:multiple-filter');
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.show = val;
      },
    },
    show(val) {
      if (this.value === val) return;
      this.$emit('input', val);
    },
  },
  methods: {
    openFilter(name) {
      this.$emit('open-filter', name);
      this.clearMultipleSearch();
    },
    clearMultipleSearch() {
      this.multipleSearch = '';
    },
    setMultipleFilter() {
      if (this.visibleFilters.length > 0) return;
      this.$emit('set-multiple-filter', this.multipleSearch);
      this.clearMultipleSearch();
      this.show = false;
    },
  },
};
</script>

<style lang="stylus">
.filter-popup
  font-size: 14px
  &.more-filters
    position: absolute
    top: 100%
    left: 0
    z-index: 4
    max-width: 360px
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)
    overflow: hidden auto
    &.align-right
      left: auto
      right: -80px

.filter-popup-search-field
  .v-text-field
    padding: 0 17px 7px!important
    .v-input__append-inner
      margin-top: 9px
      .v-icon:hover
        color: #416fc8!important

.listing-top.no-search .listing-filters .listing-search
  display: block

.filter-add-popup
  width: auto

@media(max-width: 959px)
  .filter-add-popup.v-menu__content
    width: calc(100vw - 40px)
    max-width: calc(100vw - 40px)
    left: 20px!important
</style>
