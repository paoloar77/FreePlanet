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
import { CMyNave } from '../../../components/CMyNave'
import { lists } from '../../../store/Modules/lists'

const namespace = 'CalendarModule'

@Component({
  components: { CTitle, CTitleBanner, CMyNave },
  mixins: []
})
export default class Listadoninavi extends MixinBase {
  public $t: any
  public $q
  public incaricamento: boolean = false
  public loading: boolean = false
  public showdonatori: boolean = false
  public showmsguser: boolean = false
  public arrdoninavi = []
  public selrec = null
  public seluser = null
  public seldonatore = null
  public msg_tosend: string = ''
  public msg_tosend_user: string = ''
  public showtesto: boolean = false
  public seltesto: string = ''
  public pagination = {
    sortBy: 'desc',
    descending: false,
    page: 2,
    rowsPerPage: 10
    // rowsNumber: xx if getting data from a server
  }

  public pagination2 = {
    sortBy: 'desc',
    descending: false,
    page: 2,
    rowsPerPage: 8
    // rowsNumber: xx if getting data from a server
  }

  public coldoninavi: any[] = [
    {
      name: 'index',
      required: true,
      label: 'Num',
      align: 'left',
      field: '',
      sortable: true
    },
    { name: 'rigacol', align: 'center', label: 'Nave', field: 'riga', sortable: true },
    {
      name: 'date_gift_chat_open',
      align: 'center',
      label: '⏰ Gift Chat',
      field: 'date_gift_chat_open',
      sortable: true
    },
    { name: 'date_start', align: 'center', label: '⏰ Partenza', field: 'date_start', sortable: true },
    { name: 'provvisoria', align: 'center', label: 'Temp.', field: 'provvisoria', sortable: true },
    { name: 'tutor', align: 'left', label: 'Tutor', field: 'tutor', sortable: true },
    { name: 'mediatore', align: 'center', label: '🌀 Mediatore', field: '', sortable: true },
    { name: 'sognatore', align: 'center', label: 'Sognatore', field: '', sortable: true },
    { name: 'donatori', align: 'center', label: 'Donatori', field: '', sortable: true },
    { name: 'DoniAttesaDiConferma', align: 'center', label: '🎁 Wait', field: 'DoniAttesaDiConferma', sortable: true },
    { name: 'DoniMancanti', align: 'center', label: '🎁 Miss', field: 'DoniMancanti', sortable: true },
    { name: 'DoniConfermati', align: 'center', label: '🎁 OK', field: 'DoniConfermati', sortable: true },
    { name: 'note_bot', align: 'left', label: 'Note Placca', field: 'note_bot', sortable: true },
    { name: 'note_interne', align: 'left', label: 'Note Interne', field: 'note_interne', sortable: true },
  ]

  public coldonatori: any[] = [
    {
      name: 'index',
      required: true,
      label: 'Num',
      align: 'left',
      field: 'index',
      sortable: true
    },
    { name: 'rigacol', align: 'center', label: 'Posizione', field: '', sortable: true },
    { name: 'name', align: 'center', label: 'Nome', field: 'name', sortable: true },
    { name: 'num_tess', align: 'center', label: 'Tessitura', field: 'num_tess', sortable: true },
    { name: 'date_made_gift', align: 'center', label: 'Inviato', field: 'date_made_gift', sortable: true },
    { name: 'made_gift', align: 'center', label: 'Dono', field: 'made_gift', sortable: true },
  ]

  public async mounted() {

    this.Ricalcola(false)
  }

  public async Ricalcola(ricalcola) {
    this.loading = true
    // this.$q.loading.show({ message: this.$t('otherpages.update') })

    const ris = await GlobalStore.actions.GetArrDoniNavi({ ricalcola })
    console.log('ris', ris)
    this.arrdoninavi = ris.arrnavi

    // this.$q.loading.hide()

    this.loading = false
  }

  public deveDonare(rec) {
    return (rec.ind_order !== this.selrec.donatore.recmediatore.ind_order && rec.num_tess === 2)
  }

  public clickdonatori(rec) {
    this.selrec = rec
    this.showdonatori = true
  }

  public EsistonoDonatori(rec) {
    return !!rec.donatore.arrdonatori ? !!rec.donatore.arrdonatori[0].name : false
  }

  public clickseluser(rec) {
    this.seluser = rec
    this.showmsguser = true
  }

  public HoRicevutoIlDono(rec) {
    this.seldonatore = rec
    const msgtitle = this.$t('dashboard.dono_ricevuto_2')
    const msginvia = this.$t('dashboard.confermi_dono_ricevuto', {
      donatore: rec.name + ' ' + rec.surname
    })

    tools.askConfirm(this.$q, msgtitle, msginvia + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DONO_RICEVUTO, 0, {
      param1: {
        _id: rec._id,
        made_gift: true
      },
      param2: '',
      param3: ''
    })

  }

  public Chiudi() {
    this.showdonatori = false
    this.seldonatore = null
    this.showtesto = false
  }

  public ActionAfterYes(action, item, data) {
    console.log('ActionAfterYes...')
    if (action === lists.MenuAction.DONO_RICEVUTO) {
      if (!!this.seldonatore) {
        this.seldonatore.made_gift = true
      }
    }
  }

  public async InviaMsgANave(msgobj, navemediatore) {

    const msgtitle = translate('dialog.sendmsg')

    tools.askConfirm(this.$q, msgtitle, msgobj.msgpar1 + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_DONATORI, 0, {
      param1: msgobj,
      param2: navemediatore,
    })

  }

  public async InviaMsgAUserConfirm(msgobj, navemediatore) {

    const msgtitle = translate('dialog.sendmsg')

    tools.askConfirm(this.$q, msgtitle, msgobj.msgpar1 + ' ' + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_SINGOLO, 0, {
      param1: msgobj,
      param2: navemediatore,
    })

  }

  public InviaMsgADonatori() {

    if (!this.msg_tosend)
      return

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_MSG,
      msgpar1: this.msg_tosend,
      inviareale: true,
    }

    const navemediatore = this.selrec.donatore.recmediatore

    this.InviaMsgANave(msgobj, navemediatore)
  }

  public InviaMsgAUser() {

    if (!this.msg_tosend_user)
      return

    const msgobj = {
      tipomsg: tools.TipoMsg.SEND_MSG_SINGOLO,
      msgpar1: this.msg_tosend_user,
      username: this.seluser.username,
      inviareale: true,
    }

    const naveuser = this.seluser

    this.InviaMsgAUserConfirm(msgobj, naveuser)
  }

  public SaveField(rec, table, myfield) {
    if (!!rec) {
      const mydata = {}
      mydata[myfield] = rec[myfield]
      // console.log('mydata', mydata, 'id', rec._id)
      tools.saveFieldToServer(this, table, rec._id, mydata)
    }
  }

  public async Mostraplacca(riga, col) {
    const data = {
      riga,
      col
    }
    this.showtesto = true
    this.seltesto = await GlobalStore.actions.GetData({ data })
  }

}
