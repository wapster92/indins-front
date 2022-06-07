<template>
  <div class="rating rating--market">
    <div class="container rating__container">
      <div class="rating__head">
        <SemiHeading>
          {{ title }}
        </SemiHeading>
        <TkMoreButton :to="toMore">{{ moreText }}</TkMoreButton>
      </div>
      <div class="rating__body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
import SemiHeading from './headers/SemiHeading';
import TkMoreButton from '../UI/buttons/TkMoreButton';

export default {
  name: 'MoreSection',
  components: {
    SemiHeading,
    TkMoreButton,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    toMore: {
      type: (String | Object),
      default: '/',
    },
    moreText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.rating {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 15px;
    @include min-media($md) {
      padding-bottom: 35px;
    }
  }
}
</style>
