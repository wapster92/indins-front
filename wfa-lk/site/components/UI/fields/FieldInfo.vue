<template>
  <span
    v-click-outside="hideInfo"
    class="field-info"
    @click.stop="openInfo"
  >
    <span class="field-info__icon">
      <svg-icon
        name="field-info"
      />
    </span>
    <span
      class="field-info__text"
      :class="{'field-info__text--open': isOpen}"
    >
      {{ info }}
    </span>
  </span>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  name: 'FieldInfo',
  directives: {
    ClickOutside,
  },
  props: {
    info: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  // mounted() {
  //   // prevent click outside event with popupItem.
  //   this.popupItem = this.$el;
  // },
  methods: {
    openInfo() {
      this.isOpen = !this.isOpen;
    },
    hideInfo() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="stylus">
.field-info
  width: 17px;
  height: 17px;
  display: inline-flex;
  position: relative;
  cursor pointer
  margin-left: auto;
  .icon
    width: 100%
    height: 100%;
  &__text
    display: none;
    position: absolute;
    right: 0;
    top: 33px;
    width: 290px;
    padding: 20px 24px;
    background: $white-main;
    border: 1px solid $grey-stroke;
    box-shadow: 0 4px 20px rgba(32, 73, 149, 0.3);
    border-radius: 5px;
    opacity 0
    transition opacity .3s
    font-size: 14px;
    line-height: 24px;
    color: $grey-2;
    z-index: 2;
    &:before
      content: '';
      position: absolute;
      width: 18px;
      height: 17px;
      right: 5px;
      top: -16px;
      z-index: 3;
      background: url("@/assets/img/field-info.svg");
    &--open
      display block
      opacity 1
</style>
