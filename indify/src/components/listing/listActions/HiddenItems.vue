<template>
  <v-menu v-model="show" :close-on-content-click="false">
    <template v-slot:activator="{on}">
      <button class="icon-button" v-on="on">
        <v-icon size="20">more_horiz</v-icon>
      </button>
    </template>
    <v-list>
      <slot></slot>
    </v-list>
  </v-menu>
</template>
<script>
  export default {
    name: "HiddenItems",
    data() {
      return {
        show: false,
      };
    },
  }
</script>