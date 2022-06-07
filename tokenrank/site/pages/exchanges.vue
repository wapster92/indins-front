<template>
  <div class="exchange">
    <div
      v-if="isCoinsListPage"
      class="exchange__listing">
      <h1 class="exchange__title">Криптобиржи</h1>
      <TkFilter
        :display-filter="false"
        class="exchange__filter"/>
      <ExchangeHeader v-if="windowWidth > 960"/>
      <ApiForPagination entity="exchanges">
        <template #default="{list}">
          <div
            v-for="(exchange, idx) of list"
            :key="exchange.name"
            :class="{ 'exchange__wrapper--details': idxToShow === idx}"
            class="exchange__wrapper"
            @click="expand(idx, list)">
            <div
              v-if="idxToShow !== idx && windowWidth <= 720"
              class="exchange__info-unexpanded">
              <CryptoExchange
                :logo="exchange.logo"
                :name="exchange.name"/>
              <CryptoRating
                :rating="exchange.rate"/>
            </div>
            <ExchangeCard
              v-if="idxToShow === idx || windowWidth > 720"
              :exchange="exchange"
              coins-amt
              custom-text="Регистрация"/>
          </div>
        </template>
      </ApiForPagination>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import TkFilter from '../components/UI/TkFilter';
import ExchangeCard from '../components/card/ExchangeCard';
import CryptoRating from '../components/card/CryptoRating';
import CryptoExchange from '../components/card/CryptoExchange';
import ExchangeHeader from '@/components/card/ExchangeHeader';
import ApiForPagination from '@/components/ApiForPagination';
import { metaMixin } from '@/mixins/meta';
import getMetaTags from '@/utils/getMetaTags';

export default {
  name: 'Exchanges',
  components: {
    ApiForPagination,
    CryptoRating,
    ExchangeCard,
    TkFilter,
    CryptoExchange,
    ExchangeHeader,
  },
  mixins: [
    metaMixin,
  ],
  async asyncData({ app: { $xhr }, error, route }) {
    try {
      const metaTags = await getMetaTags($xhr, route);
      return {
        metaTags,
      };
    } catch (e) {
      error(e);
    }
  },
  data() {
    return {
      idxToShow: null,
      exchanges: [
        {
          name: 'Binance',
          rate: 80.964,
          volume: 3005980425,
          id: 1,
          crypto: 268,
          logo: 'exchanges/binance',
        },
      ],
    };
  },
  computed: {
    isCoinsListPage() {
      return this.$route.name === 'exchanges';
    },
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
  methods: {
    expand(idx, list) {
      const { id } = list[idx];
      if (this.windowWidth > 960) {
        this.$router.push({ name: 'exchanges-id', params: { id: String(id) } });
      } else if (this.idxToShow === idx) {
        this.$router.push({ name: 'exchanges-id', params: { id: String(id) } });
      } else {
        this.idxToShow = idx;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange {
  &__listing {
    padding: 0 16px;
    @include min-media($md + 1) {
      max-width: 1200px;
      margin: 0 auto;
    }
    @include min-media (1232px) {
      padding: 0;
    }
  }
  &__filter {
    margin-bottom: 25px;
  }
  &__title {
    font-size: 40px;
    color: $primary-blue;
    margin-bottom: 35px;
  }
  &__wrapper {
    width: 100%;
    height: 100%;
    @include flex-between;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    margin-bottom: 10px;
    @include max-media($md) {
      height: 69px;
      padding: 15px;
    }
    @include min-media($lg + 1) {
      height: 85px;
      padding: 0;
      max-width: 1200px;
      box-shadow: none;
      &::v-deep .card__item.ratings {
        justify-items: center;
      }
    }
    &--details {
      padding: 0;
      height: auto;
      .card {
        height: 100%;
        width: 100%;
        max-width: none;
        @include max-media($md) {
          &::v-deep .ratings {
            width: 100%;
            justify-content: center;
            &__item-wrapper {
              &:first-child,
              &:nth-child(2) {
                margin-right: 25px;
              }
            }
          }
          &::v-deep .button-main {
            width: 186px;
            margin: 0 auto;
          }
        }
      }
    }
  }
  &__info-unexpanded {
    width: 100%;
    @include flex-between;
  }
}
.card-header {
  &::v-deep {
    .card-header__item {
      &.info,&.volumes,&.tokens {
        margin: 0 auto;
      }
    }
  }
}
</style>
