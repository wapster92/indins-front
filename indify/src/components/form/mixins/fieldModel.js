export default {
  props: {
    value: {
      type: [String, Number, Array, Object, Boolean],
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
  },
  data() {
    return {
      unwatchSubform: null,
      localValue: null,
    };
  },
  computed: {
    localRules() {
      const rules = [...this.rules];
      if (this.required) {
        rules.push(
          v => this.isValidValue(v) || 'Поле обязательно к заполнению',
        );
      }
      return rules;
    },
  },
  watch: {
    localValue(val) {
      if (JSON.stringify(this.value) !== JSON.stringify(val)) {
        this.$emit('input', val);
      }
    },
    value: {
      immediate: true,
      handler(val, oldVal) {
        const type = this.$getType(val);
        if (type === 'Array' || type === 'Object') {
          if (JSON.stringify(val) === JSON.stringify(oldVal)) return;
        } else if (val === oldVal) {
          return;
        }
        this.localValue = val;
      },
      deep: true,
    },
  },
  methods: {
    isValidValue(value) {
      if (value === null || value === undefined) {
        return false;
      }
      switch (value.constructor) {
        case Array:
          return !!value.length;
        case Object:
          return !!Object.keys(value).length;
        case Number:
          return !Number.isNaN(value) && value !== Infinity && value !== 0;
        case String:
          return !!value.trim().length;
        default:
          return !!value;
      }
    },
  },
};
