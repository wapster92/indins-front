import { config } from 'dotenv-flow'
config({ purge_dotenv: true, silent: true })
const
  baseUrl = process.env.BASE_URL,
  backendOrigin = process.env.BACKEND_ORIGIN,
  bridgeOrigin = process.env.BRIDGE_ORIGIN,
  hostUrl =  process.env.HOST_URL;
export default {
  router: {
    prefetchLinks: false,
    middleware: ['settings', 'auth'],
    base: baseUrl + '/',
  },
  loaders: [
    {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader',
    },
  ],
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: ' РФО',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileColor',  content: '#da532c' },
      { name: 'msapplication-config',  content: '/favicon/browserconfig.xml' },
      { name: 'theme-color',  content: '#ffffff' },
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      { rel: 'icon', sizes: '180x180', type: 'image/png', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', sizes: '192x192', type: 'image/png', href: '/favicon/android-chrome-192x192.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon/favicon-16x16.png' },
      { rel: 'manifest', href: '/favicon/site.webmanifest' },
      { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style/app.styl'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/auth.js',
    {
      src: '~/plugins/notifications.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vee-validate.js',
      mode: 'client'
    },
    /*{ src: './plugins/carousel.js'}*/
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg-sprite',
  ],
  svgSprite: {
    // manipulate module options
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'core-xhr',
    'cookie-universal-nuxt',
    'socket-bridge-client',
  ],
  socketBridge: {
    origin: bridgeOrigin,
  },
  styleResources: {
    stylus: './assets/style/main/_vars.styl'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: backendOrigin
  },
  xhr: {
    application: 'site',
    origin: backendOrigin
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: process.env.NODE_ENV === 'production',
  },
  publicRuntimeConfig: {
    rfoUrl: hostUrl
  }
}
