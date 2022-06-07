<template>
  <div>
    <a
      v-if="!url"
      href="#"
      class="pay-button"
      @click.prevent="$emit('click')"
    >
      <span
        v-if="!loadPayment"
        class="pay-button__text"
      >Сформировать платеж</span>
      <span
        v-else
        class="pay-button__text"
      >Подождите</span>
    </a>
    <a
      v-else
      :href="url"
      target="_blank"
      class="pay-button"
    >
      <span class="pay-button__text">Оплатить</span>
    </a>
  </div>
</template>

<script>

export default {
  name: 'PayButton',
  props: {
    url: {
      type: String,
      default: '',
    },
    loadPayment: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.pay-button
  cursor pointer
  padding: 14px 28px;
  min-height: 50px;
  display inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: $blue-main;
  border: 2px solid $blue-main;
  border-radius: 5px;
  transition background-color .3s, border-color .3s
  @media screen and (min-width: 450px)
    width: auto;
  &:hover, &:focus
    background: $black-main;
    border-color: $black-main;
  &__text
    color: $white-main;
    font-size: 18px;
    line-height: 20.68px;
    font-weight: 700
    transition color .3s
    &--light
      color: $blue-main;
  &--light
    background: $white-main;
    &:hover, &:focus
      background: $white-main;
      border-color: $black-main;
      .button-main__text--light
        color: $black-main;
      .button-main__svg
        fill: $black-main
  &--disable
    background: $grey-3;
    border: $grey-3;
    pointer-events none
    &:hover
      background: $grey-3;
      border: $grey-3;
      cursor not-allowed
</style>
