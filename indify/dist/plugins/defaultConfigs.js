import config from 'indify/dist/config/defaultConfig.js';
export default ({}, inject) => {
  inject('defaultConfig', config);
}
