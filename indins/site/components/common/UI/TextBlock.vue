<template>
  <div
    v-if="data.text"
    :class="textBlockClassList"
  >
    <div :class="containerClassList">
      <div
        :class="containerTextClassList"
        v-html="data.text"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    textBlockClassList() {
      return {
        'text-block': true,
        [this.data.areaClass]: true,
      };
    },

    containerClassList() {
      return {
        'text-block__container': true,
        [this.data.containerClass]: true,
      };
    },

    containerTextClassList() {
      return {
        'text-block__container__text': true,
        [this.data.textClass]: true,
      };
    },
  },
};
</script>
