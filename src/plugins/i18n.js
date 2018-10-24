// src/plugins/i18n.js
import VueI18n from 'vue-i18n';
import messages from 'src/i18n';

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n);
  Vue.config.lang = process.env.LANG_DEFAULT;

  console.log("PLUGINS INIT....");

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: process.env.LANG_DEFAULT,
    fallbackLocale: process.env.LANG_DEFAULT,
    messages
  })
}
