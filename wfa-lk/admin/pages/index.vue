<template>
  <v-layout
    align-center
    justify-center
    fill-height
  >
    <app-logo />
  </v-layout>
</template>

<script>
export default {
  async validate({ app: { store } }) {
    const accessRoles = ['ADMIN'];
    return store.getters['auth/hasRole'](accessRoles);
  },
};
</script>
