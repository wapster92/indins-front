import Vue from 'vue';

Vue.use(() => {
  Vue.prototype.$loader = {
    start() {},
    stop() {},
  };
});
