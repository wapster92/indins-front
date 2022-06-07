<template>
  <div class="card">
    <div class="card__item basics">
      <div class="basics__item data">
        <img
          :src="coinData.logo"
          class="data__img"
          alt="coin"
          @error="$event.target.src='crypto-currency.png'"
        >
        <span class="data__name">{{ coinData.name }}</span>
        <TkTag class="data__abbr">{{ coinData.ticker }}</TkTag>
      </div>
      <div class="basics__item info">
        <TkIndicator :rating="Number(coinData.rate)"/>
        <span class="info__value">
          {{ evaluation }}
        </span>
      </div>
    </div>
    <div class="card__item prices">
      <CryptoRating
        :rating="coinData.rate"
        class="prices__rating" />
      <div class="prices__diagram">
        <div class="prices__subtitle"><span>24 ч</span></div>
        <TkCircleDiagram
          :visible="visible"
          :data-dasharray="[coinData.pdc, 100]">
          <span>{{ coinData.pdc | round }}</span>
        </TkCircleDiagram>
      </div>
      <div class="prices__diagram">
        <div class="prices__subtitle"><span>Неделя</span></div>
        <TkCircleDiagram
          :visible="visible"
          :data-dasharray="[coinData.pwc, 100]">
          <span>{{ coinData.pwc | round }}</span>
        </TkCircleDiagram>
      </div>
      <div class="prices__diagram">
        <div class="prices__subtitle"><span>Месяц</span></div>
        <TkCircleDiagram
          :visible="visible"
          :data-dasharray="[coinData.pmc, 100]">
          <span>{{ coinData.pmc | round }}</span>
        </TkCircleDiagram>
      </div>

    </div>
    <div class="card__item buy">
      <span
        v-if="!withoutExchanges"
        class="buy__subtitle">Где купить</span>
      <div
        v-if="!withoutExchanges"
        class="buy__images-wrapper">
        <img
          v-for="(icon, idx) of coinData.tokenExchanges"
          :key="icon.name"
          :src="icon.exchange.logo"
          :class="{ invisible: idx > 2 && coinData.tokenExchanges.length > 4 }"
          class="buy__img"
          alt="exchanges"
          @error="$event.target.src='binance.png'"
        >
        <TkOutlineButton v-if="coinData.tokenExchanges.length > 4"/>
      </div>
      <TkButton v-if="withoutExchanges">{{ buttonText }}</TkButton>
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkTag from '../UI/buttons/TkTag';
import TkIndicator from '../UI/TkIndicator';
import TkCircleDiagram from '../UI/TkCircleDiagram';
import TkOutlineButton from '../UI/buttons/TkOutlineButton';
import TkPopover from '../UI/TkPopover';
import CryptoRating from '@/components/card/CryptoRating';
import TkButton from '@/components/UI/buttons/TkButton';

export default {
  name: 'CryptoCard',
  components: {
    TkButton,
    TkOutlineButton,
    TkCircleDiagram,
    TkIndicator,
    TkTag,
    SimpleSvg,
    TkPopover,
    CryptoRating,
  },
  filters: {
    round(val) {
      if (!val) return '0';
      return Math.round(Number(val));
    },
  },
  props: {
    coinData: {
      type: Object,
      default: () => ({
        name: 'Bitcoin',
        ticker: 'BTC',
        logo: '/upload/tokens/logos/01coin.jpg',
        rate: 66.123,
        pdc: 87.45,
        pwc: 44,
        pmc: 98,
        tokenExchanges: [
          {
            exchange: {
              name: 'Huobi Global',
              logo: 'exchanges/huobi',
            },
            id: 1,
          },
        ],
      }),
    },
    withoutExchanges: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      logoFailedToLoad: false,
      observer: null,
      visible: false,
    };
  },
  computed: {
    evaluation() {
      return (Math.round((Number(this.coinData.rate) + Number.EPSILON) * 100) / 100).toLocaleString('ru-RU');
    },
    buttonText() {
      return this.withoutExchanges ? `Купить ${this.coinData.ticker} на ${this.coinData.exchangeName}` : '';
    },
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio <= 0) {
        return;
      }
      this.visible = true;
    });
    this.observer.observe(this.$el);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>

