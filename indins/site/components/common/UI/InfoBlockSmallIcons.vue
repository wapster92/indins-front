<template>
  <div class="infoBlockSmallIcons">
    <svg-icon
      :name="data.iconName"
      class="infoBlockSmallIcons__icon"
    />
    <h2
      v-if="!!data.title"
      class="infoBlockSmallIcons__title"
      v-html="data.title"
    />
    <p
      class="infoBlockSmallIcons__text"
      v-html="data.text"
    />
  </div>
</template>

<script>
export default {
  name: 'InfoBlockSmallIcons',
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>

</style>
