<template>
  <div
    v-if="data.images"
    :class="data.areaClass"
    class="port-line-tree-img-area"
  >
    <div class="angular-area">
      <span class="angular-back"><span/></span>
      <div class="portfolio-container">
        <div class="port-lti-flex">
          <div
            v-for="(img, key) in data.images"
            :key="key"
            class="port-lti-item"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              loading="lazy"
            >
          </div>
        </div>
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
