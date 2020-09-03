import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'
import MixinNave from '../../mixins/mixin-nave'
import { CTitleBanner } from '../CTitleBanner'
import { GlobalStore, UserStore } from '../../store/Modules'
import { lists } from '../../store/Modules/lists'
import translate from '../../globalroutines/util'
import { CMyChipList } from '../CMyChipList'
import { CVideo } from '../CVideo'
import { validations } from './CMyFlotta-validate'
import { validationMixin } from 'vuelidate'
import { CMyDashboard } from '../CMyDashboard'
import { CDateTime } from '../CDateTime'

@Component({
  mixins: [validationMixin],
  validations,
  components: { CTitleBanner, CMyChipList, CVideo, CMyDashboard, CDateTime }
})

export default class CMyFlotta extends MixinNave {
  @Prop({ required: false, default: null }) public flottaprop
  public $t
  public $v
  public flotta: any = null
  public flotta_completa: any = null
  public arrdonatori: any[] = []
  public arrmediatori: any[] = []
  public loading: boolean = false
  public seluser = null
  public showmsguser: boolean = false
  public showsostituisci: boolean = false
  public showdashboard: boolean = false
  public showtesto: boolean = false
  public notifBot: boolean = true
  public deleteUser: boolean = true
  public AddImbarco: boolean = false
  public seltesto: string = ''
  public msg_tosend_user: string = ''
  public username_sostituire: string = ''
  public userfreestr: string = ''
  public tuttiidoni: boolean = false
  public showcommenti: boolean = true
  public showcolmodifica: boolean = false
  public showcoldati: boolean = false
  public inviaemail: boolean = false
  public seldonatore = null
  public ordinamento: string = 'data'
  public tabflotta: string = 'flotta'
  public tabmsg: string = 'donatori'
  public direzordin: number = -1
  public tutor1: string = ''
  public tutor2: string = ''
  public tutor3: string = ''
  public tutorslo: string = ''
  public date_start: Date = null
  public date_close: Date = null
  public revolut: string = ''
  public email_paypal: string = ''
  public payeer_id: string = ''
  public advcash_id: string = ''
  public note_payment: string = ''
  public link_payment: string = ''
  public link_superchat: string = ''
  public last_riga_aperto: string = ''
  public last_col_aperto: string = ''
  public MyPagination: {
    sortBy: string,
    descending: boolean,
    page: number,
    rowsNumber: number, // specifying this determines pagination is server-side
    rowsPerPage: number
  } = { sortBy: 'index', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }
  public colflotte: any[] = [
    {
      name: 'index',
      required: true,
      label: 'Num',
      align: 'left',
      field: '',
      sortable: true
    },
    { name: 'flotta', align: 'center', label: 'Flotta', field: 'flotta', sortable: true },  // da 8.1 a 8.8
    {
      name: 'date_gift_chat_open', align: 'center',
      label: '⏰ Gift Chat', field: 'date_gift_chat_open', sortable: true
    },
    { name: 'date_start', align: 'center', label: '⏰ Chiusura', field: 'date_start', sortable: true }, // 4/6/2020
    { name: 'sognatore', align: 'center', label: 'Sognatore', field: 'sognatore_nomecognome', sortable: true },             // Username Sognatore
    { name: 'provvisoria', align: 'center', label: 'Temp.', field: 'provvisoria', sortable: true },    // Flotta Provvisoria
    // { name: 'tutor', align: 'left', label: 'Tutor', field: 'tutor', sortable: true },
    // { name: 'mediatore', align: 'center', label: '🌀 Mediatore', field: '', sortable: true },
    { name: 'DoniConfermati', align: 'center', label: '🎁 OK', field: 'DoniConfermati', sortable: true },
    { name: 'DoniAttesaDiConferma', align: 'center', label: '🎁 Wait', field: 'DoniAttesaDiConferma', sortable: true },
    { name: 'DoniMancanti', align: 'center', label: '🎁 Miss', field: 'DoniMancanti', sortable: true },
    { name: 'msg_inviato', align: 'center', label: 'Msg Sent', field: 'msg_inviato', sortable: true },
  ]

