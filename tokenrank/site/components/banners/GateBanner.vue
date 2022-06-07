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
        src="~assets/svg/banners/gate-hills.svg"
        class="banner__image banner__image--left">
      <img
        src="~assets/svg/banners/gate-hills.svg"
        class="banner__image banner__image--right">
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'GateBanner',
  components: { SimpleSvg, TkButton },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  overflow: hidden;
  max-height: 400px;
  width: 100%;
  background: linear-gradient(#DE5959 11.52%, #D33131 93.27%);
  @include flex-center;
  @media only screen and (min-width: $md) {
    height: 400px;
    max-width: 1200px;
    border-radius: 10px;
  }
  &__image {
    position: absolute;
    &--left {
      display: block;
      height: 145px;
      top: -12px;
      left: -152px;
      transform: scale(1.25) rotate(180deg);
    }
    &--right {
      max-width: 43%;
      display: block;
      top: 0;
      right: 0;
      transform: scale(1.13);
      height: 100%;
      @include max-media(419px) {
        max-width: 60%;
      }
      @include min-media(800px) {
        transform: scale(1.18);
      }
      @include min-media($lg + 1) {
        max-width: 35%;
      }
      @include min-media($xl) {
        transform: scale(1.37);
      }
    }
  }
  &__section {
    @include flex-between;
    width: 100%;
    max-width: 1200px;
    height: 100%;
  }
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    width: 100%;
    @media only screen and (min-width: $md + 1) {
      max-width: 430px;
      margin-top: 0;
    }
    @media only screen and (min-width: $lg) {
      max-width: 590px;
      margin-top: 0;
    }
    @media only screen and (min-width: $xl) {
      margin-left: 70px;
    }
  }
  &__svg {
    height: 45px;
    fill: $secondary-white;
    padding: 1rem 0 0 2rem;
    margin-bottom: 19px;
    @include max-media(419px) {
      margin-left: 1.5rem;
      max-width: 60%;
      padding: 0;
    }
    @include min-max-media(501px, $md) {
      max-width: 60%;
      padding: 1rem 0;
      margin: 0 auto;
    }
    @include min-max-media(420px, $sm) {
      margin-left: 2rem;
      max-width: 60%;
      padding: 0;
    }
    @media only screen and (min-width: $md + 1) {
      height: 85px;
      margin-bottom: 25px;
    }
  }
  &__p {
    margin: 0;
    color: $secondary-white;
    line-height: 1.4;
    text-align: center;
    padding: 10px 12px 0 0;
    font-size: 12px;
    @include max-media(419px) {
      margin-left: 1.5rem;
      max-width: 60%;
    }
    @include min-max-media(501px, $md) {
      padding: 1rem 0;
      max-width: 60%;
      margin: 0 auto;
    }
    @include min-max-media(420px, $sm) {
      margin-left: 2rem;
      max-width: 60%;
    }
    @media only screen and (min-width: $md + 1) {
      font-size: 20px;
    }
    @media only screen and (min-width: $lg) {
      font-size: 22px;
    }
    @media only screen and (min-width: $xl) {
      font-size: 24px;
    }
  }
  &__register {
    z-index: 1;
    color: $secondary-medium-black;
    @include flex-center;
    flex-direction: column;
    margin-bottom: 50px;
    padding-top: 4.2rem;
    @include max-media(419px) {
      margin-left: -8.5rem;
    }
    @include min-max-media(420px, $sm) {
      margin-left: -4.5rem;
    }
    @include min-max-media($sm, $md) {
      width: 40%;
      margin-right: 15px !important;
    }
    @media only screen and (min-width: $md + 1) {
      max-width: 230px;
      margin: 0;
    }
    @media only screen and (min-width: $lg) {
      max-width: none;
      margin: 0;
    }
    @include min-media($sm) {
      margin-right: 5px;
    }
    @include min-media(820px) {
      margin-right: 30px;
    }
    @include min-media(850px) {
      margin-right: 60px;
    }
    @include min-media($lg + 1) {
      margin-right: 24px;
    }
    @include min-media(1000px) {
      margin-right: 27px;
    }
    @include min-media(1025px) {
      margin-right: 30px;
    }
    @include min-media(1055px) {
      margin-right: 40px;
    }
    @include min-media(1100px) {
      margin-right: 50px;
    }
    @media only screen and (min-width: $xl) {
      margin-right: 70px;
    }
  }
  &__text {
    color: $secondary-medium-black;
    font-size: 16px;
    margin-bottom: 23px;
    text-align: center;
    @include max-media($sm) {
      font-size: 12px;
      width: 140px;
    }
    @media only screen and (min-width: $md) {
      max-width: 295px;
      font-size: 18px;
    }
    @media only screen and (min-width: $sm) and (max-width: 780px) {
      margin-bottom: 15px;
    }
    @media only screen and (min-width: 780px) {
      margin-bottom: 27px;
    }
    @media only screen and (min-width: $lg) {
      font-size: 20px;
      margin-bottom: 35px;
    }
  }
  &__btn {
    width: 224px;
    @include max-media($sm) {
      width: 140px;
    }
    @include min-max-media($sm, $md) {
      width: 100%;
    }
  }
}
</style>
