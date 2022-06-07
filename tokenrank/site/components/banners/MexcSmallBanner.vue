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
  name: 'TkMexcSmallBanner',
  components: { SimpleSvg, TkButton },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  overflow: hidden;
  height: 610px;
  width: 100%;
  max-width: 282px;
  border-radius: 8px;
  background: $secondary-medium-black;
  @include flex-center;
  &__image {
    position: absolute;
    &--top {
      top: -342px;
      left: -113px;
    }
    &--bottom {
      bottom: -325px;
      right: -100px;
    }
  }
  &__section {
    @include flex-center;
    flex-direction: column;
    width: 100%;
    padding: 0 1rem;
  }
  &__logo, &__svg, &__register {
    width: 100%;
  }
  &__svg {
    height: 30px;
  }
  &__main {
    padding: 30px 0 40px 0;
  }
  &__p {
    margin: 0;
    color: $secondary-white;
    line-height: 1.4;
    text-align: center;
  }
}
</style>
