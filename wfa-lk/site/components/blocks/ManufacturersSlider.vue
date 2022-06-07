<template>
  <div class="slider">
    <client-only>
      <VueSlickCarousel v-bind="options">
        <NuxtLink
          v-for="cat in pets"
          :key="cat.id"
          :to="`/personal-area/pets-and-docks/${cat.id}`"
          class="img-wrapper"
          draggable="false"
        >
          <div class="img-wrapper__img-wrap">
            <img
              v-if="cat.photo"
              class="img-wrapper__img"
              :src="cat.photo"
              draggable="false"
            >
            <div
              v-else
              class="img-wrapper__no-img"
            >
              Нет фото
            </div>
          </div>
          <div class="img-wrapper__name">
            {{ cat.name }}
          </div>
        </NuxtLink>
      </VueSlickCarousel>
    </client-only>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'ManufacturersSlider',
  components: {
    VueSlickCarousel,
  },
  props: {
    pets: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      options: {
        slidesToShow: 6,
        infinite: false,
        rows: 1,
        draggable: false,
        arrows: true,
        slidesToScroll: 6,
        responsive: [
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              arrows: false,
            },
          },
          {
            breakpoint: 594,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              arrows: false,
            },
          },
          {
            breakpoint: 460,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              arrows: false,
            },
          },
          {
            breakpoint: 360,
            settings: {
              arrows: false,
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="stylus" scoped>

.img-wrapper
  text-align: center;
  &__img
    width: 100%;
    height: 100%;
    object-fit cover
  &__img-wrap
    margin: 0 auto;
    width: 88px
    height: 88px
    border-radius: 50%;
    overflow hidden
    @media screen and (min-width: $tablet)
      width: 110px
      height: 110px
    @media screen and (min-width: 1000px)
      width: 126px;
      height: 126px;
  &__name
    text-align: center;
    font-size: 16px
    font-weight: 400;
    margin-top: 14px
    word-wrap: break-word
  &__no-img
    display flex
    width: 100%
    height: 100%
    justify-content: center;
    align-items center
    background: $grey-stroke;
    border: 1px solid $blue-main;
    border-radius: 50%;
>>> .slick-next, >>> .slick-prev
  top: 40%;
  &:before
    color $blue-main
>>> .slick-next
  right: -20px
>>> .slick-prev
  left: -20px
</style>
