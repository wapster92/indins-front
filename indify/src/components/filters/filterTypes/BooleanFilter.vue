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
          v-on="on"
          @click:close="reset"
        >
          <span class="filter-label">{{ visibleLabel }}:</span>
          <span class="filter-value">{{ visibleValue }}</span>
        </v-chip>
      </template>
      <v-list>
        <v-list-item
          dense
          @click="changeValue(true)"
        >
          {{ trueText }}
        </v-list-item>
        <v-list-item
          dense
          @click="changeValue(false)"
        >
          {{ falseText }}
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'BooleanFilter',
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
      default: 'Булевый фильтр',
    },
    defaultValue: {
      type: Boolean,
      default: false,
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    filterType: {
      type: String,
      default: 'bool',
    },
    trueText: {
      type: String,
      default: 'Да',
    },
    falseText: {
      type: String,
      default: 'Нет',
    },
  },
  data() {
    return {
      value: null,
    };
  },
  computed: {
    visibleValue() {
      return this.value === true ? this.trueText : this.falseText;
    },
    visibleLabel() {
      const wholeString = `${this.label}: ${this.visibleValue}`;
      if (wholeString.length <= 45) return this.label;
      return `${this.label.slice(0, 38 - this.visibleValue.length)}...`;
    },
    currentFilter() {
      if (!this.getFilter) return null;
      return this.getFilter(this.name);
    },
    open: {
      get() {
        return this.currentFilter?.open;
      },
      set(value) {
        if (this.toggleFilter) this.toggleFilter(this.name, value);
      },
    },
    isActive() {
      return this.currentFilter?.active;
    },
  },
  watch: {
    open(val) {
      if (!val && this.$getType(this.value) !== 'Boolean') {
        this.reset();
      }
    },
    isActive(val) {
      if (!val) {
        this.value = null;
      }
    },
  },
  created() {
    if (!this.registerFilter) return;
    this.registerFilter(this.name, {
      open: false,
      name: this.name,
      active: this.active,
      mandatory: this.mandatory,
      value: this.defaultValue,
      label: this.label,
      type: this.filterType,
      loadValue: value => this.value = value,
    });
    this.value = this.defaultValue;
  },
  beforeDestroy() {
    if (!this.currentFilter || !this.destroyFilter) return;
    this.destroyFilter(this.name);
  },
  methods: {
    reset() {
      if (this.mandatory || !this.removeFilter) return;
      this.value = null;
      this.removeFilter(this.name);
    },
    changeValue(val) {
      this.value = val;
      if (this.$getType(this.value) !== 'Boolean') {
        return this.reset();
      }
      this.synchroniseChanges();
      this.open = false;
    },
    synchroniseChanges() {
      this.changeFilter(this.name, { value: this.value });
    },
  },
};
</script>
