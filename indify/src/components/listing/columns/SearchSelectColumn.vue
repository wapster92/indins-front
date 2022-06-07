<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :class="{
      'is-selecting' : isEditing,
      'is-saving-select-cell' : showProgress ,
      'is-searching': (isEditing && !hideSearch)
    }"
    class="table-cell"
  >
    <div
      v-if="isEditing"
      class="is-selecting-wrapper"
    >
      <input
        v-if="!hideSearch"
        ref="search"
        v-model="searchVal"
        class="is-searching-input"
        type="text"
        @input="startSearch($event)"
        @blur="showTableCell"
      >
      <div
        v-if="!hideSearch"
        class="dropdown-icon"
      >
        <v-icon
          size="20"
          color="#888A90"
        >
          manage_search
        </v-icon>
      </div>
      <div
        class="dropdown-content"
      >
        <ScrollComponent vertical />
        <div
          v-for="(option, index) in options"
          :key="index"
          class="dropdown-item"
          @mousedown="selectOption(option)"
        >
          <svg
            v-if="coloredChip && option.id"
            class="color-option-svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="3"
              cy="3"
              r="3"
              :fill="option.color || '#e0e0e0'"
            />
          </svg>
          <span>{{ option[itemText] || '-' }}</span>
        </div>
      </div>
    </div>
    <v-progress-linear
      v-else-if="showProgress"
      indeterminate
      :color="progress.color"
      height="100%"
    >
      <v-chip
        v-if="coloredChip && (shownValue !== empty)"
        color="#e0e0e0"
        class="selected-colored-chip"
        v-bind="chipOptions"
      >
        {{ shownValue }}
      </v-chip>
      <span
        v-else
        class="is-saving-span"
      >
        {{ shownValue }}
      </span>
    </v-progress-linear>
    <div
      v-if="!showProgress || (isEditing && hideSearch)"
      ref="showDiv"
      class="show-value-wrapper"
      tabindex="1"
      @click="showSearchAndDropdown"
      @blur="hideSearch ? showTableCell() : null"
    >
      <v-chip
        v-if="coloredChip && (shownValue !== empty)"
        v-bind="chipOptions"
        class="selected-colored-chip"
      >
        {{ shownValue }}
      </v-chip>
      <span v-else>
        {{ shownValue }}
      </span>
      <div
        v-if="!readonly"
        class="dropdown-icon"
      >
        <v-icon
          v-if="isEditing"
          size="20"
          color="#888A90"
        >
          arrow_drop_up
        </v-icon>
        <v-icon
          v-else
          class="dropdown-icon-down"
          size="20"
          color="#888A90"
        >
          arrow_drop_down
        </v-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { Get, Filter, Put } from 'core-xhr';
import { debounce } from 'indify/src/helpers/decorators';
import { contrastTextColor } from 'indify/src/helpers';

