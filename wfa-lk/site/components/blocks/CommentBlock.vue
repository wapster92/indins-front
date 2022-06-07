<template>
  <div class="comment-block">
    <div class="comment-block__wrap">
      <div
        class="comment-block__head"
        @click="open"
      >
        <h3
          class="comment-block__title"
        >
          {{title}}
        </h3>
        <div
          class="comment-block__icon"
          :class="{'comment-block__icon--open':isOpen}"
        >
          <svg-icon name="personal-area/comment-open" />
        </div>
      </div>
      <div
        class="comment-block__text"
        :class="{'comment-block__text--open':isOpen}"
      >
        <SimpleTextarea @input="editComment" />
      </div>
    </div>
  </div>
</template>

<script>
import SimpleTextarea from '../UI/fields/SimpleTextarea';

export default {
  name: 'CommentBlock',
  components: {
    SimpleTextarea,
  },
  props: {
    title: {
      type: String,
      default: 'Комментарий',
    }
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
    editComment(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="stylus">

.comment-block
  padding: 26px 0;
  background: $white-main;
  width 100%
  max-width 926px
  margin: 50px auto 0;
  @media screen and (min-width: 926px)
    border-radius: 5px;
  &__wrap
    padding: 0 26px;
  &__head
    display flex
    justify-content space-between
    align-items center
    cursor: pointer;
    &:hover
      .comment-block__icon
        background: $blue-main;
  &__title
    cursor pointer
    display inline-flex
    font-size: 20px;
    font-weight: 500
  &__text
    padding: 26px 0 0;
    display: none;
    &--open
      display: block;
    .simple-textarea__input
      background: $white-main;
  &__icon
    width: 28px
    height: 28px
    border-radius: 50%;
    background: $blue-secondary;
    display: flex;
    justify-content: center;
    align-items center;
    overflow hidden
    transition transform .3s, background-color .3s

    &--open
      transform rotate(-180deg)
    .icon
      width: 12px;
      fill $white-main
</style>
