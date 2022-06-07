<template>
  <div :class="infoBlockItemClassList">
    <div
      v-if="data.iconName"
      :class="iconClassList"
    />
    <h3
      v-if="data.title"
      :class="titleClassList"
      v-html="data.title"
    />
    <div
      v-if="data.text && !onHover"
      :class="textClassList"
      v-html="data.text"
    />
    <div
      v-if="onHover"
      class="info-block-item__description-window"
    >
      <div
        v-if="data.title"
        :class="data.titleClass"
        class="info-block-item__title"
        v-html="data.title"
      />
      <div
        v-if="data.text"
        :class="data.textClass"
        class="info-block-item__text"
        v-html="data.text"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBlockItem',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    onHover: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    infoBlockItemClassList() {
      return {
        'info-block-item': true,
        'info-block-item_hover': this.onHover,
        [this.data.areaClass]: !!this.data.areaClass,
      };
    },

    iconClassList() {
      return {
        'info-block-item__icon': true,
        [this.data.iconName]: !!this.data.iconName,
      };
    },

    titleClassList() {
      return {
        'info-block-item__title': true,
        [this.data.titleClass]: !!this.data.titleClass,
      };
    },

    textClassList() {
      return {
        'info-block-item__text': true,
        [this.data.textClass]: !!this.data.textClass,
      };
    },
  },
};
</script>
