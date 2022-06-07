<template>
  <label class="switcher-field">
    <input
      type="checkbox"
      class="switcher-field__input"
      :value="value"
      :checked="value"
      @change="changeValue"
    >
    <span class="switcher-field__switcher" />
    <span class="switcher-field__text">{{ label }}</span>
  </label>
</template>

<script>
export default {
  name: 'SwitcherField',
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changeValue(e) {
      this.$emit('input', e.target.checked);
      this.$emit('change', e.target.checked);
    },
  },
};
</script>

<style lang="stylus">
.switcher-field
  display: flex
  align-items: center;

  &__switcher
    display: flex;
    width: 48px
    height: 28px;
    background: #CBDBE5;
    border-radius: 19px;
    position: relative;
    cursor pointer;
    transition background-color .3s
    &:before
      content: '';
      position: absolute;
      width: 20px;
      height: 20px
      top: 0
      bottom: 0
      left: 4px;
      margin: auto 0;
      background: $blue-secondary;
      border-radius: 50%
      transform: translateX(0);
      transition transform .3s, background-color .3s
  &__text
    font-size: 18px
    line-height: 21px;
    color: $grey-2;
    transition color .3s
    display: inline-flex;
    padding-left: 16px;
  &__input
    display: none;
    &:checked ~ .switcher-field__switcher
      background: #416FC8;
      &:before
        background: $blue-main;
        transform: translateX(100%);
    &:checked ~ .switcher-field__text
      color: $black-main;

</style>
