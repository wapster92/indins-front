<template>
  <div class="massive-action-button">
    <SimpleButton
      v-bind="$attrs"
      :tooltip="tooltip"
      class="massive-action-desktop"
      height="30"
      @click="emitClick($event)"
    >
      <slot>
        {{ buttonText }}
      </slot>
    </SimpleButton>
    <div
      class="massive-action-mobile"
      @click="emitClick($event)"
    >
      <slot>
        {{ buttonText }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MassiveActionButton',
  props: {
    tooltip: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    buttonText() {
      const end = this.isMobile ? ` (${this.selected?.length || '0'})` : '';
      return `${this.text}${end}`;
    },
  },
  methods: {
    emitClick(event) {
      if (!this.$attrs.disabled) {
        this.$emit('click', event);
      }
    },
  },
};
</script>

<style lang="stylus">
.massive-action-button
  display: flex
  flex-flow: row nowrap

.massive-action-mobile
  display: none

.massive-action-desktop
  display: block

@media(max-width: 959px)
  .massive-action-mobile
    display: flex
    flex-flow: row nowrap
    justify-content: flex-start
    align-items: center
    padding: 17px 0
    font-size: 14px
    line-height: 1
    font-weight: 500
    color: #416FC8
    cursor: pointer

  .massive-action-desktop
    display: none
</style>
