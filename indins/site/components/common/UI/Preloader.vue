<template>
  <div
    v-if="loading"
    :style="computedStyles"
    class="preloader"
  >
    <div class="preloader__circle"/>
  </div>
</template>

<script>
export default {
  name: 'Preloader',

  props: {
    loading: {
      type: Boolean,
      default: true,
    },

    noPadding: {
      type: Boolean,
      default: true,
    },

    styles: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    computedStyles() {
      const style = {};

      if (this.noPadding) {
        style.padding = '0';
      }

      return { ...style, ...this.styles };
    },
  },
};
</script>
