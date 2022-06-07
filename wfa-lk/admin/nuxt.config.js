import { config } from 'dotenv-flow'
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
config({ purge_dotenv: true, silent: true })
const
    baseUrl = process.env.BASE_URL,
    backendOrigin = process.env.BACKEND_ORIGIN,
    bridgeOrigin = process.env.BRIDGE_ORIGIN;

module.exports = {
  build: {
    transpile: ['indify'],
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['ru'],
      }),
      new ESLintWebpackPlugin({
        extensions: ['.js', '.vue'],
      })
    ],
  },
  head: {
    title: 'RFO-online',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'INDINS Core v7'},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: baseUrl + '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700|Material+Icons'},
    ],
    script: [
      // {src: '/js/ckeditor/ckeditor.js'}
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
    ['core-auth', { entity: 'App\\Entity\\AdminUser' }],
    'cookie-universal-nuxt',
    'socket-bridge-client',
  ],
  socketBridge: {
    origin: bridgeOrigin
  },
  css: [
      '~/assets/css/index.stylus'
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
      origin: backendOrigin
    },
    project: {
      name: "RFO-online",
      logo: baseUrl + "/logo-min.svg",
      supportLink: "manager@indins.ru"
    }
  }
};
