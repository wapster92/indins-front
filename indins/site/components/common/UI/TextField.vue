<template>
  <div :class="classList">
    <div class="i-text-field__control">
      <label
        v-if="label"
        :for="`input-${uId}`"
        class="i-text-field__control__label"
      >
        {{ label }}
      </label>
      <input
        :id="`input-${uId}`"
        :type="type"
        :value="localValue"
        :placeholder="placeholder"
        :name="name"
        class="i-text-field__control__input"
        @input="inputHandler"
        @blur="onBlur"
      >
      <div
        v-if="!valid"
        class="i-text-field__control__error-wrapper"
      >
        <div
          :class="errorClassList"
        >
          <span
            v-for="(error, index) in errorBucket"
            :key="error + index"
          >{{ error || errorMessage }}</span>
          <span v-if="!errorBucket.length">{{ errorMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',

  props: {
    errorMessage: {
      type: String,
      default: 'Обязательное поле',
    },
    label: {
      type: String,
      default: '',
    },
    noError: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: 'name',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },

  data: () => ({
    errorBucket: [],
    valid: true,
  }),

  computed: {
    uId() {
      // eslint-disable-next-line no-underscore-dangle
      return this._uid;
    },

    classList() {
      return {
        'i-text-field': true,
        'i-text-field_no-label': !this.label,
        'i-text-field_no-error-message': this.noError,
      };
    },

    errorClassList() {
      return {
        'i-text-field__control__error-message': true,
        'i-text-field__control__error-message_active': !this.valid,
      };
    },

    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

  methods: {
    inputHandler(event) {
      this.valid = true;

      if (event && event.target) {
        this.localValue = event.target.value;
      }
    },

    validate() {
      if (this.required) {
        this.valid = !!this.localValue?.trim();
      }

      if (this.rules && this.rules.length) {
        this.valid = this.checkRules(this.localValue);
      }

      return this.valid;
    },

    onBlur() {
      this.validate();
      if (this.type === 'tel' && this.validate()) {
        this.$emit('blur:phone');
      }
    },

    checkRules(value) {
      this.errorBucket = [];

      if (Array.isArray(this.rules)) {
        this.rules.forEach(rule => {
          const valid = typeof rule === 'function' ? rule(value) : rule;

          if (valid === false || typeof valid === 'string') {
            this.errorBucket.push(valid || '');
          }
        });
      }

      return this.errorBucket.length === 0;
    },
  },
};
</script>

<style scoped>

</style>
