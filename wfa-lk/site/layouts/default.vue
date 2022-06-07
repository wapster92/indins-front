<template>
  <div class="app">
    <HeaderMain
      ref="header"
      class="app__header"
    />
    <MobileMenu
      v-show="windowWidth < changeMenuWidth"
      class="app__mobile-menu"
      :header-heading="headerHeight"
    />
    <main class="app__main">
      <Nuxt />
    </main>
    <FooterMain
      :phone="settings.phone"
      :email="settings.email"
      :url-youtube="settings.urlYoutube"
      :url-face-book="settings.urlFaceBook"
      :url-vk="settings.urlVk"
      :url-instagram="settings.urlInstagram"
      class="app__footer"
    />
    <client-only>
      <notifications
        position="bottom left"
      />
    </client-only>
    <div
      v-show="modalStatus"
      class="app__overlay"
    />
  </div>
</template>

<script>
import { Simple } from 'core-xhr';
import HeaderMain from '~/components/main/HeaderMain';
import FooterMain from '~/components/main/FooterMain';
import MobileMenu from '~/components/main/MobileMenu';

export default {
  name: 'App',
  components: {
    HeaderMain,
    FooterMain,
    MobileMenu,
  },
  data() {
    return {
      headerHeight: '0px',
      windowWidth: null,
      changeMenuWidth: 1025,
    };
  },
  head() {
    return {
      title: this.settings.header,
      meta: [
        { name: 'description', content: this.settings.metaDescription },
        { name: 'keywords', content: this.settings.metaKeywords },
      ],
    };
  },
  computed: {
    settings() {
      return this.$store.getters['settings/settings'];
    },
    modalStatus() {
      return this.$store.getters['modal/overlayActive'];
    },
  },
  watch: {
    windowWidth(val) {
      if (val > this.changeMenuWidth) this.$store.dispatch('mobileMenu/close');
    },
  },
  mounted() {
    if (this.$refs.header.$el) {
      this.headerHeight = window.getComputedStyle(this.$refs.header.$el).getPropertyValue('height');
    }
    this.windowWidth = window.innerWidth;

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('resize', () => {
      if (this.$refs.header.$el) {
        this.headerHeight = window.getComputedStyle(this.$refs.header.$el).getPropertyValue('height');
      }
      this.windowWidth = window.innerWidth;
      const vhr = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vhr}px`);
    });
  },
};
</script>

<style lang="stylus">
html
  font-family: $main-font;
  font-weight: $main-font-weight;
  line-height: $main-font-lh;
  font-size: $main-font-size;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
*,
*::before,
*::after
  box-sizing: border-box;
  margin: 0;

body
  background: $white-main;

.app
  min-height 100vh
  display: flex;
  flex-direction: column;
  position: relative;
  &__header
    position: sticky;
    top: 0
    left: 0
    right: 0
    z-index: 1000;
  &__main
    flex-grow 1
    display: flex;
    flex-direction column
  &__footer
    margin-top: auto
  &__overlay
    position: absolute;
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $white-main;
    z-index: 999;
    opacity .5
input:disabled
  opacity 1
</style>
