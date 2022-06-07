<template>
  <v-btn
    v-bind="options"
    color="info"
    class="default-add-button"
    v-on="$listeners"
  >
    <v-icon size="20">
      add
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'AddButton',
  computed: {
    options() {
      return {
        outlined: true,
        fab: true,
        width: 28,
        height: 28,
      };
    },
  },
};
</script>

<style lang="stylus">
.default-add-button
  &.v-btn:hover
    background-color: #416fc8!important

    .v-icon
      color: #ffffff!important
</style>
