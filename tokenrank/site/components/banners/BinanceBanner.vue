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
  name: 'BinanceBanner',
  components: { SimpleSvg, TkButton },
};
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  overflow: hidden;
  height: 400px;
  width: 100%;
  background: #F4F7FF;
  @include flex-center;
  @media only screen and (min-width: $md) {
    max-width: 1200px;
    border-radius: 10px;
  }

  &__section {
    display: grid;
    grid-template-columns: 58.34% 41.66%;
    width: 100%;
    max-width: 1200px;
    height: 100%;
   @media only screen and (min-width: $md) and (max-width: 770px) {
     grid-template-columns: 2fr 1fr;
   }
   @media only screen and (min-width: $lg) and (max-width: 1199px) {
     grid-template-columns: 2fr 1fr;
    }
  }
  &__main {
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   margin: 50px 0 84px 0;
   @media only screen and (min-width: $md) {
     max-width: 430px;
     margin-top: 0;
   }
   @media only screen and (min-width: $lg) {
     max-width: 590px;
     margin-top: 0;
   }
}
  &__main--binance {
    margin-top: 55px;
    padding: 0 2rem 0 0.5rem;
    @include max-media($md - 1) {
      margin-top: 20px;
    }
    @media only screen and (min-width: $md) {
      margin: 70px 0 55px 0;
      padding: 0;
    }
    @media only screen and (min-width: $xl) {
      margin-left: 70px;
    }
  }
  &__svg {
    height: 50px;
    margin-bottom: 19px;
    @media only screen and (min-width: $md) {
      height: 85px;
      margin-bottom: 30px;
    }
  }
  &__p {
    margin: 0;
    color: $secondary-medium-black;
    line-height: 1.4;
    text-align: center;
    @media only screen and (min-width: $sm) {
      font-size: 18px;
    }
    @media only screen and (min-width: $md) {
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
    color: $secondary-medium-black;
    @include flex-center;
    flex-direction: column;
    min-height: 100%;
    width: 120%;
    margin: 0;
    transform: skew(-13deg, 0);
    background: linear-gradient(#3F629F 11.52%, #021B5D 93.27%);
    @include max-media(600px) {
      width: 140%;
    }
    @media only screen and (min-width: $lg) {
      max-width: none;
      margin: 0;
    }
    @media only screen and (min-width: $xl) {
      margin-right: 70px;
    }
  }
  &__text {
    position: absolute;
    color: $secondary-white;
    text-align: center;
    margin-left: -24px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) skew(13deg, 0);
    max-width: 295px;
    font-size: 18px;
    @include max-media(600px) {
      font-size: 14px;
      left: 43%;
      top: 50%;
    }
    @media only screen and (min-height: 620px) and (max-height: 670px) {
      top: 115px;
      font-size: 18px;
    }
    @media only screen and (min-height: 670px) and (max-height: 770px) {
      top: 135px;
    }
    @media only screen and (min-height: 770px) and (max-height: 900px) {
      top: 195px;
    }
    @media only screen and (min-width: $md) and (max-width: 770px) {
      max-width: 235px;
    }
    @media only screen and (min-width: $lg) {
      font-size: 20px;
    }
    @include min-media(1000px) {
      margin-left: -27px;
    }
    @include min-media(1025px) {
      margin-left: -30px;
    }
    @include min-media(1055px) {
      margin-left: -40px;
    }
    @include min-media(1100px) {
      margin-left: -50px;
    }
  }
  &__btn {
    position: absolute;
    width: 224px;
    margin-left: -24px;
    top: 70%;
    left: 54%;
    transform: translate(-50%, -50%) skew(13deg, 0);
    @include max-media(600px) {
      width: 120px;
      left: 52%;
    }
    @include min-max-media(500px, 600px) {
      left: 46%;
    }
    @media only screen and (min-height: 620px) and (max-height: 670px) {
      top: 210px;
    }
    @media only screen and (min-height: 670px) and (max-height: 770px) {
      top: 230px;
    }
    @media only screen and (min-height: 770px) and (max-height: 900px) {
      top: 290px;
    }
    @include min-media(1000px) {
      margin-left: -27px;
    }
    @include min-media(1025px) {
      margin-left: -30px;
    }
    @include min-media(1055px) {
      margin-left: -40px;
    }
    @include min-media(1100px) {
      margin-left: -50px;
    }
  }
}
</style>
