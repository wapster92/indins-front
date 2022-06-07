<template>
  <div
    :class="{
      'auto-save-block': true,
    }"
  >
    <div
      :class="{ 'scroll-component-element': !noScroll }"
      class="auto-save-block__content"
    >
      <ScrollComponent
        v-if="!noScroll"
        vertical
        horizontal
      />
      <slot name="default" :throttledSave="throttledSave"></slot>
    </div>

    <transition name="footer-up">
      <div
        v-if="showFooter"
        :style="{
          'background-color': backgroundColor
        }"
        :class="{
          'auto-save-block__footer': true,
          'fixed' : fixed,
          'sticky': sticky,
          'border': border,
          'no-padding': noPadding
        }"
      >
        <slot name="buttons">
          <SimpleButton @click="buttonSave">Сохранить</SimpleButton>
          <SimpleButton outlined @click="buttonCancel">Отмена</SimpleButton>
        </slot>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AutoSaveBlock",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    border: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    saveByTimout: {
      type: Boolean,
      default: false,
    },
    timeout: {
      type: Number,
      default: 2000,
    },
    noScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFooter: false,
      timer: null
    }
  },
  computed: {
    throttledSave: function () {
      let DELAY = this.timeout / 2;
      return this.throttle(this.emitSave, DELAY);
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.showFooter = val;
      },
    },
    showFooter(val) {
      this.$emit('input', val)
    },
  },
  methods: {
    emitSave() {
      if (this.saveByTimout) {
        this.$emit('save')
        return
      }

      this.showFooter = true;
    },
    throttle(func, ms) {

      let savedArgs, savedThis;

      const wrapper = () => {

        savedArgs = arguments;
        savedThis = this;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
          func.apply(this, arguments);
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    },
    buttonSave() {
      this.$emit('save');
      clearTimeout(this.timer);
      this.showFooter = false
    },
    buttonCancel() {
      this.$emit('cancel');
      clearTimeout(this.timer);
      this.showFooter = false
    }
  }
}
</script>

<style lang="stylus">
.auto-save-block
  position: relative

.auto-save-block__content
  height: 100%

.auto-save-block__footer
  position: relative
  display: flex
  align-items: flex-start
  justify-content: flex-end
  padding: 8px
  &.border
    border: 1px solid #DADADA
  &.no-padding
    padding: 8px 0 !important
  &.fixed
    position: fixed
    bottom: 0
    left: 0
    right: 0
    margin-top: 4px
    z-index: 8
  &.sticky
    position: sticky
    bottom: 0
    left: 0
    right: 0
    margin-top: 4px
    z-index: 8
  .app-btn
    margin: 8px


.footer-up-enter-active
  animation: footer-up-in .5s

.footer-up-leave-active
  animation: footer-up-in .5s reverse

@keyframes footer-up-in
  0%
    opacity: 0
    bottom: -56px

  100%
    opacity: 1
    bottom: 0

</style>
