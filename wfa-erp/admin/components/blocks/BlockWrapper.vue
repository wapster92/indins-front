<template>
  <div class="block-wrapper w-100">
    <div
      v-if="showTitle"
      class="block-wrapper__title pl-4"
    >
      <span class="block-wrapper__title--text mr-auto">{{ title }}</span>
      <span
        v-if="$slots.button"
        class="ml-auto"
      ><slot name="button"/></span>
      <v-btn
        v-if="minimise !== false"
        icon
        @click="show = !show">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </div>
    <div
      v-if="show"
      :style="$vuetify.breakpoint.xsOnly ? '' : 'padding-top: 3px'"
      class="block-wrapper__main"
    >
      <slot/>
    </div>
    <div
      v-if="$slots.footer"
      class="block-wrapper__action-footer pa-4">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockWrapper',
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    minimise: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      localValue: true,
    };
  },
  computed: {
    show: {
      get() {
        if (!this.minimise) {
          return true;
        }
        return this.value !== null ? this.value : this.localValue;
      },
      set(value) {
        this.localValue = value;
        this.$emit('input', value);
      },
    },
    icon() {
      return this.show ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
  },
};
</script>

<style lang="stylus" scoped>
.block-wrapper
  background-color white
  border 1px solid #D3D4DB
  height max-content

  &__title
    background-color: #F9FAFC
    border-bottom: 1px solid #D3D4DB
    min-height: 40px
    display: flex
    align-items: center
    font-size 15px

    &--text
      font-weight: bold
  &__main
    height calc(100% - 40px)
    background-color #E5E5E5
    & > *
      background-color white
  &__action-footer
    min-height: 62px
    border-top: 1px solid #D3D4DB
    display: flex
    justify-content: flex-end
    align-items: center
</style>