export default {
  name: 'SearchSelectColumn',
  props: {
    field: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: String,
      default: '-',
    },
    saveQuery: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    itemText: {
      type: String,
      default: 'name',
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    searchDebounceTime: {
      type: Number,
      default: 300,
    },
    allowDeleted: {
      type: Boolean,
      default: false,
    },
    progress: {
      type: Object,
      default: () => ({
        minTime: 200,
        color: '#f4f8fd',
      }),
    },
    coloredChip: {
      type: Boolean,
      default: false,
    },
    colorField: {
      type: String,
      default: null,
    },
    chipProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      searchVal: null,
      savingValue: null,
      savingColor: null,
      isEditing: false,
      isSaving: false,
      showProgressOnBlur: false,
      options: [],
    };
  },
  computed: {
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
    rowItem() {
      return this.$parent.item;
    },
    dbItem() {
      return this.$fieldResolver.getFieldObj(this.rowItem, this.field);
    },
    dbValue() {
      return this.$fieldResolver.getFieldValue(this.dbItem, this.itemText);
    },
    showProgress() {
      return ((this.isSaving && !this.isEditing) || (this.showProgressOnBlur && !this.isEditing));
    },
    shownValue() {
      let val = this.dbValue;
      if (this.savingValue !== null) {
        val = this.savingValue;
      }
      return val || this.empty;
    },
    chipColor() {
      const color = this.$fieldResolver.getFieldValue(this.dbItem, this.colorField);
      return this.coloredChip ? color || '#e0e0e0' : '#e0e0e0';
    },
    textColor() {
      return contrastTextColor(this.chipColor) || '#000000';
    },
    chipOptions() {
      const defaultProps = {
        color: this.savingColor || this.chipColor,
        textColor: this.textColor,
        label: true,
        small: true,
      };
      if (this.$getType(this.chipProps) !== 'Object') return defaultProps;
      return {
        ...defaultProps,
        ...this.chipProps,
      };
    },
  },
  watch: {
    dbValue() {
      this.savingValue = null;
      this.savingColor = null;
    },
  },
  methods: {
    findOption(item) {
      if (!this.item?.id) return {};
      return this.options.find(o => o.id === item.id) || {};
    },
    async getOptions(filter = {}) {
      try {
        const filterArray = [];
        if (filter?.field) filterArray.push(new Filter({ ...filter }));
        if (!this.allowDeleted) filterArray.push(new Filter('deletedAt', 'exists', false));
        const request = new Get(this.query)
          .collection()
          .setFilter(filterArray)
          .limitStart(0)
          .limitShown(50);
        const response = await this.$xhr.send(request);
        if (!response?.data?.success) {
          throw new Error('Получить список searchSelectColumn не удалось!');
        }
        return response?.data?.data.result || [];
      } catch (error) {
        this.$errorHandler('Сохранить значение не удалось!')(error);
        return [];
      }
    },
    async setOptionsArr(filter = {}) {
      this.options = [{ [this.itemText]: 'Загрузка...' }];
      const arr = await this.getOptions(filter);
      if (!arr[0]?.id) {
        this.options = [{ [this.itemText]: 'Нет данных' }];
      } else {
        this.options = [...arr];
      }
    },
    async showSearchAndDropdown() {
      if (this.isSaving || this.readonly) return;
      await this.setOptionsArr();
      const selected = this.findOption(this.dbItem) || {};
      this.searchVal = selected[this.itemText] || '';
      this.isEditing = true;
      if (!this.hideSearch) {
        this.startSearch = debounce(this.startSearch, this.searchDebounceTime);
        this.$nextTick(() => this.$refs.search.focus());
      } else {
        this.$nextTick(() => this.$refs.showDiv.focus());
      }
    },
    selectOption(option) {
      this.searchVal = null;
      if (option?.id) {
        this.showProgressOnBlur = true;
        this.savingValue = option[this.itemText];
        this.savingColor = option.color || '#e0e0e0';
        this.save(option);
      }
      this.showTableCell();
    },
    startSearch(e) {
      if (this.hideSearch) return;
      const searchVal = e.target.value.trim();
      if (!searchVal) return;
      this.setOptionsArr({
        field: this.itemText,
        filter: 'like',
        value: searchVal,
        mandatory: true,
      });
    },
    async save({ id }) {
      try {
        if (!this.rowItem.id) {
          throw new Error('Отсутствует ID');
        }
        const request = new Put(this.saveQuery).addFilter(new Filter('id', 'eq', this.rowItem.id));
        const requestData = this.$fieldResolver.setFieldValue(this.field, { id })
        if (!requestData.id) delete requestData.id;
        request.setData(requestData);
        const response = await this.$xhr.send(request);
        if (response?.data?.success && response?.data?.data?.updatedRows === 0) {
          throw new Error('success, but updatedRows === 0');
        }
      } catch (error) {
        this.savingValue = null;
        this.$errorHandler('Сохранить значение не удалось!')(error);
      } finally {
        this.isSaving = false;
      }
    },
    showTableCell() {
      this.options = [];
      this.isEditing = false;
      setTimeout(() => { this.showProgressOnBlur = false; }, this.progress.minTime);
    },
  },
};
</script>

<style lang="stylus">
.table-cell:not(:hover) .dropdown-icon-down
  display: none
.is-selecting
  border: 1px solid #416FC8
  background-color: #ffffff
  padding: 6px 15px
  &-wrapper
    display: flex
  & .show-value-wrapper
    margin: -1px 0 0 -1px
  &.is-searching
    padding-left: 0
    & .is-searching-input
      padding-left: 15px
      margin-bottom: 5px
    & .dropdown-content
      margin-left: 0 !important

.is-saving-select
  &-cell
    padding: 0
    & .v-progress-linear__content
      justify-content: flex-start
      padding-left: 15px
      & > .colored
        padding: 0 11px
        background-color: #e0e0e0
        border-radius: 4px

.dropdown-content
  margin: 35px auto 0 -15px
  padding: 6px 0
  position: absolute
  background-color: #fff
  min-width: 200px
  min-height: 62px
  max-height: 159px
  border-radius: 4px
  box-shadow: 0 5px 20px rgba(63, 74, 106, 0.4)
  overflow: hidden
  z-index: 10
  .dropdown-item
    min-height: 40px
    padding: 14px 22px
    display: block
    cursor: pointer
    &:hover
      background-color: #F3F5F8
      color: #416FC8

.color-option-svg
  display: inline-block
  margin: 2px 5px 0 0

.dropdown-icon
  display: inline-block
  margin: 0 -6px 0 auto

.show-value-wrapper
  display: flex
  & span, v-chip__content
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    margin-right: 6px

.selected-colored-chip
  font-size: 14px !important
  overflow: hidden
  white-space: nowrap
  text-overflow: ellipsis

</style>
