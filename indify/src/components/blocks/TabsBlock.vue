<template>
  <div
    :class="{ 'no-content': !hasContent }"
    class="component-wrapper tabs-block"
  >
    <div class="tabs-block-top_wrapper">
      <v-tabs
        v-model="currentTab"
        v-bind="options"
        class="tabs-block-top"
      >
          <slot name="tabs">
            <v-tab
              v-for="tab in tabs"
              :key="tab.key"
              :nuxt="tab.nuxt"
              :to="tab.to"
            >
              {{ tab.title }}
            </v-tab>
          </slot>
      </v-tabs>
      <div class="tabs-block_button-slot bg-tab-color">
        <slot name="button"/>
      </div>
    </div>
    <PageBlock
      v-if="blockMode"
      v-bind="blockProps"
      :class="'tabs-block-content' + (contentClasses ? ' ' + contentClasses : '')"
    >
      <slot />
    </PageBlock>
    <div
      v-else-if="allowContent"
      :class="'tabs-block-content' + (contentClasses ? ' ' + contentClasses : '')"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabsBlock',
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    color: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    blockMode: {
      type: Boolean,
      default: false,
    },
    blockProps: {
      type: Object,
      default: () => ({}),
    },
    allowContent: {
      type: Boolean,
      default: false,
    },
    contentClasses: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentTab: 0,
    };
  },
  computed: {
    defaultColor() {
      return this.color || 'info';
    },
    options() {
      return {
        color: this.defaultColor,
        'show-arrows': false,
        'background-color': 'bg-tab-color',
        height: 40,
        ...this.$attrs,
      };
    },
    hasContent() {
      return this.blockMode || this.allowContent;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.currentTab = val;
      },
    },
    currentTab(val) {
      if (val === this.value) return;
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="stylus">
.tabs-block
  display: grid
  grid-template: 40px calc(100% - 40px) \/ 100%
  &.no-content
    display: block
  .v-tabs-bar
    padding: 0
  .theme-light.v-tabs-items
    background-color: transparent
  .v-tab
    min-width: 0
    padding: 0 6px
    margin: 0 9px
    letter-spacing: normal
    text-transform: none
    &:not(.v-tab--active)
      color: #1f1f1f!important
  .v-tab--active
    font-weight: 700
  .v-badge--inline, .v-badge__wrapper
    margin-right: 0
  .v-slide-group__wrapper
    padding: 0 10px
    //border-bottom: 1px solid #dadada
  &_button-slot
    display flex
    justify-content end
    align-items center
    margin-left: auto
    height 39px
  &-top_wrapper
    display flex
    justify-content space-between
    border: 1px solid #dadada
  .v-slide-group__wrapper
    width: 0;



.tabs-block-content
  padding: 2px 0 0 0
  .v-tabs-items, .v-window__container, .v-window-item
    height: 100%
</style>
