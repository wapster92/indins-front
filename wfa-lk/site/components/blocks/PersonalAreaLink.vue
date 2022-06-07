<template>
  <nuxt-link
    :to="path"
    class="personal-link"
    :class="{'personal-link--disable': disable}"
  >
    <div class="personal-link__icon-wrap">
      <svg-icon
        :name="icon"
        class="personal-link__icon"
      />
    </div>
    <div class="personal-link__name">
      {{ name }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'PersonalAreaLink',
  props: {
    path: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.personal-link
  display flex
  flex-direction column
  overflow: hidden;
  position: relative;
  &:hover, &:focus
    .personal-link__icon-wrap
      background: $black-main;
    .personal-link__name
      color: $blue-main;
  &--disable
    pointer-events none
    cursor default
    .personal-link__icon-wrap
      position: relative;
      &:before
        content: '';
        position: absolute;
        width: 100%
        height: 100%
        top: 0
        left: 0
        background: $grey-stroke;
        opacity .7
  &__icon-wrap
    display flex
    justify-content: center;
    align-items: center;
    width: 100%
    height: 140px
    background: $blue-main;
    transition background-color .3s
    border-radius: 30px;
    position: relative;
    &:before
      content: '';
      position: absolute;
      left: 3px
      right: 3px
      top: 3px
      bottom: 3px;
      border: 2px solid $white-main;
      border-radius: 30px;
    @media screen and (min-width: $tablet)
      height: 130px
    @media screen and (min-width: 1000px)
      height: 148px
  &__icon
    width: 112px
    height: 64px
  &__name
    min-height: 63px
    display flex
    align-items: center;
    justify-content: center;
    padding: 10px 10px;
    color: $black-main;
    font-size: 17px
    font-weight: 700
    transition color .3s
    text-align: center;
    @media screen and (min-width: 420px)
      font-size: 20px
    @media screen and (min-width: 1000px)
      min-height: 66px
</style>
