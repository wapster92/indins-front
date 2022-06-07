<template>
  <div
    :style="{ 'width': menuWidth }"
    :class="{ expanded: expanded }"
    class="main-menu-wrap"
  >
    <ScrollComponent
      vertical
    />
    <div class="menu-top-wrapper">
      <div class="menu-top-info">
        <v-btn
          v-if="mobileMode"
          class="menu-back-button"
          rounded
          depressed
          icon
          color="transparent"
          width="25"
          height="25"
          @click="goBack"
        >
          <v-icon
            size="23"
            color="#416FC8"
          >
            arrow_back
          </v-icon>
        </v-btn>
        <span
          v-if="mobileMode"
          class="menu-name"
        >
          Меню
        </span>
        <nuxt-link
          :class="{'is-expanded': expanded}"
          class="app-logo"
          to="/"
        >
          <img
            :src="logo"
            alt="logo"
            width="100"
            height="25"
          >
        </nuxt-link>
      </div>
      <div
        v-if="mobileMode"
        class="menu-top-user"
      >
        <v-avatar
          width="40"
          height="40"
          min-width="40"
          color="#416fc8"
        >
          <div class="menu-top-initials">
            <img
              v-if="userPhotoUrl"
              :src="userPhotoUrl"
              :alt="userName"
            >
            <span v-else>
              {{ initials }}
            </span>
          </div>
        </v-avatar>
        <span class="menu-top-username">
          {{ userName }}
        </span>
        <v-btn
          class="menu-top-logout"
          depressed
          color="transparent"
          @click="logout"
        >
          <span class="menu-top-logout-text">Выйти</span>
          <v-icon color="#416FC8">
            exit_to_app
          </v-icon>
        </v-btn>
      </div>
    </div>
    <MainMenuItem
      v-for="(item) in menuItems"
      :key="'menu-item-' + item.label"
      :item="item"
      :expanded="expanded"
      :keep-menu-open="keepMenuOpen"
    />
  </div>
</template>
<script>
import MainMenuItem from './MainMenuItem';
import ScrollComponent from "../../ui-kit/ScrollComponent";

export default {
  name: 'MainMenu',
  components: {
    ScrollComponent,
    MainMenuItem,
  },
  props: {
    logo: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 250,
    },
    expandTimeout: {
      type: Number,
      default: 5000,
    },
    keepMenuOpen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      expanded: false,
      mobileMode: true,
    };
  },
  computed: {
    menuWidth() {
      const defaultValue = this.mobileMode ? '0px' : '60px';
      const expandedWidth = this.mobileMode ? '100vw' : `${this.width}px`;
      return this.expanded ? expandedWidth : defaultValue;
    },
    menuItems() {
      const { items } = this;
      return items.filter(item => item.visible !== false && item.visible !== null
        && (!item.accessRoles || this.checkRoles(item.accessRoles)));
    },
    user() {
      return this.$store.state.auth.info;
    },
    userName() {
      return this.user ? this.user.fullName || '' : '';
    },
    initials() {
      if (!this.user) return '';
      const { fullName, name, surname } = this.user;
      if (fullName) {
        const parts = fullName.split(' ');
        return parts[0].charAt(0) + parts[1].charAt(0).toUpperCase();
      }
      if (name && surname) return name[0] + surname[0];
      if (name) return name.slice(0, 2);
      if (surname) return name.slice(0, 2);
      return '';
    },
    userPhotoUrl() {
      return this.user ? this.user.photo || '' : '';
    },
  },
  created() {
    this.$root.$on('toggle-menu', value => {
      this.expanded = value;
    });
    this.$eventBus.on('mobile-check', this.toggleMobileMode);
    this.$eventBus.on('close-menu', this.closeMenu);
  },
  mounted() {
    this.$emit('loaded');
  },
  beforeDestroy() {
    this.$root.$off('toggle-menu');
    this.$eventBus.off('mobile-check', this.toggleMobileMode);
    this.$eventBus.off('close-menu', this.closeMenu);
  },
  methods: {
    toggleMobileMode(value) {
      this.mobileMode = value;
    },
    checkRoles(roles) {
      if (!roles) return;
      if (roles.includes('ALL')) return true;
      return this.$store.getters['auth/hasRole'](roles);
    },
    goBack() {
      this.$eventBus.emit('close-menu');
    },
    closeMenu() {
      this.expanded = false;
    },
    logout() {
      this.$router.push({ path: '/auth/logout' });
    },
  },
};
</script>

<style lang="stylus">
.main-menu-wrap
  position: relative
  z-index: 21
  grid-row: 1 \/ -1
  display: flex
  flex-flow: column nowrap
  justify-content: flex-start
  align-items: flex-start
  width: 50px
  height: 100%
  border-right: 1px solid #DADADA
  background: #ffffff
  transition: width 0.5s ease
  overflow: hidden
  &.expanded
    .menu-item-wrap.has-children-expanded
      .menu-item-children
        padding-left: 0
        .menu-item
          padding-left: 20px

.app-logo
  position: relative
  width: 30px
  height: 30px
  margin: 9px 0 22px 18px
  overflow: hidden
  transition: width 0.5s ease, margin-left 0.5s ease
  @media screen and (max-width: 959px)
    margin: 0
  img
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
    transition: all 0.5s ease
  &.is-expanded
    width: 100%
    margin-left: 0
    img
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100px
    @media screen and (max-width: 959px)
      display: block
      width: 30px
      margin-left: auto
      img
        top: 50%
        left: 0
        transform: translateY(-50%)

@media(min-width: 960px)
  .menu-top-info, .menu-top-user
    display: none

.menu-top-wrapper
  width: 100%

.menu-top-info
  display: flex
  flex-flow: row nowrap
  align-items: center
  width: 100%
  padding: 17px 20px
  @media(min-width: 960px)
    padding: 0

.menu-name
  display: inline-block
  margin-left: 16px
  font-size: 20px
  font-weight: 500

.menu-top-user
  display: flex
  flex-flow: row nowrap
  align-items: center
  width: 100%
  padding: 15px 20px
  margin-bottom: 15px
  background: #F3F5F8

.menu-top-initials
  span
    display: block
    color: #E6F6FC
    font-size: 16px

.menu-top-username
  display: inline-block
  margin-left: 14px
  font-size: 16px
  font-weight: 500

.menu-top-logout
  display: block
  margin-left: auto
  padding: 0!important

.menu-top-logout-text
  display: inline-block
  margin-right: 19px
  font-size: 16px
  font-weight: 400
  letter-spacing: 0
  color: #416fc8
  text-transform: none
</style>
