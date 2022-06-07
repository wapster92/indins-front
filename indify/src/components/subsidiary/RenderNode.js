export default {
  props: {
    node: {
      type: Object,
      default: () => ({})
    }
  },
  render() {
    return this.node || ''
  }
}
