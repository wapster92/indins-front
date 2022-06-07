<template>
  <SimpleButton @click="$emit('click')">
    <span v-if="!(item || {}).isBlocked">Блокировать</span>
    <span v-else>Восстановить</span>
  </SimpleButton>
</template>

<script>
export default {
  name: 'RemoveRestoreButton',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>

</style>
