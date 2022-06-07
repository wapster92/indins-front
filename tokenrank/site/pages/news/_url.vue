<template>
  <div>
    <article class="article">
      <div class="article__wrapper container">
        <time class="article__date">{{ article.createdAt }}</time>
        <MainHeading class="article__title">
          {{ article.name }}
        </MainHeading>
        <div class="article__main">
          <div class="article__body">
            <TkPicture
              :src="article.image.url"
              class="article__preview"/>
            <div
              class="article__text"
              v-html="article.text"/>
          </div>
          <div class="article__aside">
            <BinanceSmallBanner/>
          </div>
        </div>
      </div>
    </article>
    <MoreSection
      title="Новости по теме"
      class="news"
      to-more="/"
      more-text="Все новости">
    <SimilarNews :news="news"/></MoreSection>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import MainHeading from '@/components/elements/headers/MainHeading';
import MoreSection from '@/components/elements/MoreSection';
import TkPicture from '@/components/UI/TkPicture';
import SimilarNews from '@/components/elements/SimilarNews';
import BinanceSmallBanner from '@/components/banners/BinanceSmallBanner';
import { metaMixin } from '@/mixins/meta';

export default {
  name: 'Id',
  components: {
    MainHeading,
    MoreSection,
    SimilarNews,
    TkPicture,
    BinanceSmallBanner,
  },
  async asyncData({ app: { $xhr }, route, error }) {
    try {
      const request = new Get('news-url').entity().setFilter([new Filter('url', 'eq', route.params.url)]);
      const response = await $xhr.send(request);
      const { result } = response.data.data;
      if (!response.data.success || result.isPublished) error();
      const metaTags = {
        metaTitle: result?.metaTitle,
        metaKeywords: result?.metaKeywords,
        metaDescription: result?.metaDescription,
        metaImage: result?.image?.url,
      };
      return { article: result, metaTags };
    } catch (e) {
      error(e);
    }
  },
  mixins: [
    metaMixin,
  ],
  data() {
    return {
      article: null,
      news: [
        {
          source: 'bitcoin_large.webp',
          title: 'Bitcoin обновил минимум',
          date: '10.09.2021',
        },
        {
          source: 'bitcoin_large.webp',
          title: 'Bitcoin обновил минимум',
          date: '10.09.2021',
        },
        {
          source: 'bitcoin_large.webp',
          title: 'Bitcoin обновил минимум',
          date: '10.09.2021',
        },
        {
          source: 'bitcoin_large.webp',
          title: 'Bitcoin обновил минимум',
          date: '10.09.2021',
        },
        {
          source: 'bitcoin_large.webp',
          title: 'Bitcoin обновил минимум',
          date: '10.09.2021',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.article {
  &__date {
    font-size: 12px;
    color: $secondary-medium-black;
    display: inline-flex;
    margin-bottom: 15px;
  }
  &__main {
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 30px;
    @include min-media($md) {
      grid-template-columns: 1fr 282px;
      gap: 24px
    }
  }
  &__aside {
    // display: none;
  }
  &__preview {
    display: inline-block;
    // margin-bottom: 20px;
  }
  &__text {
    font-size: 14px;
    @include min-media($md) {
      font-size: 16px;
    }
    h2 {
      margin: 20px 0;
      font-size: 22px;
      color: $primary-blue;
      font-weight: 400;
      @include min-media($md) {
        font-size: 32px;
        margin: 30px 0;
      }
    }
    h3 {
      margin: 20px 0;
      font-size: 18px;
      color: $primary-blue;
      font-weight: 500;
      @include min-media($md) {
        font-size: 20px;
        margin: 30px 0;
      }
    }
    p {
      margin: 20px 0;
      @include min-media($md) {
        margin: 30px 0;
      }
    }
    ul {
      list-style-type: none;
      margin: 23px 0 10px;
      padding-left: 20px;
      li {
        position: relative;
        margin: 10px 0;
        &:before {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: $primary-blue;
          border-radius: 50%;
          left: -20px;
          top: 5px;
        }
      }
    }
    ol {
      margin: 23px 0 10px;
      padding-left: 20px;
      li {
        margin: 10px 0;
      }
    }
    hr {
      width: 100%;
      height: 1px;
      background: $secondary-gray;
      margin: 15px 0;
      border: none;
    }
    blockquote, q {
      padding: 10px 15px;
      position: relative;
      margin: 25px 0;
      background: #F1F4FA;
      &:before {
        content: '';
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        width: 4px;
        background: $primary-blue;
      }
    }
    figure {
      margin: 20px 0;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    figcaption {
      color: rgba(64, 73, 103, 0.6);
      display: inline-block;
      margin-top: 10px;
    }
  }
}
.news {
  padding: 0 0 60px 0;
  @include min-media($md) {
    padding: 0 0 100px 0;
  }
}
</style>
