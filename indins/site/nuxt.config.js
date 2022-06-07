const
    backendOrigin = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

module.exports = {
  modern: false,
  cache: true,
  render: {
    ssr: true,
    asyncScripts: false,
    resourceHints: false,
    compressor: false,
  },
  loaders: [
    {
      test: /\.styl$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader",
        },
        {
          loader: "stylus-loader",
          options: {
            sourceMap: false,
          }
        }
      ]
    },
  ],
  build: {

    // при установке на продакшен нужно переключить в true отвечает за извлечение css в отдельные файлы
    // мешает динамически подгружать стили без обновления страницы
    extractCSS: true,
    babel: {
      presets: [
        "@nuxt/babel-preset-app"
      ],
      plugins: [
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
      ],
    },
    // замедляет разработку, блокирует обновление страницы после изменений
    // в консоле и так видно ошибки
    /*extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    },*/
  },
  head: {
    title: "ИНДИНС",
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'INDINS'},
      {name:"msapplication-TileColor", content:"#ffffff"},
      {name:"msapplication-TileImage", content:"/favicon/ms-icon-144x144.png"},
      {name:"theme-color", content:"#ffffff"},
    ],
    script: [
      // Метрика
      {hid: 'stripe', src: '/js/yMetrika.js'},
      // Аналитика
      {hid: 'stripe', src: 'https://www.googletagmanager.com/gtag/js?id=UA-68325956-2', async: true},
      {hid: 'stripe', src: '/js/analytics.js', defer: true},
      {hid: 'stripe', src: '/js/autotrack.js', defer: true},
    ],
    link: [
      {
        rel: 'preload',
        as: 'font',
        crossorigin: 'anonymous',
        type: 'font/woff2',
        href: "/fonts/lato/lato-regular-webfont.woff2"
      },
      {
        rel: 'preload',
        as: 'font',
        crossorigin: 'anonymous',
        type: 'font/woff2',
        href: "/fonts/lato/lato-bold-webfont.woff2"
      },
      {rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico'},
      {rel: "apple-touch-icon", sizes: "57x57", href: "/favicon/apple-icon-57x57.png"},
      {rel: "apple-touch-icon", sizes: "60x60", href: "/favicon/apple-icon-60x60.png"},
      {rel: "apple-touch-icon", sizes: "72x72", href: "/favicon/apple-icon-72x72.png"},
      {rel: "apple-touch-icon", sizes: "76x76", href: "/favicon/apple-icon-76x76.png"},
      {rel: "apple-touch-icon", sizes: "114x114", href: "/favicon/apple-icon-114x114.png"},
      {rel: "apple-touch-icon", sizes: "120x120", href: "/favicon/apple-icon-120x120.png"},
      {rel: "apple-touch-icon", sizes: "144x144", href: "/favicon/apple-icon-144x144.png"},
      {rel: "apple-touch-icon", sizes: "152x152", href: "/favicon/apple-icon-152x152.png"},
      {rel: "apple-touch-icon", sizes: "180x180", href: "/favicon/apple-icon-180x180.png"},
      {rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon/android-icon-192x192.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon/favicon-32x32.png"},
      {rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon/favicon-96x96.png"},
      {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon/favicon-16x16.png"},
      {rel: "manifest", href: "/favicon/manifest.json"},
    ],
    /*noscript: [
      // Метрика
      { innerHTML: '<img src="https://mc.yandex.ru/watch/26690535" style="position:absolute; left:-9999px;" alt="" />' },
    ],
    __dangerouslyDisableSanitizers: ['noscript']*/
  },
  router: {
    prefetchLinks: false,
    middleware: 'clearRoute',
  },
  loading: {
    color: '#416FC8',
    height: '3px',
  },

  pageTransition: {
    name: 'page-fade',
    mode: 'out-in'
  },
  modules: [
    'calltracking',
    'core-xhr',
    'cookie-universal-nuxt',
     'vue-scrollto/nuxt',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    stylus: ['./assets/style/main/_vars.styl']
  },
  plugins: [
    '~/plugins/socialSharing.js',
    {src: '~/plugins/directives.js'},
    /*{
      src: '~/plugins/swiper.js',
      ssr: false
    },*/
  ],
  css: [
    /*'swiper/swiper.min.css',*/
    '~/assets/style/app.styl'
  ],
  xhr: {
    application: 'site',
    origin: backendOrigin
  },
  calltracking: {
    apiURL: `/api/calltracking/session`,
  }
};
