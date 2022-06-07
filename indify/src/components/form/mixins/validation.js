export default {
  inject: {
    validators: {
      default: null,
    },
    addValidator: {
      default: null,
    },
    removeValidator: {
      default: null,
    },
    setValidatorValue: {
      default: null,
    },
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    errorMessages: {
      type: [String, Array],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    requiredMessage: {
      type: String,
      default: 'Поле обязательно к заполнению',
    },
  },
  data() {
    return {
      errorList: [],
      errorMessagesCache: [],
    };
  },
  methods: {
    validate() {
      const result = [
        this.validateErrorMessages(),
        this.validateRules(),
        this.validateRequired(),
      ];
      return !result.includes(false);
    },
    validateErrorMessages() {
      const msgType = this.$getType(this.errorMessages);
      if (msgType === 'String' && this.errorMessages) {
        return false;
      }
      return msgType !== 'Array' || this.errorMessages.length === 0;
    },
    validateRules() {
      let result = true;
      let { rules } = this;
      if (this.$getType(this.localRules) === 'Array') rules = this.localRules;

      if (this.$getType(rules) === 'Array' && rules.length !== 0) {
        for (const rule of rules) {
          const type = this.$getType(rule);
          if (type === 'Function') {
            const ruleValue = rule(this.localValue);
            if (!ruleValue || this.$getType(ruleValue) === 'String') {
              result = false;
            }
          }
          if (type === 'Boolean' && !rule) {
            result = false;
          }
          if (type === 'String' && rule) {
            result = false;
          }
        }
      }
      return result;
    },
    validateRequired() {
      if (this.required && this.hasNoValue(this.localValue)) {
        this.addErrorMessage(this.requiredMessage);
        return false;
      }
      return true;
    },
    addErrorMessage(message) {
      if (!this.errorList.includes(message) && this.$getType(message) === 'String') {
        this.errorList.push(message);
      }
    },
    removeErrorMessage(arg) {
      const type = this.$getType(arg);
      if (type === 'String') {
        const index = this.errorList.findIndex(msg => msg === arg);
        if (index !== -1) this.errorList.splice(index, 1);
      }
      if (type === 'Number') {
        this.errorList.splice(arg, 1);
      }
    },
    clearErrorMessages() {
      this.errorList.splice(0, this.errorList.length);
    },
    hasNoValue(value) {
      return (!value && value !== false)
        || (Array.isArray(value) && value.length === 0)
        || (this.$getType(value) === 'Object' && Object.keys(value).length === 0);
    },
  },
  watch: {
    name: {
      immediate: true,
      handler(val, oldVal) {
        if (
          val
          && this.$getType(this.validate).match('Function') !== null
          && this.validators
          && this.addValidator
        ) {
          this.addValidator(this.name, {
            label: this.label || this.placeholder,
            func: this.validate,
          });
          if (oldVal && this.removeValidator) this.removeValidator(oldVal);
        }
      },
    },
    errorMessages: {
      immediate: true,
      handler(val) {
        const type = this.$getType(val);
        if (type === 'String') {
          if (val) {
            this.addErrorMessage(val);
            this.errorMessagesCache.push(val);
          }
          if (
            this.errorMessagesCache.length !== 0
            && !this.errorMessagesCache.includes(val)
          ) {
            this.removeErrorMessage(this.errorMessagesCache[0]);
            this.errorMessagesCache = [];
          }
        }
        if (type === 'Array') {
          if (val.length === 0) {
            this.clearErrorMessages();
          }
          for (const message of val) {
            this.addErrorMessage(message);
            if (!this.errorMessagesCache.includes(message)) {
              this.errorMessagesCache.push(message);
            }
          }
          for (const message of this.errorMessagesCache) {
            if (!val.includes(message)) {
              this.removeErrorMessage(message);
            }
          }
          this.errorMessagesCache = val;
        }
      },
    },
    localValue: {
      deep: true,
      handler(val) {
        if (!this.hasNoValue(val)) {
          this.removeErrorMessage(this.requiredMessage);
        }
        if (this.name && this.$getType(this.setValidatorValue).match('Function')) {
          this.setValidatorValue(this.name, val);
        }
      },
    },
  },
  beforeDestroy() {
    if (!this.removeValidator) return;
    this.removeValidator(this.name);
  },
};
