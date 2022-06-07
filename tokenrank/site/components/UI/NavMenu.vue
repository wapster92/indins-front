<template>
  <div
    :class="{ 'menu--active': opened }"
    class="menu">
    <nav>
      <ul class="menu__list">
        <li
          v-for="(link, idx) in links"
          :key="idx + link.text"
          class="menu__item">
          <NuxtLink
            :to="link.href"
            class="menu__link">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="menu__socials socials">
      <a
        v-for="(social, idx) in socials"
        :key="idx + social.href"
        :href="social.href"
        class="socials__link"><SimpleSvg
          :icon-name="social.imgUrl"
          class="socials__icon"/></a>
    </div>
  </div>
</template>

<script>
import SimpleSvg from '../base/SimpleSvg';

export default {
  name: 'NavMenu',
  components: { SimpleSvg },
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: () => [],
    },
    socials: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  transform: translateY(-75vh);
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  height: calc(100vh - 55px);
  overflow: hidden;
  width: 100%;
  background: $secondary-white;
  @include flex-center;
  flex-direction: column;
  margin: 0;
  z-index: 999;
  padding-left: 0;
  pointer-events: none;
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
  &--active {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
  &__logo {
    a img {
      height: 34px;
    }
  }
  &__list {
    margin-top: 0;
    padding-left: 0;
    @include flex-between;
    flex-direction: column;
    margin-bottom: 100px;
  }
  &__link {
    color: $secondary-medium-black;
    font-size: 22px;
  }
  &__item:not(:last-child) {
    margin-bottom: 35px;
  }
  &__icon {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
}

.socials {
  padding-left: 0;
  @include flex-between;
  &__link:not(:last-child) {
    margin-right: 35px;
  }
  &__icon {
    height: 22px;
    width: 22px;
  }
}
</style>
