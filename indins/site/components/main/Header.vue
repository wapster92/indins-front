<template>
  <header
    v-scroll="onScroll"
    :class="{
      'header': true,
      'header_show-background': showBackground,
      'header_shadow': showShadow
    }"
  >
    <span class="angular-back"/>
    <div class="header__container">
      <div class="header__socials">
        <Social exclude="ig"/>
      </div>
      <div class="header__logo">
        <Logo/>
      </div>
      <div class="header__phone">
        <Phone hide-on-mobile/>
      </div>
      <div :class="menuClassList">
        <MenuButton/>
      </div>
      <div class="header__navigation">
        <Navigation :exclude="excludeNavElements"/>
      </div>
    </div>
  </header>
</template>

<script>
import Social from '~/components/common/Social';
import Logo from '~/components/common/Logo';
import Phone from '~/components/common/Phone';
import Navigation from '~/components/common/Navigation';
import MenuButton from '~/components/common/MenuButton';

export default {
  name: 'Header',

  components: {
    Social,
    Logo,
    Phone,
    Navigation,
    MenuButton,
  },

  data() {
    return {
      showShadow: false,
      showMenu: false,

      excludeNavElements: ['netadv', 'customers', 'support', 'vacancy', 'about'],
    };
  },

  computed: {
    menuIsOpen() {
      return this.$store.getters['menu/show'];
    },

    menuClassList() {
      return {
        header__menu: true,
        header__menu_show: this.showMenu || this.menuIsOpen,
      };
    },

    showBackground() {
      return this.$store.state.menuBack;
    },
  },

  methods: {
    onScroll() {
      const offsetTop = window.pageYOffset || document.documentElement.scrollTop;
      this.showShadow = offsetTop > 20;
      this.showMenu = offsetTop > 200;
    },
  },
};
</script>
