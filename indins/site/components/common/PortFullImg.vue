<template>
  <div
    v-if="data.src"
    :class="data.areaClass"
    class="port-full-img-area"
  >
    <div class="portfolio-container">
      <img
        :src="data.src"
        :alt="altProp"
        :class="data.srcClass"
        loading="lazy"
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      altProp: '',
    };
  },

  created() {
    if (this.data.alt) {
      this.altProp = this.data.alt;
    }
  },
};
</script>
