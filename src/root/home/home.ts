import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Logo } from '../../components/logo'

@Component({
  components: { Logo }
})
export default class Home extends Vue {
  text: string = ''
  visibile: boolean = false
  cardvisible: string = 'hidden'
  displaycard: string = 'block'
  svgclass: string = 'svgclass'
  $t: any
  firstClassSection: string = 'landing fade homep-cover-img animate-fade homep-cover-img-1'
  public $q
  polling

  constructor() {
    super()
    // console.log('Home constructor...')
    this.initprompt()
  }

  mounted() {
    let primo = true
    let mytime = 10000
    this.polling = setInterval(() => {

      this.firstClassSection = 'landing fade homep-cover-img ' + (primo ? 'homep-cover-img-2' : 'homep-cover-img-1')
      primo = !primo

      console.log('this.firstClassSection', this.firstClassSection)

    }, mytime)
  }

  beforeDestroy() {
    console.log('beforeDestroy')
    clearInterval(this.polling)
  }
  created() {

    GlobalStore.actions.prova()
  }

  get isLogged() {
    return UserStore.state.isLogged
  }

  get TelegramSupport() {
    return process.env.TELEGRAM_SUPPORT
  }


  meta() {
    return {
      keywords: { name: 'keywords', content: 'Quasar website' },
      // meta tags
      meta: {
        mykey: { name: 'mykey', content: 'Key 1' },
        description: { name: 'description', content: 'Page 1' },
        keywords: { name: 'keywords', content: 'Quasar website' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      }
    }
  }


  mystilecard() {
    return {
      visibility: this.cardvisible,
      display: this.displaycard
    }
  }

  get conta() {
    return GlobalStore.state.conta
  }

  getenv(myvar) {
    return process.env[myvar]
  }

  set conta(valore) {
    GlobalStore.actions.setConta(valore)
    let my = this.$q.i18n.lang
    this.showNotif(String(my))
  }

  showNotif(message: string, color = 'primary', icon = '') {
    this.$q.notify({
      color,
      icon,
      message
    })

  }

  initprompt() {
    window.addEventListener('beforeinstallprompt', function (event) {
      // console.log('********************************   beforeinstallprompt fired')
      event.preventDefault()
      // console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ')
      // #Todo++ IMPOSTA DEFERRED PROMPT
      return false
    })

  }

  get isInCostruction () {
    return process.env.IN_CONSTRUCTION === '1'
  }

  getPermission() {
    return Notification.permission
  }

  NotServiceWorker() {
    return (!('serviceWorker' in navigator))
  }

  PagLogin () {
    this.$router.replace('/signin')
  }

  PagReg () {
    this.$router.replace('/signup')
  }

  displayConfirmNotification() {
    let options = null
    if ('serviceWorker' in navigator) {
      options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: '/statics/icons/app-icon-96x96.png',
        image: '/statics/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/statics/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: 'Okay', icon: '/statics/icons/app-icon-96x96.png' },
          { action: 'cancel', title: 'Cancel', icon: '/statics/icons/app-icon-96x96.png' }
        ]
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then(function (swreg) {
            swreg.showNotification('Successfully subscribed!', options)
          })
      }
    }
  }

  urlBase64ToUint8Array(base64String) {
    let padding = '='.repeat((4 - base64String.length % 4) % 4)
    let base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    let rawData = window.atob(base64)
    let outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1])
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length)
    let ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    let blob = new Blob([ab], { type: mimeString })
    return blob
  }


  showNotificationExample() {
    let options = null
    let mythis = this
    if ('serviceWorker' in navigator) {
      options = {
        body: mythis.$t('notification.subscribed'),
        icon: '/statics/icons/android-chrome-192x192.png',
        image: '/statics/images/freeplanet.png',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/statics/icons/android-chrome-192x192.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: mythis.$t('dialog.ok'), icon: '/statics/icons/android-chrome-192x192.png' }
          // { action: 'cancel', title: 'Cancel', icon: '/statics/icons/android-chrome-192x192.png', }
        ]
      }

      navigator.serviceWorker.ready
        .then(function (swreg) {
          swreg.showNotification('aaa', options)
        })
    }
  }



  askfornotification() {
    this.showNotif(this.$t('notification.waitingconfirm'), 'positive', 'notifications')

    Notification.requestPermission((result) => {
      console.log('User Choice', result)
      if (result === 'granted') {
        this.showNotif(this.$t('notification.confirmed'), 'positive', 'notifications')
      } else {
        this.showNotif(this.$t('notification.denied'), 'negative', 'notifications')

        // displayConfirmNotification();
      }
    })

  }


  test_fetch() {
    fetch('https:/httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // mode: 'no-cors',
      mode: 'cors',
      body: JSON.stringify({ message: 'Does this work?' })
    }).then(function (response) {
      console.log(response)
      if (response)
        return response.json()
      else
        return null
    }).then(function (data) {
      console.log(data)
    }).catch(function (err) {
      console.log(err)
    })
  }

  openCreatePostModal() {
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
