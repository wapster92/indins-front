<template>
  <div class="empty">
    <div class="empty__body">
      <img
        class="empty__img"
        src="@/assets/images/empty.png"
        alt="Empty">
      <h3 class="empty__title">
        {{ title }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyComponent',
  props: {
    title: {
      type: String,
      default: 'По вашему запросу ничего не найдено',
    },
  },
};
</script>

<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  @include min-media($md) {
    margin-top: 50px;
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 275px;
    @include min-media($md) {
      max-width: 100%;
    }
  }
  &__img {
    max-width: 185px;
    width: 100%;
    height: auto;
    @include min-media($md) {
      display: none;
    }
  }
  &__title {
    font-size: 22px;
    color: $secondary-medium-black;
    text-align: center;
    font-weight: 400;
    margin: 0;
    @include min-media($md) {
      font-size: 32px;
    }
  }
}
</style>
