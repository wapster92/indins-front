<template>
  <div class="podpiska">
    <svg-icon
      name="personal-area/podpiska"
      class="podpiska__icon"
    />
    <span class="podpiska__text">
      Подписка оформлена
    </span>
  </div>
</template>

<script>
export default {
  name: 'SubscribeText',
};
</script>

<style lang="stylus">
.podpiska
  display: flex;
  justify-content space-between
  align-items center
  width 240px
  &__icon
    width: 30px;
    height: 21px;
  &__text
    font-size: 18px;
    font-weight: 500
    margin-left: 16px
</style>
