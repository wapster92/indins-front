<script>
export default {
  name: 'GetSlotComponents',
  props: {
    busEventName: {
      type: String,
      default: '',
      required: true,
    }
  },
  render(createElement) {
    if (
      this.$getType(this.$scopedSlots.default) === 'Function'
      && this.$getType(this.$scopedSlots.default()) === 'Array'
      && this.$scopedSlots.default().length !== 0
    ) {
      let components = Object.values(this.$scopedSlots.default())
        .filter(el => el.tag !== undefined);
      this.$eventBus.emit(this.busEventName, components);
    }
    // return createElement('div', { class: 'listing-actions-provider' });
  },
};
</script>

<!--<style lang="stylus">-->
<!--.listing-actions-provider-->
<!--  display: none-->
<!--</style>-->
