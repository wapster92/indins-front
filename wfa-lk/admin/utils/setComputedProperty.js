export const setComputedProperty = name => ({
  get() {
    return this.value[name];
  },
  set(value) {
    this.$emit('input', {
      ...this.value,
      [name]: value,
    });
  },
});
