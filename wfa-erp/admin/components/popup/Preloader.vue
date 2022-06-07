<template>
  <div
    v-show="show"
    style="
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        z-index: 99999999;
        top: 0;
        left: 0;
      "
  >
    <v-progress-circular
      style="position: fixed; top: calc(50vh - 10px); left: calc(50vw - 10px)"
      indeterminate
      color="primary"
    />
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async start() {
      this.show = true;
    },
    async stop() {
      this.show = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
</style>
