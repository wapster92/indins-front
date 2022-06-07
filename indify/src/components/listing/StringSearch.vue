<template>
  <div class="listing-search">
    <input
      v-model="localValue"
      class="search-input"
      type="text"
      name="search-multiple"
      placeholder="Поиск"
      autocomplete="off"
    >
    <v-icon
      size="23"
      color="#888A91"
      @click.native="clearSearch"
    >
      {{ localValue ? 'close' : 'search' }}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'StringSearch',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: '',
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.localValue = val;
      },
    },
    localValue(value, oldValue) {
      if (this.value === value) return;
      if (value && oldValue === '') {
        this.$emit('first-input');
      }
      if (value === '' && oldValue) {
        this.$emit('cleared-input');
      }
      this.$emit('input', value);
    },
  },
  methods: {
    clearSearch() {
      this.localValue = '';
    },
  },
};
</script>

<style lang="stylus">
.listing-search
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  width: 100%
  &:nth-of-type(1)
    border-left: none

.search-input
  width: 100%
  height: 42px
  padding: 13px 17px 13px 37px
  margin-bottom: -1px
  border: none
  outline: none
  box-shadow: none
  font-size: 15px
  & + .v-icon.v-icon
    position: absolute
    top: 50%
    left: 0
    z-index: 1
    transform: translateY(-50%)
  &:focus
    position: relative
    z-index: 1
    border-bottom: 1px solid #416FC8
    padding-bottom: 12px
    padding-top: 13px

@media(max-width: 959px)
  .search-input
    padding-left: 52px
    & + .v-icon.v-icon
      left: 11px

@media(max-width: 500px)
  .listing-search
    grid-column: 1 \/ -1
    grid-row: 2 \/ -1
    border-top: 1px solid #dadada
</style>
