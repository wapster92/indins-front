export default {
  inject: {
    hoveredCell: {
      default: null,
    },
  },
  props: {
    clickableGroup: {
      type: [String, null],
      default: null,
    },
  },
  computed: {
    isHovered() {
      if (!this.clickableGroup) return false;
      const sameField = this.hoveredCell?.field === this.field;
      const sameGroup = this.hoveredCell?.group === this.clickableGroup
        && this.clickableGroup !== null;
      return sameField || sameGroup;
    },
  },
}