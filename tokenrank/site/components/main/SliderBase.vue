<template>
  <div>
    <VueSlickCarousel
      v-bind="settings"
      class="slider">
      <slot>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </slot>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';
// документация по настройкам https://gs-shop.github.io/vue-slick-carousel/#/example/multiple-rows
export default {
  name: 'SliderBase',
  components: { VueSlickCarousel },
  props: {
    settings: {
      type: Object,
      default: () => ({
        dots: true,
        arrows: false,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        touchThreshold: 5,
      }),
    },
  },
};
</script>

<style lang="scss">
.slick-dots {
  margin: 30px 0 0 0;
  padding: 0;
  list-style-type: none;
  display: flex !important;
  justify-content: center;
  li {
    width: 14px;
    height: 14px;
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 14px;
    &:before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: $secondary-gray;
      border-radius: 50%;
    }
    &.slick-active {
      &:before {
        width: 14px;
        height: 14px;
        background: $primary-blue;
      }
    }
    button {
      display: none;
    }
  }
}
</style>
