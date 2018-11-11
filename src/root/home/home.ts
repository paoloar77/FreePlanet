import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'
import { GlobModule } from '@/store/modules/glob'

require('./home.scss')

@Component({

})
export default class Home extends Vue {
  text: string = ''
  visibile: boolean = false
  cardvisible: string = 'hidden'
  displaycard: string = 'block'

  public $q

  constructor() {
    super()
    console.log('created...')
    this.initprompt()
  }

  mystilecard() {
    return {
      visibility: this.cardvisible,
      display: this.displaycard
    }
  }

  get conta() {
    return GlobModule.conta
  }

  set conta(valore) {
    GlobModule.setConta(valore)
    var my = this.$q.i18n.lang
    this.showNotification(String(my))
  }

  showNotification(msg: string) {
    this.$q.notify(msg)
  }

  initprompt() {
    window.addEventListener('beforeinstallprompt', function (event) {
      console.log('********************************   beforeinstallprompt fired')
      event.preventDefault()
      console.log('§§§§§§§§§§§§§§§§§§§§  IMPOSTA DEFERRED PROMPT  !!!!!!!!!!!!!!!!!  ')
      return false
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
}
