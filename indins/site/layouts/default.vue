<template>
  <div
    id="__wrapper"
    :class="'browser-' + isBrowserName"
    data-app
  >
    <Header/>
    <div id="__content">
      <nuxt/>
    </div>
    <LazyHydrate when-visible>
      <PreFooter/>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <Footer/>
    </LazyHydrate>
    <ModalWindow/>

    <Menu/>

    <MobileMenu/>
    <ScrollTopBtn/>
  </div>
</template>

<script>
import { detect } from 'detect-browser';
// import { Filter, Get } from 'core-xhr';
import LazyHydrate from 'vue-lazy-hydration';
import ModalWindow from '~/components/common/UI/ModalWindow';
import ScrollTopBtn from '~/components/common/ScrollTopBtn';
import Header from '~/components/main/Header';
// import Footer from '~/components/main/Footer';
// import PreFooter from '~/components/main/PreFooter';
// import Menu from '~/components/common/Menu';
import MobileMenu from '~/components/common/MobileMenu';
// import yMetrika from '~/mixins/yMetrika';
// import { meta } from '~/mixins/meta';

const browser = detect();

export default {
  components: {
    Header,
    Footer: () => import('~/components/main/Footer'),
    PreFooter: () => import('~/components/main/PreFooter'),
    ModalWindow,
    Menu: () => import('~/components/common/Menu'),
    MobileMenu,
    ScrollTopBtn,
    LazyHydrate,
  },

  mixins: [
    // yMetrika,
  ],

  data() {
    return {
      isBrowserName: 'unknown',
      /* isBrowserVer: 'unknown',
      isBrowserOS: 'unknown', */
    };
  },

  /*  async created() {
    const metaRequest = new Get('meta').entity().addFilter(new Filter('url', 'eq', this.$route.path));
    console.log(this.$route.path);
    try {
      const metaSetting = await this.$xhr.send(metaRequest);
      const { result } = metaSetting.data.data;
      // console.log(result);
      this.metaTitle = result.metaTitle;
      this.metaDescription = result.metaDescription;
      this.metaKeywords = result.metaKeywords;
      console.log(this.metaTitle);
    } catch (e) {
      console.error(e);
    }
  }, */

  mounted() {
    if (browser) {
      this.isBrowserName = browser.name;
      /*
      this.isBrowserVer = browser.version;
      this.isBrowserOS = browser.os;
      */
    }
  },
};
</script>
