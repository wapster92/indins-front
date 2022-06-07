<template>
  <div
    :class="data.userClass"
    class="simple-button"
    @click="$emit('click')"
  >
    <span
      class="simple-button__text"
      v-text="data.text"
    />
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
  props: {
    data: {
      type: Object,
      default: () => ({
        text: 'Текст',
        userClass: '',
      }),
    },
  },
};
</script>
