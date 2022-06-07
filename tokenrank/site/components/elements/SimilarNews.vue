<template>
  <div
    v-if="news.length"
    class="carousel">
    <SliderBase
      v-if="windowWidth <= 960 || slider"
      :settings="sliderSetting"
      class="carousel__slider">
      <div
        v-for="newPreview of news"
        :key="newPreview.title"
        class="carousel__slide">
        <TkCardArticlePreview

          :article-preview="newPreview"
        />
      </div>
    </SliderBase>
    <div
      v-else
      class="carousel__grid">
      <TkCardArticlePreview
        v-for="(newPreview, i) of news"
        :article-preview="newPreview"
        :key="i"/>
    </div>
  </div>
</template>

<script>
import SliderBase from '../main/SliderBase';
import TkCardArticlePreview from '../articles/TkCardArticlePreview';

export default {
  name: 'SimilarNews',
  components: {
    SliderBase,
    TkCardArticlePreview,
  },
  props: {
    news: {
      type: Array,
      default: () => ([]),
    },
    slider: {
      type: Boolean,
      default: false,
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
  computed: {
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
};
</script>

<style scoped lang="scss">
.carousel {
  &__slide {
    padding: 0 10px 0 10px;
  }
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }
}
</style>
