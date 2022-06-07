<template>
  <div class="carousel-news">
    <SliderBase
      v-if="news.length"
      :settings="sliderSetting"
      class="carousel-news__slider">
      <div
        v-for="newPreview of news"
        :key="newPreview.title"
        class="carousel-news__slide">
        <TkCardArticlePreview

          :article-preview="newPreview"
        />
      </div>

    </SliderBase>
  </div>
</template>

<script>
import SliderBase from '../main/SliderBase';
import TkCardArticlePreview from '../articles/TkCardArticlePreview';

export default {
  name: 'CarouselNewsVue',
  components: {
    SliderBase,
    TkCardArticlePreview,
  },
  props: {
    news: {
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
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        touchThreshold: 5,
        responsive: [
          {
            breakpoint: 719,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped lang="scss">
.carousel-news {
  margin-bottom: 60px;
  @include min-media($md) {
    margin-bottom: 100px;
  }
  &__slide {
    padding: 0 10px 0 10px;
  }
}

</style>
