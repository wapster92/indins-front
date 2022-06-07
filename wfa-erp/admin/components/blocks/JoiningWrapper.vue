<script>
export default {
  name: 'JoiningWrapper',
  render(h) {
    if (!this.$slots.default) {
      return;
    }
    return h('div', [this.$slots.default]);
  },
};
</script>
