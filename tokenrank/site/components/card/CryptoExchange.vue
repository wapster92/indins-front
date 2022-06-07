<template>
  <div class="exchange-base__wrapper">
    <img
      :src="logo"
      class="exchange-base__img"
      alt="exchange">
    <span class="exchange-base__name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'CryptoExchange',
  props: {
    logo: {
      type: String,
      default: 'exchanges/binance',
    },
    name: {
      type: String,
      default: 'Binance',
    },
  },
};
</script>

<style lang="scss" scoped>
.exchange-base {
  &__wrapper {
    display: flex;
    align-items: center;
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
    @include min-media($md + 1) {
      font-size: 20px;
      margin-right: 12px;
    }
  }
}
</style>
