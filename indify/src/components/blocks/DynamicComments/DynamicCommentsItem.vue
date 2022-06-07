<template>
  <div class="dynamic-comments-item">
    <slot
      :item="comment"
      :edit-comment="editComment"
      :edited-comment="editedComment"
      :stop-editting-comment="stopEdittingComment"
    >
      <div
        class="dynamic-comments-avatar"
      >
        <slot
          name="replace-avatar"
          :initials="initials"
          :photo="photo"
        >
          <v-avatar
            width="26"
            height="26"
            min-width="26"
            color="#416fc8"
          >
            <div class="dynamic-comments-initials">
              <img
                v-if="photo"
                :src="photo"
                :alt="''"
              >
              <span v-else>
                {{ initials }}
              </span>
            </div>
          </v-avatar>
        </slot>
      </div>
      <div class="dynamic-comments-data">
        <div class="dynamic-comments-head">
          <span class="mr-2">
            {{ formattedDate }}
          </span>
          <svg
            v-if="userName.replace(/\s+/g, '')"
            class="comment-author-dot"
            width="4"
            height="4"
          >
            <circle
              r="2"
              cx="2"
              cy="2"
              fill="#D3D4DB"
            />
          </svg>
          <span>
            {{ userName }}
          </span>
          <div class="dynamic-comments-item-buttons">
            <slot
              name="comment-buttons"
              :item="comment"
              :edit-comment="editComment"
              :edited-comment="editedComment"
              :stop-editting-comment="stopEdittingComment"
            />
          </div>
        </div>
        <div
          v-if="toggleStr && !isBeingEdited"
          class="dynamic-comments-text"
        >
          <pre>{{ toggleStr }}</pre>
        </div>
        <button
          v-if="textIsCut && !isBeingEdited"
          :class="{ 'is-active': showMore }"
          class="dynamic-comments-more"
          @click="toggleComment"
        >
          <span>Показать <span>{{ activeText }}</span></span>
          <v-icon>keyboard_arrow_down</v-icon>
        </button>
        <DynamicCommentsFiles
          v-if="fileUpload && !isBeingEdited"
          :files="files"
        />

        <div
          v-if="isBeingEdited"
          class="dynamic-comments-editor"
        >
          <DynamicCommentsField
            :query="fieldQuery"
            :has-additional-block="hasAdditionalBlock"
            :max-field-height="maxFieldHeight"
            :file-upload="fileUpload"
            :edited-comment="editedComment"
            :files-field="filesField"
            @stop-editting-comment="stopEdittingComment"
          />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import moment from 'moment';
import { getObjectField } from '../../../helpers';
import DynamicCommentsFiles from './DynamicCommentsFiles';
import DynamicCommentsField from './DynamicCommentsField';

export default {
  name: 'DynamicCommentsItem',
  components: { DynamicCommentsField, DynamicCommentsFiles },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    maxTextLength: {
      type: Number,
      default: 230,
    },
    authorField: {
      type: String,
      default: 'author',
    },
    fileUpload: {
      type: Boolean,
      default: false,
    },
    filesField: {
      type: String,
      default: 'commentFiles',
    },
    editedComment: {
      type: [Object, null],
      default: null,
    },
    fieldQuery: {
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
  },
  data() {
    return {
      showMore: false,
    };
  },
  computed: {
    author() {
      return getObjectField(this.comment, this.authorField) || { fullName: ' ' };
    },
    toggleStr() {
      return !this.showMore && this.comment?.text?.length > this.maxTextLength
        ? `${this.comment?.text?.slice(0, this.maxTextLength)}...`
        : this.comment?.text || '';
    },
    activeText() {
      return this.showMore ? 'меньше' : 'больше';
    },
    photoName() {
      return this.author?.photo?.replace('/upload/file-uploader/', '');
    },
    photo() {
      if (!this.author?.photo) return '';
      return `/image/resize_26x26/file-uploader_${this.photoName}`;
    },
    initials() {
      if (!this.author) return '';
      const { fullName, name, surname } = this.author;
      if (fullName) {
        const parts = fullName.split(' ');
        return parts[0].charAt(0) + parts[1].charAt(0).toUpperCase();
      }
      if (name && surname) return name[0] + surname[0];
      if (name) return name.slice(0, 2);
      if (surname) return name.slice(0, 2);
      return '';
    },
    userName() {
      const { fullName, name, surname } = this.author;
      if (fullName) return fullName;
      if (name && surname) return name + surname;
      return name || surname || '';
    },
    files() {
      const files = getObjectField(this.comment, this.filesField);
      return Array.isArray(files) ? files : [];
    },
    formattedDate() {
      return moment(this.comment?.createdAt, 'YYYY-MM-DD HH:mm:ss')
        .format('DD.MM.YY HH:mm');
    },
    textIsCut() {
      if (!this.comment?.text) return false;
      return this.comment.text.length > this.maxTextLength;
    },
    isBeingEdited() {
      return this.editedComment?.id === this.comment?.id;
    },
  },
  watch: {
    comment: {
      immediate: true,
      handler(newVal) {
        if (!newVal) return;
        if (this.$getType(this.author) !== 'Object') {
          console.warn('Не указан автор комментария!');
          return;
        }

        const { fullName, name, surname } = this.author;

        if (
          this.$getType(fullName) !== 'String'
          && this.$getType(name) !== 'String'
          && this.$getType(surname) !== 'String'
        ) {
          console.warn('У автора комментария нет имени и фамилии!');
        }
      },
    },
  },
  methods: {
    toggleComment() {
      this.showMore = !this.showMore;
    },
    editComment() {
      this.$emit('edit-comment', this.comment);
    },
    stopEdittingComment() {
      this.$emit('stop-editting-comment');
    },
  },
};
</script>

<style lang="stylus">
.dynamic-comments-item
  display: flex
  border: 1px solid #DADADA
  border-bottom: 0
  padding: 20px 24px
  &:first-child
    padding-top: 16px
  &:last-child
    border-bottom: 1px solid #DADADA
    padding-bottom: 16px

.dynamic-comments-avatar
  margin-right: 16px

.dynamic-comments-data
  width: 100%
  .dynamic-comments-uploaded
    margin-bottom: 0
    margin-top: 4px

.dynamic-comments-head
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center
  color: #888A91
  font-size: 14px
  line-height: 22px

.comment-author-dot
  margin-right: 6px

.dynamic-comments-initials
  span
    display: block
    color: #E6F6FC
    font-size: 12px

.dynamic-comments-item-buttons
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-end
  margin-left: auto

.dynamic-comments-text
  color: #202124
  font-size: 14px
  line-height: 22px
  pre
    font-family: Ubuntu, sans-serif
    word-break: break-word
    white-space: pre-wrap

.dynamic-comments-more
  margin-top: 5px
  outline: none
  color: #416FC8
  font-size: 14px
  line-height: 16px
  .v-icon
    font-size: 20px
    color: #416FC8
  &.is-active
    .v-icon
      transform: rotate(180deg)

.dynamic-comments-editor
  width: 100%

@media(max-width: 959px)
  .dynamic-comments-item
    padding: 20px 20px
</style>
