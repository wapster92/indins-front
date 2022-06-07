<template>
  <div class="result">
    <div class="result__head">
      <span class="result__entity">{{ entity }}:</span>
      <span class="result__count">
        {{ count | getNoun('результат', 'результата', 'результатов') }}
      </span>
    </div>
    <div class="result__body">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchSectionResults',
  filters: {
    getNoun(number, one, two, five) {
      let n = Math.abs(Number(number));
      n %= 100;
      if (n >= 5 && n <= 20) {
        return `${number} ${five}`;
      }
      n %= 10;
      if (n === 1) {
        return `${number} ${one}`;
      }
      if (n >= 2 && n <= 4) {
        return `${number} ${two}`;
      }
      return `${number} ${five}`;
    },
  },
  props: {
    entity: {
      type: String,
      default: '',
    },
    count: {
      type: (Number | String),
      default: 0,
    },
  },
};
</script>

<style scoped lang="scss">
.result {
  margin: 20px 0;
  &__head {
    font-size: 18px;
    display: flex;
    gap: 10px;
    color: $secondary-medium-black;
    padding-bottom: 10px;
    @include min-media($md) {
      font-size: 20px;
      padding-bottom: 20px;
    }
  }
  &__entity {
    color: $primary-blue;
  }
}
</style>
