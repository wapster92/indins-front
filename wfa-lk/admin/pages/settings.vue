<template>
  <div class="fill-height">
    <nuxt-child />
  </div>
</template>

<script>
export default {
  name: 'Settings',
  meta: {
    breadcrumb: 'Настройки',
  },
  validate({ route, redirect }) {
    if (route.name === 'settings') {
      redirect({ name: 'settings-site' });
    }
    return true;
  },
};
</script>
