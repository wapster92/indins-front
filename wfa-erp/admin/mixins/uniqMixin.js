import { Simple } from 'core-xhr';

export default {
  data: () => ({
    uniqMixinFieldMap: {},
    oldValueMapForUniqMixin: {},
  }),
  watch: {
    uniqMixinFields: {
      async handler(val, oldVal) {
        Object.keys(val).filter(key => val[key] !== oldVal[key]).forEach(key => {
          this.validateUniqField(key, val[key]).then(isValid => {
            this.$set(this.uniqMixinFieldMap, key, isValid);
          });
        });
      },
      deep: true,
    },
  },
  created() {
    Object.keys(this.uniqMixinFields).forEach(key => {
      this.$set(this.uniqMixinFieldMap, key, true);
      this.$set(this.oldValueMapForUniqMixin, key, this.uniqMixinFields[key]);
    });
  },
  methods: {
    validateUniqField(key, value) {
      if (this.oldValueMapForUniqMixin[key] === value) {
        return new Promise(resolve => resolve(true));
      }
      return this.$xhr
        .send(
          (new Simple(
            `/api/${this.$route.name}/check-${this.$utils.camelCaseToKebabCase(key)}`,
            { [key]: value },
            'POST',
          )).authorization(),
        )
        .then(resp => resp.data.success)
        .catch(reason => this.$store.dispatch('snack/error', reason.message || reason.error));
    },
  },
};
