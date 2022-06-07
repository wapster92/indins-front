<template>
  <button
    class="listing-icon-button"
    v-on="$listeners"
  >
    <v-icon :size="iconSize">
      {{ icon }}
    </v-icon>
  </button>
</template>

<script>
export default {
  name: 'ClickAction',
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconSize: {
      type: [Number, String],
      default: 20,
    },
  },
};
</script>
