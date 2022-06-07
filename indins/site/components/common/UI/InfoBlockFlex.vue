<template>
  <div
    :class="infoBlockClassList"
  >
    <div class="info-block-flex__container">
      <div
        :class="data.gridClass"
        :data-gap-width="data.gap"
        :data-column-count="data.column"
        class="info-block-flex"
      >
        <slot/>
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

  computed: {
    infoBlockClassList() {
      return {
        'info-block-area': true,
        [this.data.areaClass]: !!this.data.areaClass,
      };
    },
  },
};
</script>
