import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { UserStore } from '@store'
import { EventBus, RootState, storeBuilder, DebugMode } from '@store'
import router from './router'

import $ from 'jquery'

import Header from './components/Header.vue'

import globalroutines from './globalroutines/index'
import { GlobalStore } from './store/Modules'


@Component({
  components: {
    appHeader: Header
  },
  router
})


export default class App extends Vue {
  public backgroundColor = 'whitesmoke'
  public $q

  public listaRoutingNoLogin = ['/vreg?', '/offline']

  created() {
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
    this.listaRoutingNoLogin.forEach(mystr => {
      if (window.location.href.includes(mystr)) {
        chiamaautologin = false
      }
    })

    if (chiamaautologin) {
      console.log('CHIAMA autologin_FromLocalStorage')
      UserStore.actions.autologin_FromLocalStorage()
        .then((loadstorage) => {
          if (loadstorage) {
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


}
