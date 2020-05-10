// src/boot/vue-i18n.js
import VueI18n from 'vue-i18n'
import messages from '../statics/i18n'
import { tools } from '../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n)
  // Vue.config.lang = process.env.LANG_DEFAULT;

  let mylang = tools.getItemLS(tools.localStorage.lang)
  console.log(`LANG LocalStorage ${mylang}`)

  if ((navigator) && (mylang === '')) {
    mylang = navigator.language
    console.log(`LANG NAVIGATOR ${mylang}`)
  }

  mylang = tools.checkLangPassed(mylang)

  Vue.config.lang = mylang

  // Set i18n instance on app
  app.i18n = new VueI18n({
    fallbackLocale: mylang,
    locale: mylang,
    messages
  })
}
