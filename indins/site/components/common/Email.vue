<template>
  <a
    :style="computedStyles"
    :class="emailClassList"
    href="mailto:manager@indins.ru"
  >
    <component :is="icon" />
    <div class="email-block__text">
      <span>manager@indins.ru</span>
    </div>
  </a>
</template>

<script>
import { contacts } from '~/constants';
import EmailSvgThin from './svg/EmailSvgThin';

export default {
  name: 'Email',

  components: {
    EmailSvgThin,
  },

  props: {
    fontSize: {
      type: Number,
      default: 18,
    },

    isThin: {
      type: Boolean,
      default: false,
    },

    styles: {
      type: Object,
      default: () => ({}),
    },

    whiteEmail: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    icon() {
      return this.isThin ? contacts.email.thin : contacts.email.normal;
    },

    emailClassList() {
      return {
        'email-block svg-hover': true,
        'email-block_white': this.whiteEmail,
      };
    },

    computedFontSize() {
      return `${this.fontSize}px`;
    },

    computedStyles() {
      return {
        ...this.styles,
        ...{
          'font-size': this.computedFontSize,
        },
      };
    },
  },
};
</script>
