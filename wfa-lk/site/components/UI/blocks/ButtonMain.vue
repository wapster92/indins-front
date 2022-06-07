<template>
  <button
    class="button-main"
    :class="{'button-main--light':light, 'button-main--right-icon':iconRight, 'button-main--disable':disable }"
    @click="goTo(path)"
  >
    <span
      v-if="icon"
      class="button-main__icon"
    >
      <svg-icon
        class="button-main__svg"
        :class="{'button-main__svg--light':light}"
        :name="icon"
      />
    </span>
    <span
      class="button-main__text"
      :class="{'button-main__text--light':light}"
    >{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'ButtonMain',
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconRight: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    path: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goTo() {
      if (this.disable) return false;
      if (!this.path) {
        this.$emit('click');
      } else {
        this.$router.push(this.path);
      }
    },
  },
};
</script>

<style lang="stylus">
.button-main
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
  &--right-icon
    flex-direction row-reverse;
    .button-main__icon
      margin-left: 15px
      margin-right: 0;
  &__icon
    width: 14px;
    height: 14px;
    display inline-flex
    margin-right: 15px;
  &--disable
    background: $grey-3;
    border: $grey-3;
    &:hover
      background: $grey-3;
      border: $grey-3;
      cursor not-allowed
  &__svg
    width: 100%
    height: 100%
    fill $white-main
    transition fill .3s
    &--light
      fill $blue-main

</style>
