<template>
  <div
    class="fill-height"
  >
    <AppAdmin
      :main-menu="mainMenu"
      :user-menu="userMenu"
    >
      <template
        v-slot:toolbar
        v-if="isClub"
      >
        <div
          class="grey--text text--darken-3 mr-4 fill-height"
          style="font-size: 0.875rem; font-weight: 600;"
        >
          {{ $store.getters['auth/getData'].balance }}&nbsp;₽
        </div>
      </template>
    </AppAdmin>
    <Preloader ref="loader"/>
  </div>
</template>

<script>

import Vue from 'vue';
import Preloader from '../components/popup/Preloader';

export default {
  name: 'LayoutComponent',
  components: { Preloader },
  data() {
    return {
      mainMenu: [
        {
          routeTo: { name: 'pets' },
          label: 'Реестр питомцев',
          icon: 'storage',
          accessRoles: ['ADMIN', 'MANAGER', 'CLUB'],
        }, {
          routeTo: { name: 'shelters' },
          label: 'Питомники',
          icon: 'holiday_village',
          accessRoles: ['ADMIN'],
        }, {
          routeTo: { name: 'moderation_pets' },
          label: 'Модерация питомцев',
          icon: 'verified',
          accessRoles: ['ADMIN'],
        }, {
          routeTo: { name: 'moderation_generations' },
          label: 'Реестр актировок',
          icon: 'child_friendly',
          accessRoles: ['ADMIN'],
        }, {
          routeTo: { name: 'pedigree_applications' },
          label: 'Заявки на родословную',
          icon: 'notification_important',
          accessRoles: ['ADMIN'],
        }, {
          routeTo: { name: 'pet_update_applications' },
          label: 'Редактирование питомцев',
          icon: 'edit',
          accessRoles: ['ADMIN'],
        }, {
          routeTo: false,
          label: 'Справочник',
          icon: 'menu_book',
          accessRoles: ['ADMIN'],
          items: [
            {
              routeTo: { name: 'breeds' },
              label: 'Порода',
              icon: 'pets',
            }, {
              routeTo: { name: 'colors' },
              label: 'Окрас',
              icon: 'palette',
            }, {
              routeTo: { name: 'titles' },
              label: 'Титулы',
              icon: 'emoji_events',
            }, {
              routeTo: { name: 'clubs' },
              label: 'Клубы',
              icon: 'business',
            },
          ],
        }, {
          routeTo: { name: 'users' },
          label: 'Пользователи',
          icon: 'group',
          accessRoles: ['ADMIN'],
        },
      ],
      userMenu: {},
    };
  },
  computed: {
    isClub() {
      return this.$store.getters['auth/getData'].roles.every(el => el === 'CLUB');
    },
  },
  mounted() {
    Vue.prototype.$loader = this.$refs.loader;
  },
};
</script>

<style lang="stylus">
  #app
    .auto-save-block
    .auto-save-block__content
      height 100%
  .app-logo
    img
      height: 30px !important
      left: 50%
      transform: translate(-50%, -50%)
  .menu-item-label
    line-height: 1
</style>
