import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { UserStore } from '@store'
import router from './router'

import { Header } from './components/Header'

import globalroutines from './globalroutines/index'
import { GlobalStore } from './store/Modules'
import { toolsext } from '@src/store/Modules/toolsext'
import { BannerCookies, CPreloadImages } from '@components'
import { static_data } from '@src/db/static_data'

@Component({
  components: {
    appHeader: Header,
    BannerCookies, CPreloadImages
  },
  router
})

export default class App extends Vue {
  public backgroundColor = 'whitesmoke'
  public $q

  public listaRoutingNoLogin = ['/vreg?', '/offline']

  public meta() {
    return {
      keywords: { name: 'keywords', content: 'WebSite' },
      // meta tags
      meta: {
        keywords: { name: 'keywords', content: 'MyKeywords' },
        mykey: { name: 'mykey', content: 'Key 1' }
      }
    }
  }

  public created() {
    if (process.env.DEV) {
      console.info('SESSIONE IN SVILUPPO ! (DEV)')
      console.info(process.env)
    }
    if (process.env.PROD) {
      console.info('SESSIONE IN PRODUZIONE!')
      // console.info(process.env)
    }

    // Make autologin only if some routing

    // console.log('window.location.href', window.location.href)

    let chiamaautologin = true
    this.listaRoutingNoLogin.forEach((mystr) => {
      if (window.location.href.includes(mystr)) {
        chiamaautologin = false
      }
    })

    if (chiamaautologin) {
      // console.log('CHIAMA autologin_FromLocalStorage')
      UserStore.actions.autologin_FromLocalStorage()
        .then((loadstorage) => {
          if (loadstorage) {

            if (toolsext.getLocale() !== '') {
              // console.log('SETLOCALE :', this.$i18n.locale)
              this.$i18n.locale = toolsext.getLocale()    // Set Lang
            } else {
              UserStore.mutations.setlang(this.$i18n.locale)
            }
            // console.log('lang CARICATO:', this.$i18n.locale)

            globalroutines(this, 'loadapp', '')
            // this.$router.replace('/')

            // Create Subscription to Push Notification
            GlobalStore.actions.createPushSubscription()
          }
        })
    }

    // Calling the Server for updates ?
    // Check the verified_email

  }

  get static_data() {
    return static_data
  }
}
