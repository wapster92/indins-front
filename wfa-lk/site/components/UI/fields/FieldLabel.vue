<template>
  <span
    class="field-label"
  >
    <span class="field-label__text">
      {{ label }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'FieldLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus">

.field-label
  display: inline-flex;
  font-size: 13px;
  color: $grey-2;

</style>
