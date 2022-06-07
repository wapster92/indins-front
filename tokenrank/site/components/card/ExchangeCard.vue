<template>
  <div
    :class="{ 'card--cut': !coinsAmt }"
    class="card">
    <div class="card__item basics">
      <img
        :src="exchange.logo"
        class="basics__img"
        alt="coin">
      <span class="basics__name">{{ exchange.name }}</span>
    </div>
    <div
      v-if="!coinsAmt && windowWidth > 960"
      class="card--cut__item ratings-cut">
      <TkIndicator :rating="Number(exchange.rate)"/>
      <span class="ratings-cut__value">{{ evaluation }}</span>
    </div>
    <div
      v-if="!coinsAmt && windowWidth > 960"
      class="card--cut__item volumes-cut">
      <span
        class="volumes-cut__value">{{ volumes }} $</span>
    </div>
    <div
      v-if="coinsAmt || windowWidth < 961"
      class="card__item ratings">
      <div class="ratings__item-wrapper">
        <div
          v-if="windowWidth < 961"
          class="ratings__info-wrapper ratings__info-wrapper--top">
          <span class="ratings__info-text info-text">Оценка</span>
          <TkPopover>
            <SimpleSvg
              class="ratings__info-icon"
              icon-name="UI/info"/>
          </TkPopover>
        </div>
        <div class="ratings__info-wrapper ratings__info-wrapper--bottom">
          <TkIndicator :rating="Number(exchange.rate)"/>
          <span class="ratings__value">{{ evaluation }}</span>
        </div>
      </div>
      <div class="ratings__item-wrapper">
        <span
          v-if="windowWidth < 961"
          class="info-text ratings-subtitle">Объем торгов (24 ч)</span>
        <span class="ratings__value">{{ volumes }} $</span>
      </div>
      <div
        v-if="coinsAmt && !coinsAmtShownMobile"
        class="ratings__item-wrapper">
        <span
          v-if="windowWidth > 720 && windowWidth < 961"
          class="info-text ratings-subtitle">Криптовалюта</span>
        <span
          v-if="windowWidth < 721"
          class="info-text ratings-subtitle">Токены</span>
        <span class="ratings__value">{{ exchange.crypto }}</span>
      </div>
    </div>
    <div class="card__item register">
      <TkButton small><span>{{ customText || label }}</span></TkButton>
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkIndicator from '../UI/TkIndicator';
import TkButton from '../UI/buttons/TkButton';
import TkPopover from '../UI/TkPopover';

