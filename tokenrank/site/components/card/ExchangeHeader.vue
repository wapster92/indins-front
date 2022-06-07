<template>
  <div
    :class="{ 'card-header--cut': withoutCount }"
    class="card-header">
    <div class="card-header__item">
      <span>Криптобиржа</span>
    </div>
    <div class="card-header__item info">
      <span class="info__text">Оценка</span>
      <TkPopover>
        <SimpleSvg
          class="info__icon"
          icon-name="UI/info"/>
      </TkPopover>
    </div>
    <div class="card-header__item volumes">
      <span>Объем торгов (24 ч)</span>
    </div>
    <div
      v-if="!withoutCount"
      class="card-header__item tokens">
      <span>Криптовалюта</span>
    </div>
    <div class="card-header__item register"/>
  </div>
</template>

<script>
import TkPopover from '@/components/UI/TkPopover';
import SimpleSvg from '@/components/base/SimpleSvg';

export default {
  name: 'CryptoHeader',
  components: {
    SimpleSvg,
    TkPopover,
  },
  props: {
    withoutCount: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  background: #FFFFFF;
  box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
  border-radius: 8px;
}
@include max-media($md) {
  .card-header {
    max-width: 288px;
    max-height: 192px;
  }
}
@include min-media($md + 1) {
  .card-header {
    width: 100%;
  }
}
@include min-media($lg + 1) {
  .card-header {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    height: 75px;
    padding: 0 15px;
    align-items: center;
    margin-bottom: 15px;
    &--cut {
      grid-template-columns: 9fr 4fr 4fr 4fr;
      .info,.volumes {
        margin: 0 auto;
      }
    }
    &__item span {
      font-size: 14px;
    }
  }
  .info {
    @include flex-start;
    &__text {
      margin-right: 5px;
    }
    &::v-deep .el-popover__reference-wrapper {
      display: flex;
    }
    &__icon {
      height: 16px;
      width: 16px;
    }
  }
}
@include min-media(1000px) {
  .card-header__item span {
    font-size: 16px;
  }
}
@include min-media($xl + 1) {
  .card-header {
    max-width: 1200px;
    padding: 0 35px;
    &__item:nth-child(2),
    &__item:nth-child(3) {
      padding-left: 20px;
    }
    &__item:nth-child(4) {
      padding-left: 40px;
    }
  }
}
</style>
