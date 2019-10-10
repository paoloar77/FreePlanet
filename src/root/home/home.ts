import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Logo } from '../../components/logo'

import { Footer } from '../../components/Footer'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1200,
  scale: 0.95,
  distance: '10px',
  rotate: {
    x: 0,
    y: 0,
    z: 0
  }
  // mobile: true
})

@Component({
  components: { Logo, Footer }
})
export default class Home extends Vue {
  public text: string = ''
  public visibile: boolean = false
  public cardvisible: string = 'hidden'
  public displaycard: string = 'block'
  public $t: any
  // public firstClassSection: string = 'landing_background fade homep-cover-img animate-fade homep-cover-img-1'
  public firstClassSection: string = 'fade homep-cover-img animate-fade homep-cover-img-1'
  public $q
  public polling
  public slide = 'first'
  public animare: number = 0

  constructor() {
    super()
    // console.log('Home constructor...')
    this.initprompt()
  }

  public mounted() {
    let primo = true
    const mytime = 10000
    this.polling = setInterval(() => {

      this.firstClassSection = 'landing_background fade homep-cover-img ' + (primo ? 'homep-cover-img-2' : 'homep-cover-img-1')
      primo = !primo

      // console.log('this.firstClassSection', this.firstClassSection)

    }, mytime)
  }

  get appname() {
    return process.env.APP_NAME
  }

  public beforeDestroy() {
    console.log('beforeDestroy')
    clearInterval(this.polling)
  }
  public created() {
    this.animare = process.env.DEV ? 0 : 8000

    GlobalStore.actions.prova()
  }

  get tools() {
    return tools
  }

  get isLogged() {
    return UserStore.state.isLogged
  }

  get TelegramSupport() {
    return process.env.TELEGRAM_SUPPORT
  }

  get FBPage() {
    return process.env.URL_FACEBOOK
  }

  public meta() {
    return {
      keywords: { name: 'keywords', content: 'Quasar website' },
      // meta tags
      meta: {
        mykey: { name: 'mykey', content: 'Key 1' },
        description: { name: 'description', content: 'Page 1' },
        keywords: { name: 'keywords', content: 'Quasar website' },
        equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
      }
    }
  }

  public mystilecard() {
    return {
      visibility: this.cardvisible,
      display: this.displaycard
    }
  }

  get conta() {
    return GlobalStore.state.conta
  }

  public getenv(myvar) {
    return process.env[myvar]
  }

  set conta(valore) {
    GlobalStore.actions.setConta(valore)
    const my = this.$q.lang.isoName
    tools.showNotif(this.$q, String(my))
  }

  public initprompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // console.log('********************************   beforeinstallprompt fired')
      event.preventDefault()
      // console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ')
      // #Todo++ IMPOSTA DEFERRED PROMPT
      return false
    })

  }

  get isInCostruction() {
    return process.env.IN_CONSTRUCTION === '1'
  }

  public getPermission() {
    return Notification.permission
  }

  public NotServiceWorker() {
    return (!('serviceWorker' in navigator))
  }

  public PagLogin() {
    this.$router.replace('/signin')
  }

  public PagReg() {
    this.$router.replace('/signup')
  }

  // public test_fetch() {
  //   fetch('https:/httpbin.org/post', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     },
  //     // mode: 'no-cors',
  //     mode: 'cors',
  //     body: JSON.stringify({ message: 'Does this work?' })
  //   }).then(function(response) {
  //     console.log(response)
  //     if (response) {
  //       return response.json()
  //     }
  //     else {
  //       return null
  //     }
  //   }).then(function(data) {
  //     console.log(data)
  //   }).catch(function(err) {
  //     console.log(err)
  //   })
  // }
  //

  public openCreatePostModal() {
    console.log('APERTO ! openCreatePostModal')

    this.conta = this.conta + 1

    this.visibile = !this.visibile

    if (this.visibile) {
      this.displaycard = 'block'
      this.cardvisible = 'visible'
    } else {
      this.displaycard = 'block'
      this.cardvisible = 'hidden'
    }

  }

/*
  backgroundSequence() {
    window.clearTimeout()
    let k = 0
    for (let i = 0; i < bgImageArray.length; i++) {
      const mythis = this
      setTimeout(function() {
        document.documentElement.style.background = 'url(' + mythis.base + mythis.bgImageArray[k] + ') no-repeat center center fixed'
        document.documentElement.style.backgroundSize = 'cover'
        if ((k + 1) === mythis.bgImageArray.length) { setTimeout(function() { mythis.backgroundSequence() }, (mythis.secs * 1000))} else { k++ }
      }, (mythis.secs * 1000) * i)
    }
  }
  backgroundSequence()
*/
}
