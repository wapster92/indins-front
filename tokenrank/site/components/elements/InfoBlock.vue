<template>
  <div class="info-block" :class="{'info-block--reverse': reverse}">
    <div
      class="info-block__main">
      <MainHeading
        v-if="title.length"
        class="info-block__heading">
        {{ title }}
      </MainHeading>
      <slot>
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
      </slot>
    </div>
    <div class="info-block__picture">
      <TkPicture
        v-if="src.length"
        :src="src"
        class="info-block__img"/>
    </div>

  </div>
</template>

<script>
import MainHeading from './headers/MainHeading';
import TkPicture from '../UI/TkPicture';

export default {
  name: 'InfoBlock',
  components: {
    TkPicture,
    MainHeading,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.info-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include min-media($md) {
    grid-template-columns: 1fr 1fr;
    // gap: 128px;
  }
  &--reverse {
    flex-direction: row-reverse;
  }
  &__main {
    @include min-media($md) {

    }
  }
  &__picture {
    display: none;
    @include min-media($md) {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
  &__img {
    max-width: 330px;
  }
}
</style>
