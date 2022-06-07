<template>
  <nuxt-child/>
</template>

<script>
export default {
  meta: {
    breadcrumb: 'Питомники',
  },
  validate({ route, redirect }) {
    if (route.name === 'shelters') {
      redirect({ name: 'shelters-main' });
    }
    return true;
  },
};
</script>
