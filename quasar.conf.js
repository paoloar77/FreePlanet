// Configuration for your app
const webpack = require('webpack');
const path = require('path');

// Get our env variables
const envparser = require('./config/envparser');

module.exports = function (ctx) {
  return {
    plugins: ['i18n', 'axios', 'vuelidate'],
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
      env: envparser(),
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {

        // Create an alias for our helper
        cfg.resolve.alias.env = path.resolve(__dirname, 'config/helpers/env.js')

        // Make our helper function Global
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            'env': 'env' // this variable is our alias, it's not a string
          })
        )

      }
    },
    devServer: {
      // https: true,
      port: 8080,
      host: 'localhost',
      open: false // opens browser window automatically
    },
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

      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify', 'ActionSheet', 'Loading'
      ],
      config: {
        // optional (v0.17+)
        loading: {
          // Loading defaults
        }
      },
      //iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons',
      iconSet: 'fontawesome',
      //iconSet: 'roboto-font',
      i18n: 'it' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
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
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
};
