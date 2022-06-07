<template>
  <div
    :class="{ 'wrapper--shadowless': searchFieldIsVisible}"
    class="wrapper">
    <header class="header">
      <div class="header__icons">
        <div class="header__logo"><NuxtLink to="/"><img
          src="~assets/svg/Tokenrank-logo.svg"
          alt="Tokenrank Logo"></NuxtLink></div>
        <div class="header__search search-form">
          <label
            v-if="!menuIsOpened"
            class="search-form__label"
            @click="toggleSearch"><SimpleSvg
              class="search-form__icon"
              icon-name="UI/searching-lens"
          /></label>
          <div
            v-if="!menuIsOpened"
            @click="toggleMenu"><SimpleSvg
              icon-name="UI/burger"
              class="search-form__icon header__icon--burger"/>
          </div>
          <div
            v-if="menuIsOpened"
            @click="toggleMenu">
            <SimpleSvg
              icon-name="UI/close"
              class="search-form__icon"/>
          </div>
        </div>
      </div>
    </header>
    <SimpleSearch
      :visible="searchFieldIsVisible && !menuIsOpened"
      @input="searchSomething"/>
    <div class="navigation navigation__wrapper">
      <NavMenu
        :opened="menuIsOpened"
        :links="links"
        :socials="socials"/>
    </div>
  </div>
</template>

<script>
import NavMenu from './NavMenu';
import SimpleSvg from '../base/SimpleSvg';
import SimpleSearch from '../base/SimpleSearch';

export default {
  name: 'HeaderMobile',
  components: { NavMenu, SimpleSearch, SimpleSvg },
  props: {
    links: {
      type: Array,
      default: () => [{}],
    },
    socials: {
      type: Array,
      default: () => [{}],
    },
  },
  data() {
    return {
      menuIsOpened: false,
      searchFieldIsVisible: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuIsOpened = !this.menuIsOpened;
    },
    toggleSearch() {
      this.searchFieldIsVisible = !this.searchFieldIsVisible;
    },
    searchSomething(request) {
      console.log(request);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  box-shadow: 0 0 20px 0 rgba(63, 98, 159, 0.15);
  z-index: 1000;
  &--shadowless {
     box-shadow: none;
  }
}
.header {
  position: relative;
  z-index: 10000;
  padding: 12px 16px;
  overflow: hidden;
  background: $secondary-white;
  &__icons {
    @include flex-between;
    line-height: 0;
  }
  &__logo {
    a {
      display: inline-flex;
    }
    a img {
      height: 31px;
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
.navigation__wrapper {
  position: relative;
}
.search-form {
  display: flex;
  align-items: center;
  &__label {
    z-index: 2;
    margin-right: 10px;
  }
  &__icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>
