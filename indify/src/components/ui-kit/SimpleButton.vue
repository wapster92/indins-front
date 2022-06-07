<template>
  <div class="simple-button-wrapper">
    <v-tooltip bottom :disabled="tooltipIsEmpty">
      <template #activator="{on, attrs}">
        <v-btn
          class="app-btn"
          :color="color || 'info'"
          :depressed="depressed"
          v-bind="{ ...attrs, ...$attrs }"
          v-on="{ ...on, ...$listeners }"
        >
          <slot name="default">
            Кнопка
          </slot>
        </v-btn>
      </template>
      <span v-show="!tooltipIsEmpty">{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import defaultColor from '../form/mixins/defaultColor';

export default {
  name: 'SimpleButton',
  mixins: [defaultColor],
  props: {
    depressed: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
  computed: {
    tooltipIsEmpty() {
      return !this.tooltip;
    }
  }
};
</script>

<style lang="stylus">
.app-btn
  font-family Ubuntu

  &.v-btn
    font-size: 15px
    font-weight: 500
    letter-spacing normal
    text-transform: none
    position: relative;

    &.theme--light
      color white

    &.v-size--small
      height: 30px

    &.v-btn--fab
      width: 30px

    .v-btn__content
      line-height: 18px

    &.v-btn--disabled.theme--light
      color: #888A91 !important

      &.theme--light:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined)
        background-color #E9EBEF !important

    .v-icon
      font-size: 16px
</style>
