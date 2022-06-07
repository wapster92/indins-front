<template>
  <nuxt-child/>
</template>

<script>
export default {
  meta: {
    breadcrumb: 'Список клубов',
  },
  validate({ route, redirect }) {
    if (route.name === 'clubs') {
      redirect({ name: 'clubs-main' });
    }
    return true;
  },
};
</script>
