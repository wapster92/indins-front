<template>
  <div
    v-if="data.srcDesk"
    class="port-top-preview-area"
  >
    <div class="portfolio-container">
      <div class="port-tp-desk">
        <img
          :src="data.srcDesk.img"
          :alt="data.alt"
          loading="lazy"
        >
      </div>
      <div
        v-if="data.srcMobile"
        class="port-tp-mobile"
      >
        <img
          :src="data.srcMobile.img"
          :alt="data.alt"
          loading="lazy"
        >
      </div>
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
};
</script>
