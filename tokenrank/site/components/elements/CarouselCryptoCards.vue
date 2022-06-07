<template>
  <div
    v-if="coinsData.length"
    class="carousel">
    <SliderBase
      v-if="windowWidth <= 720"
      :settings="sliderSetting"
      class="carousel__slider">
      <div
        v-for="coin of coinsData"
        :key="coin.name"
        class="card-slide">
        <CryptoCard
          :coin-data="coin"
          v-bind="$attrs"
          class="card"/>
      </div>
    </SliderBase>
    <div
      v-else
      class="rating__cards">
      <CryptoCard
        v-for="coin of coinsData"
        v-bind="$attrs"
        :key="coin.name"
        :coin-data="coin"
        class="card"/>
    </div>
  </div>
</template>

<script>
import CryptoCard from '../card/CryptoCard';
import SliderBase from '../main/SliderBase';

export default {
  name: 'CarouselCryptoCards',
  components: {
    CryptoCard,
    SliderBase,
  },
  props: {
    coinsData: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      sliderSetting: {
        dots: false,
        arrows: false,
        edgeFriction: 0.35,
        infinite: true,
        centerPadding: '10px',
        variableWidth: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 5,
      },
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.card-slide {
  padding-right: 10px;
}

.card {
  @include min-media($md) {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
