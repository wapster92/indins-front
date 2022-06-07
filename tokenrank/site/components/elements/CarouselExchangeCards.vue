<template>
  <div
    v-if="exchangesData.length"
    class="carousel">
    <SliderBase
      v-if="windowWidth <= 720"
      :settings="sliderSetting"
      class="carousel__slider">
      <div
        v-for="exchange of exchangesData"
        :key="exchange.name"
        class="card-slide">
        <ExchangeCard
          :exchange="exchange"
          v-bind="$attrs"
          class="card"/>
      </div>
    </SliderBase>
    <div
      v-else
      class="rating__cards">
      <ExchangeCard
        v-for="exchange of exchangesData"
        :key="exchange.name"
        :exchange="exchange"
        v-bind="$attrs"
        class="card"/>
    </div>
  </div>
</template>

<script>
import ExchangeCard from '../card/ExchangeCard';
import SliderBase from '../main/SliderBase';

export default {
  name: 'CarouselExchangeCards',
  components: {
    ExchangeCard,
    SliderBase,
  },
  props: {
    exchangesData: {
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
