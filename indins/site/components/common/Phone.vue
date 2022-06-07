<template>
  <a
    :style="computedStyles"
    :class="phoneClassList"
    @click="clickHandler"
  >
    <component :is="icon" />
    <div class="phone-block__number">
      {{ $calltracking.phone || $store.getters["SEOData/phoneText7"] }}
    </div>
  </a>
</template>

<script>
import { breakpointsMixin } from '~/mixins';
import { contacts } from '~/constants';
import PhoneSvg from './svg/PhoneSvg.vue';
import PhoneSvgThin from './svg/PhoneSvgThin.vue';

export default {
  name: 'Phone',

  components: {
    PhoneSvg,
    PhoneSvgThin,
  },

  mixins: [breakpointsMixin],

  props: {
    fontSize: {
      type: Number,
      default: 18,
    },
    hideOnMobile: {
      type: Boolean,
      default: false,
    },
    isThin: {
      type: Boolean,
      default: false,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
    whitePhone: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    phone() {
      return '+7 (812) 500-51-16';
    },

    phoneClassList() {
      return {
        'phone-block svg-hover': true,
        'phone-block_hide-on-mobile': this.hideOnMobile,
        'phone-block_white': this.whitePhone,
      };
    },

    icon() {
      return this.isThin ? contacts.phone.thin : contacts.phone.normal;
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

  methods: {
    clickHandler() {
      if (window.gtag) {
        window.gtag('event', 'Clickstocall', {
          event_category: 'engagement',
        });
      }
      if (window.yaCounter26690535) {
        window.yaCounter26690535.reachGoal('phoneClick');
      }

      if (this.smAndDown) {
        window.location.href = `tel://${this.phone.replace(/[^0-9]/g, '')}`;
        return;
      }

      this.$store.commit('modal/setOptions', {
        title: 'Мы перезвоним вам',
        body: {
          component: () => import('~/components/forms/PhoneModalForm'),
        },
        styles: {
          'max-width': '524px',
        },
      });
      this.$store.commit('modal/show');
    },
  },
};
</script>
