<template>
  <div
    class="i-comments-write"
    :class="{
      'is-empty': !comment && !value,
    }"
  >
    <div class="i-comments-field">
      <slot
        :comment="comment"
        :input="(value) => comment = value"
      >
        <TextareaInput
          v-model="comment"
          :placeholder="commentFieldPlaceholder"
          :max-height="maxFieldHeight"
          class="i-comments-textarea"
          input-type="standart"
          hide-details
          @keydown.native.capture.enter="enterPress($event)"
        />
      </slot>
    </div>
    <div
      v-if="filesField && Array.isArray(files) && files.length !== 0"
      class="i-comments-uploaded"
    >
      <IFiles
        v-model="files"
        can-be-removed
      />
    </div>

<!--    <div-->
<!--      v-if="filesField && Array.isArray(files) && files.length !== 0"-->
<!--      class="i-comments-uploaded"-->
<!--    >-->
<!--      <IFileChip-->
<!--        v-for="(file, index) of visibleFiles"-->
<!--        :key="'comment-file-' + index"-->
<!--        :file="file"-->
<!--        show-size-->
<!--        can-be-removed-->
<!--        @remove-file="removeFile(index)"-->
<!--      />-->
<!--      <div-->
<!--        v-if="Array.isArray(files) && files.length > 2"-->
<!--        class="i-comments-more-files"-->
<!--        @click="toggleFiles"-->
<!--      >-->
<!--        <span>{{ moreFilesText }}</span>-->
<!--        <div class="more-files-arrow">-->
<!--          <v-icon-->
<!--            size="18"-->
<!--            color="#416FC8"-->
<!--          >-->
<!--            {{ moreFilesIcon }}-->
<!--          </v-icon>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <FileUploader
      v-if="filesField"
      class="i-comments_file-uploader"
      minimize
      v-model="uploadedFile"
    />
    <div class="i-comments-submit-buttons">
      <SimpleButton
        v-if="isComment"
        outlined
        height="30"
        @click="cancellation(true)"
      >
        Отмена
      </SimpleButton>
      <SimpleButton
        v-if="!isMobile"
        :loading="isSending"
        :disabled="preventSending"
        :class="value ? 'ml-2' : 'mx-2'"
        height="30"
        @click="sendComment"
      >
        {{ isComment ? 'Изменить' : 'Отправить' }}
      </SimpleButton>
      <svg
        v-else
        class="i-comments-send-icon"
        width="23"
        height="20"
        @click="sendComment"
      >
        <path
          :fill="comment ? '#416FC8' : '#E9EBEF'"
          d="M0.166992 19.75L22.917 10L0.166992 0.25V7.83333L16.417 10L0.166992 12.1667V19.75Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { setObjectField, getObjectField } from 'indify';
import {  Post, Put, Filter,} from 'core-xhr';
import IFileChip from '../../ui-kit/IFileChip';
import ClipButton from "../../ui-kit/ClipButton";
import SimpleButton from "../../ui-kit/SimpleButton";
import FileUploader from "../../form/fields/FileUploader/FileUploader";
import IFiles from "../../ui-kit/IFiles";

