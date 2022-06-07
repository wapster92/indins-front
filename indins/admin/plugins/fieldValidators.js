import Vue from 'vue';

Vue.use(() => {
  // eslint-disable-next-line no-useless-escape
  const emailRegExp = new RegExp(/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
  Vue.prototype.$fieldValidator = {
    defaultMaxLength: v => (v || '').length <= 255 || 'Превышена максимальная длина',
    metaDescriptionMaxLength: v => (v || '').length <= 158 || 'Превышена максимальная длина',
    email: v => emailRegExp.test(v) || 'Не верный формат',
    // eslint-disable-next-line no-mixed-operators
    phone: v => v && v.length === 18 || 'Не верный формат',
  };
});
