<template>
  <NuxtLink
    :to="to"
    class="button-show-more">
    <div class="button-show-more__container">
      <span class="button-show-more__text">
        <slot/>
      </span>
      <SimpleSvg
        icon-name="UI/arrow-right"
        class="icon-svg"/>
    </div>
  </NuxtLink>
</template>

<script>
import SimpleSvg from '../../base/SimpleSvg';

export default {
  name: 'TkMoreButton',
  components: { SimpleSvg },
  props: {
    to: {
      type: (String | Object),
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button-show-more {
  position: relative;
  border: none;
  text-decoration: none;
  // background: $secondary-white;
  &__container {
    display: flex;
    align-items: center;
  }
  &:hover, &:focus, &:active {
    cursor: pointer;
    .button-show-more__text {
      color: $primary-logo;
    }
    .svg-icon_right {
      fill: $secondary-medium-black;
    }
  }
  &__text {
    color: $secondary-medium-black;
    transition: $transition-linear;
    padding-right: 10px;
  }
}
.icon-svg {
  height: 14px;
  width: 8px;
}
</style>