export default {
  name: 'ICommentsField',
  components: {
    IFileChip,
    ClipButton,
    SimpleButton,
    FileUploader,
    IFiles
  },
  props: {
    value: {
      type: [Object, null],
      default: null,
    },
    query: {
      type: [String, Object, null],
      default: null,
    },
    maxFieldHeight: {
      type: [String, Number],
      default: 0,
    },
    filesField: {
      type: String,
      default: 'commentFiles',
    },
    authorField: {
      type: String,
      default: 'user',
    },
    isComment: {
      type: Boolean,
      default: false
    }
    // preComments: {
    //   type: Array,
    //   default: () => [],
    // },
    // attachField: {
    //   type: String,
    //   default: '',
    // },
    // attachId: {
    //   type: [String, Number],
    //   default: '',
    // },
  },
  data() {
    return {
      comment: '',
      files: [],
      // uploadedFiles: [],
      uploadedFile: null,
      totalWeight: 0,
      showAllFiles: false,
      isSending: false,
      cashedValue: null,
    };
  },
  computed: {
    // isAddPage() {
    //   return this.$route.params.id === 'add';
    // },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    preventSending() {
      return (!this.comment && this.files?.length <= 0) || this.isSending;
    },
    commentFieldPlaceholder() {
      if (this.value) return 'Текст комментария...';
      return 'Напишите комментарий'
    },
    visibleFiles() {
      return this.showAllFiles ? this.files : this.files.slice(0, 2);
    },
    moreFilesText() {
      return this.showAllFiles
        ? `Скрыть ${this.files?.length - 2}`
        : `Еще ${this.files?.length - 2}`;
    },
    moreFilesIcon() {
      return this.showAllFiles ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
    hasNoFiles() {
      return !Array.isArray(this.files) || this.files?.length === 0;
    },
  },
  // mounted() {
  //   this.cashedValue  = this.value
  //   console.log(this.cashedValue)
  // },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (!value) return;
        if (this.filesField) this.files = getObjectField(this.value, this.filesField) || [];
        this.comment = value?.text || '';
      },
    },
    uploadedFile: {
      handler(val) {
        if (val instanceof Object) {
          this.files.push(val)
        }
      }
    }
    // savePre(newVal) {
    //   if (newVal) this.preComments.forEach(c => this.sendComment(c));
    // },
  },
  methods: {
    toggleFiles() {
      this.showAllFiles = !this.showAllFiles;
    },
    removeFile(index) {
      const filesList = Array.from(this.files);
      filesList.splice(index, 1);
      this.files = filesList;
      this.totalWeight = this.files.reduce((acc, item) => acc + item.size, 0);
    },
    enterPress(event) {
      if (event.metaKey || event.ctrlKey) this.sendComment();
    },
    cancellation(emit) {
      if (emit) this.$emit('cancel');
      this.comment = '';
      this.files = [];
    },
    async sendComment() {
      if (!this.comment && this.hasNoFiles) return;

      let requestData = {...this.value}

      requestData.text = this.comment || '';

      setObjectField(
        requestData,
        this.filesField,
        this.files,
        true,
      );

      let responsible = this.query
        ? { id: this.$store.getters['auth/getData'].id }
        : { ...this.$store.getters['auth/getData'] }

      setObjectField(
        requestData,
        this.authorField,
        responsible,
        true,
      );

      if (this.query) delete requestData.createdAt

      // delete requestData.createdAt
      // if (this.attachField) {
      //   setObjectField(
      //     requestData,
      //     this.attachField,
      //     { id: +this.attachId },
      //     true,
      //   );
      // }

      const type = this.$getType(this.query);
      if (type !== 'String' && type !== 'Object') {

        if (!requestData.createdAt) {
          let [date, time] = new Date().toLocaleString('ru-Ru').split(',')
          date = date.split('.').reverse().join('-')
          requestData.createdAt = date + time
        }

        this.$emit('send-comment', {...requestData});
        this.cancellation()
        return;
      }
      // eslint-disable-next-line no-underscore-dangle
      const queryString = type === 'String' ? this.query : this.query?._key;

      const request = this.value
        ? new Put(queryString)
          .addFilter(new Filter('id', 'eq', this.value.id))
        : new Post(queryString);

      this.isSending = true;
      // const filesResponse = await this.sendFiles();

      request
        .setData(requestData)
        .entity()
        .addHeader('Content-Type', 'multipart/form-data');

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось отправить комментарий!'));
      this.isSending = false;
      if (!response) return;
      this.$store.dispatch('snack/notify', 'Комментарий успешно сохранен.');
      this.cancellation(true);
    },
    /*async sendFiles(files) {
      if (!files || !files.length) return;
      this.totalWeight = this.totalWeight + files.reduce((acc, item) => acc + item.size, 0);
      if (this.totalWeight > 50000000) {
        this.$store.dispatch('snack/error','Общий размер всех файлов не должен превышать 50 мб');
        return;
      }
      const promises = [];
      const uploadedFiles = [];
      const notUploadedFiles = [];

      this.files.forEach(file => {
        if (this.$getType(file) !== 'File') {
          notUploadedFiles.push(file);
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', 'file-uploader');
        const promise = this.$xhr.send(new Simple('/image/reupload', formData, 'POST'));
        promises.push(promise);
        uploadedFiles.push({
          name: file.name,
          size: file.size,
        });
      });

      const fileResponses = await Promise.all(promises)
        .catch(this.$showError('Не удалось загрузить файлы!'));
      if (!fileResponses) return false;

      const newFiles = [...this.uploadedFiles];

      uploadedFiles.forEach((file, index) => {
        if (!file) return;
        const { path, mime } = fileResponses[index]?.data;
        newFiles.push({
          name: file.name.slice(0, file.name.lastIndexOf('.') || undefined),
          url: path,
          mime,
          size: file.size,
        });
      });

      this.uploadedFiles = [...notUploadedFiles, ...newFiles];
      return true;
    },*/
    /*    sendPreCommentsOrComments() {
      if (this.isAddPage) {
        // eslint-disable-next-line no-restricted-globals
        this.$emit('newpre', { comment: this.comment });
        this.comment = '';
      } else {
        this.sendComment(this.comment);
      }
    },*/
  },
};
</script>

