<template>
  <div
    :class="{ 'is-image': isImage }"
    class="uploaded-files__item"
  >
    <div class="uploaded-files_img"
         :style="{ background: bgStyle }"></div>
    <div class="file-uploader-file-name">
      {{ fileName }}
    </div>
    <div
      :style="{ color: fileIconColor }"
      class="file-uploader-file-size"
    >
      <v-icon
        :color="fileIconColor"
        size="15"
      >
        insert_drive_file
      </v-icon>
      <span>
        {{ fileSize }}
      </span>
    </div>
    <div class="file-uploader-actions">
      <button
        v-if="!hideEdit"
        class="listing-icon-button edit"
        @click="emitReplace($event)"
      >
        <v-icon
          size="18"
          color="#416FC8"
        >
          edit
        </v-icon>
      </button>
      <button
        class="listing-icon-button delete"
        @click="emitRemove"
      >
        <v-icon
          size="18"
          color="#CF4949"
        >
          delete
        </v-icon>
      </button>
    </div>
  </div>
</template>

<script>
import fileImage from '../../../../icons/files/file.svg';

export default {
  name: 'FileUploaderItem',
  props: {
    file: {
      type: Object,
      default: () => ({}),
    },
    hideEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      placeholder: false,
    };
  },
  computed: {
    bgStyle() {
      return this.file.url ? `center / contain no-repeat url("${this.file.url}")` : null
    },
    fileName() {
      return this.file?.name || '';
    },
    fileIconColor() {
      return this.isImage ? '#ffffff' : '#dadada';
    },
    fileSize() {
      return this.$getType(this.file?.size) === 'Number'
        ? `${Math.round(this.file.size / 1000)} КБ`
        : '';
    },
    isImage() {
      const imageExtensions = ['svg', 'png', 'jpg'];
      return imageExtensions.some(ext => {
        const type = this.$defaultConfig.mimeTypes[this.file?.mime];
        return type?.ext === ext;
      });
    },
  },
  methods: {
    emitRemove() {
      this.$emit('remove-item');
    },
    emitReplace(event) {
      this.$emit('replace-item', event);
    },
    togglePlaceholder(value) {
      this.placeholder = value === undefined ? !this.placeholder : value;
    },
  },
};
</script>

<style lang="stylus">
.uploaded-files__item
  height 100%
  width: 100%
  padding 2px
  display inline-block
  position: relative
  &.is-image
    .file-uploader-actions, .file-uploader-file-name, .file-uploader-file-size
      opacity: 0
      transition: opacity 0.3s ease
    &:hover
      .file-uploader-actions, .file-uploader-file-name, .file-uploader-file-size
        opacity: 1

.uploaded-files_image
  height 100%

.file-uploader-file-name
  position: absolute
  top: 10px
  left: 14px
  right: 14px
  z-index: 2
  font-size: 12px
  line-height: 16px
  color: #202124
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.file-uploader-file-size
  position: absolute
  bottom: 14px
  left: 14px
  display: flex
  flex-flow: row nowrap
  align-items: center
  font-size: 12px
  line-height: 14px
  text-transform: uppercase
  .v-icon
    margin-right: 4px

.file-uploader-actions
  position: absolute
  right: 10px
  bottom: 10px
  z-index: 2
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  width: calc(100% - 10px)
  height: 29px
  .listing-icon-button
    &.delete
      margin-left: 10px
    &.edit:hover
      background: #416FC8
      .v-icon
        color: #ffffff!important
    &.delete:hover
      background: #CF4949
      .v-icon
        color: #ffffff!important
</style>
