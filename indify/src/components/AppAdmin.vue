<template>
  <v-app>
    <div
      class="global-layout"
      :class="{
        'menu-is-loading': menuIsLoading,
        'has-additional-menu': hasAdditionalMenu,
        'hide-toolbar': !showToolbar,
        'autosave-panel-active': autosavePanel.visible,
        'autosave-is-fixed': autosavePanel.fixed,
      }"
      :style="{ 'padding-bottom': (showToolbar ? 0 : bottomPadding) + 'px' }"
    >
      <MainMenu
        :logo="localProjectLogo"
        :items="mainMenu"
        :keep-menu-open="keepMenuOpen"
        @loaded="menuLoadHandler"
      />
      <MainToolbar
        :user-menu-items="userMenu"
        :show-user-settings="showUserSettings"
        @click:confirm="confirm"
        @click:reject="reject"
      >
        <slot name="toolbar" />
        <template #user-settings="{ getUser, saveUser }">
          <slot
            name="user-settings"
            :get-user="getUser"
            :save-user="saveUser"
          />
        </template>
        <template #popup-buttons="slotProps">
          <slot
            v-bind="slotProps"
            name="popup-buttons"
          />
        </template>
      </MainToolbar>
      <AdditionalMenu
        v-if="hasAdditionalMenu"
        :submenu="currentSubmenu"
      />
      <div
        :style="styles"
        class="content-zone"
      >
        <div class="position-zone">
          <ScrollComponent
            v-model="scrollCoordinates"
            vertical
            horizontal
          />
          <SimplePreloader/>
          <nuxt />
        </div>
      </div>
      <div
        :class="{ 'is-visible': autosavePanel.visible }"
        class="autosave-panel"
      >
        <SimpleButton
          outlined
          color="infoOut"
          @click="rejectAutosave"
        >
          Отмена
        </SimpleButton>
        <SimpleButton
          class="ml-2"
          @click="confirmAutosave">
          Сохранить
        </SimpleButton>
      </div>
      <app-snack />
    </div>
  </v-app>
</template>

<script>
import moment from 'moment';
import { throttle } from '../helpers/decorators';
import { getType } from '../helpers';
import ScrollComponent from './ui-kit/ScrollComponent';
import SimplePreloader from "./ui-kit/SimplePreloader";
import { mapState, mapActions } from 'vuex';

moment.locale('ru');

