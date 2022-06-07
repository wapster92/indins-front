<template>
  <div
    class="dynamic-comments-write"
    :class="{
      'top-border': hasAdditionalBlock,
      'is-empty': !comment && !editedComment,
    }"
  >
    <div class="dynamic-comments-field">
      <slot
        :comment="comment"
        :input="(value) => comment = value"
      >
        <TextareaInput
          v-model="comment"
          :placeholder="commentFieldPlaceholder"
          :max-height="maxFieldHeight"
          class="dynamic-comments-textarea"
          input-type="standart"
          hide-details
          @keydown.native.capture.enter="enterPress($event)"
        />
      </slot>
    </div>
    <div
      v-if="fileUpload && Array.isArray(files) && files.length !== 0"
      class="dynamic-comments-uploaded"
    >
      <DynamicCommentsFileItem
        v-for="(file, index) of visibleFiles"
        :key="'comment-file-' + index"
        :file="file"
        show-size
        can-be-removed
        @remove-file="removeFile(index)"
      />
      <div
        v-if="Array.isArray(files) && files.length > 2"
        class="dynamic-comments-more-files"
        @click="toggleFiles"
      >
        <span>{{ moreFilesText }}</span>
        <div class="more-files-arrow">
          <v-icon
            size="18"
            color="#416FC8"
          >
            {{ moreFilesIcon }}
          </v-icon>
        </div>
      </div>
    </div>
    <div
      v-if="fileUpload"
      class="dynamic-comments-uploader"
    >
      <input
        ref="fileUpload"
        type="file"
        multiple
        @change="setFiles($event)"
      >
      <div class="dynamic-comments-uploader-button">
        <v-tooltip bottom nudge-right="40">
          <template #activator="{on, attrs}">
            <v-btn
              v-bind="attrs"
              depressed
              small
              width="30"
              height="30"
              min-width="30"
              max-width="30"
              v-on="on"
              @click="fileClick"
            >
              <v-icon>attach_file</v-icon>
            </v-btn>
          </template>
          <span>Добавить файлы</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ attrs, on }">
            <v-icon
              v-bind="attrs"
              class="comment-question-mark"
              color="#D3D4DB"
              size="20"
              v-on="on"
            >
              help_outline
            </v-icon>
          </template>
          <span>Общий размер всех файлов не должен превышать 50 мб</span>
        </v-tooltip>
      </div>
    </div>
    <div class="dynamic-comments-submit-buttons">
      <SimpleButton
        v-if="(editedComment || comment || (Array.isArray(files) && files.length)) && !isMobile"
        class="mx-2"
        outlined
        height="30"
        @click="resetComment"
      >
        Отмена
      </SimpleButton>
      <SimpleButton
        v-if="!isMobile"
        :loading="isSending"
        :disabled="preventSending"
        :class="editedComment ? 'ml-2' : 'mx-2'"
        height="30"
        @click="sendComment"
      >
        Отправить
      </SimpleButton>
      <svg
        v-else
        class="dynamic-comments-send-icon"
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
import { setObjectField, getObjectField } from "../../../helpers";
import { Post, Simple, Put, Filter } from 'core-xhr';
import DynamicCommentsFileItem from './DynamicCommentsFileItem';

