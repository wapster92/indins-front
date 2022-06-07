<template>
    <div
      class="i-file-img__item"
      :class="isImage ? '': 'no-img'"
      @click="downloadImg"
    >
      <img
        v-if="isImage"
        class="i-file-img_image"
        :src="url"
        :alt="fileName"
        @error="togglePlaceholder(false)"
      >
      <div class="i-file-img_info_wrapper">
        <div class="i-file-img_info">
          <div class="i-file-img_info_top">
            <div class="i-file-img_file-name">
              {{ fileName }}
            </div>
          </div>
          <div class="i-file-img_info_bottom">
            <div class="i-file-img_file-size">
              <v-icon size="15">
                insert_drive_file
              </v-icon>
              <span class="i-file-img_file-size_text">
              {{ fileSize }}
            </span>
            </div>
            <div class="i-file-img_actions">
              <button
                v-if="!hideEdit"
                class="listing-icon-button edit"
                @click.stop="emitReplace($event)"
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
                @click.stop="emitRemove"
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
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'IFileImg',
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
      isImage: true
    };
  },
  created() {
    this.checkImage()
  },
  computed: {
    url() {
      return this.file?.url || null;
    },
    fileName() {
      return this.file?.name || '';
    },
    fileSize() {
      return this.$getType(this.file?.size) === 'Number'
        ? `${Math.round(this.file.size / 1000)} КБ`
        : '';
    },
  },
  methods: {
    emitRemove() {
      this.$emit('remove-file');
    },
    emitReplace(event) {
      this.$emit('replace-file', event);
    },
    togglePlaceholder(value) {
      this.isImage = value
    },
    checkImage() {
      if (!this.file?.url) { this.isImage = false; return }
      const imageExtensions = ['svg', 'png', 'jpg'];
      this.isImage = imageExtensions.some(ext => {
        const type = this.$defaultConfig.mimeTypes[this.file?.mime];
        return type?.ext === ext;
      });
    },
    downloadImg() {
      if (!this.url || !this.$downloadByURL) return
      this.$downloadByURL(this.url)
    }
  },
};
</script>

<style lang="stylus">
.i-file-img__item
  height 94px
  position relative
  cursor pointer
  .i-file-img_info
    opacity: 0
    transition: opacity 0.3s ease-in-out
    color: var(--light-text-color)
  &:hover
    .i-file-img_info
      opacity: 1
      background-color rgba(32, 33, 36, 0.6);

.i-file-img
  &_info
    height 94px
    display flex
    flex-flow column
    justify-content: space-between
    padding 10px
    width 100%
    &_wrapper
      display block
      position absolute
      top: 0
      width 100%
    &_bottom
      display flex
      flex-flow row
      justify-content space-between
      align-items center
    &_top
      flex-flow row

.i-file-img__item.no-img
  width: 140px
  .i-file-img
    &_info
      opacity: 1
      position static
      display: flex;
      width: 140px
      background-color: #E9EBEF
      color: var(--dark-text-color)
    &_file-size
      color: var(--grey-text-color)
      .theme--light.v-icon
        color: var(--grey-text-color)
  &:hover
    .i-file-img_info
        background-color: #DFEBFA

.i-file-img
  &_file-name
    font-size 12px
    overflow: hidden
  &_file-size
    display flex
    &_text
      padding-top 6px
      font-size 12px
      overflow hidden


.i-file-img
  &_image
    height 100%
    width auto
    display block
  &_file-size
    .theme--light.v-icon
      color: var(--light-text-color)

//.i-file-img-file-name
//  position: relative
//  top: 10px
//  left: 14px
//  right: 14px
//  z-index: 2
//  font-size: 12px
//  line-height: 16px
//  color: #202124
//  white-space: nowrap
//  overflow: hidden
//  text-overflow: ellipsis
//
//.i-file-img-file-size
//  position: relative
//  bottom: 14px
//  left: 14px
//  display: flex
//  flex-flow: row nowrap
//  align-items: center
//  font-size: 12px
//  line-height: 14px
//  text-transform: uppercase
//  .v-icon
//    margin-right: 4px
//
//.i-file-img-actions
//  position: relative
//  right: 10px
//  bottom: 10px
//  z-index: 2
//  display: flex
//  flex-flow: row nowrap
//  justify-content: flex-end
//  width: calc(100% - 10px)
//  height: 29px
//  .listing-icon-button
//    &.delete
//      margin-left: 10px
//    &.edit:hover
//      background: #416FC8
//      .v-icon
//        color: #ffffff!important
//    &.delete:hover
//      background: #CF4949
//      .v-icon
//        color: #ffffff!important
</style>
