<template>
  <div class="rating">
    <div
      v-if="reversed"
      class="rating__info-wrapper rating__info-wrapper--bottom">
      <TkIndicator :rating="Number(rating)"/>
      <span class="rating__value">
        {{ evaluation }}
      </span>
    </div>
    <div class="rating__info-wrapper rating__info-wrapper--top">
      <span
        :class="{ 'icon-preceeded': infoIconIsVisible }"
        class="rating__info-text info-text">Оценка</span>
      <TkPopover>
        <SimpleSvg
          :class="{ visible: infoIconIsVisible }"
          class="rating__info-icon"
          icon-name="UI/info"/>
      </TkPopover>
    </div>
    <div
      v-if="!reversed"
      class="rating__info-wrapper rating__info-wrapper--bottom">
      <TkIndicator :rating="Number(rating)"/>
      <span class="rating__value">
        {{ evaluation }}
      </span>
    </div>
  </div>
</template>

<script>
import TkIndicator from '../UI/TkIndicator';
import SimpleSvg from '../base/SimpleSvg';
import TkPopover from '../UI/TkPopover';

export default {
  name: 'CryptoRating',
  components: {
    TkPopover,
    TkIndicator,
    SimpleSvg,
  },
  props: {
    rating: {
      type: Number,
      default: 75.5,
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    infoIconIsVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    evaluation() {
      return (Math.round((Number(this.rating) + Number.EPSILON) * 100) / 100).toLocaleString('ru-RU');
    },
  },
};
</script>

<style lang="scss" scoped>
.rating {
  display: flex;
  flex-direction: column;
  &__info {
    &-wrapper {
      @include flex-between;
    }
    &-icon {
      display: flex;
      width: 16px;
      height: 16px;
      margin-right: 0;
    }
  }
  &__value {
    color: $primary-blue;
  }
}
@include max-media($md) {
  .rating {
    &__info {
      &-wrapper {
        margin-bottom: 10px;
        &--top {
          margin: 0 auto 10px;
        }
        &--bottom {
          & .indicator__wrapper {
            margin-right: 4px;
          }
        }
      }
      &-icon {
        display: none;
        &.visible {
          display: flex;
          width: 14px;
          height: 14px;
        }
      }
      &-text {
        &.icon-preeceded {
          margin-right: 5px;
        }
      }
    }
    &__value {
      font-size: 14px;
      line-height: 18.27px;
    }
  }
}
@include min-media($md + 1) {
  .rating {
    &__info {
      &-wrapper {
        margin-bottom: 20px;
        &--bottom {
          & .indicator__wrapper {
            margin-right: 10px;
          }
        }
      }
      &-text {
        margin-right: 5px;
      }
    }
    &__value {
      line-height: 25px;
    }
  }
}
</style>
