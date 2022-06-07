<template>
  <div
    v-if="data.src"
    :class="data.areaClass"
    class="port-logo-area"
  >
    <div class="portfolio-container">
      <img
        :src="data.src"
        :alt="data.alt || ''"
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
};
</script>
