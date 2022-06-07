<template>
  <div class="main-page">
    <div class="container slider-block">
      <SliderBase :dots="false">
        <div>
          <BinanceBanner/>
        </div>
        <div>
          <GateBanner/>
        </div>
        <div>
          <TkMexcBanner/>
        </div>

      </SliderBase>
    </div>
    <div class="container info-block">
      <InfoBlock
        :src="require('~/assets/images/info.png')"
        title="Криптобиржи">
        <p>
          Криптобиржи - это торговые площадки, на которых вы можете приобрести криптовалюту
          путем перевода средств на биржу и постановки ордеров.
        </p>
        <p>
          На биржах традиционно выгодней покупать криптовалюту, чем на сервисах обмена,
          так как вы можете самостоятельно выбрать цену, за которую готовы купить криптотокены.
        </p>
        <p>
          Рейтинг криптобирж рассчитывается от 1 до 100 относительно
          друг друга на основе объема торгов и других параметров.
        </p>
      </InfoBlock>
    </div>
    <MoreSection
      :to-more="{name: 'exchanges'}"
      class="market"
      title="Рейтинг криптобирж"
      more-text="Все биржи"
    >
      <ExchangeHeader v-if="windowWidth > 960"/>
      <CarouselExchangeCards
        :exchanges-data="exchanges"
        :mobile-coins-amt="false"
        register-text
      />
    </MoreSection>
    <MoreSection
      :to-more="{name: 'coins'}"
      class="currency"
      title="Рейтинг криптовалют"
      more-text="Все криптовалюты">
      <CryptoHeader v-if="windowWidth > 960"/>
      <CarouselCryptoCards :coins-data="coins"/>
    </MoreSection>
    <div class="container info-block">
      <InfoBlock
        :src="require('~/assets/images/estimation.png')"
        reverse>
        <p>Оценка токена рассчитывается на основании фундаментальных и финансовых показателей.</p>
        <p>Ориентироваться на оценку можно только для вложений в
        среднесрочной и долгосрочной перспективе от нескольких месяцев до нескольких лет.</p>
        <p>Оценка токенов рассчитывается от 1 до 100 относительно показателей друг друга,
        некоторые токены имеют одинаковую оценку.</p>
        <p>Криптовалюта является высокорисковым активом, оценка не является финансовым советом.</p>
      </InfoBlock>
    </div>
    <MoreSection
      :to-more="{name: 'news'}"
      title="Новости"
      more-text="Все новости">
    <CarouselNews :news="news"/></MoreSection>
  </div>
</template>

<script>
import { Filter, Get } from 'core-xhr';
import SliderBase from '@/components/main/SliderBase';
import BinanceBanner from '@/components/banners/BinanceBanner';
import GateBanner from '@/components/banners/GateBanner';
import TkMexcBanner from '@/components/banners/TkMexcBanner';
import InfoBlock from '@/components/elements/InfoBlock';
import ExchangeHeader from '@/components/card/ExchangeHeader';
import MainHeading from '@/components/elements/headers/MainHeading';
import TkMoreButton from '@/components/UI/buttons/TkMoreButton';
import SemiHeading from '@/components/elements/headers/SemiHeading';
import MoreSection from '@/components/elements/MoreSection';
import CarouselExchangeCards from '../components/elements/CarouselExchangeCards';
import CarouselCryptoCards from '../components/elements/CarouselCryptoCards';
import CarouselNews from '../components/elements/CarouselNews';
import getMetaTags from '@/utils/getMetaTags';
import { metaMixin } from '@/mixins/meta';
import CryptoHeader from '@/components/card/CryptoHeader';

const getData = async (xhr, query, sortField, customFilter) => {
  const filters = [new Filter('deletedAt', 'exists', false)];
  { // TODO, new Filter('visible', 'bool', true).
  }
  if (customFilter) {
    filters.push(customFilter);
  }
  const req = new Get(query).limitShown(5).addOrder(sortField, 'DESC').setFilter(filters);
  try {
    const res = await xhr.send(req);
    if (res.data.data?.result?.length) {
      return res.data.data.result;
    }
    return [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export default {
  name: 'Index',
  components: {
    CryptoHeader,
    CarouselCryptoCards,
    CarouselExchangeCards,
    SemiHeading,
    TkMoreButton,
    MainHeading,
    SliderBase,
    BinanceBanner,
    GateBanner,
    TkMexcBanner,
    InfoBlock,
    MoreSection,
    CarouselNews,
    ExchangeHeader,
  },
  async asyncData({ app: { $xhr }, error, route }) {
    try {
      const metaTags = await getMetaTags($xhr, route);
      const exchanges = await getData($xhr, 'exchanges', 'volumes');
      const coins = await getData($xhr, 'tokens', 'publicInterestScore');
      const news = await getData($xhr, 'news', 'publicDate', new Filter('isPublished', 'bool', true));
      return {
        metaTags, exchanges, coins, news,
      };
    } catch (e) {
      error(e);
    }
  },
  mixins: [
    metaMixin,
  ],
  data() {
    return {
      exchanges: [
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
      ],
      coins: [
        {
          name: 'Bitcoin',
          abbr: 'BTC',
          iconSrc: 'coins/bitcoin',
          rating: 26.123,
          dailyRating: 87.45,
          weeklyRating: 44,
          monthlyRating: 98,
          exchanges: [
            {
              name: 'Huobi Global',
              src: 'exchanges/huobi',
            },
            {
              name: 'Binance',
              src: 'exchanges/binance',
            },
            {
              name: 'Gate',
              src: 'exchanges/gate',
            },
            {
              name: 'Mexc Global',
              src: 'exchanges/mexc',
            },
            {
              name: 'Some exchange',
              src: 'exchanges/binance',
            },
          ],
        },
      ],
      news: [],
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-block {
  display: none;
  @include min-media($md) {
    display: block;
    margin-bottom: 80px;
  }
}
.info-block {
  margin-bottom: 40px;
  @include min-media($md) {
    margin-bottom: 84px;
  }
}
.rating--market {
  @include min-media(961px) {
    &::v-deep .card {
      height: 75px;
      & .card__item.ratings {
        justify-items: center;
      }
    }
  }
}
.market {
  padding: 19px 0 25px;
  background: $secondary-light-color;
  @include min-media($md) {
    padding: 35px 0 60px;
  }
}
.currency {
  padding: 40px 0 40px;
  @include min-media($md) {
    padding: 80px 0 80px;
  }
  @include max-media($lg) {
    &::v-deep .slick-list {
      overflow: visible;
    }
  }
  &::v-deep .card {
    box-shadow: 0 0 15px rgb(63 98 159 / 10%);
    @include max-media($sm) {
      .data__name {
        font-size: 14px;
      }
    }
    @include min-media(961px) {
      height: 75px;
      & .card__item.prices {
        justify-items: center;
      }
      & .basics__item.info {
        justify-content: center;
      }
    }
  }
}
.card-header {
  &::v-deep {
    .card-header__item {
      &.info,&.volumes,&.tokens {
        margin: 0 auto;
      }
    }
    & .basics__info.info {
      justify-content: center;
    }
    & .prices {
      justify-items: center;
    }
  }
}
</style>
