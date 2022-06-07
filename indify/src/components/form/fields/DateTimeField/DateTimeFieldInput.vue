<template>
  <TextInput
    v-mask="mask"
    v-bind="$attrs"
    :color="color"
    :value="localValue"
    :label="label"
    :placeholder="inputPlaceholder"
    :append-icon="appendIcon"
    :error-messages="errorList"
    :rules="localRules"
    :readonly="readonly || turnOffTextField"
    :input-type="inputType"
    class="simple-date"
    @click.native="open(on, $event)"
    @click:append="open(on, $event)"
    @input="setValue($event)"
  />
</template>

<script>
import moment from "moment";

export default {
  name: "DateTimeFieldInput",
  props: {
    value: {
      type: [String, null],
      default: null,
    },
    parentValue: {
      type: [Object, null],
      default: null,
    },
    on: {
      type: Object,
      default: () => ({}),
    },
    color: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
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
    inputType: {
      type: [String, null],
      default: null,
      validator: value => {
        const types = ['compact', 'standart'];
        return !value || types.includes(value);
      },
    },
    errorList: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
    requiredMessage: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    turnOffTextField: {
      type: Boolean,
      default: false,
    },
    outputFormat: {
      type: String,
      default: 'DD.MM.YYYY',
    },
  },
  data() {
    return {
      mask: '##',
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    masks() {
      return {
        // Hours
        H: /[0-2]/,
        h: /[0-3]/,
        // Minutes
        T: /[0-5]/,
        // Months
        M: /[01]/,
        m: /[0-2]/,
        l: /[13578]/,
        n: /[02]/,
        // Days
        D: /[0-3]/,
        d: /[01]/,
        j: /0/,
        F: /[0-2]/,
        f: /[0-8]/,
        // Any Number,
        '#': /\d/,
      };
    },
    inputPlaceholder() {
      if (this.placeholder) return this.placeholder;
      let defaultText = '';
      if (!this.timeOnly) defaultText += 'ДД.ММ.ГГГГ ';
      if (this.time || this.timeOnly) defaultText += 'ЧЧ:ММ';
      return this.range ? `${defaultText} - ${defaultText}` : defaultText;
    },
    validInputLength() {
      if (this.timeOnly) return this.range ? 13 : 5;
      if (this.time) return this.range ? 35 : 16;
      return this.range ? 23 : 10;
    },
    currentInputType() {
      return this.inputType || (this.$vuetify.breakpoint.smAndDown
        ? 'standart'
        : 'compact');
    },
    isCompact() {
      return this.currentInputType === 'compact';
    },
    appendIcon() {
      if (!this.isCompact) {
        return this.timeOnly ? 'schedule' : 'event'
      } return ''
    },
    localRules() {
      const rules = [...this.rules];
      if (this.required) {
        rules.push(v => this.isValidValue(v));
      }
      return rules;
    },
  },
  watch: {
    time: {
      immediate: true,
      handler() {
        this.formatMask(this.inputValue);
      },
    },
    timeOnly: {
      immediate: true,
      handler() {
        this.formatMask(this.inputValue);
      },
    },
    parentValue: {
      immediate: true,
      handler(parentValue) {
        if (!parentValue || !parentValue.value) return;
        const type = this.$getType(parentValue.value);
        if (type === 'String') {
          this.setValue(parentValue.value, parentValue.format);
        }
        if (type === 'Array') {
          this.formatMask('');
        }
      },
    },
  },
  methods: {
    isValidValue() {
      return (this.localValue && this.localValue.length === this.validInputLength)
        || this.requiredMessage;
    },
    setValue(value, format) {
      if (!value) {
        this.$emit('reset-dates');
        return;
      }
      this.formatMask(value);
      if (typeof value !== 'string' || value.length < this.validInputLength) return;
      if (!format) format = this.outputFormat;
      if (this.range) {
        const dates = value.split(' - ');
        for (let i = 0; i < dates.length; i++) {
          const date = moment(dates[i], format);
          if (!this.timeOnly) this.setDate(date.format('YYYY-MM-DD'), false, i);
          if (this.time || this.timeOnly) {
            this.setTime(
              date.hours() * 60 + date.minutes(),
              false,
              i,
            );
          }
        }
        this.$emit('swap-dates');
        return;
      }
      const date = moment(value, format);
      if (!this.timeOnly) {
        this.setDate(date.format('YYYY-MM-DD'), false, 0);
      }
      if (this.time || this.timeOnly) {
        this.setTime(
          date.hours() * 60 + date.minutes(),
          false,
          0,
        );
      }
    },
    formatMask(value) {
      const result = { mask: '', tokens: {} };

      Object.keys(this.masks).forEach(key => {
        result.tokens[key] = { pattern: this.masks[key] };
      });

      value = value ? value.replace(/\D/g, '') : '';
      if (this.timeOnly) {
        this.setTimeMask(result, value, 0);
      } else {
        this.setDayMask(result, value, 0);
        this.setMonthMask(result, value, 2);
        if (this.time) {
          result.mask += ' ';
          this.setTimeMask(result, value, 8);
        }
      }

      if (!this.range) {
        this.mask = result;
        return;
      }

      result.mask += ' - ';
      if (this.timeOnly) {
        this.setTimeMask(result, value, 4);
      } else if (this.time) {
        this.setDayMask(result, value, 12);
        this.setMonthMask(result, value, 14);
        result.mask += ' ';
        this.setTimeMask(result, value, 20);
      } else {
        this.setDayMask(result, value, 8);
        this.setMonthMask(result, value, 10);
      }
      this.mask = result;
    },
    setDayMask(data, value, charPosition) {
      if (value.charAt(charPosition) === '3') {
        data.mask += 'Dd';
      } else {
        data.mask += 'D#';
      }
    },
    setMonthMask(data, value, charPosition) {
      const days = value.slice(charPosition - 2, charPosition);
      if (days === '31') {
        if (value.charAt(charPosition) === '1') {
          data.mask += '.Mn.####';
        } else {
          data.mask += '.Ml.####';
        }
        return;
      }
      if (value.charAt(charPosition) === '1') {
        data.mask += '.Mm.####';
      } else {
        data.mask += '.M#.####';
      }
    },
    setTimeMask(data, value, charPosition) {
      if (value.charAt(charPosition) === '2') {
        data.mask += 'Hh:T#';
      } else {
        data.mask += 'H#:T#';
      }
    },
    // tryOpen(on, event) {
    //   if (!this.turnOffTextField && !this.isCompact) return;
    //   this.open(on, event);
    // },
    open(on, event) {
      if (this.$getType(on) === 'Object' && this.$getType(on.click) === 'Function') {
        on.click(event);
      }
      if (!this.timeOnly) {
        this.$emit('show-date-picker');
      } else {
        this.$emit('show-time-picker');
      }
    },
    setDate(value, check, i) {
      this.$emit('set-date', { value, check, i });
    },
    setTime(number, check, i) {
      this.$emit('set-time', { number, check, i });
    },
  },
}
</script>
