<template>
  <nuxt-child/>
</template>

<script>
export default {
  meta: {
    breadcrumb: 'Реестр',
  },
  validate({ route, redirect }) {
    if (route.name === 'pets') {
      redirect({ name: 'pets-main' });
    }
    return true;
  },
};
</script>
