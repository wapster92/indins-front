<template>
  <div
    v-if="hasDefaultSlot"
    :class="[data.areaClass, sawTopClass, sawBottomClass, sawLeftClass, sawRightClass]"
    class="angular-area"
  >
    <span
      class="angular-back"
    ><span/></span>
    <slot/>
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
  data() {
    return {
      sawTopClass: '',
      sawBottomClass: '',
      sawLeftClass: '',
      sawRightClass: '',
    };
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
  },
  created() {
    if (this.data.sawTop && this.data.sawTop === true) {
      this.sawTopClass = 'saw-top';
    }

    if (this.data.sawBottom && this.data.sawBottom === true) {
      this.sawBottomClass = 'saw-bottom';
    }

    if (this.data.sawLeft && this.data.sawLeft === true) {
      this.sawLeftClass = 'saw-left';
    }

    if (this.data.sawRight && this.data.sawRight === true) {
      this.sawRightClass = 'saw-right';
    }
  },
};
</script>
