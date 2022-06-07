<template>
  <div class="file-uploader-wrapper">
    <div
      :class="{
        'is-dragged-over': isDraggedOver && !minimize,
        'is-invalid': hasError,
        'is-initial-border': !minimize
      }"
      class="file-uploader"
      @drop.prevent="setValue($event)"
      @dragover.prevent
      @dragenter="draggedOver($event)"
      @dragleave="draggedOut($event)"
    >
      <input
        :multiple="multiple"
        :accept="accept"
        class="file-uploader-input"
        type="file"
        @change="setFile($event)"
      >
      <ClipButton
        v-if="minimize"
        :warning="warning"
        @replace-item="triggerInput($event)"
      />
      <FileUploaderField
        v-else
        :file="singleFile"
        :hasFiles="hasFiles"
        :multiple="multiple"
        :warning="warning"
        @remove-item="removeItem"
        @replace-item="triggerInput($event)"
      />
    </div>
    <!-- Отображение файлов -->
<!--    <div class="file-uploader_file-list-wrapper" v-if="hasFiles && multiple">-->
<!--      <span class="uploaded-files-title">-->
<!--        Загруженные файлы:-->
<!--      </span>-->
<!--      <div-->
<!--        v-if="(isPopupMode || isMobile)"-->
<!--        class="file-uploader_file-list"-->
<!--      >-->
<!--        <FileUploaderItem-->
<!--          v-for="(file, index) in localValue"-->
<!--          :key="index"-->
<!--          :file="file"-->
<!--          hide-edit-->
<!--          @remove-item="removeItem(index)"-->
<!--        />-->
<!--      </div>-->
<!--      <div-->
<!--        v-else-if="!isPopupMode"-->
<!--        class="file-uploader_file-list"-->
<!--      >-->
<!--        <IFileChip-->
<!--          v-for="(file, index) of localValue"-->
<!--          :key="'uploader-file-' + index"-->
<!--          :file="file"-->
<!--          show-size-->
<!--          can-be-removed-->
<!--          @remove-file="removeItem(index)"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import validation from '../../mixins/validation';
import FileUploaderItem from './FileUploaderItem';
import IFileChip from '../../../ui-kit/IFileChip';
import FileUploaderField from "./FileUploaderField";
import ClipButton from "../../../ui-kit/ClipButton";

