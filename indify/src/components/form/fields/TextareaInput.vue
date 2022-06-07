<template>
  <div
    class="textarea-input-wrapper"
  >
    <label
      v-if="isCompact"
      class="textarea-input-label"
    >
      {{ label }}
    </label>
    <span
      v-if="!isCompact"
      class="fake-placeholder"
    >
      {{ !localValue ? placeholderText : '' }}
    </span>
    <div
      :style="fieldStyles"
      class="textarea-input-field"
    >
      <ScrollComponent
        v-model="scrollPosition"
        vertical
      />
      <v-textarea
        v-model="localValue"
        v-bind="$attrs"
        :class="{ 'is-compact': isCompact }"
        :rows="rows"
        :auto-grow="autoGrow"
        :color="computedColor"
        :rules="rules"
        :error-messages="visibleErrors"
        :error="errorList.length !== 0"
        :min-height="minHeight"
        :hide-details="!errorsAreVisible"
        :label="labelText"
        :placeholder="placeholderText"
        :row-height="19"
        class="simple-textarea"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'TextareaInput',
  mixins: [validation],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    rows: {
      type: [String, Number],
      default: 1,
    },
    autoGrow: {
      type: Boolean,
      default: true,
    },
    minHeight: {
      type: [String, Number],
      default: 21,
    },
    maxHeight: {
      type: [String, Number],
      default: 0,
    },
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      scrollPosition: {
        x: 0,
        y: 0,
        xScrollDistance: 0,
        yScrollDistance: 0,
      },
    };
  },
  computed: {
    currentInputType() {
      return this.inputType || (this.$vuetify.breakpoint.smAndDown
        ? 'standart'
        : 'compact');
    },
    isCompact() {
      return this.currentInputType === 'compact';
    },
    errorsAreVisible() {
      return this.showErrors && this.inputType === 'standart';
    },
    visibleErrors() {
      return this.errorsAreVisible
        ? this.errorList
        : '';
    },
    labelText() {
      return this.currentInputType === 'compact'
        ? ''
        : this.label;
    },
    placeholderText() {
      return this.placeholder || (this.currentInputType === 'compact'
        ? '...'
        : this.label);
    },
    computedColor() {
      return !this.color ? this.$defaultConfig.color : this.color;
    },
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    fieldStyles() {
      if (!this.maxHeight || +this.maxHeight === 0) return '';
      return {
        'max-height': this.$getType(this.maxHeight) === 'String'
          ? this.maxHeight.replace('px') + 'px'
          : this.maxHeight + 'px'
      }
    },
  },
  watch: {
    'scrollPosition.yScrollDistance': function (value, oldValue) {
      if (value === undefined) return;
      if (this.localValue.lastIndexOf('\n') < this.getCurrentCursorPosition()) {
        this.scrollPosition.y = value;
      }
    },
  },
  methods: {
    getCurrentCursorPosition() {
      const textarea = this.$el.querySelector('textarea');
      if (!textarea) return;
      return textarea.selectionStart;
    },
  },
};
</script>

<style lang="stylus">
.textarea-input-wrapper
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  .fake-placeholder
    position: absolute
    top: 19px
    left: 12px
    z-index: 1
    display: inline-block
    width: calc(100% - 16px)
    color: #D3D4DB
    font-size: 14px
    line-height: 20px
    overflow: hidden
    text-overflow: ellipsis

.textarea-input-label
  align-self: flex-start
  display: inline-block
  width: 122px
  min-width: 122px
  padding: 3px 0 3px 12px
  margin-top: 10px
  color: #888A91
  font-size: 14px
  line-height: 16px
  overflow: hidden
  text-overflow: ellipsis

.simple-textarea.v-textarea
  position: relative
  z-index: 2
  margin-top: 0
  padding: 13px 12px 7px
  &.is-compact
    padding: 6px 12px
    textarea
      padding: 5px 0 4px
      min-height: 19px
    .v-input__slot
      margin-bottom: 0
      min-height: 21px
    .v-input__control > .v-input__slot::before
      border-color: transparent!important
  textarea
    min-height: 29px
    padding: 6px 0 2px
    font-size: 14px
    line-height: 20px !important
    &::placeholder
      color: #D3D4DB!important
  .v-input__slot
    margin-bottom: 4px
  .v-label
    transform: translateY(-15px) scale(0.875)!important
    font-size: 13.7px
  .v-input__control .v-input__slot::after
    border-top-width: 0

.textarea-input-field
  position: relative
  overflow: hidden
  width: 100%
  min-height 30px

@media(max-width: 959px)
  .textarea-input-label
    padding-left: 8px
  .textarea-input-wrapper
    .fake-placeholder
      left: 8px

    .simple-textarea.v-textarea
      padding-left: 8px
      padding-right: 8px
</style>
