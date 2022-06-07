<template>
  <div class="article-preview">
    <TkPicture
      :src="articlePreview.image.url"
      class="article-preview__picture"/>
    <div class="article-preview__wrapper news">
      <time class="news__text">{{ articlePreview.publicDate }}</time>
      <h3 class="news__title">{{ articlePreview.name }}</h3>
    </div>
  </div>
</template>

<script>
import TkPicture from '../UI/TkPicture';

export default {
  name: 'TkCardArticlePreview',
  components: { TkPicture },
  props: {
    articlePreview: {
      type: Object,
      default: () => ({
        image: {
          url: 'http://loremflickr.com/640/480/business?7024',
        },
        url: '/modern_soft_fish',
        source: 'bitcoin_large.webp',
        name: 'Bitcoin обновил минимум',
        publicDate: '10.09.2021',
      }),
    },
  },
};
</script>

<style lang="scss" scoped>
.article-preview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__picture {
    margin-bottom: 5px;
    @include min-media($md + 1) {
      margin-bottom: 18px;
      img {
        object-fit: cover
      };
    }
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.news {
  &__text {
    font-size: 12px;
    color: $secondary-medium-black;
    @include min-media($md + 1) {
      font-size: 14px;
    }
  }
  &__title {
    font-size: 12px;
    color: $primary-blue;
    text-align: left;
    margin: 2px 0;
    @include min-media($md + 1) {
      font-size: 20px;
      margin-top: 5px;
    }
  }
}
</style>
