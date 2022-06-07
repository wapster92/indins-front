<template>
  <div>
    <div
      v-if="isCoinsListPage"
      class="coin-listing"
    >
      <h1 class="coin__title">Криптовалюта</h1>
      <TkFilter
        :item-search-field="['name', 'ticker']"
        query="tokens"
        hide-invisible
        class="coin-filter"
        @constructed-filters="updateFilters($event)"
        @input-clear="clearFilters"
      />
      <CryptoHeader v-if="windowWidth > 960"/>
      <ApiForPagination
        :filters="computedFilters"
        entity="tokens">
        <template #default="{ list }">
          <div
            v-for="(coin, idx) of list"
            :key="coin.name"
            :class="{ 'coin__wrapper--details': idxToShow === idx}"
            class="coin__wrapper"
            @click="expand(idx, list)">
            <div
              v-if="idxToShow !== idx && windowWidth < 961"
              class="coin__info-unexpanded">
              <CryptoCoin
                :abbr="coin.ticker"
                :icon-src="coin.logo"
                :name="coin.name"/>
              <CryptoRating
                :rating="coin.rate"/>
            </div>
            <CryptoCard
              v-if="idxToShow === idx || windowWidth > 960"
              :coin-data="coin"/>
          </div>
        </template>
      </ApiForPagination>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import TkFilter from '../components/UI/TkFilter';
import CryptoCard from '../components/card/CryptoCard';
import CryptoRating from '../components/card/CryptoRating';
import CryptoCoin from '../components/card/CryptoCoin';
import ApiForPagination from '@/components/ApiForPagination';
import { metaMixin } from '@/mixins/meta';
import getMetaTags from '@/utils/getMetaTags';
import CryptoHeader from '@/components/card/CryptoHeader';

export default {
  name: 'Coins',
  components: {
    CryptoHeader,
    CryptoRating,
    CryptoCard,
    TkFilter,
    CryptoCoin,
    ApiForPagination,
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
      ref: null,
      filters: [],
      metaTags: null,
      baseFilters: [{
        field: 'visible',
        operator: 'bool',
        value: true,
      }, {
        field: 'deletedAt',
        operator: 'exists',
        value: false,
      },
      ],
      coins: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          id: 1,
          logo: 'coins/bitcoin',
          rate: 66.123,
          pdc: 87.45,
          pwc: 44,
          pmc: 98,
          tokenExchanges: [
            {
              name: 'Huobi Global',
              logo: 'exchanges/huobi',
            },
            {
              name: 'Binance',
              logo: 'exchanges/binance',
            },
            {
              name: 'Gate',
              logo: 'exchanges/gate',
            },
            {
              name: 'Mexc Global',
              logo: 'exchanges/mexc',
            },
            {
              name: 'Some exchange',
              logo: 'exchanges/binance',
            },
          ],
        }],
    };
  },
  computed: {
    isCoinsListPage() {
      return this.$route.name === 'coins';
    },
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
    computedFilters() {
      return this.filters?.length ? this.filters : this.baseFilters;
    },
  },
  methods: {
    expand(idx, list) {
      const { id } = list[idx];
      if (this.windowWidth > 960) {
        this.$router.push({ name: 'coins-id', params: { id: String(id) } });
      } else if (this.idxToShow === idx) {
        this.$router.push({ name: 'coins-id', params: { id: String(id) } });
      } else {
        this.idxToShow = idx;
      }
    },
    clearFilters() {
      this.filters = [];
    },
    updateFilters(filters) {
      if (filters.length) {
        this.filters = [...this.baseFilters, ...filters];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.coin {
  &-listing {
    padding: 0 16px;
    @include min-media($md + 1) {
      max-width: 1200px;
      margin: 0 auto;
    }
    @include min-media (1232px) {
      padding: 0;
    }
  }
  &__title {
    font-size: 40px;
    color: $primary-blue;
    margin-bottom: 35px;
  }
  &__wrapper {
    width: 100%;
    height: 69px;
    @include flex-between;
    border-radius: 8px;
    background: #FFF;
    box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
    padding: 16px;
    margin-bottom: 10px;
    @include min-media($md + 1) {
      padding: 0;
      height: 75px;
      max-width: 1200px;
    }
    @include min-media(961px) {
      &::v-deep .basics__item.info {
        justify-content: center;
      }
      &::v-deep .card__item.prices {
        justify-items: center;
      }
    }
    &--details {
      padding: 0;
      height: auto;
      .card__wrapper {
        height: 100%;
        width: 100%;
        max-width: none;
      }
    }
  }
  &__info-unexpanded {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 25px;
    @include max-media($sm) {
      padding: 0 5px;
    }
    @include min-max-media($sm + 1, $lg) {
      padding: 0 20px;
    }
    &::v-deep .rating {
      height: 39px;
      align-items: center;
      & .rating__info-wrapper {
        margin: 0;
        &--top {
          margin-bottom: 5px;
        }
        &--bottom {
          justify-content: flex-start;
        }
      }
    }
  }
  &-filter {
    margin-bottom: 25px;
  }
}
.card-header {
  &::v-deep .basics {
    &__info {
      justify-content: center;
    }
  }
  &::v-deep .prices {
    justify-items: center;
  }
}
</style>
