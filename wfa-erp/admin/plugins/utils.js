import Vue from 'vue';

Vue.use(() => {
  Vue.prototype.$utils = {
    masks: {
      phone: '+# (###) ###-##-##',
    },
    camelCaseToKebabCase: str => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(),
  };
});
