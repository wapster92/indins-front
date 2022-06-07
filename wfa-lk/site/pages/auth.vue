<template>
  <div class="auth-page">
    <div class="container">
      <NuxtChild />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Index',
  components: {

  },
  data() {
    return {
    };
  },
};
</script>

<style lang="stylus">
.auth-page
  background: $grey-1;
  flex-grow 1
  padding: 26px 0;
  @media screen and (min-width: $tablet)
    padding: 90px 0;
.auth-form
  max-width 567px;
  margin: 0 auto;
  @media screen and (min-width: $tablet)
    margin auto
    background: $white-main;
    padding: 47px;
  &__wrap
    max-width 351px
    margin: 0 auto;
  &__title
    font-size: 22px
    margin-bottom: 61px
    margin-top: 0
    @media screen and (min-width: 414px)
      font-size: 28px;
    @media screen and (min-width: $tablet)
      text-align: center;
  &__input
    margin-bottom: 32px
    .simple-input__input, .smscode-input__input, .password-input__input
      background: $white-main;

  &__button
    width: 100%
  &__links
    display flex
    flex-direction: column;
    align-items: center;
    margin-top: 56px
  &__link
    font-weight: 500;
    margin-bottom: 20px
    &--diactive
      cursor cell
      pointer-events none
      color: $grey-3;
      &:hover, &:focus
        color: $grey-3;
    &:last-child
      margin-bottom: 0
  &__text
    margin-bottom: 28px
    font-size: 14px
    color: $grey-2;
</style>
