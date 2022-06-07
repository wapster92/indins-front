<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <div
        class="file-column-item js-ignore-clicks"
        :class="{'hide-extensions': hideExtensions}"
        v-bind="attrs"
        v-on="on"
      >
        <div
          v-if="!hideExtensions"
          class="file-column-item-icon"
          :style="colorStyles"
        >
          {{ mime.ext }}
        </div>
        <span>
          {{ shortName }}
        </span>
        <v-icon
          size="20"
          dense
          @click="download"
        >
          {{ loadIcon }}
        </v-icon>
      </div>
    </template>
    <span>
      {{ fileName || "Безымянный файл" }}
    </span>
  </v-tooltip>
</template>

<script>
import { getObjectField } from '../../../helpers';

export default {
  name: 'FileDownloadColumnItem',
  props: {
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
    method: {
      type: String,
      default: 'POST',
    },
    requestHandler: {
      type: [Function, null],
      default: null,
    },
    downloadIcon: {
      type: [String, Function],
      default: 'cloud_download',
    },
    item: {
      type: [Object, null],
      default: null,
    },
    originalItem: {
      type: [Object, null],
      default: null,
    },
    nameLength: {
      type: [Number, String],
      default: 3,
    },
    hideExtensions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    url() {
      return this.urlField
        ? getObjectField(this.item, this.urlField) || ''
        : '';
    },
    fileName() {
      return this.nameField
        ? getObjectField(this.item, this.nameField) || ''
        : '';
    },
    shortName() {
      if (this.fileName.length <= +this.nameLength) return this.fileName;
      return `${this.fileName.slice(0, +this.nameLength)}...`;
    },
    mime() {
      const mime = getObjectField(this.item, this.mimeField);
      return this.$defaultConfig.mimeTypes[mime]
        || this.$defaultConfig.mimeTypes.defaultMime;
    },
    colorStyles() {
      return `background-color: ${this.mime.color || '#ffffff'};`;
    },
    loadIcon() {
      const type = this.$getType(this.downloadIcon);
      if (type === 'String') return this.downloadIcon;
      if (type === 'Function') {
        return this.downloadIcon(this.item, this.originalItem);
      }
      return 'cloud_download';
    },
  },
  methods: {
    download() {
      if (this.requestHandler) {
        return this.requestHandler(this.item, this.originalItem);
      }
      this.$xhr.downloadFile({
        url: this.url,
        method: this.method,
        data: {},
        fileName: this.fileName,
      });
    },
  },
};
</script>

<style lang="stylus">
.file-column-item
  display: grid
  grid-template: auto \/ 36px minmax(34px, 1fr) 26px
  grid-gap: 5px
  align-items: center
  height: 26px
  margin: 2px 18px 2px 0
  background-color: #F3F5F8
  font-size: 13px
  line-height: 16px
  &.hide-extensions
    grid-template-columns: minmax(34px, 1fr) 26px
    padding-left: 4px
  .v-icon.v-icon
    width: 26px
    height: 26px
    &:hover::after
      opacity: .22
    &::after
      border-radius: 0
      transform: scale(1)
  &.last
    grid-template-columns: 34px 26px
    .v-icon.v-icon
      margin-left: auto
    span
      margin-left: 7px

.file-column-item-icon
  display: grid
  grid-template: 100% \/ 100%
  align-items: center
  justify-items: center
  width: 36px
  height: 26px
  font-size: 10px
  line-height: 11px
  font-weight: 500
  text-transform: uppercase
  color: #ffffff
</style>
