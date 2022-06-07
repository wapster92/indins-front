<template>
  <v-menu
    v-model="show"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <button
        class="listing-icon-button more_horiz"
        v-on="on"
      >
        <v-icon
          size="18"
          color="white"
        >
          more_horiz
        </v-icon>
      </button>
    </template>
    <v-list>
      <slot />
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'ActionItemList',
  data() {
    return {
      show: false,
    };
  },
};
</script>
