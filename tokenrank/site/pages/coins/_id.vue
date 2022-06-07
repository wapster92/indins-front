<template>
  <div class="coin-page">
    <div class="container coin-page__container">
      <div
        v-if="windowWidth > 720"
        class="coin-page__d-basics d-basics">
        <div class="d-basics__item"><img
          :src="coin.logo"
          alt="chosen-coin"></div>
        <div class="d-basics__item">
          <div class="d-basics__subtitle">
            <h2 class="d-basics__name">{{ coin.name }}</h2>
            <TkTag class="d-basics__abbr">{{ coin.ticker }}</TkTag>
          </div>
          <p class="d-basics__default-info">{{ coin.description }}</p>
          <div class="d-basics__evaluation-wrapper base-analytics">
            <div class="base-analytics__points">
              <CryptoRating
                :rating="coin.rate"
                reversed
                info-icon-is-visible/>
            </div>
            <div class="base-analytics__price price">
              <span class="price__local">{{ localPrice }} $</span>
              <span class="price__title">Текущая цена</span>
            </div>
          </div>
        </div>
        <div class="d-basics__item">
          <TkButton>Купить {{ coin.ticker }}</TkButton>
        </div>
      </div>
      <div v-else>
        <CryptoCoin
          :abbr="coin.ticker"
          :name="coin.name"
          :icon-src="coin.logo"/>
        <div class="coin-page__evaluation-wrapper">
          <div class="coin-page__basics">
            <CryptoRating
              :rating="coin.rate"
              reversed
              info-icon-is-visible/>
          </div>
          <div class="coin-page__basics price">
            <span class="price__local">{{ localPrice }} $</span>
            <span class="price__title">Текущая цена</span>
          </div>
        </div>
        <p class="coin-page__demo-info">{{ coin.description }}</p>
        <TkButton>Купить {{ coin.ticker }}</TkButton>
      </div>
      <h2>Сводка</h2>
      <div class="coin-page__stats">
        <div class="coin-page__diagram-wrapper">
          <TkLinearDiagram
            :current-value="coin.pdc"
            :max="coin.pdh"
            :min="coin.pdl"
            period="24 ч"/>
          <TkLinearDiagram
            :current-value="coin.pwc"
            :max="coin.pwh"
            :min="coin.pwl"
            period="Неделя"/>
          <TkLinearDiagram
            :current-value="coin.pmc"
            :max="coin.pmh"
            :min="coin.pml"
            period="Месяц"/>
        </div>
        <div class="coin-page__analytics">
          <div class="coin__analytics-wrapper analytics">
            <div class="analytics__item">
              <span class="analytics__subtitle">Мин. цена TWT за 24 ч:</span>
              <span class="analytics__value">{{ coin.pdl | toLocal }}</span>
            </div>
            <div class="analytics__item">
              <span class="analytics__subtitle">Макс. цена TWT за 24 ч:</span>
              <span class="analytics__value">{{ coin.pdh | toLocal }}</span>
            </div>
          </div>
          <div class="coin__analytics-wrapper analytics">
            <div class="analytics__item">
              <span class="analytics__subtitle">Мин. цена TWT за 7 д:</span>
              <span class="analytics__value">{{ coin.pwl | toLocal }}</span>
            </div>
            <div class="analytics__item">
              <span class="analytics__subtitle">Макс. цена TWT за 7 д:</span>
              <span class="analytics__value">{{ coin.pwh | toLocal }}</span>
            </div>
          </div>
          <div class="coin__analytics-wrapper analytics">
            <div class="analytics__item">
              <span class="analytics__subtitle">Мин. цена TWT за 30 д:</span>
              <span class="analytics__value">{{ coin.pml | toLocal }}</span>
            </div>
            <div class="analytics__item">
              <span class="analytics__subtitle">Макс. цена TWT за 30 д:</span>
              <span class="analytics__value">{{ coin.pmh | toLocal }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="coin-page__buy buy">
        <div class="buy__title">
          <h2>Купить {{ coin.name }}</h2>
          <TkMoreButton to="/crypto_exchange">Все биржи</TkMoreButton>
        </div>
        <ExchangeHeader
          v-if="windowWidth > 960"
          without-count/>
        <div class="coin-page__carousel">
          <CarouselExchangeCards
            :coin-abbr="coin.ticker"
            :custom-text-button="true"
            :coins-amt="false"
            :exchanges-data="exchanges"/>
        </div>
      </div>
      <div class="coin-page__description description">
        <h2>О криптовалюте {{ coin.name }}</h2>
        <div
          class="description__text"
          v-html="coin.description"/>
      </div>

    </div>

    <MoreSection
      :title="newsTitle"
      class="news"
      to-more="/"
      more-text="Все новости">
      <SimilarNews
        :news="news"
        slider/></MoreSection>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import CryptoCoin from '../../components/card/CryptoCoin';
import CryptoRating from '../../components/card/CryptoRating';
import ExchangeHeader from '@/components/card/ExchangeHeader';
import TkButton from '../../components/UI/buttons/TkButton';
import TkLinearDiagram from '../../components/UI/TkLinearDiagram';
import TkMoreButton from '../../components/UI/buttons/TkMoreButton';
import CarouselExchangeCards from '../../components/elements/CarouselExchangeCards';
import MoreSection from '../../components/elements/MoreSection';
import SimilarNews from '../../components/elements/SimilarNews';
import TkTag from '../../components/UI/buttons/TkTag';
import ApiForPagination from '@/components/ApiForPagination';
import { getNews, getTopData } from '@/utils/baseRequests';

const getCoinData = async (xhr, id) => {
  const req = new Get('token').entity().addFilter(new Filter('id', 'eq', id));
  try {
    const res = await xhr.send(req);
    if (!res.data.data?.result) return;
    if (res.data.data.result?.tokenExchanges) {
      return { ...res.data.data.result, tokenExchanges: res.data.data.result.tokenExchanges.map(el => el.exchange) };
    }
    return res.data.data.result;
  } catch (e) {
    console.log(e);
  }
};

export default {
  name: 'Id',
  components: {
    CarouselExchangeCards,
    ApiForPagination,
    TkMoreButton,
    TkLinearDiagram,
    ExchangeHeader,
    TkButton,
    CryptoRating,
    CryptoCoin,
    MoreSection,
    SimilarNews,
    TkTag,
  },
  filters: {
    toLocal(val) {
      return `${Number(val).toLocaleString('ru-RU')} $`;
    },
  },
  async asyncData({ app: { $xhr }, route }) {
    const coin = await getCoinData($xhr, route.params.id);
    const filters = [new Filter('deletedAt', 'exists', false), new Filter('tokenExchanges.token.id', 'eq', route.params.id)];
    const exchanges = await getTopData($xhr, route.params.id, 'exchanges', filters, 'volume');
    const news = await getNews($xhr, route.params.id, 'coin');
    if (!coin?.id) return;
    return { coin, exchanges, news };
  },
  data() {
    return {
      news: [],
      exchanges: [],
      coin: {},
    };
  },
  computed: {
    localPrice() {
      return this.coin?.pdc.toLocaleString('ru-RU');
    },
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
    newsTitle() {
      return `Новости о ${this.coin.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.coin {
  &-page {
    &::v-deep .coin-base__wrapper {
      margin-bottom: 15px;
      display: flex;
      .coin-base__img {
        width: 50px;
        height: 50px;
      }
      .coin-base__name {
        font-size: 22px;
      }
    }
    &__evaluation-wrapper {
      @include flex-start;
      @include max-media($sm) {
        width: 100%;
        justify-content: space-between;
      }
    }
    &__container {
      &::v-deep .button-main {
        @include min-max-media($sm + 1, $md) {
          width: 308px;
        }
      }
    }
    &__basics {
      @include flex-center;
      min-height: 54px;
      min-width: 154px;
      border-radius: 8px;
      box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
      &::v-deep .rating {
        &__info-wrapper {
          justify-content: center;
          margin-bottom: 5px;
        }
        &__info-text {
          margin-right: 5px;
        }
      }
      &.price {
        flex-direction: column;
      }
    }
    &__stats {
      @include min-media($md + 1) {
        display: grid;
        grid-template-columns: 1fr 2fr;
        column-gap: 50px;
        align-items: flex-start;
      }
    }
    &__description {
      @include min-media($md + 1) {
        margin-bottom: 80px;
      }
    }
    & .price {
      &__title {
        font-size: 12px;
        @include min-media($md + 1) {
          font-size: 14px;
        }
      }
      &__local {
        font-size: 14px;
        color: $primary-blue;
        @include min-media($md + 1) {
          font-size: 20px;
        }
      }
    }
    h2 {
      font-weight: 400;
      color: $primary-blue;
      @include min-media($md + 1) {
        font-size: 32px;
      }
    }
    & .buy {
      @include min-media($md + 1) {
        margin-bottom: 80px;
      }
      &__title {
        @include flex-between;
        &::v-deep .button-show-more {
          text-decoration: none;
          &__container {
            display: flex;
          }
          &__text {
            font-size: 12px;
            color: $secondary-medium-black;
            @include min-media($md + 1) {
              font-size: 16px;
            }
          }
        }
      }
    }
    &__carousel {
      &::v-deep .slick-list {
        overflow: visible;
      }
      @include min-media($md + 1) {
        &::v-deep .button-main {
          width: auto;
        }
      }
    }
    &__analytics {
      @include min-media($md + 1) {
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }
    .rating.rating--market {
      margin-bottom: 60px;
      &::v-deep .rating__head {
        align-items: baseline;
      }
      &::v-deep .button-show-more__text {
        font-size: 12px;
        @include min-media($md + 1) {
          font-size: 16px;
        }
      }
    }
  }
  &__analytics-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    margin: 10px 0;
    border-bottom: 1px solid $primary-light-blue;
    padding-bottom: 10px;
    @include min-media($md + 1) {
      grid-template-columns: 1fr;
      border-bottom: none;
      border-right: 1px solid $primary-light-blue;
      padding: 0 45px;
      margin: 0;
    }
    &:first-child {
      padding-top: 10px;
      @include min-media($md + 1) {
        padding-top: 0;
      }
    }
    &:last-child {
      border: none;
    }
    & .analytics__item {
      display: flex;
      flex-direction: column;
      @include min-media($md + 1) {
        margin-bottom: 25px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    & .analytics__subtitle {
      font-size: 12px;
      color: $secondary-medium-black;
      margin-bottom: 5px;
      @include min-media($md + 1) {
        font-size: 14px;
      }
    }
    & .analytics__value {
      font-size: 18px;
      color: $primary-blue;
      @include min-media($md + 1) {
        font-size: 20px;
      }
    }
  }
}
.d-basics {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  column-gap: 10px;
  &__item {
    img {
      width: 125px;
      height: 125px;
    }
  }
  &__subtitle {
    @include flex-start;
  }
  &__name {
    margin: 0 15px 0 0;
    font-size: 32px;
  }
  &__default-info {
    margin: 15px 0 25px 0;
  }
  &__evaluation-wrapper {
    @include flex-start;
  }
}
.base-analytics {
  height: 70px;
  &__points {
    @include flex-center;
    min-width: 154px;
    height: 100%;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    margin-right: 35px;
    &::v-deep .rating {
      padding: 12px 15px 10px;
      &__info-wrapper {
        justify-content: center;
        margin-bottom: 5px;
      }
      &__info-text {
        margin-right: 5px;
      }
      &__value {
        @include min-media($md + 1) {
          font-size: 20px;
        }
      }
    }
  }
  &__price {
    @include flex-center;
    height: 100%;
    min-width: 154px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    flex-direction: column;
  }
}
.description {
  &__text {
    font-size: 14px;
    @include min-media($md + 1) {
      font-size: 16px;
      columns: auto 2;
    }
    &::v-deep {
      p {
        margin: 0 0 20px;
        @include min-media($md + 1) {
          margin: 0 0 30px;
        }
      }
      h2 {
        margin: 0 0 20px;
        font-size: 22px;
        color: $primary-blue;
        font-weight: 400;
        @include min-media($md + 1) {
          font-size: 32px;
          margin: 0 0 30px;
        }
      }
      h3 {
        margin: 0 0 20px;
        font-size: 18px;
        color: $primary-blue;
        font-weight: 500;
        @include min-media($md + 1) {
          font-size: 20px;
          margin: 0 0 30px;
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
}
</style>
