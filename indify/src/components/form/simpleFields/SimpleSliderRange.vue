<template>
  <div
    class="simple-slider-wrapper simple-slider-range-wrapper"
  >
    <v-subheader
      v-if="label"
      :class="{ 'slot-left': slotLeft }"
    >
      {{ label }}
    </v-subheader>
    <v-range-slider
      v-model="dataRange"
      v-bind="$attrs"
      :class="{'slot-left': slotLeft}"
      :max="max"
      :min="min"
      :step="step"
      :thumb-label="thumbLabel"
      :color="computedColor"
      :rules="rules"
      :error-messages="errorList"
      :readonly="readonly"
      :hide-details="!showErrors"
      track-color="#E9EBEF"
      class="align-center simple-slider simple-slider-range pa-0 ma-0"
    >
      <template
        v-if="slotLeft"
        #prepend
      >
        <v-text-field
          v-model.number="firstInput"
          v-mask="'#######'"
          :style="textFieldStyles"
          :rules="textFieldRules"
          :color="computedColor"
          :readonly="readonly"
          class="pt-0 mr-3 mb-3 f-14"
          single-line
          hide-details
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment(0)"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement(0)"
              >
                keyboard_arrow_down
              </v-icon>
            </div>
          </template>
        </v-text-field>
        <span class="slider-dash">&ndash;</span>
        <v-text-field
          v-model.number="lastInput"
          v-mask="'#######'"
          :style="textFieldStyles"
          :rules="textFieldRules"
          :color="computedColor"
          :readonly="readonly"
          class="pt-0 mr-3 mb-3 f-14"
          single-line
          hide-details
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment(1)"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement(1)"
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
          v-model.number="firstInput"
          v-mask="'#######'"
          :style="textFieldStyles"
          :rules="textFieldRules"
          :color="computedColor"
          :readonly="readonly"
          class="pt-0 mx-3 mb-3 f-14"
          single-line
          hide-details
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment(0)"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement(0)"
              >
                keyboard_arrow_down
              </v-icon>
            </div>
          </template>
        </v-text-field>
        <span class="slider-dash">&ndash;</span>
        <v-text-field
          v-model.number="lastInput"
          v-mask="'#######'"
          :style="textFieldStyles"
          :rules="textFieldRules"
          :color="computedColor"
          :readonly="readonly"
          class="pt-0 mb-3 f-14"
          single-line
          hide-details
        >
          <template #append-outer>
            <div class="number-shift-buttons">
              <v-icon
                x-small
                @click="increment(1)"
              >
                keyboard_arrow_up
              </v-icon>
              <v-icon
                x-small
                @click="decrement(1)"
              >
                keyboard_arrow_down
              </v-icon>
            </div>
          </template>
        </v-text-field>
      </template>
    </v-range-slider>
  </div>
</template>

<script>
import validation from '../mixins/validation';

export default {
  name: 'SimpleSliderRange',
  mixins: [validation],
  props: {
    value: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    thumbLabel: {
      type: [Boolean, String],
      default: false,
    },
    slotLeft: {
      type: Boolean,
      default: false,
    },
    slotRight: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'В компонент SimpleSliderRange должен быть передан массив с 2мя значениями типа Number',
    },
    max: {
      type: [String, Number],
      default: 100,
    },
    min: {
      type: [String, Number],
      default: 0,
    },
    step: {
      type: [String, Number],
      default: 1,
    },
    color: {
      type: String,
      default: '',
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
      dataRange: [0, 100],
      firstInput: 0,
      lastInput: 100,
      textFieldWidth: '',
      localRules: {
        required: value => !!value || '!',
        numberValidate: value => !Number.isNaN(value) || 'Не число.',
      },
    };
  },
  computed: {
    computedColor() {
      return this.color || 'info';
    },
    textFieldStyles() {
      return { width: this.textFieldWidth };
    },
    textFieldRules() {
      return [this.localRules.required, this.localRules.numberValidate];
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (newVal === undefined || newVal === null) return;
        if (!Number.isNaN(newVal[0])) {
          this.firstInput = newVal[0];
          this.dataRange[0] = newVal[0];
        } else {
          return console.error('SimpleSliderRange: первое зачение в массиве не число');
        }

        if (!Number.isNaN(newVal[1])) {
          this.lastInput = newVal[1];
          this.dataRange[1] = newVal[1];
        } else {
          return console.error('SimpleSliderRange: второе зачение в массиве не число');
        }

        if (newVal.length < 2) {
          console.error(this.message);
        } else if (newVal.length > 2) {
          console.warn(this.message);
        }
      },
    },

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

    dataRange(newVal) {
      this.$emit('input', newVal);
    },

    firstInput(newVal) {
      if (!Number.isNaN(newVal)) {
        if (newVal > this.lastInput || newVal < this.min) {
          const result = newVal > this.lastInput
            ? `Недопустимое значение! не более ${this.lastInput}`
            : `Недопустимое значение! не менее ${this.min}`;
          this.addErrorMessage(result);
        } else {
          this.clearDefaultValidation();
          this.dataRange.splice(0, 1, newVal);
        }
      }
    },

    lastInput(newVal) {
      if (!Number.isNaN(newVal)) {
        if (newVal > this.max || newVal < this.firstInput) {
          const result = newVal > this.lastInput
            ? `Недопустимое значение! не более ${this.max}`
            : `Недопустимое значение! не менее ${this.firstInput}`;
          this.addErrorMessage(result);
        } else {
          this.clearDefaultValidation();
          this.dataRange.splice(1, 1, newVal);
        }
      }
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
      this.textFieldWidth = `${width}px`;
    },
    clearDefaultValidation() {
      const index = this.errorList
        .findIndex(msg => msg.match('Недопустимое значение! не') !== null);
      if (index !== -1) {
        this.removeErrorMessage(index);
      }
    },
    increment(index) {
      let incrementValue = +this.incrementValue;
      if (Number.isNaN(incrementValue) || !incrementValue) {
        incrementValue = 1;
      }
      const indexes = {
        '0': 'firstInput',
        '1': 'lastInput',
      };
      if (!Array.isArray(this.dataRange) || this.dataRange.length < 2) {
        this.dataRange = [this.min, this.max];
      }
      this[indexes[index]] += incrementValue;
    },
    decrement(index) {
      let incrementValue = +this.incrementValue;
      if (Number.isNaN(incrementValue) || !incrementValue) {
        incrementValue = 1;
      }
      const indexes = {
        '0': 'firstInput',
        '1': 'lastInput',
      };
      if (!Array.isArray(this.dataRange) || this.dataRange.length < 2) {
        this.dataRange = [this.min, this.max];
      }
      this[indexes[index]] -= incrementValue;
    },
  },
};
</script>

<style lang="stylus">
.simple-slider-range-wrapper
  .number-shift-buttons
    padding-top: 4px
    .v-icon:first-child
      margin-bottom: -4px
.simple-slider.simple-slider-range .v-slider--horizontal .v-slider__track-container
  &::before, &::after
    content: ''
    position: absolute
    top: 0
    left: -4px
    display: block
    width: 4px
    height: 3px
    background: rgb(233, 235, 239)
  &:after
    left: auto
    right: -4px
</style>
