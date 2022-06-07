<script>
export default {
  name: 'DynamicCommentsInjector',
  inject: {
    additionalBlock: {
      default: null,
    },
  },
  render(createElement) {
    if (!this.additionalBlock?.value) return createElement('div', { class: 'd-none' });
    return createElement(
      'div',
      { class: 'dynamic-comments-additional-block' },
      this.additionalBlock.value
    );
  },
};
</script>
