import Vue from 'vue'
import Component from 'vue-class-component'

import drawer from '../../layouts/drawer/drawer.vue'
import messagePopover from '../../layouts/toolbar/messagePopover/messagePopover.vue'
import { CSignIn } from '../../components/CSignIn'

import { GlobalStore, UserStore } from '@modules'
// import { StateConnection } from '../../model'
import { Prop, Watch } from 'vue-property-decorator'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import Quasar, { Screen } from 'quasar'
import { static_data } from '../../db/static_data'
import globalroutines from '../../globalroutines'

import MixinUsers from '../../mixins/mixin-users'
import { CMyAvatar } from '../CMyAvatar'

@Component({
  name: 'Header',
  mixins: [MixinUsers],
  components: {
    drawer,
    messagePopover, CSignIn, CMyAvatar
  }
})

export default class Header extends Vue {
  @Prop({ required: false, default: '' }) public extraContent: string
  @Prop({ required: false, default: '' }) public clBase: string
  public $t
  public $v
  public $q
  public isUserNotAuth: boolean = false
  public iconConn: string = 'wifi'
  public clIconConn: string = 'clIconOnline'
  public strConn: string = ''
  public langshort: string = ''
  public clCloudUpload: string = ''
  public clCloudDownload: string = ''
  public clCloudUp_Indexeddb: string = ''
  public clCloudDown_Indexeddb: string = 'clIndexeddbsend'
  public photo = ''
  public visuimg: boolean = true

  get conn_changed() {
    return GlobalStore.state.stateConnection
  }

  get isonline() {
    return GlobalStore.state.stateConnection === 'online'
  }

  get isAdmin() {
    return UserStore.state.isAdmin
  }

  get isManager() {
    return UserStore.state.isManager
  }

  get conndata_changed() {
    return GlobalStore.state.connData
  }

  get isNewVersionAvailable() {
    return GlobalStore.getters.isNewVersionAvailable
  }

  // -------------------------------------------------------------------------
  // QUASAR Example using myevent to open drawer from another component or page
  // -------------------------------------------------------------------------
  // (1) This code is inside layout file that have a drawer
  //     if this.leftDrawerOpen is true, drawer is displayed

  // (2) Listen for an myevent in created
  /*    created(){
        this.$root.$on("openLeftDrawer", this.openLeftDrawercb);
      },
      methods: {
        openURL,
        // (3) Define the callback in methods
        openLeftDrawercb() {
        this.leftDrawerOpen = !this.leftDrawerOpen;
      }
    }

    // (4) In another component or page, emit the myevent!
    //     Call the method when clicking button etc.
    methods: {
      openLeftDrawer() {
        this.$root.$emit("openLeftDrawer");
      }
    }
  // -------------------------------------------------------------------------
  */

  get leftDrawerOpen() {
    return GlobalStore.state.leftDrawerOpen
  }

  set leftDrawerOpen(value) {
    GlobalStore.state.leftDrawerOpen = value
    localStorage.setItem(tools.localStorage.leftDrawerOpen, value.toString())
  }

  get rightDrawerOpen() {
    return GlobalStore.state.RightDrawerOpen
  }

  set rightDrawerOpen(value) {
    GlobalStore.state.RightDrawerOpen = value
  }

  get lang() {
    return this.$q.lang.isoName
  }

  set lang(lang) {
    console.log('set lang', this.$i18n.locale)
    this.$i18n.locale = this.snakeToCamel(lang)
    // tools.showNotif(this.$q, 'IMPOSTA LANG= ' + this.$i18n.locale)
    // console.log('IMPOSTA LANG= ' + this.$i18n.locale)

    UserStore.mutations.setlang(this.$i18n.locale)

    let mylangtopass = lang

    mylangtopass = tools.checkLangPassed(mylangtopass)

    this.setshortlang(mylangtopass)

    this.setLangAtt(mylangtopass)
  }

  @Watch('GlobalStore.state.stateConnection', { immediate: true, deep: true })
  public changeconn(value: string, oldValue: string) {

    this.strConn = value
  }

  @Watch('conndata_changed', { immediate: true, deep: true })
  public changeconnData(value: any, oldValue: any) {
    // console.log('CHANGED GlobalStore.state.connData', value)

    this.clCloudUpload = (value.uploading_server === 1) ? 'clCloudUpload send' : 'clCloudUpload'
    this.clCloudUpload = (value.downloading_server === 1) ? 'clCloudUpload receive' : 'clCloudUpload'
    this.clCloudUp_Indexeddb = (value.uploading_indexeddb === 1) ? 'clIndexeddb send' : 'clIndexeddb'
    this.clCloudUp_Indexeddb = (value.downloading_indexeddb === 1) ? 'clIndexeddb receive' : 'clIndexeddb'

    this.clCloudUpload = (value.uploading_server === -1) ? 'clCloudUpload error' : this.clCloudUpload
    this.clCloudUpload = (value.downloading_server === -1) ? 'clCloudUpload error' : this.clCloudDownload
    this.clCloudUp_Indexeddb = (value.uploading_indexeddb === -1) ? 'clIndexeddb error' : this.clCloudUp_Indexeddb
    this.clCloudUp_Indexeddb = (value.downloading_indexeddb === -1) ? 'clIndexeddb error' : this.clCloudDown_Indexeddb

    // console.log('clCloudUpload', this.clCloudUpload)
    // console.log('clCloudDownload', this.clCloudDownload)
    // console.log('clCloudUp_Indexeddb', this.clCloudUp_Indexeddb)
    // console.log('value.downloading_indexeddb', value.downloading_indexeddb)
    // console.log('value.uploading_server', value.uploading_server)
  }