export default {
  name: 'AppAdmin',
  components: {
    SimplePreloader,
    ScrollComponent,
  },
  // provide() {
  //   return {
  //     toggleGlobalToolbar: value => this.toggleToolbar(value),
  //     adminToolBarInfo: this.adminToolBarIsVisible,
  //   };
  // },
  props: {
    mainMenu: {
      type: Array,
      required: true,
    },
    userMenu: {
      type: [Object, null],
      default: null,
    },
    logo: {
      type: String,
      default: '',
    },
    showUserSettings: {
      type: Boolean,
      default: false,
    },
    keepMenuOpen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      menuIsLoading: true,
      menuExpanded: null,
      mainMenuWidth: 250,
      menuPadding: 60,
      mobileChecked: false,
      adminToolBarIsVisible: {
        value: true,
        bottomPadding: 0,
      },
      scrollCoordinates: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    showToolbar: {
      get() {
        return this.adminToolBarIsVisible.value;
      },
      set(value) {
        this.adminToolBarIsVisible.value = value;
      },
    },
    bottomPadding: {
      get() {
        return this.adminToolBarIsVisible.bottomPadding;
      },
      set(value) {
        this.adminToolBarIsVisible.bottomPadding = value;
      },
    },
    styles() {
      return {
        'padding-left': `${this.menuExpanded && !this.mobileChecked
          ? this.mainMenuWidth - this.menuPadding
          : 0
        }px`,
      };
    },
    localProjectLogo() {
      return this.logo || `${this.$router.options.base}logo.svg`;
    },
    hasAdditionalMenu() {
      return this.currentSubmenu && this.currentSubmenu.items.length !== 0;
    },
    currentSubmenu() {
      let result = null;
      if (!Array.isArray(this.mainMenu)) return result;
      const routeName = this.$route.name;
      this.mainMenu.forEach(currentMenu => {
        if (!Array.isArray(currentMenu.items) || currentMenu.items.length === 0) {
          return;
        }
        const found = currentMenu.items
          .find(item => {
            if (!item.routeTo) return false;
            return routeName.match(item.routeTo.name) !== null;
          });
        if (found) result = currentMenu;
      });
      return result;
    },
    autosavePanel() {
      return {
        visible: this.$store.state.autosaveStore?.isVisible,
        fixed: this.$store.state.autosaveStore?.isFixed,
        confirmHandler: this.$store.state.autosaveStore?.confirmHandler,
        rejectHandler: this.$store.state.autosaveStore?.rejectHandler,
      };
    },
  },
  watch: {
    'scrollCoordinates.y': function (value, oldValue) {
      if (!this.isMobile) return;
      this.toggleToolbar({
        value: value <= oldValue,
        bottomPadding: this.bottomPadding,
      });
    }
  },
  created() {
    this.checkScreenWidth = throttle(this.checkScreenWidth, 1000);
    this.$root.$on('routeChanged', this.resetAdmin);
  },
  mounted() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth);
    this.$root.$on('toggle-menu', event => {
      this.mobileChecked = window.innerWidth <= 959;
      this.menuExpanded = event;
    });
    this.toggleMobileMode();
    this.$eventBus.on('mobile-check', this.toggleMobileMode);
    this.$eventBus.on('close-menu', this.closeMenu);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth);
    this.$eventBus.off('close-menu', this.closeMenu);
    this.$root.$off('routeChanged', this.resetScroll);
  },
  methods: {
    checkScreenWidth() {
      this.$eventBus.emit('mobile-check', window.innerWidth <= 959);
    },
    menuLoadHandler() {
      this.menuIsLoading = false;
      this.checkScreenWidth();
    },
    toggleMobileMode(value) {
      if (value) {
        this.menuPadding = 0;
      } else {
        this.menuPadding = 60;
      }
    },
    closeMenu() {
      this.menuExpanded = false;
    },
    confirm() {
      this.$emit('click:confirm');
    },
    reject() {
      this.$emit('click:reject');
    },
    toggleToolbar({ value, bottomPadding }) {
      this.bottomPadding = bottomPadding || 0;
      if (getType(value) === 'Boolean') {
        this.showToolbar = value;
        return;
      }
      this.showToolbar = !this.showToolbar;
    },
    resetAdmin() {
      this.resetScroll();
      this.resetToolbar();
      this.hideAutosavePanel();
    },
    resetToolbar() {
      this.showToolbar = true;
      this.bottomPadding = 0;
    },
    resetScroll() {
      this.scrollCoordinates.x = 0;
      this.scrollCoordinates.y = 0;
    },
    ...mapActions({
      hideAutosavePanel: 'autosaveStore/hide',
    }),
    async confirmAutosave() {
      const type = this.$getType(this.autosavePanel.confirmHandler);
      if (type === 'AsyncFunction') {
        await this.autosavePanel.confirmHandler()
          .catch(this.$errorHandler());
      } else if (type === 'Function') {
        this.autosavePanel.confirmHandler()
      }
      this.hideAutosavePanel();
    },
    async rejectAutosave() {
      const type = this.$getType(this.autosavePanel.rejectHandler);
      if (type === 'AsyncFunction') {
        await this.autosavePanel.rejectHandler()
          .catch(this.$errorHandler());
      } else if (type === 'Function') {
        this.autosavePanel.rejectHandler();
      }
      this.hideAutosavePanel();
    },
  },
};
</script>

<style lang="stylus">
.global-layout
  position: relative
  transform: translateY(0)
  display: grid
  grid-template: 42px minmax(0, 1fr) 0 \/ 60px minmax(0, 1fr)
  width: 100%
  height: 100%
  min-height: 100%
  transition: all 0.4s ease
  &.menu-is-loading
    grid-template-columns: 0 1fr
  &.autosave-panel-active:not(.autosave-is-fixed)
    grid-template-rows: 42px minmax(0, 1fr) 50px

.content-zone
  position: relative
  width: 100%
  height: 100%
  background: #eeeeee
  transition: padding-left 0.5s ease
  overflow: hidden

.position-zone
  position: relative
  width: 100%
  height 100%
  overflow hidden

.autosave-panel
  position: absolute
  bottom: -50px
  left: 0
  display: flex
  flex-flow: row nowrap
  justify-content: flex-end
  align-items: center
  width: 100%
  height: 50px
  padding: 5px 20px
  background: #ffffff
  transition: bottom 0.3s ease
  &.is-visible
    bottom: 0

@media(max-width: 959px)
  .global-layout
    grid-template-columns: 0 1fr
    grid-template-rows: 50px minmax(0, 1fr) 0
    &.autosave-panel-active:not(.autosave-is-fixed)
      grid-template-rows: 50px minmax(0, 1fr) 50px
    &.has-additional-menu
      grid-template-rows: 50px auto minmax(0, 1fr) 0
      &.autosave-panel-active:not(.autosave-is-fixed)
        grid-template-rows: 50px auto minmax(0, 1fr) 50px
    &.hide-toolbar
      transform: translateY(-50px)
      height: calc(100vh + 50px)
      min-height: calc(100vh + 50px)
      &.has-additional-menu
        transform: translateY(-100px)
        height: calc(100vh + 100px)
        min-height: calc(100vh + 100px)
</style>
