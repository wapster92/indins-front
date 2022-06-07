<template>
  <div class="page-block">
    <div
      v-if="topIsVisible"
      class="page-block-top"
    >
      <div class="page-block-title">
        {{ title }}
      </div>
      <div class="page-block-buttons">
        <slot name="buttons" />
      </div>
      <v-tooltip
        v-if="allowMinimize"
        class="page-block-minimizer"
        bottom
      >
        <template #activator="{ on, attrs }">
          <MinimizeButton
            v-bind="attrs"
            v-model="minimized"
            class="page-block-minimize"
            v-on="on"
            @input="toggleMinimize"
          />
        </template>
        <span>Свернуть</span>
      </v-tooltip>
    </div>
    <div
      v-if="!noContent"
      :class="{
        'no-padding': noPadding,
        'no-top': !topIsVisible,
        'transparent-background': transparentContent,
        'is-minimized': minimized,
      }"
      class="page-block-content"
    >
      <ScrollComponent
        vertical
        horizontal
        :value="scroll"
        @input="$emit('update:scroll', $event)"
      />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageBlock',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    scroll: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: '',
    },
    showTop: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    noContent: {
      type: Boolean,
      default: false,
    },
    transparentContent: {
      type: Boolean,
      default: false,
    },
    allowMinimize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minimized: false,
      scrollVal: {},
    };
  },
  computed: {
    topIsVisible() {
      return this.showTop || this.title;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.minimized = val;
      },
    },
    minimized(val) {
      if (val === this.value) return;
      this.$emit('input', val);
    },
  },
  methods: {
    toggleMinimize() {
      this.$emit('input', this.minimized)
    },
  },
};
</script>

<style lang="stylus">
.page-block
  display: flex
  flex-flow: column nowrap
  padding: 2px

.page-block-title
  margin-right: auto
  font-size: 14px
  line-height: 16px
  font-weight: 500
  color: #202124

.page-block-top
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  align-items: center
  min-height: 40px
  padding: 3px 24px
  background: #f8fafe
  border: 1px solid #dadada

.page-block-content
  position: relative
  overflow: hidden
  padding: 16px 12px
  margin-top: 2px
  border: 1px solid #dadada
  background: #ffffff
  &.is-minimized
    display: none
  &.transparent-background
    background: transparent
  &.no-padding
    padding: 0
  &.no-top
    margin-top: 0

.page-block-minimize
  margin-left: 16px

.page-block-buttons
  display: flex
  flex-flow: row nowrap
  align-items: center

@media(max-width: 959px)
  .page-block-top
    padding-left: 20px
    padding-right: 20px
</style>
