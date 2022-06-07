import { config } from 'dotenv-flow'
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

config({ purge_dotenv: true, silent: true })
const
    baseUrl = process.env.BASE_URL,
    backendOrigin = process.env.BACKEND_ORIGIN,
    browserBackendOrigin = process.env.BROWSER_BACKEND_ORIGIN,
    bridgeOrigin = process.env.BRIDGE_ORIGIN,
    browserBridgeOrigin = process.env.BROWSER_BRIDGE_ORIGIN;


module.exports = {
  build: {
    transpile: ['indify'],
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['ru'],
      }),
      /*new ESLintWebpackPlugin({
        extensions: ['.js', '.vue'],
      })*/
    ],
    babel: {
      // presets: [
      //   "@nuxt/babel-preset-app"
      // ],
      plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ],
    },
    cache: false,
    hardSource: false,
    extend(config, { isClient }) {
      config.devtool = isClient ? 'eval-source-map' : 'inline-source-map';
    },
  },
  head: {
    title: 'Server',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'INDINS Core v7' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: baseUrl + '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700|Material+Icons' },
    ],
    script: [],
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
    ['core-nuxt-errors-handler', {
      '404': {log: true}
    }],
  ],
  socketBridge: {
    origin: bridgeOrigin,
    browserOrigin: browserBridgeOrigin,
  },
  css: [
      '~/assets/style/app.styl'
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
    origin: backendOrigin,
    browserOrigin: browserBackendOrigin,
  },
  coreAuth: {
    api: {
      origin: backendOrigin,
      browserOrigin: browserBackendOrigin,
    },
    project: {
      name: "Server",
      logo: baseUrl + "/logo-min.svg",
      supportLink: "manager@indins.ru"
    }
  },
  plugins: [
    { src: '~/plugins/notifications.js', ssr: false }
  ]
};
