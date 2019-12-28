import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { func_tools } from 'store/Modules/toolsext'
import { CalendarStore, GlobalStore, UserStore } from '@store'
import { CGridTableRec, CMyFieldDb, CTitleBanner } from '@components'
import { colnewstosent, coltemplemail, colopzemail, colmailinglist } from '@src/store/Modules/fieldsTable'
import { DefaultNewsState, INewsState } from '@src/model/index'
import translate from '../../../globalroutines/util'
import { getCookie } from 'utils/auth'
import { CTitle } from '../../../components/CTitle'
import { CMyPage } from '../../../components/CMyPage'
import MixinBase from '../../../mixins/mixin-base'

const namespace = 'CalendarModule'

@Component({
  name: 'newsletter',
  components: { CTitle, CMyPage, CGridTableRec, CTitleBanner, CMyFieldDb },
  mixins: []
})
export default class Newsletter extends MixinBase {
  public $t: any
  public $q
  public myloadingload: boolean = false
  public myloading: boolean = false
  public myloadingprew: boolean = false
  public myloading2: boolean = false
  public myloading3: boolean = false
  public myloading4: boolean = false
  public myloadingState: boolean = false
  public myloadingImport: boolean = false
  public mailinglist_imported: string = ''
  public myrisimport: string = ''
  public errimport: boolean = false
  public okimport: boolean = false
  public newsstate: INewsState = DefaultNewsState
  public percsubscribed: number = 0.0
  public polling = null
  public tab: string = ''
  public emailtextheader: string = ''
  public eseguipolling: boolean = false

  public async mounted() {
    await this.load()
    // this.tab = tools.getCookie('formnews', 'check')
    this.tab = this.$route.params.idparam
    this.emailtextheader = this.getValDb('EMAIL_TEXT', true)

  }

  public async checkifpolling() {
    if (this.eseguipolling) {
      // Is Still sending email, so, every minutes, check the status
      if (!this.polling) {
        console.log('esegui POLLING....')
        this.polling = setInterval(() => {
          this.load()
        }, 15000)
      }
    }
  }

  @Watch('$route.params.idparam')
  public changetab() {
    this.tab = this.$route.params.idparam
  }

  public async createNewsletter(minuti, loading) {
    loading = true
    // Crea nuovo record tra N minuti
    const mynews = {
      idapp: process.env.APP_ID,
      label: 'Newsletter creata il ' + tools.getstrDateTimeAll(tools.getDateNow()),
      activate: true,
      datetoSent: tools.addMinutes(tools.getDateNow(), minuti),
      templemail_str: GlobalStore.getters.gettemplemailbyId(this.getValDb('TEMPLEMAIL_ID', true))
    }
    await tools.createNewRecord(this, 'newstosent', mynews).then((myrecris) => {
      // reload data
      this.load()
      loading = false
    })
  }

  public beforeDestroy() {
    clearInterval(this.polling)
  }

  public async load() {
    console.log('load')
    this.myloadingload = true
    const mydata = {
      locale: tools.getLocale()
    }
    const myris = await UserStore.actions.newsletterload(mydata)
    this.newsstate = myris.newsstate
    GlobalStore.state.serv_settings = myris.serv_settings
    GlobalStore.state.templemail = myris.templemail
    GlobalStore.state.opzemail = myris.opzemail

    // console.log('newsstate')
    // console.table('GlobalStore.state.serv_settings', GlobalStore.state.serv_settings)

    this.percsubscribed = this.newsstate.totsubscribed / this.newsstate.totemail

    if (this.newsstate.lastnewstosent)
      this.eseguipolling = this.eseguipolling || this.newsstate.lastnewstosent.starting_job && !this.newsstate.lastnewstosent.finish_job

    if (this.newsstate.nextnewstosent)
      this.eseguipolling = this.eseguipolling || true

    console.log('this.eseguipolling', this.eseguipolling)
    this.myloadingload = false

    this.checkifpolling()
  }

  public async DisableNewsletter() {
    return await this.setActiveDisactiveNewsletter(false)
  }
  public async EnableNewsletter() {
    return await this.setActiveDisactiveNewsletter(true)
  }

  public async setActiveDisactiveNewsletter(activate) {
    let mytext = ''
    const mytitle = 'Newsletter'
    if (activate)
      mytext = 'Procedo a far Ripartire la newsletter?'
    else
      mytext = 'Procedo a fermare l\'Invio della newsletter?'

    this.$q.dialog({
      message: mytext,
      ok: {
        label: translate('dialog.yes'),
        push: true
      },
      title: mytitle,
      cancel: true,
      persistent: false
    }).onOk(async () => {

      this.myloadingState = true
      const mydata = {
        _id: this.newsstate.lastnewstosent._id,
        locale: tools.getLocale(),
        activate
      }
      this.newsstate = await UserStore.actions.newsletter_setactivate(mydata)
      this.myloadingState = false

    })

  }

  get emailtest() {
    return this.getValDb('EMAIL_TEST', true)
  }

  public async sendNewsletterTest(previewonly) {
    if (previewonly)
      this.myloadingprew = true
    else
      this.myloading = true

    const res = await GlobalStore.actions.sendEmailTest({previewonly})

    if (res)
      tools.showPositiveNotif(this.$q, 'Email di Test Inviata')
    else {
      tools.showNegativeNotif(this.$q, 'Email di Test Non Inviata')
    }

    if (previewonly)
      this.myloadingprew = false
    else
      this.myloading = false
  }

  public changetabnews(value, oldval) {
    console.log('changetabnews')
    tools.setCookie('formnews', value)
  }

  get getcolnewstosent() {
    return colnewstosent
  }

  get getcolmailinglist() {
    return colmailinglist
  }

  get getcoltemplemail() {
    return coltemplemail
  }
  get getcolopzemail() {
    return colopzemail
  }

  public async importMailinglist() {
    this.myloadingImport = true
    this.errimport = false
    this.okimport = false

    const mydata = {
      strdataemail: this.mailinglist_imported,
      locale: tools.getLocale(),
      settomailchimp: this.getValDb('MAILCHIMP_ON', true, false)
    }

    const res = await UserStore.actions.importemail(mydata)

    let esistiti = ''
    if (res.data.numalreadyexisted > 0)
      esistiti = ` ${res.data.numalreadyexisted} email già esistenti`

    if (res.data.numadded > 0) {
      this.okimport = true
      this.myrisimport = `(${res.data.numadded} / ${res.data.numtot}) email importate !` + esistiti
    } else {
      this.errimport = true
      this.myrisimport = `Nessuna email importata (trovate ${res.data.numtot})` + esistiti
    }

    this.myloadingImport = false
  }

  get progresslabsubscribed() {
    return (this.percsubscribed * 100).toFixed(0) + '%'
  }

  public percsent(next) {
    let rec = this.newsstate.lastnewstosent
    if (next)
      rec = this.newsstate.nextnewstosent

    let val = rec.numemail_sent / rec.numemail_tot * 100
    if (val > 100)
      val = 100
    return val.toFixed(2)
  }
}
