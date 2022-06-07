<template>
  <div
    v-if="data.author || data.views"
    class="blog-content-info-area"
  >
    <div class="blog-content-info-area__container">
      <div class="blog-content-info-flex">
        <div
          v-if="data.author"
          class="author-block"
        >
          <div class="icon">Автор:</div>
          <div
            class="text"
            v-text="data.author"
          />
        </div>
        <div
          v-if="data.views"
          class="view-block"
        >
          <div class="icon">
            <span/>
          </div>
          <div
            class="views"
            v-text="data.views"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BlogContentInfo',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
