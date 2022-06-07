<template>
  <div
    :class="{ 'is-removable': canBeRemoved }"
    class="dynamic-comments-uploaded-item"
  >
    <v-chip
      :color="chipColor"
      class="dynamic-comments-uploaded-extension"
      label
    >
      {{ extension }}
    </v-chip>
    <div class="dynamic-comments-uploaded-info">
      <component
        :is="isLink ? 'a' : 'div'"
        v-bind="nameProps"
      >
        {{ file.name }}
      </component>
      <span v-if="showSize">
        ({{ file.size | fileSize }})
      </span>
    </div>
    <v-btn
      v-if="canBeRemoved"
      class="dynamic-comments-uploaded-remove"
      depressed
      width="20"
      height="20"
      max-width="24"
      min-width="0"
      color="transparent"
      @click="removeFile"
    >
      <v-icon
        size="18"
        color="#888A91"
      >
        close
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'DynamicCommentsFileItem',
  filters: {
    fileSize(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
    },
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    file: {
      default: null,
    },
    showSize: {
      type: Boolean,
      default: false,
    },
    canBeRemoved: {
      type: Boolean,
      default: false,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    chipColor() {
      const defaultColor = this.$defaultConfig.mimeTypes.defaultMime.color;
      if (!this.file) return defaultColor;
      const mime = this.file.mime || this.file.type;
      if (!mime) return defaultColor;
      return this.$defaultConfig.mimeTypes[mime]?.color || defaultColor;
    },
    extension() {
      const defaultExt = this.$defaultConfig.mimeTypes.defaultMime.ext;
      if (!this.file) return defaultExt;
      const mime = this.file.mime || this.file.type;
      if (!mime) return defaultExt;
      return this.$defaultConfig.mimeTypes[mime]?.ext || defaultExt;
    },
    nameProps() {
      return {
        href: this.isLink ? this.file.url : '',
        download: this.isLink ? this.file.name : '',
      };
    },
  },
  methods: {
    removeFile() {
      this.$emit('remove-file');
    },
  },
};
</script>

<style lang="stylus">
.dynamic-comments-uploaded-item
  display: grid
  grid-template: auto \/ 36px 1fr
  align-items: start
  grid-gap: 0
  max-width: 100%
  height: 20px
  margin: 10px 10px 0 0
  padding-right: 2px
  border-radius: 2px
  background: #F3F5F8
  overflow: hidden
  &.is-removable
    grid-template-columns: 36px 1fr 20px
    .dynamic-comments-uploaded-info
      padding-right: 2px
  .v-chip.v-size--default
    width: 36px
    height: 20px
    border-radius: 0!important
    font-size: 11px
    line-height: 11px
    .v-chip__content
      color: #ffffff

.dynamic-comments-uploaded-extension
  display: flex
  flex-flow: row nowrap
  justify-content: center
  text-transform: uppercase
  &.v-chip
    padding: 0

.dynamic-comments-uploaded-info
  display: grid
  grid-template: auto \/ 1fr auto
  align-items: center
  padding: 0 4px 0 9px
  font-size: 13px
  span
    color: rgba(0, 0, 0, 0.4)
    white-space: nowrap
  div
    margin-right: 4px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  a
    color: rgba(0,0,0,.87)
    text-decoration: none

.dynamic-comments-uploaded-remove
  padding: 0!important
</style>
