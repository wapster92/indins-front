import environment from 'dotenv-flow';

environment.config({ purge_dotenv: true, silent: true })
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const
    baseUrl = process.env.BASE_URL,
    backendOrigin = process.env.BACKEND_ORIGIN,
    browserBackendOrigin = process.env.BROWSER_BACKEND_ORIGIN,
    bridgeOrigin = process.env.BRIDGE_ORIGIN,
    browserBridgeOrigin = process.env.BROWSER_BRIDGE_ORIGIN;

module.exports = {
  build: {
    analyze: true,
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
      presets({ isServer }) {
        return [
          [ require.resolve('@nuxt/babel-preset-app'), {
            targets: isServer ? { node: 'current' }  : {browsers: ["last 2 versions", "last 1 year", "not safari 12.1", "not IE 11"]}
          }]
        ]
      },
      /*presets: [
        "@nuxt/babel-preset-app"
      ],*/
      plugins: [
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
      ],
    },
    cache: true,
    hardSource: true,
    extend(config, { isClient }) {
      config.devtool = isClient ? 'eval-source-map' : 'inline-source-map';
    },
    extractCSS: false,
    optimization :{
      splitChunks: {
        chunks: 'all',
        maxSize : 256000
      }
    }
  },
  head: {
    title: 'Core',
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
  css: [],
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
      name: "ИНДИНС",
      logo: baseUrl + "/logo-min.svg",
      supportLink: "manager@indins.ru"
    }
  }
};
