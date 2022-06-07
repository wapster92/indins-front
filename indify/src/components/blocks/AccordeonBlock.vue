<template>
  <div class="accordeon-block">
    <div class="accordeon-block-top">
      <div class="accordeon-top-left">
        <slot name="top" />
      </div>
      <div class="accordeon-block-buttons">
        <slot
          :toggle="toggleMinimize"
          name="buttons"
        />
        <v-btn
          rounded
          outlined
          fab
          x-small
          @click="toggleMinimize"
        >
          <v-icon size="25">
            {{ arrowIcon }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div
      :style="computedStyles"
      :class="{
        'is-hidden': minimized,
      }"
      class="accordeon-block-content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordeonBlock',
  props: {
    expandAtStart: {
      type: Boolean,
      default: false,
    },
    maxContentHeight: {
      type: [String, Number],
      default: 0,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minimized: true,
    };
  },
  computed: {
    computedStyles() {
      return {
        'max-height': this.computeMaxHeight(),
      };
    },
    arrowIcon() {
      return this.minimized ? 'keyboard_arrow_down' : 'keyboard_arrow_up';
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.minimized = val;
      },
    },
  },
  mounted() {
    this.minimized = !this.expandAtStart;
  },
  methods: {
    computeMaxHeight() {
      if (!this.maxContentHeight || +this.maxContentHeight === 0) return '100%';
      const type = this.$getType(this.maxContentHeight);

      if (type === 'Number' || !Number.isNaN(+this.maxContentHeight)) {
        return `${this.maxContentHeight}px`;
      }

      if (type === 'String') return this.maxContentHeight;

      return '100%';
    },
    toggleMinimize(value) {
      if (this.$getType(value) === 'Boolean') {
        this.minimized = value;
      } else {
        this.minimized = !this.minimized;
      }
      this.$emit('input', this.minimized);
    },
  },
};
</script>

<style lang="stylus">
.accordeon-block
  background: #FFFFFF

.accordeon-block-top
  display: grid
  grid-template: auto \/ 1fr auto
  align-items: center
  grid-gap: 16px
  padding: 16px

.accordeon-top-left
  display: block

.accordeon-block-buttons
  display: grid
  grid-template: auto \/ repeat(auto-fit, 30px)
  grid-gap: 16px
  justify-content: end
  width: 100px

.accordeon-block-content
  display: flex
  flex-flow: column nowrap
  justify-content: flex-start
  align-content: flex-start
  width: 100%
  border-top: 1px solid #dadada
  &.is-hidden
    display: none
</style>
