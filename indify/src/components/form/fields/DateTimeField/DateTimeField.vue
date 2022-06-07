<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="isCompact ? 130 : 8"
    :disabled="readonly"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <DateTimeFieldInput
        v-model="inputValue"
        :parent-value="parentValue"
        :color="computedColor"
        :label="label"
        :placeholder="placeholder"
        :time-only="timeOnly"
        :time="time"
        :range="range"
        :input-type="inputType"
        :error-list="errorList"
        :rules="rules"
        :required="required"
        :required-message="requiredMessage"
        :readonly="readonly"
        :turn-off-text-field="turnOffTextField"
        :output-format="outputFormat"
        :on="on"
        @show-date-picker="showDatePicker = true"
        @show-time-picker="showTimePicker = true"
        @reset-dates="resetDates"
        @set-date="setDate($event.value, $event.check, $event.i)"
        @set-time="setTime($event.number, $event.check, $event.i)"
        @swap-dates="swapDates"
      />
    </template>
    <div class="date-time-wrapper v-menu-popup">
      <DateTimeFieldTicks
        :show-time-ticks="showTimeTicks"
        :show-time-picker="showTimePicker"
        @time-change="timePickerValue = $event"
      />
      <v-date-picker
        v-if="!timeOnly"
        v-show="showDatePicker"
        v-model="datePickerValue"
        no-title
        scrollable
        first-day-of-week="1"
        locale="ru"
        :color="computedColor"
        @input="setDate($event, true)"
      />
      <v-slider
        v-if="time || (timeOnly && (range || !timeTextMode))"
        v-show="showTimePicker"
        v-model="timePickerValue"
        class="pa-2 time-slider"
        min="0"
        max="1439"
        :color="computedColor"
        :thumb-size="10"
        :step="timeStep"
        track-color="rgba(0, 0, 255, 0.3)"
        hide-details
      >
        <template #prepend>
          <TextInput
            v-model="currentTime"
            v-mask="'##:##'"
            class="pt-0 timepicker-input"
            hide-details
            input-type="standart"
          />
        </template>
        <template #append>
          <v-btn
            icon
            small
          >
            <v-icon
              size="18"
              :color="timeIsValid ? computedColor : 'gray'"
              @click="setTime(timePickerValue, true)"
            >
              check
            </v-icon>
          </v-btn>
        </template>
      </v-slider>
      <DateTimeFieldTextVariant
        :time-only="timeOnly"
        :time-text-mode="timeTextMode"
        :range="range"
        @reset-time="resetTime"
        @set-time="setTime($event)"
        @day-change="$emit('day-change', $event)"
      />
      <DateTimeFieldTimeIncrement
        v-if="showTimeButtons && showTimePicker"
        v-model="timePickerValue"
        :time-step="timeStep"
        :color="computedColor"
      />
    </div>
  </v-menu>
</template>
<script>
import moment from 'moment';
import validation from '../../mixins/validation';
import DateTimeFieldTicks from './DateTimeFieldTicks';
import DateTimeFieldTextVariant from './DateTimeFieldTextVariant';
import DateTimeFieldTimeIncrement from './DateTimeFieldTimeIncrement';
import DateTimeFieldInput from './DateTimeFieldInput';

