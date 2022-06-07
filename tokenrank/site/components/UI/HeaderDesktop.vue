<template>
  <header class="header">
    <div class="header__wrapper container">
      <div
        class="header__logo"><NuxtLink to="/"><img
          src="~assets/svg/Tokenrank-logo.svg"
          alt="Tokenrank Logo"></NuxtLink></div>
      <nav class="header__navigation navigation">
        <ul class="navigation__list"><li
          v-for="(link, idx) in links"
          :key="link + idx"
          class="navigation__item">
          <NuxtLink
            :to="link.href"
            class="navigation__link">{{ link.text }}</NuxtLink></li></ul>
      </nav>
      <div
        class="header__search search-form">
        <input
          v-if="searchFieldIsVisible"
          id="header-input"
          v-model="request"
          placeholder="Поиск"
          type="text"
          class="search-form__input">
        <label
          class="search-form__label"
          for="header-input"
          @click="toggleSearch"><SimpleSvg
            class="search-form__icon"
            icon-name="UI/searching-lens"
        /></label>
      </div>
      <div class="header__socials socials">
        <a
          v-for="(social, idx) in socials"
          :key="idx + social.href"
          :href="social.href"
          class="socials__link"><SimpleSvg
            :icon-name="social.imgUrl"
            class="socials__icon"/></a>
      </div>
    </div>
  </header>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';
import TkButton from '../UI/buttons/TkButton';

export default {
  name: 'HeaderDesktop',
  components: { SimpleSvg, TkButton },
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
      searchFieldIsVisible: false,
      request: '',
    };
  },
  methods: {
    toggleSearch() {
      this.searchFieldIsVisible = !this.searchFieldIsVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  flex-direction: column;
  @include flex-start;
  height: 100px;
  filter: drop-shadow(0px 0px rgba(63, 98, 159, 0.15));
  box-shadow: 0 0 20px 0 rgba(63, 98, 159, 0.15);

  &__wrapper {
    @include flex-between;
    height: 100%;
    width: 100%;
  }
  &__logo {
    margin: 16px 15px 16px 0;
    @include min-media(800px) {
      margin-right: 30px;
    }
    @include min-media($lg) {
      margin-right: 55px;
    }
    @include min-media(1040px) {
      margin-right: 85px;
    }
    @include min-media(1160px) {
      margin-right: 145px;
    }
    a img {
      height: 34px;
    }
  }
  &__navigation {
    @include flex-between;
    padding: 10px 0;
    list-style: none;
    @include min-media($lg) {
      margin-right: 25px;
    }
    @include min-media(1040px) {
      margin-right: 55px;
    }
    @include min-media(1160px) {
      margin-right: 115px;
    }
  }
}
.navigation {
  &__list {
    @include flex-between;
    list-style-type: none;
  }
  &__link{
    color: $secondary-medium-black;
    text-decoration: none;
  }
  &__item:not(:last-child) {
    margin-right: 12px;
    @include min-media(870px) {
      margin-right: 20px;
    }
    @include min-media($lg) {
      margin-right: 25px;
    }
  }
}
.search-form {
  position: relative;
  width: 130px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include min-media(770px) {
    width: 160px;
  }
  @include min-media(870px) {
    width: 245px;
  }
  &__icon {
    cursor: pointer;
    height: 22px;
    width: 22px;
  }
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border: none;
    border-bottom: 1px solid $secondary-gray;
    @include min-media($lg) {
      width: calc(100% - 45px);
    }
    &:focus-visible, &:active {
      outline: none;
      border-bottom: 1px solid $secondary-gray;
    }
  }
  &__label {
    z-index: 2;
    margin-right: 10px;
    @include min-media($lg) {
      margin-right: 45px;
    }
  }
}
.socials {
  @include flex-between;
  &__icon {
    cursor: pointer;
    height: 22px;
    width: 22px;
  }
  &__link:not(:last-child) {
    margin-right: 5px;
    @include min-media($lg) {
      margin-right: 10px;
    }
    @include min-media(1040px) {
      margin-right: 18px;
    }
  }
}
</style>
