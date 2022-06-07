<template>
  <div
    class="menu-item-wrap"
    :class="{
      'has-children-expanded': expandChildren,
      'has-children': hasChildren
    }"
  >
    <nuxt-link
      :class="{ 'is-expanded': expanded }"
      :title="label"
      :to="link"
      href="#"
      class="menu-item"
      @click.native="toggleChildren"
    >
      <div class="menu-item-inner">
        <IIcon :icon="icon" :src="src"></IIcon>
        <IBadge
          v-if="((childrenHaveCount && !expandChildren) || count) && !expanded"
          :styles="{
            right: 0,
            top: -12,
            height: 10,
          }"
        ></IBadge>
      </div>
      <span class="menu-item-label" :class="expanded ? '':'menu-item_fix-height'">
        {{ label }}
      </span>
      <v-icon
        v-if="hasChildren"
      >
        {{ expandIcon }}
      </v-icon>
      <IBadge
        v-if="!hasChildren && count"
        class="menu-badge"
        :styles="{
            right: -21,
            top: -1,
            height: 20,
            zIndex: 5,
          }"
      >
        {{count}}
      </IBadge>
    </nuxt-link>
    <transition name="fade">
      <div
        v-if="hasChildren && expandChildren"
        class="menu-item-children"
      >
        <MainMenuItem
          v-for="child in children"
          :key="`menu-item-${child.label}`"
          :item="child"
          :expanded="expanded"
          :keep-menu-open="keepMenuOpen"
        />
      </div>
    </transition>
  </div>
</template>

<script>

import {makeHash} from '../../../helpers';
// import getConstructor from '../../../helpers/getConstructor';
import IBadge from '../../ui-kit/IBadge'
import IIcon from '../../ui-kit/IIcon'


export default {
  name: 'MainMenuItem',
  components: { IBadge, IIcon },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    index: {
      type: String,
      default: '',
    },
    // heightPx: {
    //   type: String,
    //   default: '20',
    // },
    keepMenuOpen: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      expandChildren: false,
      expandHash: makeHash(15),
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    hasChildren() {
      return this.item?.items?.constructor === Array && this.item.items.length !== 0;
    },
    children() {
      if (!this.hasChildren) return [];
      const { items } = this.item;
      return items.filter(item => item.visible !== false && item.visible !== null
        && (!item.accessRoles || this.checkRoles(item.accessRoles)));
    },
    childrenHaveCount() {
      if (this.hasChildren) {
        // console.log(i)
        return this.item.items.find(el => el.count)
      }
    },
    icon() {
      return this.item && this.item.icon ? this.item.icon : '';
    },
    src() {
      return this.item && this.item.src ? this.item.src : '';
    },
    expandIcon() {
      return this.expandChildren ? 'expand_less' : 'expand_more';
    },
    label() {
      return this.item && this.item.label ? this.item.label : '';
    },
    link() {
      return this.item && this.item.routeTo ? this.item.routeTo : '';
    },
    count() {
      return this.item && this.item.count ? this.item.count : '';
    },
  },
  mounted() {
    this.$eventBus.on('close-other-submenus', this.closeSubmenu);
  },
  beforeDestroy() {
    this.$eventBus.off('close-other-submenus', this.closeSubmenu);
  },
  methods: {
    closeSubmenu(hash) {
      if (hash === this.expandHash) return;
      this.expandChildren = false;
    },
    toggleChildren() {
      if (this.hasChildren) {
        this.expandChildren = !this.expandChildren;
        this.$eventBus.emit('close-other-submenus', this.expandHash);
        return;
      }
      if (!this.keepMenuOpen || this.isMobile) this.$eventBus.emit('close-menu');
    },
    checkRoles(roles) {
      if (!roles) return;
      if (roles.includes('ALL')) return true;
      return this.$store.getters['auth/hasRole'](roles);
    },
  },
};
</script>

<style lang="stylus">
.menu-item-wrap
  width: 100%
  &.has-children
    .menu-item > .v-icon
      justify-self: start
    .menu-item-children
      transition .5s
      .menu-item.nuxt-link-active
        .menu-item-label
          color: #416fc8
          font-weight: 500
          padding 9px 0
        .v-icon
          color: #416fc8
  &.has-children-expanded
    position: relative
    background-color: rgba(243, 245, 248, 0.4)
    & > .menu-item
      .menu-item-label
        font-weight: 500
      .v-icon
        color: #202124
    &::before
      content: ''
      position: absolute
      left: 0
      top: 0
      z-index: 1
      width: 4px
      height: 100%
      background: #dadada

.menu-item
  display: grid
  grid-template: auto \/ 52px 1fr 35px
  align-items: center
  min-height: 40px
  text-decoration: none
  position: relative;
  //&_img
  //  height: 20px
  &_img-wrapper
    height: 40px
    display flex
    justify-items center
    align-items: center
  &_fix-height
    height 40px
  &.is-expanded .menu-item-label
    opacity: 1
  &:hover
    background: #f3f5f8
  .menu-badge.app-badge
    position static
    display flex
    align-self: center
    .badge-circle
      position static
  @media screen and (max-width: 959px)
    grid-template-columns: 58px 1fr 44px
    height: 50px
    .v-icon
      font-size: 24px!important

.menu-item-inner
  display: flex
  flex-flow: row nowrap
  justify-content: center
  height 100%
  .i-icon
    align-items: start
    padding-top: 10px

  //.v-icon
  //  margin-right: 14px

.menu-item-label
  color: #202124
  font-size: 14px
  opacity: 0
  transition: opacity 0.5s ease
  min-width 150px
  padding 9px 0
  @media(max-width: 959px)
    font-size: 16px
</style>
