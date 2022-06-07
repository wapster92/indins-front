<template>
  <transition
    name="slide-down"
    appear
    mode="out-in"
  >
    <div
      :style="value.styles.style"
      :class="value.styles.class"
      class="portfolio-item"
    >
      <nuxt-link
        :to="'portfolio' + url"
        :class="`portfolio-tile-${value.url}`"
        class="portfolio-link"
      >
        <div
          v-for="(img, key) in value.images"
          :key="img + key"
          :class="img.class"
          :style="{
          'background-image': addUrlImg(img.src)}"
          class="pii"
        >
          <span v-if="img.text">{{ img.text }}</span>
        </div>
        <div class="portfolio-bottom-wrap">
          <div
            :class="{'color-black': isColorBlack}"
            class="portfolio-bottom"
          >
            <div class="portfolio-type">
              {{ value.tileTag }}
            </div>
            <div class="portfolio-description">
              {{ value.pageTitle }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PortfolioTile',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isSupportWebp: false,
    };
  },

  computed: {
    isColorBlack() {
      // console.log(this.value);
      return this.value && this.value.textColor === 'black';
    },
    url() {
      if (this.value.url === 'to-project') return '';
      return `/${this.value.url}`;
    },
  },

  mounted() {
    this.isSupportWebp = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
  },

  methods: {
    addUrlImg(value) {
      return !!value && (value.split('.').splice(-1, 1)[0] === 'svg' ? `url(${value})` : `url(${value}.webp)`);
    },
  },
};
</script>