export default {
  name: 'FileUploader',
  components: {
    FileUploaderField,
    FileUploaderItem,
    IFileChip,
    ClipButton,
  },
  mixins: [validation],
  props: {
    value: {
      type: [Array, Object, null],
      default: null,
    },
    query: {
      type: String,
      default: '',
    },
    accept: {
      type: [Boolean, String],
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    isPopupMode: {
      type: Boolean,
      default: false,
    },
    warning: {
      type: String,
      default: 'Общий размер всех файлов не должен превышать 50 мб'
    },
    minimize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [],
      isDraggedOver: false,
      localValue: null,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    singleFile() {
      return this.multiple ? null : this.localValue;
    },
    hasFiles() {
      const type = this.$getType(this.localValue);
      return (type === 'Array' && this.localValue.length !== 0)
        || type === 'Object';
    },
    hasError() {
      return Array.isArray(this.errorList) && this.errorList.length !== 0;
    },
  },
  watch: {
    localValue(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.value)) {
        this.$emit('input', val);
      }
    },
  },
  mounted() {
    if (this.$getType(this.value) === 'Array') {
      this.localValue = [...this.value];
      return;
    }
    this.localValue = this.value;
  },
  methods: {
    removeItem(index) {
      if (this.multiple) {
        this.localValue.splice(index, 1);
        this.files.splice(index, 1);
      } else {
        this.localValue = null;
      }
      this.$emit('onDeleteItem', index, this.localValue);
    },
    setValue(event) {
      if (this.multiple) {
        this.files.splice(
          this.files.length - 1,
          0,
          ...event.dataTransfer.files,
        );
        this.uploadMultipleFiles();
        this.isDraggedOver = false;
        return;
      }
      this.files.pop();
      this.files.push(event.dataTransfer.files[0]);
      this.uploadFile();
      this.isDraggedOver = false;
    },
    setFile(event) {
      if (this.multiple) {
        this.files.splice(
          this.files.length - 1,
          0,
          ...event.target.files,
        );
        this.uploadMultipleFiles();
        return;
      }
      this.files.pop();
      this.files.push(event.target.files[0]);
      this.uploadFile();
    },
    triggerInput(event) {
      console.log('triggerInput', event.target.closest('.file-uploader'))
      const input = event.target
        .closest('.file-uploader')
        .querySelector('input[type="file"]');
      if (!input) return;
      input.click();
    },
    draggedOver(event) {
      if (
        event.target
        && event.target.closest
        && event.target.closest('.file-uploader')
      ) {
        this.isDraggedOver = true;
      }
    },
    draggedOut(event) {
      if (
        event.relatedTarget
        && event.relatedTarget.closest
        && !event.relatedTarget.closest('.file-uploader')
      ) {
        this.isDraggedOver = false;
      }
    },
    async uploadFile() {
      const url = this.query || '/image/reupload';
      const formData = new FormData();
      formData.append('file', this.files[0]);
      formData.append('path', 'file-uploader');

      const request = new Simple(url, formData, 'POST');
      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось загрузить файл'));
      if (!response) return;

      const { name, size, type } = this.files[0];
      const newFile = {
        name,
        mime: type,
        size,
        url: response.data.path,
      };
      this.localValue = newFile;

      this.$store.dispatch(
        'snack/info',
        'Файл успешно загружен.',
      );
      this.$emit('onUploaded', newFile);
    },
    async uploadMultipleFiles() {
      const url = this.query || '/image/massive';
      const formData = new FormData();
      const paths = [];
      this.files.forEach((file, index) => {
        formData.append(`file_${index + 1}`, file);
        paths.push('file-uploader');
      });

      formData.append('path', JSON.stringify(paths));

      const request = new Simple(url, formData, 'POST');
      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler('Сервер не вернул адреса файлов!'));

      if (!response) {
        this.files = [];
        return;
      }

      const links = response.data.path;

      const newFiles = this.files.map((file, index) => ({
        mime: file.type,
        url: links[index],
        name: file.name,
        size: file.size,
      }));

      if (!this.localValue) this.localValue = [];
      this.localValue = [
        ...this.localValue,
        ...newFiles,
      ];

      this.$store.dispatch(
        'snack/info',
        'Файлы успешно загружены.',
      );
      this.$emit('onUploaded', newFiles);
      this.files = [];
    },
    validateRequired() {
      if (this.required && this.hasNoValue(this.localValue)) {
        this.addErrorMessage(this.errorMessage || this.requiredMessage);
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="stylus">
.file-uploader-input
  display: none

dashed_border($color = #dadada)
  return linear-gradient(to right, $color 60%, rgba(255,255,255,0) 0%) bottom\/15px 1px repeat-x\,
  linear-gradient($color 60%, rgba(255,255,255,0) 0%) right\/1px 15px repeat-y\,
  linear-gradient(to right, $color 60%, rgba(255,255,255,0) 0%) top\/15px 1px repeat-x\,
  linear-gradient($color 60%, rgba(255,255,255,0) 0%) left\/1px 15px repeat-y

.file-uploader-wrapper
  display flex
  flex-flow column
  justify-content center
  align-items center
  width 100%

.file-uploader
  display flex
  justify-content center
  height 100%
  width 100%
  &.is-initial-border
    background: dashed_border(#DADADA)
  &.is-dragged-over
    background: dashed_border(#416fc8)
    .default-button
      background: #416FC8
      color: #ffffff
  &.is-invalid
    background: dashed_border(#cf4949)
  &_file-list-wrapper
    display flex
    justify-content center
    align-items: flex-start
    flex-flow column
    width 100%
  &_file-list
    display block
    justify-content center
    flex-flow row
    width 100%

//.file-uploader__error
//  background: dashed_border(#cf4949)
//  &-message
//    position: absolute
//    left: 0
//    bottom: -20px
//    color: #CF4949
//    font-size: 12px
//.file-uploader-text
//  color: #888A91
//  font-size: 14px
//  line-height: 22px
//  text-align: center
//  width: 100%

.uploaded-files-title
  display: inline-block
  margin-bottom: 15px
  font-size: 14px
  font-weight: 500

//.uploaded-files
  //display: grid
  //grid-template: auto \/ repeat(auto-fit, 147px)
  //justify-content: space-between
  //grid-gap: 25px
  //&--not-multiple
  //  display: block
  //  .uploaded-files__item
  //    width: 100%
  //    img
  //      display: block
  //      object-fit: contain
  //      margin-right: 20px
  //img
  //  width: 100%
  //  object-fit: contain
  //  background: #E9EBEF
  //  &.no-background
  //    background: transparent
</style>