<style lang="scss" scoped>
@include max-media($md) {
  .card {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-areas: "data"
                          "prices"
                          "buy";
    row-gap: 2rem;
    padding: 16px 35px 20px;
    &__item {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .data {
      justify-content: center !important;
      grid-area: data;
      @include flex-center;
      &__img {
        height: 30px;
        width: 30px;
        margin-right: 5px;
      }
      &__name {
        font-size: 18px;
        font-weight: 400;
        margin-right: 4px;
        color: $primary-blue;
      }
    }
    .info {
      display: none;
    }
    .prices {
      grid-area: prices;
      display: flex;
      justify-content: center;
      gap: 20px;
      &__rating {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        &::v-deep .el-popover__reference-wrapper {
          display: none;
        }
        &::v-deep .rating__info {
          &-wrapper {
            margin-bottom: 10px;
          }
          &-text {
            font-size: 12px;
          }
        }
      }
      &__diagram {
        @include flex-start;
        flex-direction: column;
      }
      &__subtitle {
        font-size: 12px;
        color: $secondary-medium-black;
        margin-bottom: 4px;
      }
    }
    .buy {
      justify-content: center !important;
      grid-area: buy;
      @include flex-start;
      flex-direction: column;
      &__subtitle {
        font-size: 12px;
        color: $secondary-medium-black;
        margin-bottom: 4px;
      }
      &__images-wrapper {
        width: 100%;
        @include flex-center;
        img {
          margin-right: 12px;
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
@include min-max-media($md + 1, 960px) {
  .card {
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-areas: "data"
                          "prices"
                          "buy";
    row-gap: 2rem;
    padding: 20px 55px;
    &__item {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .data {
      justify-content: center !important;
      grid-area: data;
      @include flex-center;
      &__img {
        height: 45px;
        width: 45px;
        margin-right: 10px;
      }
      &__name {
        font-size: 22px;
        font-weight: 400;
        margin-right: 8px;
        color: $primary-blue;
      }
    }
    .info {
      display: none;
    }
    .prices {
      grid-area: prices;
      display: flex;
      justify-content: center;
      gap: 20px;
      &__rating {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        &::v-deep .el-popover__reference-wrapper {
          display: none;
        }
        &::v-deep .rating__info {
          &-wrapper {
            margin-bottom: 17px;
          }
          &-text {
            font-size: 16px;
          }
        }
      }
      &__diagram {
        @include flex-start;
        flex-direction: column;
      }
      &__subtitle {
        font-size: 16px;
        color: $secondary-medium-black;
        margin-bottom: 8px;
      }
    }
    .buy {
      justify-content: center !important;
      grid-area: buy;
      @include flex-start;
      flex-direction: column;
      &__subtitle {
        font-size: 16px;
        color: $secondary-medium-black;
        margin-bottom: 8px;
      }
      &__images-wrapper {
        width: 100%;
        @include flex-center;
        img {
          margin-right: 12px;
        }
      }
    }
  }
}
@include min-media($lg + 1) {
  .card {
    display: grid;
    width: 100%;
    grid-template-columns: 52fr 25fr 23fr;
    height: 75px;
    padding: 0 15px;
    align-items: center;
    cursor: pointer;
  }
  .basics {
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
  .data {
    @include flex-start;
    &__img {
      width: 45px;
      height: 45px;
      margin-right: 15px;
    }
    &__name {
      font-size: 20px;
      color: $primary-blue;
      font-weight: 400;
      margin-right: 12px;
      max-width: 170px;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .info {
    @include flex-start;
    &__value {
      margin-left: 10px;
    }
  }
  .prices {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    &__rating {
      display: none;
    }
    &__subtitle {
      display: none;
    }
  }
  .buy {
    &__images-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    &__subtitle {
      display: none;
    }
    button {
      display: inline-block;
    }
  }
}
@include min-media(1000px) {
  .data__name {
    max-width: 220px;
  }
}
@include min-media($xl + 1) {
  .card {
    max-width: 1200px;
    padding: 0 35px;
    &__item:nth-child(2),
    &__item:nth-child(3) {
      padding-left: 20px;
    }
  }
}
.invisible {
  display: none;
}
</style>
