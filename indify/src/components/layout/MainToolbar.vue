<template>
  <div
    class="main-toolbar"
    :style="styles"
  >
    <v-btn
      icon
      width="32"
      height="32"
      class="menu-toggle"
      @click="toggleMenu"
    >
      <v-icon size="21">
        dehaze
      </v-icon>
    </v-btn>
    <Breadcrumbs />
    <slot />
    <UserPanel
      v-if="$auth"
      :menu-items="userMenuItems"
      :show-user-settings="showUserSettings"
      @click:confirm="confirm"
      @click:reject="reject"
    >
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
    </UserPanel>
  </div>
</template>
<script>
import Breadcrumbs from './Breadcrumbs';
import UserPanel from './UserPanel';

export default {
  name: 'MainToolbar',
  components: {
    Breadcrumbs, UserPanel,
  },
  props: {
    mainMenuWidth: {
      type: Number,
      default: 250,
    },
    userMenuItems: {
      type: [Object, null],
      default: null,
    },
    showUserSettings: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
      menuPadding: 50,
      mobileView: false,
    };
  },
  computed: {
    styles() {
      return {
        'padding-left': `${
          this.expanded && !this.mobileView
            ? this.mainMenuWidth - this.menuPadding
            : 10
        }px`,
      };
    },
  },
  mounted() {
    this.toggleMobileMode();
    this.$eventBus.on('mobile-check', this.toggleMobileMode);
    this.$eventBus.on('close-menu', this.closeMenu);
  },
  beforeDestroy() {
    this.$eventBus.off('mobile-check', this.toggleMobileMode);
    this.$eventBus.off('close-menu', this.closeMenu);
  },
  methods: {
    toggleMenu() {
      this.mobileView = window.innerWidth <= 768;
      this.expanded = !this.expanded;
      this.$root.$emit('toggle-menu', this.expanded);
    },
    toggleMobileMode(value) {
      if (value) {
        this.menuPadding = -10;
      } else {
        this.menuPadding = 50;
      }
    },
    closeMenu() {
      this.expanded = false;
    },
    confirm() {
      this.$emit('click:confirm');
    },
    reject() {
      this.$emit('click:reject');
    },
  },
};
</script>

<style lang="stylus">
.main-toolbar
  display: grid
  grid-template: auto \/ 32px 1fr 60px
  grid-gap: 10px
  justify-content: flex-start
  align-items: center
  border-bottom: 1px solid #DADADA
  transition: padding-left 0.5s ease
  padding-right 15px
.menu-toggle
  align-self: center

@media(max-width: 959px)
  .main-toolbar
    align-content: center
    padding: 12px 24px 12px!important
    height: 50px
  .menu-toggle
    grid-row: 1
    grid-column: 3
    justify-self: end
    margin-right: -10px
  .breadcrumbs
    grid-row: 1
    grid-column: 2
  .user-panel
    grid-row: 1
    grid-column: 1
</style>
