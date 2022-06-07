<template>
  <div class="skeleton-main">
    <div class="skeleton-main__container semi-container">
      <SemiTitle
        v-if="title"
        :text="title"
        class="skeleton-main__title"
      />
      <div
        v-if="text"
        class="skeleton-main__text"
      >
        {{ text }}
      </div>
      <div class="skeleton-main__fields">
        <slot name="fields" />
      </div>
    </div>
  </div>
</template>

<script>
import SemiTitle from '@/components/UI/blocks/SemiTitle';

export default {
  name: 'SkeletonMain',
  components: {
    SemiTitle,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="stylus">
.skeleton-main
  padding: 46px 0 0;
  background: $white-main;
  &__title
    margin-bottom: 27px;
  &__fields
    display: grid;
    grid-template-columns 1fr;
    grid-row-gap 27px
    // align-items: center;
    @media screen and (min-width: $tablet)
      grid-template-columns 1fr 1fr 1fr
      grid-column-gap 30px
  &__text
    color: $grey-2;
    font-size: 16px;
    font-weight: 400
    margin-bottom: 28px
</style>
