<template>
  <span class="chosen-string">
    {{ selectedNumber }}
  </span>
</template>

<script>
export default {
  name: 'SelectedLabel',
  props: {
    selected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    selectedNumber() {
      let ending = 'ь';
      const realNumber = this.selected ? this.selected.length : 0;
      const number = realNumber.toString().slice(-2);
      const num = number % 10;

      if (num === 0 || num > 4 || (number > 10 && number < 21)) {
        ending = 'ей';
      } else if (num > 1 && num < 5) {
        ending = 'и';
      }
      return `Выбрано ${realNumber} запис${ending}`;
    },
  },
};
</script>

<style lang="stylus">
.chosen-string
  display: inline-block
  padding: 5px
  color: #888A91
  font-size: 14px
</style>
