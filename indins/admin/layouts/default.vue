<template>
  <AppAdmin
    :main-menu="mainMenu"
    :user-menu="userMenu"
  />
</template>

<script>

export default {
  name: 'LayoutComponent',
  data() {
    return {
      mainMenu: [
        {
          routeTo: { name: 'users' },
          label: 'Пользователи',
          icon: 'group',
          accessRoles: ['ROLE_ADMIN'],
        },
        {
          routeTo: { name: 'meta' },
          label: 'Мета настройки',
          icon: 'settings',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          routeTo: { name: 'team' },
          label: 'Команда',
          icon: 'groups',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          routeTo: { name: 'vacancy' },
          label: 'Вакансии',
          icon: 'person_search',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          routeTo: { name: 'article' },
          label: 'Статьи',
          icon: 'menu_book',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          routeTo: { name: 'project' },
          label: 'Портфолио',
          icon: 'dashboard',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          routeTo: { name: 'tag' },
          label: 'Теги',
          icon: 'tag',
          accessRoles: ['ROLE_CONTENT'],
        },
        {
          label: 'Коллтрекинг',
          icon: 'perm_phone_msg',
          accessRoles: ['ROLE_APPEAL'],
          items: [
            {
              routeTo: { name: 'calltracking-phones' },
              label: 'Телефоны',
              icon: 'phone',
              accessRoles: ['ROLE_APPEAL'],
            },
            {
              routeTo: { name: 'calltracking-appears' },
              label: 'Обращения',
              icon: 'perm_phone_msg',
              accessRoles: ['ROLE_APPEAL'],
            },
            {
              routeTo: { name: 'calltracking-source' },
              label: 'Аналитика по источнику',
              icon: 'bar_chart',
              accessRoles: ['ROLE_APPEAL'],
            },
            {
              routeTo: { name: 'calltracking-type' },
              label: 'Аналитика по типу',
              icon: 'bar_chart',
              accessRoles: ['ROLE_APPEAL'],
            },
          ],
        },
      ],
      userMenu: {},
    };
  },
};
</script>
