<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li
        v-for="nav in navList"
        :key="nav.name"
        :class="nav.class"
      >
        <nuxt-link
          :tag="nav.tag"
          :to="nav.to"
        >{{ nav.value }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navigation } from '@/constants';

export default {
  name: 'Navigation',

  props: {
    exclude: {
      type: String | Array,
      default: '',
    },
  },

  computed: {
    navList() {
      if (typeof this.exclude === 'string') {
        return navigation.filter(nav => nav.name !== this.exclude);
      }

      if (Array.isArray(this.exclude)) {
        return navigation.filter(nav => !this.exclude.includes(nav.name));
      }

      return navigation;
    },
  },
};
</script>