export default {
  name: 'DynamicCommentsField',
  components: {
    DynamicCommentsFileItem,
  },
  props: {
    query: {
      type: [String, Object, null],
      default: null,
    },
    hasAdditionalBlock: {
      type: Boolean,
      default: false,
    },
    maxFieldHeight: {
      type: [String, Number],
      default: 0,
    },
    editedComment: {
      type: [Object, null],
      default: null,
    },
    fileUpload: {
      type: Boolean,
      default: false,
    },
    filesField: {
      type: String,
      default: 'commentFiles',
    },
    attachField: {
      type: String,
      default: '',
    },
    attachId: {
      type: [String, Number],
      default: '',
    },
    authorField: {
      type: String,
      default: 'user',
    },
  },
  data() {
    return {
      comment: '',
      files: [],
      uploadedFiles: [],
      totalWeight: 0,
      showAllFiles: false,
      isSending: false,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    preventSending() {
      return (!this.comment && this.files?.length <= 0) || this.isSending;
    },
    commentFieldPlaceholder() {
      if (this.editedComment) return 'Текст комментария...';
      return this.isMobile
        ? 'Напишите комментарий'
        : 'Напишите комментарий или добавьте файлы сюда';
    },
    visibleFiles() {
      return this.showAllFiles ? this.files : this.files.slice(0, 2);
    },
    moreFilesText() {
      return this.showAllFiles
        ? `Скрыть ${ this.files?.length - 2 }`
        : `Еще ${ this.files?.length - 2 }`;
    },
    moreFilesIcon() {
      return this.showAllFiles ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
    hasNoFiles() {
      return !Array.isArray(this.files) || this.files?.length === 0;
    },
  },
  watch: {
    editedComment: {
      immediate: true,
      handler(value) {
        if (!value) return;
        if (this.filesField) this.files = getObjectField(this.editedComment, this.filesField) || [];
        this.comment = value?.text || '';
      },
    },
  },
  methods: {
    toggleFiles() {
      this.showAllFiles = !this.showAllFiles;
    },
    fileClick() {
      this.$refs.fileUpload.click();
    },
    setFiles(event) {
      if (event.target.files.length > 0) {
        const filesList = Array.from(event.target.files);
        if (filesList.length > 1) {
          filesList.forEach(item => {
            this.files.push(item);
          });
          return;
        }
        this.files.push(filesList[0]);
        this.totalWeight = this.files.reduce((acc, item) => acc + item.size, 0);
      }
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
    resetComment() {
      this.files = [];
      this.comment = '';
      this.uploadedFiles = [];
      this.$emit('stop-editting-comment');
    },
    async sendComment() {
      if (!this.comment && this.hasNoFiles) return;
      const type = this.$getType(this.query);
      if (type !== 'String' && type !== 'Object') {
        const filesDidUpload = await this.sendFiles()
        this.$emit('send-comment', {
          files: filesDidUpload ? this.uploadedFiles : [],
          text: this.comment,
        })
        this.comment = '';
        this.uploadedFiles = [];
        return;
      }
      const queryString = type === 'String' ? this.query : this.query._key;
      const request = this.editedComment
        ? new Put(queryString)
          .addFilter(new Filter('id', 'eq', this.editedComment.id))
        : new Post(queryString);

      this.isSending = true;
      const filesResponse = await this.sendFiles();

      const requestData = {
        text: this.comment || '',
      };
      if (filesResponse) {
        setObjectField(
          requestData,
          this.filesField,
          this.uploadedFiles,
          true,
        );
      }
      if (this.attachField) {
        setObjectField(
          requestData,
          this.attachField,
          { id: +this.attachId },
          true,
        );
      }
      if (!this.editedComment) {
        setObjectField(
          requestData,
          this.authorField,
          { id: this.$store.state.auth.id },
          true,
        );
      }

      request
        .setData(requestData)
        .entity()
        .addHeader('Content-Type', 'multipart/form-data');

      const response = await this.$xhr.send(request)
        .catch(this.$errorHandler('Не удалось отправить комментарий!'));
      this.isSending = false;
      if (!response) return;

      this.$store.dispatch('snack/notify', 'Комментарий успешно сохранен.');
      this.resetComment();
    },
    async sendFiles() {
      if (this.hasNoFiles) return false;
      if (this.totalWeight > 50000000) {
        this.$store.dispatch(
          'snack/error',
          'Общий размер всех файлов не должен превышать 50 мб',
        );
        return false;
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
        .catch(this.$errorHandler('Не удалось загрузить файлы!'));
      if (!fileResponses) return false;

      const newFiles = [...this.uploadedFiles];

      uploadedFiles.forEach((file, index) => {
        if (!file) return;
        const {path, mime} = fileResponses[index]?.data;
        newFiles.push({
          name: file.name.slice(0, file.name.lastIndexOf('.') || undefined),
          url: path,
          mime,
          size: file.size,
        });
      });

      this.uploadedFiles = [...notUploadedFiles, ...newFiles];
      return true;
    },
  },
};
</script>

<style lang="stylus">
.dynamic-comments-write
  display: grid
  grid-template: repeat(3, auto) \/ auto 1fr auto
  border: 1px solid #dadada
  border-top: none
  margin-top: auto
  padding: 12px 8px 16px
  background: white
  &.top-border
    border-top: 1px solid #dadada
  &.is-empty
    grid-template-rows: auto auto
    align-items: center
    margin-top: 0
    .dynamic-comments-field
      grid-column: 2 \/ 3
      margin-bottom: 4px
    .dynamic-comments-uploaded
      grid-row: 2
    .dynamic-comments-uploader
      grid-row: 1
      margin-top: 0
    .dynamic-comments-submit-buttons
      grid-row: 1
      margin-top: 0

.dynamic-comments-uploaded
  grid-column: 1 \/ -1
  display: flex
  flex-flow: row wrap
  width: 100%
  padding-left: 8px
  margin-bottom: 8px

  .v-chip .v-chip__content
    color: #ffffff

.dynamic-comments-textarea.textarea-input-wrapper
  .fake-placeholder
    top: 6px
    left: 8px
  .simple-textarea.v-textarea
    padding: 0 8px

.dynamic-comments-send-icon
  align-self: center
  margin: 0 8px
  cursor: pointer

.comment-question-mark
  margin-left: 6px

.dynamic-comments-uploader-button
  position: relative
  .v-btn
    border-radius: 2px

.dynamic-comments-uploader
  grid-column: 1
  margin: 20px 10px 0 8px

  input
    display: none

  .v-btn
    i
      font-size: 20px
      transform: rotate(45deg)

.dynamic-comments-submit-buttons
  grid-column: 3
  justify-self: end
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  margin-top: 20px

.dynamic-comments-field
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

.dynamic-comments-editor
  .dynamic-comments-write
    padding: 0
    border: none

  .dynamic-comments-textarea.textarea-input-wrapper
    .simple-textarea.v-textarea
      padding: 0
    .fake-placeholder
      left: 0
      top: 5px

  .dynamic-comments-uploader
    margin-left: 0

@media(max-width: 959px)
  .dynamic-comments-write
    padding: 5px 12px
    &.is-empty
      .dynamic-comments-textarea.textarea-input-wrapper
        .fake-placeholder
          left: 4px
          width: calc(100% - 8px)
          white-space: nowrap
        .simple-textarea.v-textarea
          padding-left: 4px
          padding-right: 4px
</style>
