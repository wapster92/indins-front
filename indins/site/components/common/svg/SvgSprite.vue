<template>
  <svg-icon
    :name="icon"
    class="icon"
  />
</template>

<script>
export default {
  name: 'SvgSprite',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>
