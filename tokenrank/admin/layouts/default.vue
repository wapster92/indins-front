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
        },
        {
          routeTo: { name: 'exchanges' },
          label: 'Биржи',
          icon: 'assured_workload',
        },
        {
          routeTo: { name: 'tokens' },
          label: 'Монеты',
          icon: 'paid',
        },
        {
          routeTo: { name: 'news' },
          label: 'Новости',
          icon: 'description',
        },
        {
          routeTo: { name: 'pages' },
          label: 'Страницы',
          icon: 'mdi-book-open-page-variant-outline',
        },
        {
          routeTo: { name: 'filters' },
          label: 'Фильтры',
          icon: 'filter_alt',
        },
      ],
      userMenu: {},
    };
  },
};
</script>
