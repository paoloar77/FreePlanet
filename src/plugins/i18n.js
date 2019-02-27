// src/plugins/i18n.js
import VueI18n from 'vue-i18n';
import messages from 'src/assets/i18n';
import { tools } from "../store/Modules/tools";

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n);
  // Vue.config.lang = process.env.LANG_DEFAULT;

  let mylang = tools.getItemLS(tools.localStorage.lang)

  if ((navigator) && (mylang === '')) {
    mylang = navigator.language
    console.log(`LANG NAVIGATOR ${mylang}`)
  }

  if (mylang === '')
    mylang = process.env.LANG_DEFAULT;

  if (mylang.toLowerCase() === 'es-es')
    mylang = 'esEs'

  console.log('MYLANG2=', mylang)
  console.log('process.env.LANG_DEFAULT=', process.env.LANG_DEFAULT)
  Vue.config.lang = mylang

  // console.log("PLUGINS INIT....");

  //console.log("LANG_DEFAULT: ")
  //console.log(process.env.LANG_DEFAULT)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: mylang,
    fallbackLocale: mylang,
    messages
  })
}

