<template>
  <SimpleButton
    v-bind="options"
    class="adaptive-button"
    :tooltip="tooltip"
    @click="$emit('click', $event)"
  >
    <div class="adaptive-button-content">
      <div
        v-if="iconName"
        :class="{ 'is-mobile': isMobile }"
        class="adaptive-button-icon"
      >
        <slot name="icon">
          <v-icon small>
            {{ iconName }}
          </v-icon>
        </slot>
        <span v-if="mobileText">
          {{ mobileText }}
        </span>
      </div>
      <div
        :class="{ 'is-mobile': iconName && isMobile }"
        class="adaptive-button-text"
      >
        <slot>Кнопка</slot>
      </div>
    </div>
  </SimpleButton>
</template>

<script>
export default {
  name: 'AdaptiveButton',
  props: {
    iconName: {
      type: String,
      default: '',
    },
    mobileText: {
      type: String,
      default: '',
    },
    breakpoint: {
      type: String,
      default: 'sm',
    },
    tooltip: {
      type: String,
      default: '',
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint[`${this.breakpoint}AndDown`];
    },
    options() {
      return {
        icon: this.isMobile && !this.mobileText,
        rounded: this.isMobile && !this.mobileText,
        ...this.$attrs,
      };
    },
  },
};
</script>

<style lang="stylus">
.adaptive-button.v-btn
  &.v-btn--rounded
    border-radius: 28px
  &.v-btn-round
    border-radius:50%
.adaptive-button-icon
  display: none
  flex-flow: row nowrap
  align-items: center
  &.is-mobile
    display: flex

.adaptive-button-text
  &.is-mobile
    display: none
</style>
