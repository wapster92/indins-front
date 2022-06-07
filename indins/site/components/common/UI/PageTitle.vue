<template>
  <div
    v-if="data.title"
    :class="data.areaClass"
    class="page-title"
  >
    <h1
      :class="data.titleClass"
      class="page-title__text"
    >
      {{ data.title }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
