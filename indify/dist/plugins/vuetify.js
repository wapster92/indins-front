import Vue from 'vue'
import VueTheMask from 'vue-the-mask'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,

const theme = JSON.parse(`<%= JSON.stringify(options) %>`);

Vue.use(Vuetify);
Vue.use(VueTheMask);

export default ctx => {
  const
    vuetify = new Vuetify({
      theme: {
        themes: {
          light: theme.light,
        },
      }
    });

  ctx.app.vuetify = vuetify;
  ctx.$vuetify = vuetify.framework;
}