export default {
  name: 'ExchangeCard',
  components: {
    TkButton,
    SimpleSvg,
    TkIndicator,
    TkPopover,
  },
  props: {
    coinAbbr: {
      type: String,
      default: 'BTC',
    },
    coinsAmt: {
      type: Boolean,
      default: true,
    },
    mobileCoinsAmt: {
      type: Boolean,
      default: true,
    },
    exchange: {
      type: Object,
      default: () => ({
        name: 'FTX',
        rate: 80.964,
        volume: 3005980425,
        crypto: 268,
        logo: 'exchanges/ftx',
      }),
    },
    customText: {
      type: String,
      default: '',
    },
    customTextButton: {
      type: Boolean,
      default: false,
    },
    registerText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      return (this.windowWidth > 720 && !this.customTextButton) || this.registerText ? 'Регистрация' : `Купить ${this.coinAbbr} на ${this.exchange?.name}`;
    },
    evaluation() {
      return (Math.round((Number(this.exchange.rate) + Number.EPSILON) * 100) / 100).toLocaleString('ru-RU');
    },
    volumes() {
      return Math.round(Number(this.exchange.volume)).toLocaleString('ru-RU');
    },
    coinsAmtShownMobile() {
      return !this.mobileCoinsAmt && this.windowWidth < 721;
    },
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #FFFFFF;
  box-shadow: 0 0 15px rgba(63, 98, 159, 0.1);
  border-radius: 8px;
  height: 100%;
  @include flex-between;
  &__item {
    @include flex-between;
    .ratings {
      &__item-wrapper {
        @include flex-between;
        flex-direction: column;
      }
      &__info-icon {
        display: flex;
        width: 16px !important;
        height: 16px !important;
        margin-right: 0;
      }
      &__info-wrapper {
        @include flex-center;
      }
      &__info-text {
        @include flex-center;
      }
    }
  }
}
.basics {
  &__img {
    width: 45px;
    height: 45px;
  }
  &__name {
    color: $primary-blue;
    font-size: 20px;
  }
}
.ratings {
  align-items: flex-start;
  &__value {
    color: $primary-blue;
  }
  &__info-wrapper--bottom {
    @include flex-between;
  }
  &-subtitle {
    margin-bottom: 10px;
  }
}
.register {
  button {
    min-width: auto;
    width: 116px;
  }
}
@include min-max-media($md, $lg) {
  .card {
    &__item.register {
      justify-content: center;
      .button-main {
        width: 200px;
      }
    }
    &__item.basics img {
      width: 45px;
      height: 45px;
    }
    &__item.basics {
      & .basics__name {
        font-size: 20px;
      }
    }
  }
}
@include max-media($lg) {
  .card {
    width: 100%;
    border-radius: 6px;
    padding: 16px 20px 30px;
    flex-direction: column;
    height: 100%;
  }
  .basics {
    margin-bottom: 15px;
    &__img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    &__name {
      font-size: 18px;
    }
  }
  .ratings {
    margin-bottom: 15px;
    &__item-wrapper {
      margin-right: 0;
      &:first-child {
        margin-right: 28px;
      }
    }
    &__value {
      font-size: 14px;
      line-height: 18.27px;
    }
    &__info {
      &-wrapper--top {
        margin-bottom: 4px;
      }
      &-icon {
        display: none !important;
      }
      &-text {
        margin-right: 5px;
        font-size: 12px;
      }
    }
    &__info-wrapper--bottom {
      & .indicator__wrapper {
        margin-right: 4px;
      }
    }
    &-subtitle {
      font-size: 12px;
      margin-bottom: 4px;
    }
  }
  .register {
    width: 100%;
    button {
      width: 100%;
      span {
        font-size: 12px;
      }
    }
  }
}
@include min-max-media($md, $lg) {
  .card--cut {
    .ratings {
      &__item-wrapper {
        &:nth-child(2) {
          margin-right: 0;
        }
      }
    }
  }
  .ratings {
    &__item-wrapper {
      span {
        font-size: 16px;
      }
      &:nth-child(2) {
        margin-right: 28px;
      }
    }
  }
}
@include min-media($lg+ 1) {
  .card {
    width: 100%;
    max-height: 110px;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 3fr 1fr;
    justify-items: flex-end;
    padding: 0 15px;
    cursor: pointer;
    &--cut {
      height: 75px;
      grid-template-columns: 9fr 4fr 4fr 4fr;
      .ratings-cut,.volumes-cut {
        width: 100%;
        @include flex-center;
        @include min-media(1140px) {
          padding-left: 20px;
        }
      }
      .ratings-cut {
        .indicator__wrapper {
          margin-right: 10px;
        }
      }
    }
  }
  .basics {
    justify-self: flex-start;
    &__img{
      margin-right: 15px;
    }
    &__name {
      margin-right: 12px;
    }
  }
  .ratings {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: flex-start;
    &__info {
      &-wrapper {
        margin-bottom: 8px;
        align-items: flex-start;
        &--bottom {
          margin-bottom: 0;
          & .indicator__wrapper {
            margin-right: 10px;
          }
        }
      }
      &-text {
        margin-right: 5px;
      }
    }
    &__value {
      line-height: 25px;
    }
  }
}
@include min-media($xl + 1) {
  .card {
    max-width: 1200px;
    max-height: 110px;
    padding: 0 40px 0 35px;
    .ratings {
      &__item-wrapper {
        padding-left: 20px;
        &:last-child {
          padding-left: 40px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
