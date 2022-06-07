<template>
  <div
    class="number-input-wrapper"
  >
    <label
      v-if="isCompact"
      class="number-input-label"
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
      v-bind="$attrs"
      :class="{ 'is-compact': isCompact }"
      :rules="localRules"
      :error-messages="visibleErrors"
      :error="errorList.length !== 0"
      :color="computedColor"
      :hide-details="!errorsAreVisible"
      :label="labelText"
      :loading="loading"
      pre
      class="simple-text"
      @change="formatForSave"
      @click:append="clickedAppend($event)"
      @blur="resetEditing"
      @focus="isEditing=true"
    >
      <template #append>
        <slot name="append" v-if="arrowsAreVisible">
          <div :class="{'arrow-container--compact': inputType === 'compact'}" class="number-input__arrow arrow-container">
            <svg @click="mutateByStep('up')"
                 class="number-input__arrow--up" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.06 4.57129L4 1.74576L0.94 4.57129L0 3.70142L4 -0.000139713L8 3.70142L7.06 4.57129Z" fill="#888A90"/>
            </svg>
            <svg @click="mutateByStep('down')"
                 class="number-input__arrow--down" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.06 0.142578L4 2.9681L0.94 0.142578L0 1.01245L4 4.71401L8 1.01245L7.06 0.142578Z" fill="#888A90"/>
            </svg>
          </div>
        </slot>
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
  name: 'NumberInput',
  mixins: [validation],
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
    precision: {
      type: [Number],
      default: 0,
    },
    step: {
      type: [String, Number],
      default: null,
    },
    unlimited: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    maxNumber: {
      type: [String, Number],
      default: 9999999999,
    },
    showErrors: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    positive: {
      type: Boolean,
      default: false,
    },
    negative: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    maxLength: {
      type: Number,
      default: 13,
    },
    arrowsAreVisible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      localValue: null,
      emitValue: null,
      isEditing: false,
      defaultRules: {
        number: value => {
          if (!value) return true;
          const trueValue = value.toString().replace(',', '.');
          if (+trueValue >= 0 && this.negative) return 'Поле для отрицательных чисел';
          if (+trueValue <= 0 && this.positive) return 'Поле для положительных чисел';
          if (+trueValue > +this.maxNumber) return 'Слишком большое значение';
          if (trueValue.length > this.maxLength) return 'Слишком длинное значение';
          return !Number.isNaN(+trueValue) || 'Введите число';
        },
      },
    };
  },
  computed: {
    currentInputType() {
      return this.inputType || (this.$vuetify.breakpoint.smAndDown
        ? 'standart'
        : 'compact');
    },
    chosenStep() {
      return this.step ? Number(this.step) : 1 / (10 ** this.precision);
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
      rules.push(this.defaultRules.number);
      return rules;
    },
  },
  watch: {
    localValue(val, oldVal) {
      if (val === '') return;
      const num = 0;
      if (val == null) {
        val = String(Number(num).toFixed(this.precision))
      }
      const shortRegex = /^-|^\d/;
      const midRegex = /^-\d|^0\.|^0,|^[1-9]\d|^[1-9],|^[1-9]\./;
      const longRegex = /^-?(0\.|0,|[1-9]\d*(\.?|,?)\d*$)\d*$/;
      const decimalPlaces = val && val.split(/\.|,/)[1]?.length || 0;
      if ((val.length === 1 && !(shortRegex.test(val))) ||
        (val.length === 2 && !(midRegex.test(val))) ||
        (val.length >= 3 && !(longRegex.test(val))) ||
        (decimalPlaces > this.precision && !this.unlimited) ||
        (this.precision === 0 && !this.unlimited && (val.includes(',') || (val.includes('.'))))
      ) {
        this.$nextTick(() => this.localValue = oldVal);
        this.$emit('input', oldVal);
        return;
      }
      if (this.value === val) return;
      this.$emit('input', this.localValue);
    },
    value: {
      immediate: true,
      handler(val) {
        if (!this.unlimited) {
          if (String(val).split('.')[1]?.length > this.precision) {
            this.localValue = this.roundNumber(val, this.precision);
          } else if (val == null || Number.isNaN(val) || val === '') {
            this.localValue = '';
          } else if (!this.isEditing) {
            this.localValue = String(Number(val).toFixed(this.precision))
          } else {
            this.localValue = String(val);
          }
        } else {
          this.localValue = (val == null || Number.isNaN(val) || val === '') ? '' : String(val)
        }
      }
    }
  },
  methods: {
    resetEditing() {
      this.$emit('blur');
      this.isEditing = false;
    },
    formatForSave(val) {
      if (!val || val === '-' || val === '-0') {
        this.$emit('input', '');
        return '';
      }
      const editedVal = val.replace(',', '.');
      const emitVal = this.precision && !this.unlimited ? Number(editedVal).toFixed(this.precision) : editedVal;
      this.$emit('input', emitVal);
    },
    clickedAppend(event) {
      this.$emit('click:append', event);
    },
    mutateByStep(mode) {
      const mutatedValue = Number(this.localValue.replace(',', '.'));
      this.precision && !this.unlimited ? +mutatedValue.toFixed(this.precision) : mutatedValue
      this.localValue = mode === 'up'
        ? mutatedValue + this.chosenStep
        : mutatedValue - this.chosenStep;
      const currentDecimalPlaces = String(mutatedValue).split(/\./)[1]?.length;
      this.localValue = this.precision && !this.unlimited
        ? this.roundNumber(this.localValue, this.precision)
        : currentDecimalPlaces
          ? this.roundNumber(this.localValue, currentDecimalPlaces)
          : String(this.localValue);
    },
    roundNumber(number, decimalPlaces) {
      return String(Number(`${Math.round(`${number}e${decimalPlaces}`)}e-${decimalPlaces}`));
    },
  },
};
</script>

<style lang="stylus">
.number-input-wrapper
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

.number-input-label
  display: inline-block
  width: 100px
  min-width: 100px
  padding: 3px 0 3px 12px
  color: #888A91
  font-size: 14px
  line-height: 1
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.number-input-wrapper
  .simple-text.v-text-field
    position: relative
    z-index: 2
    flex-grow: 2
    margin-top: 0
    margin-bottom: -14px
    padding: 13px 12px 7px
    &.is-compact
      margin-bottom: 0;
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

.number-input__arrow
  height: 18px;
  margin-top: 2px;
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &--up
    margin-top: 4px;
  &--up:hover,
  &--up:active,
  &--down:hover,
  &--down:active
    & path
      fill: #202124;

&.arrow-container--compact
  margin-top: -4px;

@media(max-width: 959px)
  .number-input-label
    padding-left: 8px

  .number-input-wrapper
    .fake-placeholder
      left: 8px

    .simple-text.v-text-field
      padding-left: 8px
      padding-right: 8px
</style>
