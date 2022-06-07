<template>
  <div
    class="text-input-wrapper"
  >
    <label
      v-if="isCompact"
      class="text-input-label"
    >
      {{ label }}
    </label>
    <span
      v-if="!isCompact"
      class="fake-placeholder"
    >
      {{ !localValue ? placeholderText : '' }}
    </span>
    <v-text-field
      v-model="localValue"
      v-mask="mask"
      v-bind="$attrs"
      :class="{ 'is-compact': isCompact }"
      :rules="localRules"
      :error-messages="visibleErrors"
      :error="errorList.length !== 0"
      :color="computedColor"
      :hide-details="!errorsAreVisible"
      :label="labelText"
      pre
      class="simple-text"
      @click:append="clickedAppend($event)"
      @blur="$emit('blur')"
    >
      <template #append>
        <slot name="append" />
      </template>
      <template #append-outer>
        <slot name="append-outer" />
      </template>
      <template #counter="props">
        <slot
          v-bind="props"
          name="counter"
        />
      </template>
      <template #default>
        <slot />
      </template>
      <template #label>
        <slot name="label" />
      </template>
      <template #message="props">
        <slot
          v-bind="props"
          name="message"
        />
      </template>
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #prepend-inner>
        <slot name="prepend-inner" />
      </template>
      <template #progress>
        <slot name="progress" />
      </template>
    </v-text-field>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'TextInput',
  mixins: [validation],
  props: {
    mode: {
      type: [String, null],
      default: null,
      validator: value => {
        const modes = [
          'phone', 'email', 'number', 'integer',
        ];
        return !value || modes.includes(value);
      },
    },
    color: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    limitNumberLength: {
      type: [String, Number],
      default: 13,
    },
    maxNumber: {
      type: [String, Number],
      default: 9999999999,
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
  },
  data() {
    return {
      clearedValue: '',
      localValue: null,
      defaultRules: {
        email: value => !value || this.emailRegex.test(value) || 'Неверный формат',
        number: value => {
          if (!value) return true;
          const trueValue = value.toString().replace(',', '.');
          if (+trueValue > +this.maxNumber) return 'Слишком большое значение';
          return !Number.isNaN(+trueValue) || 'Введите число';
        },
      },
      // eslint-disable-next-line no-useless-escape
      emailRegex: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
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
    computedColor() {
      return this.color || 'info';
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
    localRules() {
      const rules = [...this.rules];
      if (this.mode === 'email') {
        rules.push(this.defaultRules.email);
      }
      if (this.mode === 'number' || this.mode === 'integer') {
        rules.push(this.defaultRules.number);
      }
      return rules;
    },
    mask() {
      const result = {
        mask: '',
        tokens: {
          A: { pattern: /./ },
          '#': { pattern: /\d/ },
          N: { pattern: /[\d.,]/ },
          W: { pattern: /\w/ },
          // eslint-disable-next-line no-useless-escape
          E: { pattern: /[\w\d@.\-\_\']/ },
        },
      };
      // Обрезает длинное значение и эмитит его #443
      // если закомментить падет ввод времени в dateTimeField
      if (!this.mode) {
        result.mask = this.multiplyString('A', 5255);
      }
      if (this.mode === 'phone') {
        result.mask = '+# (###) ###-##-##';
      }
      if (this.mode === 'number') {
        result.mask = this.multiplyString('N', +this.limitNumberLength);
      }
      if (this.mode === 'integer') {
        result.mask = this.multiplyString('#', +this.limitNumberLength);
      }
      if (this.mode === 'email') {
        result.mask = this.multiplyString('E', 255);
      }
      return result;
    },
  },
  watch: {
    localValue(val) {
      let result = val;
      if (this.mode === 'phone') {
        result = result.replace(/\D/g, '');
        if (result === this.clearedValue) return;
      }
      this.clearedValue = result;
    },
    clearedValue(val) {
      if (this.value === val) return;
      this.$emit('input', val);
    },
    value: {
      immediate: true,
      handler(val) {
        if (this.mode === 'phone') {
          return this.setLocalValue(val);
        }
        this.localValue = val;
      },
    },
  },
  methods: {
    multiplyString(str, number) {
      if (number === 0) return '';
      if (number < 0) return str;
      let result = '';
      for (let i = 0; i < number; i++) {
        result += str;
      }
      return result;
    },
    setLocalValue(val) {
      if (!val || !val.toString()) {
        this.localValue = '';
        return;
      }
      const string = val.toString().replace(/\D/g, '');
      const parts = string.split('');
      parts.unshift('+');
      if (string.length > 1) {
        parts.splice(2, 0, ' (');
      }
      if (string.length > 4) {
        parts.splice(6, 0, ') ');
      }

      if (string.length > 7) {
        parts.splice(10, 0, '-');
      }

      if (string.length > 9) {
        parts.splice(13, 0, '-');
      }

      this.localValue = parts.join('');
    },
    clickedAppend(event) {
      this.$emit('click:append', event);
    },
  },
};
</script>

<style lang="stylus">
.text-input-wrapper
  position: relative
  display: flex
  flex-flow: row nowrap
  align-items: center
  justify-content: flex-start
  .fake-placeholder
    position: absolute
    top: 21px
    left: 12px
    z-index: 1
    display: inline-block
    width: calc(100% - 16px)
    color: #D3D4DB
    font-size: 14px
    line-height: 20px
    overflow: hidden
    text-overflow: ellipsis

.text-input-label
  display: inline-block
  width: 122px
  min-width: 122px
  padding: 3px 0 3px 12px
  color: #888A91
  font-size: 14px
  line-height: 1
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.text-input-wrapper
  .simple-text.v-text-field
    position: relative
    z-index: 2
    flex-grow: 2
    margin-top: 0
    padding: 13px 12px 7px
    &.is-compact
      padding: 6px 12px
      input
        padding: 3px 0 4px
        height: 21px
      .v-input__slot
        margin-bottom: 0
        height: 21px
      .v-input__control > .v-input__slot::before
        border-color: transparent!important
    input
      padding: 11px 0 5px
      font-size: 14px
      &::placeholder
        color: #D3D4DB
    .v-input__slot
      min-height 0 !important
      height: 30px
      margin-bottom: 4px
    &.v-input--is-readonly:not(.simple-date):not(.simple-date-range):not(.simple-date-time)
      pointer-events none
      opacity: .7
    .v-label
      top: 50% !important
      transform: translateY(-22px) scale(0.875)!important
      max-width: 130%
      font-size: 13.7px
      color: #888A90

    &.v-text-field--outlined
      fieldset
        border: 1px solid !important
    .v-input__control .v-input__slot::after
      border-top-width: 0

.login-form .simple-text.v-text-field
  .v-input__slot
    height: 50px
  .v-label--active
    transform: translateY(-32px) scale(0.875) !important

@media(max-width: 959px)
  .text-input-label
    padding-left: 8px

  .text-input-wrapper
    .fake-placeholder
      left: 8px

    .simple-text.v-text-field
      padding-left: 8px
      padding-right: 8px
</style>
