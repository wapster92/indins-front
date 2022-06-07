<template>
  <span
    class="field-icon"
    @click="emmit"
  >
    <svg-icon :name="icon" />
  </span>
</template>

<script>
export default {
  name: 'FieldIcon',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    emmit() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus">
.field-icon
  position: absolute;
  width: 40px
  height: 40px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  right: 6px;
  padding: 10px;
  display: inline-flex;
  z-index 1
  .icon
    width: 100%
    height: 100%
</style>
