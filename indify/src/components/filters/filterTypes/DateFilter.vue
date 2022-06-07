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
      <v-card>
        <v-card-text class="d-flex pa-4">
          <v-date-picker
            v-model="tempValue"
            :type="type"
            :range="range"
            first-day-of-week="1"
            header-color="#416FC8"
            locale="ru"
          />
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'DateFilter',
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
      default: 'Фильтр по дате',
    },
    defaultValue: {
      type: [Array, String],
      default: '',
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    filterType: {
      type: String,
      default: 'range',
    },
    range: {
      type: Boolean,
      default: false,
    },
    dateFormat: {
      type: String,
      default: 'DD.MM.YYYY',
    },
    type: {
      type: String,
      default: 'date',
    },
  },
  data() {
    return {
      value: [],
      tempValue: [],
    };
  },
  computed: {
    currentFilter() {
      if (!this.getFilter) return null;
      return this.getFilter(this.name);
    },
    open: {
      get() {
        return this.currentFilter && this.currentFilter.open;
      },
      set(value) {
        if (this.toggleFilter) this.toggleFilter(this.name, value);
      },
    },
    isActive() {
      return this.currentFilter && this.currentFilter.active;
    },
    visibleValue() {
      if (!this.value || (this.range && !this.value.length)) return '';
      if (this.range && this.value.length === 2) {
        if (this.value[0] === this.value[1]) {
          return moment(this.value[0], 'YYYY-MM-DD')
            .format(this.dateFormat);
        }
        const date1 = moment(this.value[0], 'YYYY-MM-DD');
        const date2 = moment(this.value[1], 'YYYY-MM-DD');
        return `c ${date1.format(this.dateFormat)} по ${date2.format(this.dateFormat)}`;
      }
      return moment(this.value, 'YYYY-MM-DD').format(this.dateFormat);
    },
    visibleLabel() {
      const wholeString = `${this.label.length}: ${this.visibleValue}`;
      if (wholeString.length <= 45) return this.label;
      const valueDiff = 26 - this.value.length;
      return `${this.label.slice(0, 15 + valueDiff)}...`;
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.tempValue = this.range ? [] : '';
      } else if (
        (this.range && this.value.length !== 2)
        || (!this.range && this.value === '')
      ) {
        this.reset();
      }
    },
    tempValue(val) {
      if (this.range && val.length === 2) {
        if (+moment(val[0], 'YYYY-MM-DD') > +moment(val[1], 'YYYY-MM-DD')) {
          const first = val.pop();
          val.unshift(first);
        }
        val[0] = moment(val[0]).format('YYYY-MM-DDT00:00:00');
        val[1] = moment(val[1]).format('YYYY-MM-DDT23:59:59');
        this.value = val;
        this.open = false;
        this.synchroniseChanges();
      } else if (!this.range && val !== '') {
        this.value = val;
        this.open = false;
        this.synchroniseChanges();
      }
    },
    isActive(val) {
      if (val) return;
      this.value = this.range ? [] : '';
      this.tempValue = this.range ? [] : '';
    },
  },
  created() {
    let val = null;

    if (this.range) {
      val = this.$getType(this.defaultValue) === 'Array'
        ? this.defaultValue
        : [];
    } else {
      val = this.$getType(this.defaultValue) === 'String'
        ? this.defaultValue
        : '';
    }
    this.tempValue = val;
    this.value = val;

    if (!this.registerFilter) return;
    this.registerFilter(this.name, {
      open: false,
      name: this.name,
      active: this.active,
      mandatory: this.mandatory,
      value: this.defaultValue,
      label: this.label,
      type: this.filterType,
      loadValue: value => {
        this.value = value;
        this.tempValue = value;
      },
    });
    this.value = this.defaultValue;
    this.tempValue = this.defaultValue;
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
    synchroniseChanges() {
      if (!this.changeFilter) return;
      this.changeFilter(this.name, { value: this.value });
    },
  },
};
</script>
