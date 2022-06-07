<template>
  <div class="popup-input-wrap">
    <div class="popup-input-field">
      <slot :show="show" />
    </div>
    <v-btn
      class="popup-input-add"
      icon
      small
      color="info"
      outlined
      @click="buttonClick"
    >
      <v-icon size="20">
        add
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'PopupInput',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === this.show) return;
        this.show = val;
      },
    },
    show(val) {
      this.$emit('input', val);
    },
  },
  methods: {
    buttonClick() {
      this.show = true;
      this.$emit('click:button', this.show);
    },
  },
};
</script>

<style lang="stylus">
.popup-input-wrap
  display: flex
  flex-flow: row nowrap

.popup-input-field
  flex-grow: 2

.popup-input-add
  align-self: center
  margin: 0 8px
</style>
