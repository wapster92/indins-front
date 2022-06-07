<script>
export default {
  name: 'DynamicCommentsProvider',
  inject: {
    clearAdditionalBlock: {
      default: null,
    },
    setAdditionalBlock: {
      default: null,
    },
  },
  render(createElement) {
    if (
      this.$getType(this.$scopedSlots.default) === 'Function'
      && this.$getType(this.$scopedSlots.default()) === 'Array'
      && this.$scopedSlots.default().length !== 0
    ) {
      const children = Object.values(this.$scopedSlots.default());
      this.setAdditionalBlock(children);
    } else {
      this.clearAdditionalBlock();
    }
    return createElement('div', { class: 'd-none' });
  },
};
</script>
