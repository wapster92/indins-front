<template>
  <div class="exchange-page">
    <div class="container exchange-page__container">
      <div
        v-if="windowWidth > 720"
        class="exchange-page__d-basics d-basics">
        <div class="d-basics__item"><img
          :src="exchange.logo"
          alt="chosen-exchange"></div>
        <div class="d-basics__item">
          <h2 class="d-basics__name">{{ exchange.name }}</h2>
          <p class="d-basics__default-info">{{ exchange.description || '' }}</p>
          <div class="d-basics__evaluation-wrapper base-analytics">
            <div class="base-analytics__item info">
              <CryptoRating
                :rating="exchange.rate"
                reversed
                info-icon-is-visible/>
            </div>
            <div class="base-analytics__item info">
              <span class="info__local">{{ volumes }} $</span>
              <span class="info__title">Объем торгов (24 ч)</span>
            </div>
            <div class="base-analytics__item info">
              <span class="info__local">{{ exchange.crypto || 0 }}</span>
              <span class="info__title">Криптовалют</span>
            </div>
            <div class="base-analytics__item info">
              <span class="info__local">{{ exchange.link }}</span>
              <span class="info__title">Сайт</span>
            </div>
          </div>
        </div>
        <div class="d-basics__item">
          <TkButton>Регистрация</TkButton>
        </div>
      </div>
      <div v-else>
        <CryptoExchange
          :icon-src="exchange.logo"
          :name="exchange.name"/>
        <div class="exchange-page__evaluation-wrapper">
          <div class="exchange-page__basics">
            <CryptoRating
              :rating="exchange.rate"
              reversed
              info-icon-is-visible/>
          </div>
          <div class="exchange-page__basics info">
            <span class="info__local">{{ volumes }} $</span>
            <span class="info__title">Объем торгов (24 ч)</span>
          </div>
          <div class="exchange-page__basics info">
            <span class="info__local">{{ exchange.crypto || 0 }}</span>
            <span class="info__title">Криптовалют</span>
          </div>
          <div class="exchange-page__basics info">
            <span class="info__local">{{ exchange.link }}</span>
            <span class="info__title">Сайт</span>
          </div>
        </div>
        <p class="exchange-page__demo-info">{{ exchange.description || '' }}</p>
        <TkButton class="exchange-page__register-button">Регистрация</TkButton>
      </div>
      <div
        v-if="windowWidth > 960"
        class="exchange-page__coins coins">
        <div class="coins__title">
          <h2>Криптовалюта</h2>
          <TkMoreButton to="/crypto_coins">Все криптовалюты</TkMoreButton>
        </div>
        <CryptoHeader />
        <div class="coins__carousel">
          <CarouselCryptoCards
            :coins-data="coins"
            without-exchanges
          />
        </div>
      </div>
      <div class="exchange-page__description description">
        <h2>О бирже</h2>
        <div
          class="description__text"
          v-html="(exchange.text + exchange.text2) || 'Hello'"/>
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
import TkButton from '../../components/UI/buttons/TkButton';
import TkLinearDiagram from '../../components/UI/TkLinearDiagram';
import TkMoreButton from '../../components/UI/buttons/TkMoreButton';
import CarouselExchangeCards from '../../components/elements/CarouselExchangeCards';
import MoreSection from '../../components/elements/MoreSection';
import SimilarNews from '../../components/elements/SimilarNews';
import TkTag from '../../components/UI/buttons/TkTag';
import CryptoExchange from '../../components/card/CryptoExchange';
import CarouselCryptoCards from '../../components/elements/CarouselCryptoCards';
import ApiForPagination from '@/components/ApiForPagination';
import CryptoHeader from '@/components/card/CryptoHeader';
import { getNews, getTopData } from '@/utils/baseRequests';

const getExchangeData = async (xhr, id) => {
  const req = new Get('exchange').entity().addFilter(new Filter('id', 'eq', id));
  try {
    const res = await xhr.send(req);
    if (!res.data.data?.result) return;
    return res.data.data.result;
  } catch (e) {
    console.log(e);
  }
};

export default {
  name: 'Id',
  components: {
    CryptoHeader,
    ApiForPagination,
    CryptoExchange,
    CarouselExchangeCards,
    TkMoreButton,
    TkLinearDiagram,
    TkButton,
    CryptoRating,
    CryptoCoin,
    MoreSection,
    SimilarNews,
    TkTag,
    CarouselCryptoCards,
  },
  filters: {
    toLocal(val) {
      return `${Number(val).toLocaleString('ru-RU')} $`;
    },
  },
  async asyncData({ app: { $xhr }, route }) {
    const exchange = await getExchangeData($xhr, route.params.id);
    const filters = [new Filter('deletedAt', 'exists', false), new Filter('visible', 'bool', true), new Filter('tokenExchanges.exchange.id', 'eq', route.params.id)];
    const coinsRes = await getTopData($xhr, route.params.id, 'tokens', filters, 'publicInterestScore');
    const news = await getNews($xhr, route.params.id, 'exc');
    if (!exchange?.id) return;
    const coins = coinsRes.map(el => ({ ...el, exchangeName: exchange?.name }));
    return { exchange, coins, news };
  },
  data() {
    return {
      news: [],
      exchange: {},
      coins: [],
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
    volumes() {
      return Math.round(Number(this.exchange.volume)).toLocaleString('ru-RU');
    },
    newsTitle() {
      return `Новости о ${this.exchange.name}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange {
  &-page {
    &::v-deep .exchange-base__wrapper {
      margin-bottom: 15px;
      .exchange-base__img {
        width: 50px;
        height: 50px;
      }
      .exchange-base__name {
        font-size: 22px;
      }
    }
    &__d-basics {
      @include flex-between;
    }
    &__evaluation-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 20px;
      row-gap: 10px;
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
          &:last-child {
            margin-bottom: 0;
          }
        }
        &__info-text {
          margin-right: 5px;
        }
      }
      &.info {
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
    &__demo-info {
      margin: 20px 0 25px 0;
    }
    &__register-button {
      margin-bottom: 40px;
    }
    &__description {
      @include max-media($md) {
        h2 {
          margin: 40px 0 15px 0;
        }
      }
      @include min-media($md + 1) {
        margin-bottom: 80px;
      }
    }
    & .info {
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
    &__coins {
      @include min-media($md + 1) {
        margin-bottom: 80px;
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
}
.d-basics {
  align-items: flex-start;
  gap: 45px;
  &__item {
    img {
      width: 125px;
      height: 125px;
    }
    button {
      min-width: 0;
      @include min-media(881px) {
        min-width: 224px
      }
    }
  }
  &__name {
    font-size: 32px;
    margin-top: 0;
  }
  &__default-info {
    margin: 15px 0 25px 0;
  }
  &__evaluation-wrapper {
    @include flex-start;
  }
}
.base-analytics {
  gap: 15px;
  @include min-media($md + 1) {
    display: flex;
    flex-wrap: wrap;
  }
  @include min-media(1200px) {
    gap: 35px;
  }
  &__item {
    @include flex-center;
    height: 70px;
    width: auto;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    flex-direction: column;
    padding: 10px 15px;
    &:nth-child(2) {
      white-space: nowrap;
    }
    &:first-child {
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
  }
}
.card-header {
  &::v-deep {
    .info {
      justify-content: center;
    }
    .prices {
      justify-items: center;
    }
  }
}
.coins {
  &::v-deep .rating__cards .card {
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    .info {
      justify-content: center;
    }
    .prices {
      justify-items: center;
    }
    .button-main {
      min-width: 180px;
    }
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
