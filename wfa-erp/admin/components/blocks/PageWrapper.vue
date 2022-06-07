<template>
  <div
    :style="{
      gridTemplate: gridTemplateStyle,
    }"
    :class="templateClass"
    class="page-wrapper"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageWrapper',
  props: {
    xs: {
      type: String,
      default: 'minmax(0, max-content) / auto',
    },
    sm: {
      type: String,
      default: null,
    },
    md: {
      type: String,
      default: null,
    },
    lg: {
      type: String,
      default: null,
    },
    xsClass: {
      type: String,
      default: '',
    },
    smClass: {
      type: String,
      default: null,
    },
    mdClass: {
      type: String,
      default: null,
    },
    lgClass: {
      type: String,
      default: null,
    },
  },
  computed: {
    gridTemplateStyle() {
      let style = this.xs;
      if (this.$vuetify.breakpoint.smAndUp && this.sm) {
        style = this.sm;
      }
      if (this.$vuetify.breakpoint.mdAndUp && this.md) {
        style = this.md;
      }
      if (this.$vuetify.breakpoint.lgAndUp && this.lg) {
        style = this.lg;
      }
      return style.replace(/\s/g, ' ');
    },
    templateClass() {
      let templateClass = this.xsClass;
      if (this.$vuetify.breakpoint.smAndUp && this.smClass) {
        templateClass = this.smClass;
      }
      if (this.$vuetify.breakpoint.mdAndUp && this.mdClass) {
        templateClass = this.mdClass;
      }
      if (this.$vuetify.breakpoint.lgAndUp && this.lgClass) {
        templateClass = this.lgClass;
      }
      return templateClass.replace(/\s/g, ' ');
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100% - 42px);
  max-height: calc(100% - 42px);
  height: calc(100% - 42px);
  background-color: #e5e5e5;
  display: grid;
}

@media (min-width: 600px) and (max-width: 960px) {
  .page-wrapper {
    min-height: unset;
    max-height: unset;
    height: unset;
  }
}
</style>
