import * as components from 'indify/src/components';
import formatter from "indify/src/helpers/formatter";
import textCutter from "indify/src/helpers/textCutter";
import Vue from 'vue';

// Не удалять - в последствии сделаем импорт по условию
// const
//   {readdirSync, statSync} = require("fs"),
//   path = require('path');
//
// const getAllComponents = (baseFolder) => {
//   let
//     components = {};
//   readdirSync(baseFolder)
//     .forEach(file => {
//       if (statSync(path.join(baseFolder, file)).isDirectory()) {
//         components = {
//           components,
//           ...getAllComponents(path.join(baseFolder, file))
//         }
//       } else if (/\.vue$/.test(file)) {
//         components[file] = require(path.join(baseFolder, file));
//       }
//     });
//   return components
// };

function install(vue) {
  if (install.installed || !components) return;
  install.installed = true;
  for (let key of Object.keys(components)) {
    Vue.component(key, components[key]);
  }
}
Vue.use({
  install,
});

Vue.filter('dynamicFilter', (value, name, ...args) => name ? Vue.filter(name)(value, ...args) : value);
Vue.filter('phone', formatter.formatPhone);
Vue.filter('number', formatter.formatNumber);
Vue.filter('date', formatter.formatDate);
Vue.filter('time', formatter.formatTime);
Vue.filter('dateTime', formatter.formatDateTime);
Vue.filter('fromNow', formatter.formatDateTimeFromNow);
Vue.filter('cut', textCutter);
Vue.filter('ucfirst', formatter.formatUCFirst);
Vue.filter('bool', (value, trueText, falseText, invalidText) => {
  if (value === true) {
    return trueText || 'Да';
  }
  if (value === false) {
    return falseText || 'Нет';
  }
  return invalidText;
});
