// src/plugins/i18n.js
import VueI18n from 'vue-i18n';
import messages from 'src/statics/i18n';
import { rescodes } from "../store/Modules/rescodes";

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n);
  // Vue.config.lang = process.env.LANG_DEFAULT;
  let mylang = localStorage.getItem(rescodes.localStorage.lang)

  if ((navigator) && (mylang === null)) {
    mylang = navigator.language
    console.log(`LANG NAVIGATOR ${mylang}`)
  }

  if (mylang === '') {
    mylang = process.env.LANG_DEFAULT;
  }
  if (mylang.toLowerCase() === 'es-es')
    mylang = 'esEs'

  console.log('MYLANG=', mylang)
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

