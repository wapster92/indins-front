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
          <span class="filter-label">{{ visibleText.label }}:</span>
          <span class="filter-value">{{ visibleText.value }}</span>
        </v-chip>
      </template>
      <v-card>
        <v-card-text class="d-flex align-center pa-4">
          <v-text-field
            v-model="tempValue"
            class="pt-0 mt-0"
            :placeholder="label"
            clearable
            hide-details
            color="#416FC8"
            @keydown="enterPress($event)"
          />
          <button
            class="round-icon-button is-blue ml-3"
            @click="changeValue"
          >
            <v-icon
              size="18"
              color="#ffffff"
            >
              check
            </v-icon>
          </button>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'NumberFilter',
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
      default: 'Число',
    },
    defaultValue: {
      type: Number,
      default: 0,
    },
    mandatory: {
      type: Boolean,
      default: false,
    },
    filterType: {
      type: String,
      default: 'eq',
    },
  },
  data() {
    return {
      value: '',
      tempValue: '',
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
    visibleText() {
      const wholeString = `${this.label}: ${this.value}`;
      if (wholeString.length <= 45) {
        return {
          label: this.label,
          value: this.value,
        };
      }

      const oldValue = this.value.toString();
      const oldLabel = this.label.toString();
      let label = '';
      let value = '';
      const labelDiff = 17 - oldLabel.toString().length;
      const valueDiff = 26 - oldValue.toString().length;
      if (labelDiff < 0 && valueDiff >= 0) {
        label = `${oldLabel.slice(0, 15 + valueDiff)}...`;
      } else if (labelDiff < 0 && valueDiff < 0) {
        label = `${oldLabel.slice(0, 15)}...`;
        value = `${oldValue.slice(0, 24)}...`;
      } else if (labelDiff >= 0 && valueDiff < 0) {
        value = `${oldValue.slice(0, 24 + labelDiff)}...`;
      }

      return { label: +label, value: +value };
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.tempValue = this.value;
      } else if (this.value !== this.tempValue) {
        this.changeValue();
      } else if (!this.tempValue && !this.value) {
        this.reset();
      }
    },
    tempValue(val) {
      if (!val) return;
      let stringVal = val.toString();
      if (stringVal.length > 15) stringVal = stringVal.slice(0, 16);
      let result = '';
      let parts = stringVal.split('.');
      parts = parts.slice(0, 2);
      for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].replace(/\D/g, '');
      }
      result = parts.join('.');
      if (result) {
        this.$nextTick(() => this.tempValue = result);
      } else {
        this.$nextTick(() => this.tempValue = '');
      }
    },
    isActive(val) {
      if (!val) {
        this.value = '';
        this.tempValue = '';
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
    enterPress(event) {
      if (event && event.key === 'Enter') this.changeValue();
    },
    changeValue() {
      if (this.mandatory && !this.tempValue && this.tempValue !== 0) return;

      this.value = this.tempValue !== 0 && !this.tempValue
        ? null
        : +this.tempValue;

      if (!this.value && this.value !== 0) {
        this.reset();
      } else {
        this.synchroniseChanges();
      }
      this.open = false;
    },
    synchroniseChanges() {
      this.changeFilter(this.name, { value: this.value });
    },
  },
};
</script>
