<template>
  <div class="article">
    <div class="article__wrapper">
      <div class="article__picture-wrapper">
        <NuxtLink
          :to="{name: 'news-url', params: { url: article.url }}"
          class="article__link">
          <TkPicture :src="getImageUrl(article) || require('~/assets/images/preview-news.webp')"/>
        </NuxtLink>
      </div>
      <div class="article__news-wrapper">
        <div class="news">
          <div class="news__title-wrapper">
            <h3 class="news__title">
              <NuxtLink
                :to="{name: 'news-url', params: { url: article.url }}"
                class="news__link">
                <span>{{ article.name }}</span>
              </NuxtLink>

              <TkTag
                v-if="article.token">
                <span class="tag-name">{{ article.token.name }}</span>
              </TkTag>
              <TkTag
                v-if="article.exchange"
                class="exc-tag">
                <span class="tag-name exc-tag-name">{{ article.exchange.name }}</span>
              </TkTag>
            </h3>
          </div>
          <p class="news__text">{{ article.description | addDoted }}</p>
          <span class="news__date">{{ article.createdAt | formatDate }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import TkPicture from '../UI/TkPicture';
import TkTag from '../UI/buttons/TkTag';

export default {
  name: 'TkArticlePreview',
  components: {
    TkPicture,
    TkTag,
  },
  filters: {
    formatDate(date) {
      if (date) {
        return DateTime.fromSQL(date).toFormat('dd.MM.yyyy');
      }
      return date;
    },
    addDoted(str) {
      return `${str}...`;
    },
  },
  props: {
    article: {
      type: Object,
      default: () => ({
        source: 'it.webp',
        name: 'Биржа Gate добавила монету DYDX',
        tags: [
          {
            name: 'DYDX',
            type: 'coin',
          },
          {
            name: 'Gate',
            type: 'exc',
          },
        ],
        news: 'Сегодня в 12:27 криптобиржа Gate добавила новую монету DYDX. Торги начнутся в ближайшее время.',
        date: '9.09.2021',
      }),
    },
  },
  methods: {
    getImageUrl(article) {
      if (article?.image?.url) {
        return article?.image?.url;
      }
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  &__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    @include min-media($md + 1) {
      max-width: 1200px;
      width: 100%;
      align-items: flex-start;
      flex-direction: row;
    }
  }
  &__picture-wrapper {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    max-height: 150px;
    text-align: left;
    &::v-deep img {
      max-height: 300px;
      @include max-media($sm) {
        max-height: 150px;
      }
      @include min-media($sm + 1) {
        max-height: 230px;
      }
    }
    @include min-media($md + 1) {
      max-width: 250px;
      margin: 0 40px 0 0;
    }
  }
  &__news-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    h2 {
      @include max-media($md) {
        margin-bottom: 10px;
      }
    }
    @include min-media($md + 1) {
      max-width: 703px;
    }
  }
}
.news {
  width: 100%;
  &__title-wrapper {
    text-align: left;
    width: 100%;
  }
  &__title {
    display: flex;
    align-items: center;
    color: $primary-blue;
    font-size: 18px;
    .exc {
      &-tag {
        background-color: $primary-yellow;
        &-name {
          color: #000;
        }
      }
    }
    .tag-name {
      font-size: 12px;
      @include min-media($lg + 1) {
        font-size: 14px;
      }
    }
  }
  &__link {
    display: inline-flex;
    margin-right: 15px;
    text-decoration: none;
    &:hover, &:focus {
      text-decoration: underline;
    }
  }
  .button-tk-tag {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__text, h2 {
    margin-top: 0;
  }
  &__text {
    color: $secondary-medium-black;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
  }
  &__date {
    color: $secondary-gray;
    font-size: 12px;
  }
  @include min-media($lg + 1) {
    align-items: flex-start;
    h2 > span,.button-tk-tag:not(:last-child) {
      margin-right: 15px;
    }
    h2 {
      font-size: 20px;
    }
    &__text {
      font-size: 16px;
      margin-bottom: 14px;
    }
    &__date {
      font-size: 14px;
    }
  }
}
</style>
