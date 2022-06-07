<template>
  <div class="indicator indicator__wrapper">
    <div
      :class="indicatorColor"
      class="indicator__holder">
      <div class="indicator__bar  indicator__bar--small"/>
    </div>
    <div
      :class="indicatorColor"
      class="indicator__holder">
      <div class="indicator__bar  indicator__bar--mid"/>
    </div>
    <div
      :class="indicatorColor"
      class="indicator__holder">
      <div class="indicator__bar indicator__bar--large"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TkIndicator',
  props: {
    rating: {
      type: Number,
      default: null,
    },
  },
  computed: {
    indicatorColor() {
      if (this.rating >= 33.3 && this.rating <= 66.6) return 'normal';
      return this.rating < 33.3 ? 'bad' : 'good';
    },
  },
};
</script>

<style lang="scss" scoped>
.indicator {
  &__wrapper {
    @include flex-between;
    width: 21px;
    height: 20px;
    transform: rotateY(180deg) rotateZ(180deg);
  }

  &__holder {
    width: 5px;
    background: transparent;
    height: 100%;
    &.bad {
      .indicator__bar {
        &--small {
          background: $secondary-red;
        }
      }
    }
    &.normal {
      .indicator__bar {
        &--small,
        &--mid {
          background: $primary-logo;
        }
      }
    }
    &.good {
      .indicator__bar {
        &--small,
        &--mid,
        &--large {
          background: $secondary-green;
        }
      }
    }
  }

  &__bar {
    background: $primary-light-blue;
    transition: background .4s ease;
    height: 100%;

    &--small {
      height: 33%;
    }

    &--mid {
      height: 66%;
    }
  }
}
</style>
