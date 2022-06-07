<template>
  <div class="banner">
    <div class="banner__section">
      <div class="banner__main banner__main--binance">
        <SimpleSvg
          class="banner__svg"
          icon-name="banners/binance"/>
        <p class="banner__p">
          Крупнейшая в мире криптобиржа, на которой можно приобрести более 800 монет.
          Вы можете приобрести монеты как по карте, так и через других участников
          через специальный сервис биржи P2P. </p>
      </div>
      <div class="banner__register">
        <span class="banner__text">Регистрация по кнопке дает скидку 5% на комиссию
        при совершении сделок.</span>
        <TkButton
          class="banner__btn"/></div>
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'BinanceSmallBanner',
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
  background: #F4F7FF;
  @include flex-center;

  &__section {
    @include flex-between;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  &__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 50px 0 84px 0;
  }
  &__main--binance {
    margin-top: 55px;
  }
  &__svg {
    height: 50px;
    margin-bottom: 19px;
  }
  &__p {
    margin: 0;
    color: $secondary-medium-black;
    padding: 0 1rem;
    line-height: 1.4;
    text-align: center;
  }
  &__register {
    color: $secondary-medium-black;
    @include flex-center;
    flex-direction: column;
    min-height: 100%;
    transform: skewY(-15deg);
    width: 100vw;
    background: linear-gradient(#3F629F 11.52%, #021B5D 93.27%);
  }
  &__text {
    position: absolute;
    top: 65px;
    max-width: 250px;
    transform: skewY(15deg);
    color: $secondary-white;
    text-align: center;
  }
  &__btn {
    position: absolute;
    top: 160px;
    transform: skewY(15deg);
    width: 224px;
  }
}
</style>
