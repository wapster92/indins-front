<template>
  <picture class="picture">
    <img
      :src="src"
      :alt="alt"
      draggable="false"
      ondragstart="return false;"
    >
  </picture>
</template>

<script>
export default {
  name: 'TkPicture',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    types: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>

<style lang="scss" scoped>
.picture {
  display: inline-flex;
  max-width: 100%;
  max-height: 100%;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
    display: flex;
  }
}
</style>
