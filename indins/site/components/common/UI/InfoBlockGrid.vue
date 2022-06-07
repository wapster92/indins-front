<template>
  <div
    v-if="hasDefaultSlot"
    :class="infoBlockAreaClassList"
  >
    <div class="info-block-grid__container">
      <div
        :class="infoBlockGridClassList"
        :data-gap-width="data.gap"
        :data-column-count="data.column"
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
    infoBlockAreaClassList() {
      return {
        'info-block-area': true,
        [this.data.areaClass]: !!this.data.areaClass,
      };
    },

    infoBlockGridClassList() {
      return {
        'info-block-grid': true,
        [this.data.gridClass]: !!this.data.gridClass,
      };
    },

    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },
};
</script>
