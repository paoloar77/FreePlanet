import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { IColl, IGallery, ITimeLineEntry } from '@src/model/GlobalStore'

import { Logo } from '../../components/logo'

import { Footer } from '../../components/Footer'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { CImgTitle } from '../../components/CImgTitle/index'
import { Screen } from 'quasar'
import { static_data } from '@src/db/static_data'

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
  components: { Logo, Footer, CImgTitle }
})
export default class PhotosGallery extends Vue {
  @Prop({ required: true }) public mygallery: []
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
  public slide2 = 1
  public animare: number = 0
  public activePanelImg: number
  public withThumbnails: boolean = true
  public withCaptions: boolean = true
  public allunga: boolean = false
  public fullscreen: boolean = false
  public myclass: string = ''
  public dimensione: string = ''
  public dimensioneImg: any = [
    {
      id: 0,
      label: 'Piccola',
      value: 0
    },
    {
      id: 1,
      label: 'Media',
      value: 1
    },
    {
      id: 2,
      label: 'Grande',
      value: 2
    },
    {
      id: 3,
      label: 'Molto Grande',
      value: 3
    }
  ]

  constructor() {
    super()
    // console.log('Home constructor...')
    this.initprompt()
  }

  get static_data() {
    return static_data
  }

  public changeAllunga(value, evt) {
    if (value)
      this.myclass = 'allunga'
    else
      this.myclass = ''
  }

  get getappname() {
    return this.$t('msg.myAppName')
  }

  get tools() {
    return tools
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

  get isLogged() {
    return UserStore.state.isLogged
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
    window.addEventListener('beforeinstallprompt', function (event) {
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

  public getmywidth(rec: IColl) {
    return rec.width
  }

  public getmyheight(rec: IColl) {
    return rec.height
  }

  public setTransition(newVal, oldVal) {
    // console.log('setTransition', newVal, oldVal)
    this.activePanelImg = newVal
  }

  public getsubtitle(data: IColl) {
    if (data.subtitle[toolsext.getLocale()])
      return data.subtitle[toolsext.getLocale()]
    else {
      return data.subtitle[static_data.arrLangUsed[0]]
    }
  }

  public getTitle(data: IColl) {
    if (data.title[toolsext.getLocale()])
      return data.title[toolsext.getLocale()]
    else {
      return data.title[static_data.arrLangUsed[0]]
    }
  }

  public changedim(value) {
    this.myclass = 'allunga' + value
    // console.log('myclass', this.myclass, value)
  }
}
