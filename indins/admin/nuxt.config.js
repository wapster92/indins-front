const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const
  baseUrl = process.env.NODE_ENV === 'production' ? '/admin' :  '',
  backendOrigin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000',
  bridgeOrigin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:7000';
console.log(backendOrigin)
module.exports = {
  build: {
    transpile: ['indify'],
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['ru'],
      }),
      new ESLintWebpackPlugin({
        extensions: ['.js', '.vue'],
      }),
    ],
    babel: {
      presets: [
        "@nuxt/babel-preset-app"
      ],
      plugins: [
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
      ],
    },
  },
  head: {
    title: 'ИНДИНС',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'INDINS'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: baseUrl + '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700|Material+Icons'},
    ],
    script: [
      {src: (baseUrl || '/') + './js/ckeditor/ckeditor.js'}
    ],
  },
  router: {
    middleware: [],
    base: baseUrl + '/',
  },
  loading: {
    color: '#416FC8',
    height: '3px',
  },
  modules: [
    'core-xhr',
    'indify',
    'core-auth',
    'cookie-universal-nuxt',
    'socket-bridge-client',
  ],
  socketBridge: {
    origin: bridgeOrigin
  },
  css: [
    '~/assets/style/app.styl'
  ],
  plugins: [
    '~/plugins/fieldValidators.js',
  ],
  indify: {
    theme: {
      light: {
        primary: "#F3F5F8",
        secondary: "#3D3D3D",
        accent: "#019D80",
        error: "#D44942",
        info: "#416FC8",
        success: "#FDC353",
        warning: "#BA97E8",
        "dark-secondary": "#1F1F1F",
        "light-accent": "#DADADA",
        "light2-accent": "#C1C1C1",
        "extra-light-accent": "#EEE",
        "light-error": "#FCF1F0",
        "light-info": "#E6F6FC",
        "placeholder-color": "#7A7A7A",
      },
    }
  },
  xhr: {
    application: 'admin',
    origin: backendOrigin
  },
  coreAuth: {
    api: {
      origin: backendOrigin,
      browserOrigin: backendOrigin,
    },
    project: {
      name: "ИНДИНС",
      logo: baseUrl + "/logo-min.svg",
      supportLink: "manager@indins.ru"
    }
  },
};
