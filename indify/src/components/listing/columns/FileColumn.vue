<template>
  <div
    v-if="isVisible"
    :data-field="field"
    :data-group="clickableGroup"
    :class="{ 'is-hovered': isHovered }"
    class="table-cell file-cell"
  >
    <FileColumnItem
      v-if="!isArray && value"
      :item="value"
      :url-field="urlField"
      :name-field="nameField"
      :mime-field="mimeField"
      :download-icon="downloadIcon"
      :name-length="nameLength"
      :hide-extensions="hideExtensions"
    />
    <FileColumnItem
      v-for="(fileItem, index) in firstItems"
      v-else-if="isArray && value"
      :key="'file_column-' + index"
      :item="fileItem"
      :url-field="urlField"
      :name-field="nameField"
      :mime-field="mimeField"
      :download-icon="downloadIcon"
      :name-length="nameLength"
      :hide-extensions="hideExtensions"
    />
    <span v-else>{{ empty }}</span>
    <div
      v-if="isArray && otherItems.length !== 0"
      class="file-column-item last js-ignore-clicks"
    >
      <span>Еще</span>
      <v-icon
        dense
        size="20"
        @click="toggle"
      >
        keyboard_arrow_down
      </v-icon>
    </div>
    <div
      v-if="useFileBreaker && showList && otherItems.length !== 0"
      class="file-breaker"
    />
    <FileColumnItem
      v-for="(fileItem, index) in otherItems"
      :key="'file_column1-' + index"
      :item="fileItem"
      :url-field="urlField"
      :name-field="nameField"
      :mime-field="mimeField"
      :download-icon="downloadIcon"
      :name-length="nameLength"
      :hide-extensions="hideExtensions"
    />
  </div>
</template>

<script>
import { findArray } from '../../../helpers';
import FileColumnItem from './FileColumnItem';
import clickableGroup from './clickableGroup.js';

export default {
  name: 'FileColumn',
  components: {
    FileColumnItem,
  },
  mixins: [clickableGroup],
  props: {
    field: {
      type: String,
      required: true,
    },
    empty: {
      type: String,
      default: '',
    },
    urlField: {
      type: String,
      default: 'url',
    },
    nameField: {
      type: String,
      default: 'name',
    },
    mimeField: {
      type: String,
      default: 'MIME',
    },
    downloadIcon: {
      type: [String, Function],
      default: 'cloud_download',
    },
    nameLength: {
      type: [Number, String],
      default: 3,
    },
    hideExtensions: {
      type: Boolean,
      default: false,
    },
    filesInARow: {
      type: [Number, String],
      default: 3,
    },
    method: {
      type: String,
      default: 'POST',
      validator: value => ['GET', 'POST'].includes(value),
    },
    requestHandler: {
      type: [Function, null],
      default: null,
    },
    useFileBreaker: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showList: false,
    };
  },
  computed: {
    value() {
      return findArray(this.item, this.field);
    },
    isArray() {
      return this.value && Array.isArray(this.value.item);
    },
    firstItems() {
      return this.isArray ? this.value.item.slice(0, +this.filesInARow) : [];
    },
    otherItems() {
      return this.isArray && this.showList
        ? this.value.item.slice(+this.filesInARow)
        : [];
    },
    item() {
      return this.$parent.item;
    },
    isVisible() {
      if (!this.$parent.visibleColumns) return true;
      return this.$parent.visibleColumns[this.field];
    },
  },
  methods: {
    toggle() {
      this.showList = !this.showList;
    },
  },
};
</script>

<style lang="stylus">
.file-column-list
  position: absolute!important
  top: 100%
  right: 0
  z-index: 3

.file-cell
  position: relative
  display: flex
  flex-flow: row wrap
  align-items: center

.file-breaker
  flex-basis: 100%
</style>