  public coldonatori: any[] = [
    { name: 'nave', align: 'center', label: 'Nave', field: '', sortable: true },
    { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
    { name: 'num_tess', align: 'center', label: 'Tessitura', field: 'num_tess', sortable: true },
    { name: 'date_made_gift', align: 'center', label: 'Inviato', field: 'date_made_gift', sortable: true },
    { name: 'made_gift', align: 'center', label: 'Dono', field: 'made_gift', sortable: true },
  ]

  get getcol() {
    // if (tools.isMobile())
    //   return this.coldonatori_cell
    // else
    return this.coldonatori
  }

  public mounted() {
    this.flotta = this.flottaprop

    if (!!this.flotta) {
      this.last_riga_aperto = tools.getCookie('flotta_riga', '')
      this.last_col_aperto = tools.getCookie('flotta_col', '')
    }

    if (this.isaperto)
      this.apriflotta()
  }

  public aggiorna() {
    if (!!this.flotta) {
      this.tutor1 = this.flotta.tutor1
      this.tutor2 = this.flotta.tutor2
      this.tutor3 = this.flotta.tutor3
      this.tutorslo = this.flotta.tutorslo
      this.date_start = this.flotta.date_start
      this.date_close = this.flotta.date_close
      this.note_payment = this.flotta.note_payment
      this.revolut = this.flotta.revolut
      this.email_paypal = this.flotta.email_paypal
      this.payeer_id = this.flotta.payeer_id
      this.advcash_id = this.flotta.advcash_id
      this.link_payment = this.flotta.link_payment
      this.link_superchat = this.flotta.link_superchat
    }
  }

  public addstrnaveseprovv() {
    if (this.flotta.provvisoria)
      return ' (La FLOTTA è ancora Provvisoria !) '
    return ''
  }

  public getflottastr() {
    if (!!this.flotta) {
      let mystr = ''
      if (this.flotta.provvisoria)
        mystr += ' Provvisoria '
      mystr += 'Da ' + this.flotta.riga + '.' + Math.ceil(this.flotta.col_prima / 8) + ' a ' + this.flotta.riga + '.' + Math.ceil(this.flotta.col_ultima / 8)

      let perc = 0
      let conf = 0
      let tot = 0

      if (this.arrdonatori.length > 0) {
        tot = this.getDoniTotali()
        conf = this.getDoniConfermati()
      } else {
        tot = this.flotta.DoniTotali
        conf = this.flotta.DoniConfermati
      }

      if (tot > 0) {
        perc = Math.round((conf / tot) * 100)
      }

      mystr += ' (' + conf + '/' + tot + ') [' + perc + '%]'


      if (!!this.flotta.sognatore_nomecognome)
        mystr += ' - ' + this.flotta.sognatore_nomecognome
      return mystr
    } else
      return ''
  }

  public gettitoloflotta() {
    return 'Flotta ' + this.getflottastr()
  }

  get log_attivita() {
    if (!!this.flotta)
      return this.flotta.log_attivita
    else
      return ''
  }

  public getcolorflotta() {
    if (!!this.flotta) {
      if (this.flotta.DoniMancanti === 0 && this.flotta.DoniTotali === 0)
        return 'bg-orange'
      else if (this.flotta.DoniConfermati === this.flotta.DoniTotali && this.flotta.DoniTotali > 0)
        return 'bg-green'
      else if (this.flotta.DoniConfermati <= this.flotta.DoniTotali)
        return 'bg-red'
      else
        return 'bg-blue'
    }

  }

  public async apriflotta() {

    console.log('apriflotta')

    this.loading = true
    const ris = await GlobalStore.actions.GetFlotta({
      riga: this.flotta.riga,
      col_prima: this.flotta.col_prima,
      col_ultima: this.flotta.col_ultima
    })

    if (!!ris) {
      this.arrdonatori = ris.arrdonatori
      this.arrmediatori = ris.arrmediatori
      this.flotta = ris.flotta
      this.flotta.log_attivita = this.flotta.log_attivita.replace(/\n/g, '<br>')

    }

    this.aggiorna()
    this.loading = false

    if (!!this.flotta) {
      tools.setCookie('flotta_riga', this.flotta.riga)
      tools.setCookie('flotta_col', this.flotta.col_prima)
    }
  }

  get getnotifBotTxt() {
    return this.seluser.name + ' (' + this.seluser.surname + ') è stato sostituito con ' + this.username_sostituire
  }

  public getnave(row) {
    return tools.getRiganave(row.riga) + '.' + tools.getColnave(row.col)
  }

  public getnavestr(row, index) {
    let flottastr = tools.getRiganave(row.riga) + '.' + tools.getColnave(row.col) + ' D' + (((row.col - 1) % 8) + 1)

    if (this.showcoldati) {
      flottastr += ' ' + row.riga + '.' + row.col
    }

    return flottastr
  }

  public getwidthpos() {
    return (this.showcoldati) ? '80' : '60'
  }

  public HoRicevutoIlDono(rec, annulla) {
    this.seldonatore = rec
    let msgtitle = ''
    let msginvia = ''
    let mymsg = ''
    if (annulla) {
      msgtitle = 'Annulla la ricezione del dono'
      msginvia = `Confermi di annullare il Dono da parte di ${rec.name} ${rec.surname} (${rec.username})'`
      mymsg = ''
    } else {
      msgtitle = this.$t('dashboard.dono_ricevuto_2')
      msginvia = this.$t('dashboard.confermi_dono_ricevuto', {
        donatore: rec.name + ' ' + rec.surname
      })
      mymsg = this.$t('dashboard.confermi_dono_ricevuto_msg', {
        donatore: rec.name + ' ' + rec.surname + ' (' + this.$t('dashboard.posizione') + ' ' + rec.riga + '.' + rec.col + ')'
      })
      mymsg += ' [' + rec.riga + '.' + rec.col + ']'
    }

    tools.askConfirm(this.$q, msgtitle, msginvia + ' ' + '? (Pos ' + rec.riga + '.' + rec.col + ')', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DONO_RICEVUTO, 0, {
      param1: {
        _id: rec._id,
        made_gift: !annulla,
        annulla,
        riga: rec.riga,
        col: rec.col
      },
      param2: rec.username,
      param3: mymsg
    })

  }

  public clickseluser(rec) {
    this.seluser = rec
    this.showmsguser = true
    this.userfreestr = ''
  }

  public clicksostituisci(rec) {
    this.seluser = rec
    this.showsostituisci = true
    this.username_sostituire = ''
    this.userfreestr = ''
  }

  public viewdashboard(rec) {
    this.seluser = rec
    this.showdashboard = true
  }

  public Chiudi() {
    this.showmsguser = false
    this.showsostituisci = false
    this.showtesto = false
  }

  public async InviaMsgAUserConfirm(msgobj, navemediatore) {

    const msgtitle = translate('dialog.sendmsg')

    tools.askConfirm(this.$q, msgtitle, msgobj.msgpar1 + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_SINGOLO, 0, {
      param1: msgobj,
      param2: navemediatore
    })

  }

  get allowSubmit() {
    let error = this.$v.$error || this.$v.$invalid

    error = error || (this.username_sostituire === this.seluser.username_sostituire)

    return !error

  }

  public async InviaMsgAFlotta(inviareale, tipomsg, msg) {

    if ((tipomsg === tools.TipoMsg.SEND_MSG_EFFETTUA_IL_DONO) || (tipomsg === tools.TipoMsg.SEND_MSG_SOLLECITO_DONATORI_NO_DONO)) {
      msg = this.addstrnaveseprovv() + msg
    }
    const msgtitle = msg

    tools.askConfirm(this.$q, msgtitle, msg, translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_FLOTTA, 0, {
      param1: this.flotta,
      param2: { inviareale, inviaemail: this.inviaemail },
      param3: tipomsg
    })

  }

  public Callback() {
    this.loading = false
  }

  public ActionAfterYes(action, item, data) {
    console.log('ActionAfterYes...')
    if (action === lists.MenuAction.DONO_RICEVUTO) {
      if (!!this.seldonatore) {
        this.seldonatore.made_gift = true
      }
    }

    this.apriflotta()
  }

  get getarr() {
    let myarr = []
    if (this.ordinamento === 'data')
      myarr = this.arrdonatori.sort((a, b) => tools.gettimestampstrDate(a.date_made_gift) - tools.gettimestampstrDate(b.date_made_gift) * (this.direzordin))
    else if (this.ordinamento === 'num')
      myarr = this.arrdonatori.sort((a, b) => a.col - b.col * (this.direzordin))
    else if (this.ordinamento === 'nationality')
      myarr = this.arrdonatori.sort((a, b) => ('' + a.profile.nationality).localeCompare(b.profile.nationality) * (this.direzordin))
    else
      myarr = this.arrdonatori

    return myarr.filter((rec) => ((!this.tuttiidoni && !rec.made_gift) || (this.tuttiidoni)))
  }

  public exportLista() {
    let mystr = ''
    let nave = ''
    for (const rec of this.getarr) {
      if (this.getnave(rec) !== nave) {
        nave = this.getnave(rec)
        mystr += '\n' + nave + ': ' + '\n'
      }

      if (rec.made_gift) {
        mystr += '✅🎁'
      } else {
        if (!rec.date_made_gift) {
          mystr += '     👉🏻 '
        } else {
          mystr += '     🎁 '
        }
      }

      if (rec.profile.nationality === 'IT')
        mystr += '🇮🇹'
      else if (rec.profile.nationality === 'SI')
        mystr += '🇸🇮'
      else if (rec.profile.nationality === 'HR')
        mystr += '🇭🇷'
      else if (rec.profile.nationality === 'FR')
        mystr += '🇫🇷'
      else if (rec.profile.nationality === 'ES')
        mystr += '🇪🇸'
      else if (rec.profile.nationality === 'PT')
        mystr += '🇵🇹'
      else if (rec.profile.nationality === 'DE')
        mystr += '🇩🇪'
      else if (rec.profile.nationality === 'UK')
        mystr += '🇬🇧'
      else if (rec.profile.nationality === 'GB')
        mystr += '🇬🇧'
      else if (rec.profile.nationality === 'IE')
        mystr += '🇮🇪'
      else if (rec.profile.nationality === 'KE')
        mystr += '🇰🇪'
      else if (rec.profile.nationality === 'AU')
        mystr += '🇦🇺'
      else if (rec.profile.nationality === 'CM')
        mystr += '🇨🇲'
      else if (rec.profile.nationality === 'CO')
        mystr += '🇨🇴'
      else if (rec.profile.nationality === 'BR')
        mystr += '🇧🇷'
      else if (rec.profile.nationality === 'PL')
        mystr += '🇵🇱'
      else if (rec.profile.nationality === 'VE')
        mystr += '🇻🇪'
      else
        mystr += '(' + rec.profile.nationality + ')'

      mystr += ' ' + rec.name + ' ' + rec.surname + ' (' + rec.username + ')'

      mystr += '\n'
    }

    tools.copyStringToClipboard(this, mystr, false)
  }

  public getDoniAttesaDiConferma() {
    return this.arrdonatori.filter((rec) => (!!rec.date_made_gift && !rec.made_gift)).reduce((sum, item) => sum + 1, 0)
  }

  public getDoniTotali() {
    return this.arrdonatori.filter((rec) => (!!rec)).reduce((sum, item) => sum + 1, 0)
  }

  public getDoniConfermati() {
    return this.arrdonatori.filter((rec) => rec.made_gift).reduce((sum, item) => sum + 1, 0)
  }

  public getDoniMancanti() {
    return this.arrdonatori.filter((rec) => (!rec.made_gift && !rec.date_made_gift)).reduce((sum, item) => sum + 1, 0)
  }

  public setordin(ord) {
    this.ordinamento = ord
    if (this.direzordin === 1)
      this.direzordin = -1
    else
      this.direzordin = 1
  }

  public InviaMsgAUser() {

    if (!this.msg_tosend_user)
      return

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_MSG_SINGOLO,
      msgpar1: this.msg_tosend_user,
      username: this.seluser.username,
      inviareale: true,
      username_mitt: '',
    }

    msgobj.username_mitt = UserStore.state.my.username

    const naveuser = this.seluser

    this.InviaMsgAUserConfirm(msgobj, naveuser)
  }