  @Watch('conn_changed', { immediate: true, deep: true })
  public changeconn_changed(value: string, oldValue: string) {
    if (value !== oldValue) {

      // console.log('SSSSSSSS: ', value, oldValue)

      const color = (value === 'online') ? 'positive' : 'warning'

      if (this.static_data.functionality.SHOW_IF_IS_SERVER_CONNECTION) {

        if (!!oldValue) {
          tools.showNotif(this.$q, this.$t('connection') + ` disc__value}`, {
            color,
            icon: 'wifi'
          })
        }

        this.changeIconConn()
      }
    }
  }

  public RefreshApp() {
    // Unregister Service Worker
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister()
      }
    })
    window.location.reload(true)
  }

  public changeIconConn() {
    this.iconConn = GlobalStore.state.stateConnection === 'online' ? 'wifi' : 'wifi_off'
    this.clIconConn = GlobalStore.state.stateConnection === 'online' ? 'clIconOnline' : 'clIconOffline'
  }

  public getAppVersion() {
    // return "AA"
    let strv = ''
    if (process.env.DEV) {
      strv = 'DEV '
    } else if (process.env.TEST) {
      strv = 'TEST '
    }
    return '[' + strv + process.env.APP_VERSION + ']'
  }

  public setshortlang(lang) {
    for (const indrec in static_data.lang_available) {
      if (static_data.lang_available[indrec].value === lang) {
        // console.log('static_data.lang_available[indrec].short', static_data.lang_available[indrec].short, static_data.lang_available[indrec].value)
        this.langshort = static_data.lang_available[indrec].short
        return
      }
    }

  }

  public getLangAtt() {
    return this.$q.lang.isoName
  }

  public setLangAtt(mylang) {
    console.log('LANG =', mylang)
    // console.log('PRIMA this.$q.lang.isoName', this.$q.lang.isoName)

    // dynamic import, so loading on demand only
    import(`quasar/lang/${mylang}`).then((lang) => {
      Quasar.lang.set(lang.default)
      import(`../../statics/i18n`).then(() => {
        // console.log('MY LANG DOPO=', this.$q.lang.isoName)
      })
    })

    // this.$q.lang.set(mylang)

  }

  public beforeMount() {
    // Estrai la Lang dal Localstorage

    // console.log('this.$q.i18n=', this.$q.i18n, 'this.$q.getLocale()=', this.$q.lang.isoName)
    const mybrowserLang = this.getLangAtt()
    // tools.showNotif(this.$q, 'prima: ' + String(my))

    let mylang = tools.getItemLS(tools.localStorage.lang)
    if (mylang === '') {
      if (navigator) {
        mylang = navigator.language
        // console.log(`LANG2 NAVIGATOR ${mylang}`)
      } else {
        mylang = this.$q.lang.isoName
      }

      // console.log('IMPOSTA LANGMY', mylang)
    }

    mylang = tools.checkLangPassed(mylang)

    this.setLangAtt(mylang)
    this.setshortlang(mylang)

  }

  public mounted() {

    // Test this by running the code snippet below and then
    // use the "TableOnlyView" checkbox in DevTools Network panel

    const mythis = this
    // console.log('Event LOAD')
    if (window) {
      window.addEventListener('load', () => {
        // console.log('2) ENTERING Event LOAD')

        function updateOnlineStatus(event) {
          if (navigator.onLine) {
            console.log('EVENT ONLINE!')
            // handle online status
            GlobalStore.mutations.setStateConnection('online')
            mythis.changeIconConn()
          } else {
            console.log('EVENT OFFLINE!')
            // handle offline status
            GlobalStore.mutations.setStateConnection('offline')
            mythis.changeIconConn()
          }
        }

        window.addEventListener('online', updateOnlineStatus)
        window.addEventListener('offline', updateOnlineStatus)
      })
    }
  }

  public snakeToCamel(str) {
    return str.replace(/(-\w)/g, (m) => {
      return m[1].toUpperCase()
    })
  }

  get imglogo() {
    return '../../' + tools.getimglogo()
  }

  get getappname() {
    return tools.getsuffisso() + tools.getappname(this, tools.isMobile())
  }

  public toggleanimation() {
    console.log('toggleanimation')
    this.visuimg = false
    setTimeout(() => {
      this.visuimg = true
    }, 100)
  }

  public logoutHandler() {
    UserStore.actions.logout()
      .then(() => {
        // this.$router.replace('/logout')
        //
        // setTimeout(() => {
        //   this.$router.replace('/')
        // }, 1000)

        tools.showNotif(this.$q, this.$t('logout.uscito'), {icon: 'exit_to_app'})
      })
  }

  get static_data(){
    return static_data
  }

  get isLogged() {
    return UserStore.state.isLogged
  }

  get isEmailVerified() {
    return UserStore.state.my.verified_email
  }

  public loginOk() {
    tools.loginOk(this, false)
  }

  public loginInCorso() {
    tools.loginInCorso(this)
  }

  public checkErrors(riscode) {
    tools.SignIncheckErrors(this, riscode)
  }

  public showNotif(msgcode) {
    tools.showNotif(this.$q, this.$t(msgcode))
  }

  public mythis() {
    return this
  }

  public clickregister() {
    this.rightDrawerOpen = false
    this.$router.replace('/signup')
  }

  get getClassColorHeader() {
    if (tools.isTest())
      return 'bg-warning'
    else if (tools.isDebug())
      return 'bg-info'
    else
      return 'bg-primary'
  }
}
