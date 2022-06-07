<template>
  <v-snackbar
    :value="shown"
    :color="color"
    :timeout="-1"
    elevation="0"
    left
    class="app-snack-wrap"
  >
    {{ text }}
    <v-btn
      v-if="buttonHandler && buttonText"
      text
      @click="buttonHandler"
    >
      {{ buttonText }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      text: state => state.snack.options.text,
      shown: state => state.snack.shown,
      color: state => state.snack.options.color,
      buttonHandler: state => state.snack.options.buttonHandler,
      buttonText: state => state.snack.options.buttonText,
    }),
  },
};
</script>

<style lang="stylus">
.app-snack-wrap
  .v-snack__content
    padding: 16px 20px
@media(max-width: 960px)
  .app-snack-wrap
    .v-snack__content
      padding: 10px 20px
</style>
