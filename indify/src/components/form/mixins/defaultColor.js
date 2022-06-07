export default {
  computed: {
    defaultColor() {
      return !this.$attrs.color ? '#416FC8' : this.$attrs.color;
    }
  }
}