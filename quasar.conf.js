// Configuration for your app

const path = require('path');

const webpack = require('webpack')
const envparser = require('./config/envparser')


const extendTypescriptToWebpack = (config) => {
  config.resolve
    .extensions
    .add('.ts', '.js', '.vue')
  config.resolve
    .alias
    .set('@components', path.resolve(__dirname, 'src/components/index.ts'))
    .set('@components', path.resolve(__dirname, 'src/components'))
    .set('@views', path.resolve(__dirname, 'src/components/views/index.ts'))
    .set('@views', path.resolve(__dirname, 'src/components/views'))
    .set('@src', path.resolve(__dirname, 'src'))
    .set('@icons', path.resolve(__dirname, 'src/assets/icons'))
    .set('@images', path.resolve(__dirname, 'src/assets/images'))
    .set('@classes', path.resolve(__dirname, 'src/classes/index.ts'))
    .set('@utils', path.resolve(__dirname, 'src/utils/index.ts'))
    .set('@utils', path.resolve(__dirname, 'src/utils/*'))
    .set('@css', path.resolve(__dirname, 'src/styles/variables.scss'))
    .set('@router', path.resolve(__dirname, 'src/router/index.ts'))
    .set('@validators', path.resolve(__dirname, 'src/utils/validators.ts'))
    .set('@api', path.resolve(__dirname, 'src/store/Api/index.ts'))
    .set('@paths', path.resolve(__dirname, 'src/store/Api/ApiRoutes.ts'))
    .set('@types', path.resolve(__dirname, 'src/typings/index.ts'))
    .set('@store', path.resolve(__dirname, 'src/store/index.ts'))
    .set('@modules', path.resolve(__dirname, 'src/store/Modules/index.ts'))
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

const extendHTMLToWebpack = (config) => {
  config.resolve
    .extensions
    .add('.html');
  config.module
    .rule('html')
    .test(/\.html?$/)
    .use('html')
    .loader('vue-html-loader')
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
      showProgress: true,
      env: envparser(),
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      analyze: true,
      // extractCSS: false,
      chainWebpack(config) {
        extendTypescriptToWebpack(config);
        // extendHTMLToWebpack(config);
        config.resolve
          .alias
          .set('~', __dirname)
          .set('@', path.resolve(__dirname, 'src'))
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
      open: false // opens browser window automatically
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
