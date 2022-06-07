<template>
  <div>
    <div class="container">
      <MainHeading>Результаты поиска</MainHeading>
      <div class="search-results">
        <h3 class="search-results__title">
          По запросу
          “биржа Binance”
          найдено 5 результатов
        </h3>
        <SearchSectionResults
          entity="Криптобиржи"
          count="2">
          <ExchangeCard
            v-for="(exchange, i) of exchanges"
            :key="i"
            :exchange="exchange"
            class="card"/>
        </SearchSectionResults>
        <SearchSectionResults
          entity="Криптовалюта:"
          count="2">
          <CryptoCard
            v-for="(coin, i) of coinsData"
            :exchange="coin"
            :key="i"
            class="card"/>
        </SearchSectionResults>

        <SearchSectionResults
          entity="Новости"
          count="2">
          <SimilarNews :news="news"/>
        </SearchSectionResults>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeading from '@/components/elements/headers/MainHeading';
import SearchSectionResults from '@/components/elements/SearchSectionResults';
import SimilarNews from '@/components/elements/SimilarNews';
import CryptoCard from '@/components/card/CryptoCard';
import ExchangeCard from '@/components/card/ExchangeCard';

export default {
  name: 'SearchResults',
  components: {
    MainHeading,
    SearchSectionResults,
    SimilarNews,
    CryptoCard,
    ExchangeCard,
  },
  data() {
    return {
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
      coinsData: [
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
      exchanges: [
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
        {
          name: 'FTX',
          rating: 80.964,
          volume: 3005980425,
          crypto: 268,
          iconSrc: 'exchanges/ftx',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.search-results {
  padding-bottom: 60px;
  @include min-media($md) {
    padding-bottom: 100px;
  }
  &__title {
    font-weight: 400;
    font-size: 22px;
    color: $secondary-medium-black;
    margin: 0 0 25px 0;
    @include min-media($md) {
      font-size: 32px;
    }
  }
}
.card {
  margin-bottom: 15px;
}
</style>
