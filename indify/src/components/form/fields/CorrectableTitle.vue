<template>
  <div class="correctable-title_wrapper">
    <div
      class="correctable-title_input align-center"
      :class="{'hide-input': !correctable}"
    >
      <div
        class="correctable-title-field"
        :class="{'is-active': correctable, 'is-invalid': !validStatus }"
      >
        <input
          v-model="localValue"
          :style="fontsettings"
          :placeholder="placeholder"
          type="text"
          class="correctable-title-placeholder"
          @blur="correctable = !correctable"
        >
      </div>
    </div>
    <div
      :class="{ 'hide-title': correctable }"
      class="correctable-title"
      @click="tryToggle"
      @dblclick="toggle"
    >
      <span
        :style="fontsettings"
        class="correctable-title_span"
      >
        {{ localValue || placeholder }}
      </span>
    </div>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'CorrectableTitle',
  mixins: [validation],
  props: {
    value: {
      type: [String, Number, null],
      default: null,
    },
    size: {
      type: [Number, String],
      default: 14,
    },
    weight: {
      type: [Number, String],
      default: 400,
    },
    placeholder: {
      type: String,
      default: 'Введите текст',
    },
    doubleClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      validStatus: true,
      correctable: false,
      showList: false,
    };
  },
  computed: {
    fontsettings() {
      const result = {
        fontSize: `${this.size}px`,
        fontWeight: `${this.weight}`,
      };
      if (Array.isArray(this.errorList) && this.errorList.length > 0) {
        result.color = '#CF4949';
      }
      return result;
    },
    localValue: {
      get() {
        return this.value?.toString() || '';
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    tryToggle() {
      if (!this.doubleClick) this.toggle();
    },
    toggle() {
      this.correctable = !this.correctable;
      // $nextTick нужен, чтобы инпут успел появиться,
      // иначе фокус не срабатывает, потому что инпут скрыт.
      this.$nextTick(() => {
        const input = this.$el.querySelector('input');
        if (input) {
          input.focus({ preventScroll: true });
          input.setSelectionRange(0, (this.localValue?.length || 0) + 1);
        }
      });
    },
  },
};
</script>

<style lang="stylus">
.correctable-title_wrapper
  position: relative
  padding: 6px 12px
.correctable-title_span
  cursor: pointer

.correctable-title
  display: flex
  position: absolute
  top: 6px
  &.hide-title
    visibility: hidden

.correctable-title_input
  display flex
  &.hide-input
    visibility: hidden

.correctable-title-field
  position: relative
  display: flex
  flex-flow: row nowrap
  min-height: 14px
  padding: 0
  cursor: pointer
  width: 100%
  &::before, &::after
    content: ''
    position: absolute
    bottom: 1px
    left: 0
    z-index: 2
    display: block
    width: 100%
    height: 1px
    background: #313131
    opacity: 0.2
  &::after
    visibility hidden
    content: ''
    left: 50%
    z-index: 3
    transform: translateX(-50%)
    opacity: 1
    width: 0
    height: 1px
    background: #416FC8
    transition: width 0.3s ease
  &.is-active::after
    visibility visible
    width: 100%
  &.is-invalid
    color: #CF4949
    .correctable-title-placeholder
      color: #CF4949
    &::after
      visibility visible
      width: 100%
      background: #CF4949
  input
    width: 100%
    height: 21px
    padding: 3px 0 4px
</style>
