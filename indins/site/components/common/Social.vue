<template>
  <div :class="classList">
    <a
      v-for="social in socials"
      :key="social.href"
      :href="social.href"
      :class="social.classList"
      target="_blank"
    >
      <svg-icon :name="social.name" />
    </a>
  </div>
</template>
<script>
import { socials } from '@/constants';

export default {
  name: 'Social',

  props: {
    exclude: {
      type: String | Array,
      default: '',
    },

    whiteIcons: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    socials() {
      if (typeof this.exclude === 'string') {
        return socials.filter(elem => elem.name !== this.exclude);
      }

      if (Array.isArray(this.exclude)) {
        return socials.filter(elem => !this.exclude.includes(elem.name));
      }

      return socials;
    },

    classList() {
      return {
        'social-list': true,
        'social-list_white': this.whiteIcons,
      };
    },
  },
};
</script>
