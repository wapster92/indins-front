<template>
  <SimpleButton
    v-bind="{
      ...(href !== null ? {href} : {})
    }"
    :title="label"
    width="120px"
    class="px-2 document-print-button mr-2"
    color="lightgrey"
    elevation="1"
    target="_blank"
  >
    <div class="w-90 d-block text-truncate black--text mr-1">{{ label }}</div>
    <div class="w-10 grey--text ml-auto"><v-icon>print</v-icon></div>
  </SimpleButton>
</template>

<script>
export default {
  name: 'DocumentPrintButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>

</style>
