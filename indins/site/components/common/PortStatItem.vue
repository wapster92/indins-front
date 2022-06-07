<template>
  <div
    :class="data.areaClass"
    class="port-stat-item-area"
  >
    <div
      v-if="data.title"
      :class="data.titleClass"
      class="port-st-title"
      v-html="data.title"
    />
    <div
      v-if="data.under"
      :class="data.underClass"
      class="port-st-under"
      v-html="data.under"
    />
    <div
      v-if="data.text"
      :class="data.textClass"
      class="port-st-text"
      v-html="data.text"
    />
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
