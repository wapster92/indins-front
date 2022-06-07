<template>
  <div class="vacancy-item">
    <nuxt-link
      v-if="data.img || data.image"
      :to="link"
      :style="`background-image: url('` + data.image + `')`"
      class="vacancy-item__img"
    >
      <img
        :src="data.image"
        :alt="data.title"
        loading="lazy"
      >
    </nuxt-link>
    <nuxt-link
      :to="link"
      class="h3 vacancy-item__title"
      v-html="data.title"
    />
  </div>
</template>

<script>
const rootUrl = '/vacancy/';

export default {
  name: 'VacancyItem',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    link() {
      return rootUrl + this.data?.url;
    },
  },
};
</script>
