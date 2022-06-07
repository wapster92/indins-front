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
          routeTo: { name: 'settings-site' },
          label: 'Настройки сайта',
          icon: 'settings_suggest',
        }, {
          routeTo: { name: 'payments' },
          label: 'Платежи',
          icon: 'paid',
        }, {
          routeTo: { name: 'users' },
          label: 'Пользователи',
          icon: 'group',
        },
        {
          routeTo: { name: 'administrators' },
          label: 'Администраторы',
          icon: 'mdi-account-supervisor-circle',
        },
        {
          routeTo: { name: 'help' },
          label: 'Помощь',
          icon: 'help',
        },
      ],
      userMenu: {},
    };
  },
};
</script>
