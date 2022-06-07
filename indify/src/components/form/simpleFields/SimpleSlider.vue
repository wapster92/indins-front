<template>
  <div class="simple-slider-wrapper">
    <v-subheader
      v-if="label"
      :class="{ 'slot-left': slotLeft }"
    >
      {{ label }}
    </v-subheader>
    <v-slider
      v-model="localValue"
      class="align-center simple-slider"
      v-bind="$attrs"
      :rules="rules"
      :error-messages="errorList"
      :color="computedColor"
      :min="min"
      :max="max"
      :readonly="readonly"
      :hide-details="!showErrors"
      track-color="#E9EBEF"
    >
      <template
        v-if="slotLeft"
        #prepend
      >
        <v-text-field
          v-model.number="localValue"
          :rules="localRules"
          :color="computedColor"
          :style="textFieldStyles"
          :readonly="readonly"
          class="pt-0 mb-3"
          hide-details
          single-line
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement"
              >
                keyboard_arrow_down
              </v-icon>
            </div>
          </template>
        </v-text-field>
      </template>
      <template
        v-else-if="slotRight"
        #append
      >
        <v-text-field
          v-model.number="localValue"
          :rules="localRules"
          :color="computedColor"
          :style="textFieldStyles"
          :readonly="readonly"
          class="pt-0 ml-5 mb-3"
          hide-details
          single-line
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement"
              >
                keyboard_arrow_down
              </v-icon>
            </div>
          </template>
        </v-text-field>
      </template>
    </v-slider>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'SimpleSlider',
  mixins: [validation],
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
    },
    slotLeft: {
      type: Boolean,
      default: false,
    },
    slotRight: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    max: {
      type: [String, Number],
      default: 100,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    incrementValue: {
      type: [String, Number],
      default: 1,
    },
    showErrors: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputWidth: '40px',
      defaultRules: {
        required: value => this.getType(value) !== 'Number'
          || 'Поле обязательно к заполнению',
        numberValidate: value => !Number.isNaN(value) || 'Не число.',
      },
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value || this.min;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    computedColor() {
      return this.color || 'info';
    },
    localRules() {
      const rules = [...this.rules];
      rules.push(this.defaultRules.numberValidate);
      if (this.required) {
        rules.push(this.defaultRules.required);
      }
      return rules;
    },
    textFieldStyles() {
      return { width: this.inputWidth };
    },
  },
  watch: {
    min: {
      immediate: true,
      handler() {
        this.computeWidth();
      },
    },
    max: {
      immediate: true,
      handler() {
        this.computeWidth();
      },
    },
  },
  methods: {
    computeWidth() {
      const length = Math.max(
        this.max.toString().length,
        this.min.toString().length,
      );
      let width = length * 10 + 16;
      if (width > 76) width = '76';
      this.inputWidth = `${width}px`;
    },
    increment() {
      let incrementValue = +this.incrementValue;
      if (Number.isNaN(incrementValue) || !incrementValue) {
        incrementValue = 1;
      }
      if (!this.localValue) {
        this.localValue = incrementValue;
        return;
      }
      this.localValue += incrementValue;
    },
    decrement() {
      let incrementValue = +this.incrementValue;
      if (Number.isNaN(incrementValue) || !incrementValue) {
        incrementValue = 1;
      }
      if (!this.localValue) {
        this.localValue = 0 - incrementValue;
        return;
      }
      this.localValue -= incrementValue;
    },
  },
};
</script>

<style lang="stylus">
.simple-slider-wrapper
  position: relative
  padding: 10px 12px 0
  font-size: 14px
  .v-subheader
    position: absolute
    top: -2px
    left: 8px
    height: 18px
    padding: 0
    font-size: 12px
    &.slot-left
      top: -13px
  .v-input__slot
    margin-bottom: 0
  .number-shift-buttons
    padding-top: 4px
    .v-icon:first-child
      margin-bottom: -4px

.simple-slider
  &.slot-left
    .v-slider--horizontal
      margin-left: 0
    .v-messages
      margin-left: -73px
  &.error--text
    .v-slider__track-fill
      background-color: #d44942 !important;
      border-color: #d44942 !important;
  &-range
    margin-top: 16px
  .v-input
    margin-top: -19px
    font-size: 14px
    input
      padding: 10px 0 6px
      text-align: center
  .v-input__append-outer, .v-input__prepend-outer
    margin-top: 0
    margin-bottom: 0
  .v-input__append-outer
    margin-left: 0 !important
  .v-slider--horizontal
    margin-right: 4px
    margin-left: 4px
    .v-slider__track-container
      height: 3px
      &::before, &::after
        content: ''
        position: absolute
        top: 0
        left: -4px
        display: block
        width: 4px
        height: 3px
        //background: #416FC8
      &::after
        left: auto
        right: -4px
        background-color: rgb(233, 235, 239)
  .v-slider__thumb-container:hover, .v-slider__thumb-container--active
    .v-slider__thumb:before
      opacity: .3;
  .v-slider__thumb-container--active
    .v-slider__thumb:before
      transform: scale(1.4) !important;
  .v-slider__thumb
    width: 14px
    height: 14px
    border: 3px solid #416FC8
    background-color: white !important
    &:before
      width: 26px
      height: 26px
      left: -9px
      top: -9px
      opacity: 0

.slider-dash
  display: inline-block
  margin: -6px 12px 0 0
</style>
