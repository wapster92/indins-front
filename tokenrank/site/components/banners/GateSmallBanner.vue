<template>
  <div class="banner">
    <div class="banner__section">
      <div class="banner__main">
        <SimpleSvg
          class="banner__svg"
          icon-name="banners/gate-desktop"/>
        <p class="banner__p">
          Более 1800 перспективных криптовалют, безопасный и простой функционал.
          Мгновенный депозит и вывод средств, нет комиссий за депозит
          и низкая торговая комиссия. Возможность использовать мобильное приложение.</p>
      </div>
      <div class="banner__register">
        <span class="banner__text">Регистрация по кнопке дает скидку
        10% на комиссию при совершении сделок.</span>
        <TkButton
          class="banner__btn"/></div>
      <img
        src="~assets/svg/banners/gate-hills-mob.svg"
        class="banner__image banner__image--top">
      <img
        src="~assets/svg/banners/gate-hills-mob.svg"
        class="banner__image banner__image--bottom">

    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'GateSmallBanner',
  components: { SimpleSvg, TkButton },
};
</script>

<style scoped>

</style>

<style lang="scss" scoped>
.banner {
  position: relative;
  overflow: hidden;
  height: 610px;
  width: 100%;
  max-width: 282px;
  border-radius: 8px;
  background: linear-gradient(#DE5959 11.52%, #D33131 93.27%);
  @include flex-center;
  &__image {
    position: absolute;
    &--top {
      width: 100%;
    }
    &--bottom {
      transform: rotate(180deg);
      width: 150px;
      bottom: -170px;
      left: 0px;
    }
  }
  &__section {
    @include flex-between;
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
    max-width: 250px;
    height: 100%;
  }
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    margin-top: 50px;
  }
  &__svg {
    height: 45px;
    fill: #DE5959;
    margin-bottom: 19px;
  }
  &__p {
    margin: 0;
    color: $secondary-medium-black;
    line-height: 1.4;
    text-align: center;
  }
  &__register {
    z-index: 1;
    color: $secondary-medium-black;
    @include flex-center;
    flex-direction: column;
    margin-bottom: 50px;
  }
  &__text {
    color: $secondary-white;
    font-size: 16px;
    margin-bottom: 23px;
    text-align: center;
  }
  &__btn {
    width: 224px;
  }
}
</style>
