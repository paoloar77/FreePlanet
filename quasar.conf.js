// Configuration for your app

const path = require('path');

// Carica il file .env
const envparser = require('./config/envparser');

const extendTypescriptToWebpack = (config) => {
  config.resolve
    .extensions
    .add('.ts');
  config.module
    .rule('typescript')
    .test(/\.tsx?$/)
    .use('typescript')
    .loader('ts-loader')
    .options({
      appendTsSuffixTo: [/\.vue$/],
      onlyCompileBundledFiles: true
    })
};

module.exports = function (ctx) {
  return {
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/store/index.ts'
    },
    // app plugins (/src/plugins)
    plugins: ['i18n', 'axios', 'vee-validate'],
    css: [
      'app.styl'
    ],
    extras: [
      //ctx.theme.mat ?  : null,
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      analyze: true,
      // extractCSS: false,
      chainWebpack(config) {
        extendTypescriptToWebpack(config);
        config.resolve
          .alias
          .set('~', __dirname)
          .set('@', path.resolve(__dirname, 'src'));
        config.module
          .rule('template-engine')
          .test(/\.pug$/)
          .use('pug')
          .loader('pug-plain-loader')
      }
    },
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QField',
        'QInput',
        'QSelect',
        'QPopover',
        'QToggle',
        'QFab',
        'QInfiniteScroll',
        'QAjaxBar',
        'QChip',
        'QCollapsible',
        'QCheckbox',
        'QAlert',
        'QInnerLoading',
        'QSpinnerGears',
        'QDatetime',
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Meta',
        'Cookies',
        'ActionSheet', 'Loading'
      ],
      iconSet: 'fontawesome',
      i18n: 'it', // Quasar language
    },
    animations: [],
    ssr: {
      pwa: {
        runtimeCaching: [
          {
            urlPattern: '/statics',
            handler: 'networkFirst'
          }
        ]
      }
    },
    pwa: {
      workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'My App',
        short_name: 'myapp',
        description: 'Descrizione APP!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
  }
};
