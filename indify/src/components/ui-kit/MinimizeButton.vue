<template>
  <v-btn
    v-bind="options"
    :class="{ 'is-minimized': minimized }"
    class="default-minimize-button"
    v-on="$listeners"
    @click="toggleMinimize"
  >
    <v-icon size="20">
      expand_less
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'MinimizeButton',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minimized: false,
    };
  },
  computed: {
    options() {
      return {
        outlined: true,
        fab: true,
        width: 28,
        height: 28,
        color: this.$defaultConfig.color,
        ...this.$attrs,
      };
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.minimized = val;
      },
    },
  },
  methods: {
    toggleMinimize() {
      this.minimized = !this.minimized;
      this.$emit('input', this.minimized);
    },
  },
}
</script>

<style lang="stylus">
.default-minimize-button
  &.is-minimized
    transform: rotate(180deg)
  &.v-btn:hover
    background-color: #416fc8!important

    .v-icon
      color: #ffffff!important
</style>