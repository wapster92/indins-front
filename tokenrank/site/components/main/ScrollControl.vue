<template>
  <div
    ref="scroll-control"
    class="scroll-control">
    <slot
      name="default"
    />
  </div>
</template>

<script>
import { debounce } from '@/utils/decorators';

export default {
  name: 'ScrollControl',
  data() {
    return {
      positionReached: false,
    };
  },
  mounted() {
    this.handleDebouncedScroll = debounce(this.eventEmitter, 150);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  },
  methods: {
    eventEmitter() {
      this.positionReached = (window.pageYOffset > 0.75 * this.$refs['scroll-control'].offsetHeight);
      this.$emit('scroll-update', this.positionReached);
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-control {
  width: 100%;
}
</style>