<style lang="stylus">
.i-comments
  &_file-uploader
    margin: 20px 0 0 4px

.i-comments-write
  display: grid
  grid-template: repeat(3, auto) \/ auto 1fr auto
  padding: 12px 8px 16px
  background: white
  border: 1px solid #DADADA
  &.is-empty
    grid-template-rows: auto auto
    align-items: center
    .i-comments-field
      grid-column: 2 \/ 3
      margin-bottom: 4px
    .i-comments-uploaded
      grid-row: 2
    .i-comments-submit-buttons
      grid-row: 1
      margin-top: 0
    .i-comments_file-uploader
      margin-top: 0

.i-comments-uploaded
  grid-column: 1 \/ -1
  display: flex
  flex-flow: row wrap
  width: 100%
  padding-left: 3px
  margin-bottom: 8px
  align-items: flex-end

  .v-chip .v-chip__content
    color: #ffffff

.i-comments-textarea.textarea-input-wrapper
  .fake-placeholder
    top: 6px
    left: 8px
  .simple-textarea.v-textarea
    padding: 0 8px

.i-comments-send-icon
  align-self: center
  margin: 0 8px
  cursor: pointer

.comment-question-mark
  margin-left: 6px

.i-comments-submit-buttons
  grid-column: 3
  justify-self: end
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  margin: 20px 4px 0 0

.i-comments-field
  grid-column: 1 \/ -1
  grid-row: 1
  width: 100%
  margin-bottom: 4px

  .v-input__slot::before
    opacity: 0

  input
    width: 100%
    min-height: 30px
    padding: 0 16px
    outline: none

  textarea
    &::-webkit-scrollbar
      width: 6px
    &::-webkit-scrollbar-thumb
      background: rgba(136, 138, 145, 0.2)
      border-radius: 4px

.i-comments-editor
  .i-comments-write
    padding: 0
    border: none
  .i-comments-textarea.textarea-input-wrapper
    .simple-textarea.v-textarea
      padding: 0
    .fake-placeholder
      left: 0
      top: 5px

.i-comments-more-files
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  background: #F3F5F8
  height: 22px
  padding-left: 10px
  font-size: 13px
  margin: 5px !important
  &:hover
    cursor: pointer
    & > .more-files-arrow
      background-color: #DFEBFA
  .more-files-arrow
    width: 22px
    height: 22px
    margin-left: 10px
    text-align: center
    background: #E9EBEF
    &:hover
      background-color: #416FC8
      .v-icon
        color: #FFFFFF !important

@media(max-width: 959px)
  .i-comments-write
    padding: 5px 12px
    &.is-empty
      .i-comments-textarea.textarea-input-wrapper
        .fake-placeholder
          left: 4px
          width: calc(100% - 8px)
          white-space: nowrap
        .simple-textarea.v-textarea
          padding-left: 4px
          padding-right: 4px
</style>
