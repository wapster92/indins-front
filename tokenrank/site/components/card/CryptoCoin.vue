<template>
  <div class="coin-base__wrapper">
    <img
      :src="iconSrc"
      class="coin-base__img"
      alt="coin">
    <span class="coin-base__name">{{ name }}</span>
    <TkTag class="coin-base__abbr">{{ abbr }}</TkTag>
  </div>
</template>

<script>
import TkTag from '../UI/buttons/TkTag';

export default {
  name: 'CryptoCoin',
  components: {
    TkTag,
  },
  props: {
    iconSrc: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Bitcoin',
    },
    abbr: {
      type: String,
      default: 'BTC',
    },
  },
};
</script>

<style lang="scss" scoped>
.coin-base {
  &__wrapper {
    display: flex;
    align-items: center;
    @include max-media($md) {
      display: grid;
      grid-template-columns: 50px 1fr 1fr;
    }
  }
  &__img {
    width: 30px;
    height: 30px;
    margin-right: 8px;
    @include min-media($md + 1) {
      width: 45px;
      height: 45px;
      margin-right: 15px;
    }
  }
  &__name {
    margin-right: 7px;
    color: $primary-blue;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    @include max-media($md) {
      max-width: 170px;
    }
    @include min-max-media($md + 1, $lg) {
      max-width: 370px;
    }
    @include min-media($md + 1) {
      font-size: 20px;
      margin-right: 12px;
    }
  }
  &__abbr {
    @include max-media($md) {
      justify-self: flex-start;
      min-height: 18px;
      max-width: 140px;
      font-size: 12px;
      padding: 2px 8px;
    }
  }
}
</style>
