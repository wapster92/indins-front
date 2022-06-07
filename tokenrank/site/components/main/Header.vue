<template>
  <div>
    <HeaderDesktop
      v-if="windowWidth > 960"
      :links="links"
      :socials="socials"/>
    <HeaderMobile
      v-else
      :links="links"
      :socials="socials"/>
  </div>
</template>

<script>
import HeaderDesktop from '../UI/HeaderDesktop';
import HeaderMobile from '../UI/HeaderMobile';

export default {
  name: 'Header',
  components: {
    HeaderMobile,
    HeaderDesktop,
  },
  data() {
    return {
      links: [{ text: 'Криптобиржи', href: '/exchanges' }, { text: 'Криптовалюта', href: '/coins' }, { text: 'Новости', href: '/news' }],
      socials: [{ imgUrl: 'socials/facebook', href: '#' }, { imgUrl: 'socials/telegram', href: '#' }, { imgUrl: 'socials/vk', href: '#' }],
    };
  },
  computed: {
    windowWidth() {
      return this.$store.state.screen.windowWidth;
    },
  },
  methods: {
    toggleSearch() {
      this.searchFieldIsVisible = !this.searchFieldIsVisible;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
