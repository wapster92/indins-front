import environment from 'dotenv-flow';

environment.config({purge_dotenv: true, silent: true})

const
  baseUrl = process.env.BASE_URL,
  backendOrigin = process.env.BACKEND_ORIGIN,
  browserBackendOrigin = process.env.BROWSER_BACKEND_ORIGIN,
  bridgeOrigin = process.env.BRIDGE_ORIGIN,
  browserBridgeOrigin = process.env.BROWSER_BRIDGE_ORIGIN;

module.exports = {
  /* loaders: [
     {
       test: /\.styl$/,
       loader: 'style-loader!css-loader!stylus-loader',
     },
   ],*/
  build: {
    extractCSS: {
      ignoreOrder: true
    },
    extend(config, ctx) {
      // Run ESLint on save
      /*if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }*/
    }
  },
  head: {
    title: 'TokenRank',
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/favicon/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5"
      },
      {
        rel: "shortcut icon",
        href: "/favicon/favicon.ico"
      }
    ],
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        name: "msapplication-TileColor",
        content: "#00aba9"
      },
      {
        name: "msapplication-config",
        content: "/favicon/browserconfig.xml"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      },
      { hid: 'keywords', name: 'keywords', content: 'TokenRank' },
      { hid: 'description', name: 'description', content: 'TokenRank' },
    ]
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
    'normalize.css/normalize.css',
    '~/assets/style/main.scss',
  ],
  buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
  ],
  styleResources: {
    scss: ['~/assets/style/_vars.scss']
  },

  xhr: {
    application: 'site',
    origin: backendOrigin,
    browserOrigin: browserBackendOrigin,
  },
  publicRuntimeConfig: {
    baseURL: browserBackendOrigin,
    baseName: 'TokenRank'
  }
};
