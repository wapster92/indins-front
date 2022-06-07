<template>
  <div class="banner">
    <img
      src="~assets/svg/banners/hills.svg"
      class="banner__image banner__image--top">
    <img
      src="~assets/svg/banners/hills.svg"
      class="banner__image banner__image--bottom">
    <div class="banner__section">
      <div class="banner__logo">
        <SimpleSvg
          class="banner__svg"
          icon-name="banners/mexc-global"/>
      </div>
      <div class="banner__main">
        <p class="banner__p">
          Хорошие возможности купить криптовалюту на ранних стадиях проектов.
          Выход новых, высокодоходных монет на данной криптобирже.
          Простая покупка биткоина по кредитной карте. Удобный русскоязычный интерфейс.</p>
      </div>
      <div class="banner__register">
      <TkButton class="banner__btn"/></div>
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'TkMexcBanner',
  components: { SimpleSvg, TkButton },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 400px;
  background: $secondary-medium-black;
  border-radius: 10px;
  @include flex-center;
  @include min-media($md + 1) {
    width: 100%;
    max-width: 1200px;
  }
  &__image {
    position: absolute;
    &--top {
      top: -342px;
      left: -113px;
      @media only screen and (min-width: $md) {
        top: -247px;
        left: -148px;
      }
    }
    &--bottom {
      bottom: -325px;
      right: -100px;
      @media only screen and (min-width: $md) {
        bottom: -257px;
        right: -148px;
      }
    }
  }
  &__section {
    @include flex-center;
    flex-direction: column;
    width: 85vw;
    @media only screen and (min-width: $md) {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
    }
  }
  &__logo, &__svg, &__register {
    width: 100%;
  }
  &__logo {
    @include max-media(450px) {
      margin-top: 2rem;
    }
    @media only screen and (min-width: $md) {
      padding-top: 50px;
    }
  }
  &__svg {
    height: 30px;
    @media only screen and (min-width: $md) {
      height: 55px;
    }
  }
  &__main {
    padding: 30px 0 40px 0;
    @media only screen and (min-width: $md) {
      padding: 35px 0;
    }
    @include min-media($md + 1) {
      display: flex;
      width: 60%;
    }
  }
  &__p {
    margin: 0;
    color: $secondary-white;
    line-height: 1.4;
    text-align: center;
    @media only screen and (min-width: $sm) {
      font-size: 18px;
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
    @media only screen and (min-width: $md) {
      display: flex;
      justify-content: center;
    }
  }
  &__btn {
    @media only screen and (min-width: $md) {
      width: 224px;
    }
  }
}
</style>
