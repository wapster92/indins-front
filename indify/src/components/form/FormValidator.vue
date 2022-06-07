<template>
  <div class="form-validator-component">
    <slot :validate="validate" />
  </div>
</template>

<script>
export default {
  name: 'FormValidator',
  provide() {
    return {
      validators: this.validators,
      addValidator: (name, info) => this.$set(this.validators, name, info),
      removeValidator: name => this.$delete(this.validators, name),
      setValidatorValue: (name, value) => this.setValidatorValue(name, value),
    };
  },
  props: {
    additionalValidators: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      validators: {},
      customValidators: {},
    };
  },
  watch: {
    additionalValidators: {
      immediate: true,
      deep: true,
      handler(value) {
        this.customValidators = value || {};
      },
    },
  },
  methods: {
    validate() {
      let result = true;
      const fields = Object.keys(this.validators);
      const customFields = Object.keys(this.customValidators);
      this.$emit('before-validate', {
        fields,
        customFields,
        validators: { ...this.validators },
        customValidators: { ...this.customValidators },
      });

      const resultMap = {};
      fields.forEach(key => {
        const { func, label, value } = this.validators[key];
        if (this.$getType(func).match('Function') === null) return;
        const isValid = func();
        result = result && isValid;
        resultMap[key] = { label, isValid, value };
      });

      const customResultMap = {};
      customFields.forEach(key => {
        const { func, label, value } = this.customValidators[key];
        if (this.$getType(func).match('Function') === null) return;
        const isValid = func(value);
        result = result && isValid;
        resultMap[key] = { label, isValid, value };
      });

      this.$emit('after-validate', { resultMap, customResultMap });

      return result;
    },
    setValidatorValue(name, value) {
      if (this.validators[name]) {
        this.$set(this.validators[name], 'value', value);
      }
      if (this.customValidators[name]) {
        this.$set(this.customValidators[name], 'value', value);
      }
    },
  },
};
</script>
