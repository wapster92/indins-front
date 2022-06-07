<template>
  <div
    v-if="data.title"
    :class="sectionClassList"
  >
    <div class="section-title__container">
      <h2
        :class="sectionTextClassList"
        v-html="data.title"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    sectionClassList() {
      return {
        'section-title': true,
        [this.data.areaClass]: !!this.data.areaClass,
      };
    },

    sectionTextClassList() {
      return {
        'section-title__container__text': true,
        [this.data.titleClass]: !!this.data.titleClass,
      };
    },
  },
};
</script>