  get isAdmin() {
    return UserStore.state.isAdmin
  }

  get isManager() {
    return UserStore.state.isManager
  }

  get isTutor() {
    return UserStore.state.isTutor
  }

  get isTratuttrici() {
    return UserStore.state.isTratuttrici
  }

  public async SostituisciUtente(user, usernamesost, notifBottxt) {
    usernamesost = usernamesost.trim()

    await tools.askConfirm(this.$q, 'Sostituisci', notifBottxt + ' ?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.SOSTITUISCI, 0, {
      param1: user,
      param2: {
        username: usernamesost,
        username_da_sostituire: user.username,
        riga: user.riga,
        col: user.col,
        notifBot: this.notifBot,
        inviaemail: this.inviaemail,
        deleteUser: this.deleteUser,
        AddImbarco: this.AddImbarco,
      },
      param3: notifBottxt
    })
  }

  public async TrovaUserFree(username) {

    this.ChiamaFunz(null, lists.MenuAction.DAMMI_PRIMO_UTENTE_LIBERO, null)

  }

  public async ChiamaFunz(username, func, data) {

    const mydatatosave = {
      username,
      ind_order: -1,
      myfunc: func,
      notifBot: null,
      data: null
    }

    if (!!data) {
      mydatatosave.data = data
    }

    this.loading = true

    GlobalStore.actions.askFunz({ mydata: mydatatosave }).then((ris) => {
      this.loading = false
      if (ris) {
        if (func === lists.MenuAction.DAMMI_PRIMO_UTENTE_LIBERO) {
          this.userfreestr = ris.username + ' (' + ris.name + ' ' + ris.surname + ')'
          this.username_sostituire = ris.username
        }
      }
    })
  }

  public async Mostraplacca(riga, col) {
    const data = {
      riga,
      col
    }
    this.showtesto = true
    this.seltesto = await GlobalStore.actions.GetData({ data })
  }

  public change_link_payment() {
    if (this.flotta.link_payment !== this.link_payment) {
      this.flotta.link_payment = this.link_payment

      const mydata = {
        link_payment: this.flotta.link_payment
      }
      tools.saveFieldToServer(this, 'flotte', this.flotta._id, mydata)
    }
  }

  public change_field(fieldname) {
    console.log('fieldname', this.date_start, this.flotta[fieldname], this[fieldname])
    if (this.flotta[fieldname] !== this[fieldname]) {
      this.flotta[fieldname] = this[fieldname]

      const mydata = {
        [fieldname]: this.flotta[fieldname]
      }
      tools.saveFieldToServer(this, 'flotte', this.flotta._id, mydata)
    }
  }

  public change_link_superchat() {
    if (this.flotta.link_superchat !== this.link_superchat) {
      this.flotta.link_superchat = this.link_superchat
      const mydata = {
        link_superchat: this.flotta.link_superchat
      }
      tools.saveFieldToServer(this, 'flotte', this.flotta._id, mydata)
    }
  }

  get isaperto() {
    let open = false
    if (!!this.flotta)
      open = (this.flotta.riga.toString() === this.last_riga_aperto) && (this.flotta.col_prima.toString() === this.last_col_aperto)

    // console.log('isaperto', open, 'lastriga = ', this.last_riga_aperto, this.flotta.riga, 'last_col_aperto', this.last_col_aperto, this.flotta.col_prima)
    return open

  }

  public async update_nave() {
    this.Chiudi()
    this.apriflotta()
  }

  public async EseguiCallServer() {
    this.Chiudi()
    this.loading = true
  }

  public getnamebyrec(rec) {
    let mystr = rec.name + ' ' + rec.surname
    if (this.showcoldati)
      mystr += ' (' + rec.username + ')'

    return mystr
  }

  public getwidthnome() {
    if (this.showcoldati)
      return 'width: 250px; '
    else
      return 'width: 200px; '
  }

}
