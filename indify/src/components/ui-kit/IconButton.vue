<template>
  <v-btn
    v-bind="options"
    class="default-icon-button"
    v-on="$listeners"
  >
    <v-icon v-bind="iconOptions">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: [String, null],
      required: null
    },
    iconProps: {
      type: [Object],
      default: () => ({}),
    },
  },
  computed: {
    options() {
      return {
        outlined: true,
        fab: true,
        width: 28,
        height: 28,
        color: this.color || 'info'
      };
    },
    iconOptions() {
      return {
        color: this.$defaultConfig.color,
        size: 20,
        ...this.iconProps,
      };
    },
  },
};
</script>

<style lang="stylus">
.default-icon-button
  &.v-btn:hover
    background-color: #416fc8!important

    .v-icon
      color: #ffffff!important
</style>
