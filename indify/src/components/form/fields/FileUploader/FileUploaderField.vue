<template>
  <div class="file-uploader-field">
    <p
      v-if="!hasFiles || multiple"
      class="file-uploader-field_text"
    >
      Перетащите файл сюда или нажмите на кнопку «{{ uploadButtonText }}»
      <v-tooltip
        bottom
        max-width="264"
        color="white"
        content-class="upload-tooltip"
      >
        <template #activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            size="15"
            color="#D3D4DB"
            v-on="on"
          >
            mdi-help-circle-outline
          </v-icon>
        </template>
        <span>
          Файл должен быть в формате <br> .jpeg, .jpg. или .png <br>
          {{ warning }}
        </span>
      </v-tooltip>
    </p>
    <SimpleButton
      v-if="!hasFiles || multiple"
      outlined
      @click.prevent="triggerInput($event)"
    >
      {{ uploadButtonText }}
    </SimpleButton>
    <div
      v-if="hasFiles && !multiple"
      class="uploaded-files uploaded-files--not-multiple"
    >

      <FileUploaderItem
        :file="file"
        @replace-item="triggerInput($event)"
        @remove-item="removeItem"
      />
    </div>
  </div>
</template>

<script>
import FileUploaderItem from "./FileUploaderItem";
import SimpleButton from "../../../ui-kit/SimpleButton"

export default {
  name: "FileUploaderField",
  components: {
    FileUploaderItem,
    SimpleButton
  },
  props: {
    warning: {
      type: String,
      default: 'Общий размер всех файлов не должен превышать 50 мб'
    },
    file: {
      type: [Object, null],
      default: null
    },
    hasFiles: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [],
      totalWeight: null,
    }
  },
  computed: {
    uploadButtonText() {
      return `Загрузить файл${this.multiple ? 'ы' : ''}`;
    },
  },
  methods: {
    removeItem(item) {
      this.$emit('remove-item', item)
    },
    triggerInput(item) {
      this.$emit('replace-item', item)
    }
  }
}
</script>

<style lang="stylus">
.uploaded-files
  &--not-multiple
    height 100%
    width 100%
    padding 8px
  &_img
    width 100%
    height 100%

.file-uploader-field
  position: relative
  display: flex
  flex-flow: row wrap
  justify-content: center
  align-items: center
  width: 100%
  min-height 166px
  //padding: 36px
  //margin: 0 0 14px
  background: dashed_border(#dadada) #FAFBFC
  &_text
    color: var(--grey-text-color)
    font-size: 14px
    line-height: 22px
    text-align: center
    width: 100%

.upload-tooltip.v-tooltip__content
  padding: 20px
  background: #ffffff
  opacity: 1!important
  box-shadow: 0 5px 20px rgba(63, 74, 106, 0.4)
  span
    display flex
    justify-content center
    color: #202124

</style>