<template>
  <div>
    <div class="error-not-found">
      <img
        class="error-not-found__img"
        src="~/assets/images/error-picture.png"
        alt="error-image">
      <MainHeading class="error-not-found__title">Страница не найдена</MainHeading>
      <p class="error-not-found__text">Страница не существует или она была удалена</p>
      <TkButton class="error-not-found__button">
        <NuxtLink to="/">На главную</NuxtLink>
      </TkButton>
    </div>
  </div>
</template>

<script>
import MainHeading from '@/components/elements/headers/MainHeading';
import TkButton from '@/components/UI/buttons/TkButton';

export default {
  name: 'NotFound',
  components: {
    MainHeading,
    TkButton,
  },
};
</script>

<style scoped lang="scss">
.error-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  &__img {
    max-width: 156px;
    height: auto;
    display: block;
  }
  &__title {
    margin-top: 20px;
  }
  &__text {
    color: $secondary-medium-black;
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    margin: 0;
    padding: 0 20px;
  }
  &__button {
    max-width: 186px;
    margin-top: 34px;
    @include min-media($md) {
      max-width: 224px;
      margin-top: 45px;
    }
  }
}
</style>
