<template>
  <div class="infoBlockSpriteList">
    <nuxt-link
      :to="data.link"
      class="infoBlockSpriteList__item"
    >
      <svg-icon
        :name="data.iconName"
        class="infoBlockSpriteList__icon"
      />
      <h2
        class="infoBlockSpriteList__title"
        v-html="data.title"
      />
      <p class="infoBlockSpriteList__text">{{ data.text }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'InfoBlockSpriteList',
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
