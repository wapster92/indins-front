<template>
  <div class="card-header">
    <div class="card-header__item basics">
      <span>Криптовалюта</span>
      <div class="basics__info info">
        <span class="info__text">Оценка</span>
        <TkPopover>
          <SimpleSvg
            class="info__icon"
            icon-name="UI/info"/>
        </TkPopover>
      </div>
    </div>
    <div class="card-header__item prices">
      <span>24 ч</span>
      <span>Неделя</span>
      <span>Месяц</span>
    </div>
    <div class="card-header__item buy"><span>Где купить</span></div>
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
    grid-template-columns: 52fr 25fr 23fr;
    height: 75px;
    padding: 0 15px;
    align-items: center;
    margin-bottom: 15px;
  }
  .basics {
    display: grid;
    grid-template-columns: 4fr 1fr;
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
  .prices {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
  }
}
</style>
