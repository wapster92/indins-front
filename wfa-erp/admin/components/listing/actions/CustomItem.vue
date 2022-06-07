<template>
  <component
    v-bind="$attrs"
    :is="tag"
    class="listing-icon-button"
    v-on="$listeners"
    @click="$emit('click', $event)"
  >
    <v-icon size="18">{{ icon }}</v-icon>
  </component>
</template>

<script>
export default {
  name: 'CustomItem',
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'button',
    },
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
