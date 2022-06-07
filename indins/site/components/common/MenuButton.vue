<template>
  <a
    :class="classList"
    @click="switchMenu"
  >
    <span/>
    <span/>
    <span/>
  </a>
</template>

<script>
export default {
  name: 'MenuButton',

  computed: {
    showMenu() {
      return this.$store.getters['menu/show'];
    },

    classList() {
      return {
        'menu-button': true,
        'menu-button_open': this.showMenu,
        'menu-button_close': !this.showMenu,
      };
    },
  },

  methods: {
    switchMenu() {
      this.$store.commit('menu/switch');
    },
  },
};
</script>
