<template>
  <div>
    <ICommentsField
      v-if="isCorrected"
      v-model="value"
      :files-field="filesField"
      :author-field="authorField"
      is-comment
      can-be-removed
      :query="query"
      @send-comment="sendComment($event)"
      @cancel="changeCorrectStatus"
    />
    <div
      v-else
      class="i-comment-item"
      @click="changeCorrectStatus"
    >
      <div class="i-comment-avatar">
        <IAvatar
          v-if="value"
          :item="author"
          image="photo.url"
          diameter="26"
        />
      </div>
      <div class="i-comment-data">
        <div class="i-comment-head">
        <span
          v-if="value && value.createdAt"
          class="mr-2"
        >
          {{ formattedDate(value) }}
        </span>
          <svg
            v-if="value && value.createdAt"
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
          {{ getName(value) }}
        </span>
          <div class="i-comment-item-buttons" />
        </div>
        <div class="i-comment-text">
          <pre>{{ toggleStr(value) }}</pre>
        </div>
        <IFiles v-model="files" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import IFiles from '../../ui-kit/IFiles';
import ICommentsField from './ICommentsField';
import IAvatar from "../../ui-kit/IAvatar";
import { getObjectField } from '../../../helpers/index';

export default {
  name: 'ICommentItem',
  components: {
    ICommentsField,
    IFiles,
    IAvatar
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    filesField: {
      type: [String, null],
      default: null,
    },
    query: {
      type: [String, Object, null],
      default: null,
    },
    authorField: {
      type: String,
      default: 'user',
    },
    allowEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCorrected: false,
      textIsCut: false, // what for?
    };
  },
  computed: {
    author() {
      return getObjectField(this.value, this.authorField) || null
    },
    files: {
      get() {
        return this.value[this.filesField] || []
      },
      set(val) {
        let comment = {...this.value}
        comment[this.filesField] = val
        this.sendComment(comment)
      }
    }
  },
  methods: {
    changeCorrectStatus() {
      if (!this.allowEdit) return
      this.isCorrected = !this.isCorrected;
    },
    sendComment(val) {
      this.$emit('input', val);
      this.$emit('send-comment', val);
      this.changeCorrectStatus()
    },
    getName(item) {
      const finder = person => {
        const { fullName, name, surname } = person;
        if (fullName) return fullName;
        if (name && surname) return name + surname;
        return name || surname || '';
      };
      if (item[this.authorField]) return finder(item[this.authorField]);
    },
    toggleStr(item) {
      return item.text;
      // return !this.showMore && item.text?.length > this.maxTextLength
      //   ? `${this.comment?.text?.slice(0, this.maxTextLength)}...`
      //   : this.comment?.text || '';
    },
    formattedDate(item) {
      if (!item) return
      if (item.deletedAt) return moment(item.deletedAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YY HH:mm');
      return moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YY HH:mm');
    },
    // editPreComment(e) {
    //   this.$listeners.editpre(e);
    //   this.changeCorrectStatus();
    // },
  },
};
</script>

<style scoped lang="stylus">

.i-comment-item
  display: flex
  background-color: white
  border-bottom: 0
  padding: 20px 24px
  cursor: pointer
  border-bottom: 1px solid #DADADA

.i-comment-avatar
  margin-right: 16px

.i-comment-data
  width: 100%
  .i-comment-uploaded
    margin-bottom: 0
    margin-top: 4px

.i-comment-head
  display: flex
  flex-flow: row nowrap
  justify-content: flex-start
  align-items: center
  color: #888A91
  font-size: 14px
  line-height: 22px

.comment-author-dot
  margin-right: 6px

.i-comment-item-buttons
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-end
  margin-left: auto

.i-comment-text
  color: #202124
  font-size: 14px
  line-height: 22px
  pre
    font-family: Ubuntu, sans-serif
    word-break: break-word
    white-space: pre-wrap

.i-comment-more
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

@media(max-width: 959px)
  .i-comment-item
    padding: 20px 20px
</style>