export default {
  name: 'DateTimeField',
  components: {
    DateTimeFieldInput,
    DateTimeFieldTimeIncrement,
    DateTimeFieldTextVariant,
    DateTimeFieldTicks,
  },
  mixins: [validation],
  props: {
    value: {
      type: [String, Array, null],
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Boolean,
      default: false,
    },
    timeOnly: {
      type: Boolean,
      default: false,
    },
    timeTextMode: {
      type: Boolean,
      default: false,
    },
    timeStep: {
      type: Number,
      default: 30,
    },
    turnOffTextField: {
      type: Boolean,
      default: false,
    },
    showTimeButtons: {
      type: Boolean,
      default: false,
    },
    showTimeTicks: {
      type: Boolean,
      default: false,
    },
    timeTickStep: {
      type: [Number, String],
      validator: value => 24 % +value === 0 && +value !== 1 && +value !== 0,
      default: 2,
    },
    color: {
      type: String,
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
  },
  data() {
    return {
      menu: false,
      datePickerValue: null,
      timePickerValue: null,
      inputValue: null,
      unwatchSubform: null,
      showDatePicker: false,
      showTimePicker: false,
      currentIndex: 0,
      dates: ['', ''],
      times: ['', ''],
      currentTime: '00:00',
      parentValue: null,
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
    computedColor() {
      return this.color || this.$defaultConfig.color;
    },
    localValue() {
      if (this.range) {
        if (this.timeOnly) return this.times;
        if (this.time) {
          const result = [];
          for (let i = 0; i < this.dates.length; i++) {
            result.push(`${this.dates[i]} ${this.times[i]}`);
          }
          return result;
        }
        return this.dates;
      }

      if (this.timeOnly) return this.times[0];
      if (this.time) return `${this.dates[0]} ${this.times[0]}`;
      return this.dates[0];
    },
    inputFormat() {
      if (this.timeOnly) return 'HH:mm';
      let format = 'YYYY-MM-DD';
      if (this.time) format += ' HH:mm';
      return format;
    },
    outputFormat() {
      if (this.timeOnly) return 'HH:mm';
      let outputFormat = 'DD.MM.YYYY';
      if (this.time) outputFormat += ' HH:mm';
      return outputFormat;
    },
    timeIsValid() {
      return this.$getType(this.currentTime === 'String')
        && this.currentTime.length === 5;
    },
    needsSwap() {
      if (!this.range) return false;
      const first = moment(this.localValue[0], this.inputFormat);
      const second = moment(this.localValue[1], this.inputFormat);
      return first.isValid() && second.isValid() && +first > +second;
    },
  },
  watch: {
    localValue(value) {
      if (!value || !this.needsSwap) {
        this.$emit('input', value);
      }
      this.formatDate(value);
    },
    value: {
      immediate: true,
      handler(value) {
        if (
          value === this.localValue
          || JSON.stringify(value) === JSON.stringify(this.localValue)
        ) return;
        if (!value) return this.resetDates();
        const type = this.$getType(value);
        if (type === 'String') {
          this.parentValue = { value, format: this.inputFormat };
          return;
        }
        if (type === 'Array') {
          if (value.length === 0) return this.resetDates();
          for (let i = 0; i < value.length; i++) {
            const date = moment(value[i], this.inputFormat);
            this.setDate(date.format('YYYY-MM-DD'), false, i);
            this.setTime(
              date.hours() * 60 + date.minutes(),
              false,
              i,
            );
          }
          this.parentValue = { value, format: this.inputFormat };
        }
      },
    },
    timePickerValue: {
      immediate: true,
      handler(value) {
        const minutes = value % 60;
        const hours = Math.floor(value / 60);
        this.currentTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      },
    },
    currentTime(value) {
      this.setTimePickerValue(value);
    },
    menu(val) {
      if (val) return;
      this.currentIndex = 0;
      this.showTimePicker = false;
      this.showDatePicker = false;
      if (this.dates[0] && !this.times[0]) this.setTime(0, false, 0);
      if (this.dates[1] && !this.times[1]) this.setTime(0, false, 1);
      if (this.range) this.swapDates();
    },
  },
  methods: {
    resetDates() {
      this.dates[0] = '';
      this.dates[1] = '';
      this.times[0] = '';
      this.times[1] = '';
      this.inputValue = '';
    },
    setTimePickerValue(val) {
      if (!val) return;
      const parts = val.split(':');
      if (parts.length < 2 || val.length !== 5) return;
      const [hours, minutes] = parts;
      this.timePickerValue = +hours * 60 + +minutes;
    },
    formatDate(value) {
      const type = this.$getType(value);
      if (type === 'Array') {
        this.inputValue = value
          .reduce((acc, date) => {
            const currentDate = moment(date, this.inputFormat);
            if (!currentDate.isValid()) return `${acc}`;
            return `${acc + currentDate
              .format(this.outputFormat)} - `;
          }, '')
          .slice(0, -3);
      }
      if (type === 'String') {
        const currentDate = moment(value, this.inputFormat);
        if (!currentDate.isValid()) {
          this.inputValue = '';
          return;
        }
        this.inputValue = currentDate.format(this.outputFormat);
      }
    },
    setDate(value, check, i) {
      const index = i === undefined ? this.currentIndex : i;
      this.dates.splice(index, 1, value);
      if (check) this.checkForClose();
    },
    setTime(number, check, i) {
      if (!this.timeIsValid) return;
      const index = i === undefined ? this.currentIndex : i;
      const hours = Math.floor(number / 60);
      const minutes = number % 60;
      const value = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      this.times.splice(index, 1, value);
      if (check) this.checkForClose();
    },
    resetTime() {
      this.inputValue = '';
      this.times[0] = '';
    },
    swapDates() {
      let start; let
        end;
      if (this.timeOnly) {
        start = moment(this.times[0], 'HH:mm');
        end = moment(this.times[1], 'HH:mm');
      } else if (this.time) {
        start = moment(`${this.dates[0]} ${this.times[0]}`, this.inputFormat);
        end = moment(`${this.dates[1]} ${this.times[1]}`, this.inputFormat);
      } else {
        start = moment(this.dates[0], 'YYYY-MM-DD');
        end = moment(this.dates[1], 'YYYY-MM-DD');
      }
      if (start.isValid() && end.isValid() && +end < +start) {
        this.dates.splice(0, 0, this.dates.pop());
        this.times.splice(0, 0, this.times.pop());
      }
    },
    checkForClose() {
      if (
        (this.time && !this.timeOnly && !this.showDatePicker)
        || this.timeOnly
        || (!this.time && !this.timeOnly)
      ) {
        this.currentIndex += 1;
      }
      if (this.range && this.currentIndex >= 2) {
        return this.close();
      } if (!this.range && this.currentIndex >= 1) {
        return this.close();
      }
      if (this.time && !this.timeOnly) {
        this.showDatePicker = !this.showDatePicker;
        this.showTimePicker = !this.showTimePicker;
        return;
      }
      this.datePickerValue = null;
      this.timePickerValue = null;
    },
    close() {
      this.menu = false;
    },
  },
};
</script>

<style lang="stylus">
.v-menu-popup
  background: white

.date-time-wrapper
  position: relative
  overflow: hidden
  .timepicker-input
    width: 61px
    height: 22px
  .v-input__prepend-outer
    margin-top: 0
    margin-right: 0!important
  .v-slider__thumb-container--active .v-slider__thumb::before
    transform: scale(0.8)!important

  .v-slider__thumb-container:hover .v-slider__thumb::before
    transform: scale(0.7)
</style>
