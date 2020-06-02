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

@Component({
  mixins: [validationMixin],
  validations,
  components: { CTitleBanner, CMyChipList, CVideo }
})

export default class CMyFlotta extends MixinNave {
  @Prop({ required: false, default: null }) public flottaprop
  public $t
  public $v
  public flotta: any = null
  public flotta_completa: any = null
  public arrdonatori: any[] = []
  public loading: boolean = false
  public seluser = null
  public showmsguser: boolean = false
  public username_sostituire: string = ''
  public userfreestr: string = ''
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

  get getcol() {
    // if (tools.isMobile())
    //   return this.coldonatori_cell
    // else
    return this.coldonatori
  }

  public mounted() {
    this.flotta = this.flottaprop
    this.aggiorna()
  }

  public aggiorna() {

  }

  public getflottastr() {
    if (!!this.flotta)
      return 'Da ' + this.flotta.riga + '.' + this.flotta.col_prima + ' a ' + this.flotta.riga + '.' + this.flotta.col_ultima
    else
      return ''
  }

  public gettitoloflotta() {
    return 'Flotta ' + this.getflottastr()
  }

  public getcolorflotta() {
    return 'bg-blue'
  }

  public async apriflotta() {

    console.log('apriflotta')

    this.loading = true
    this.arrdonatori = await GlobalStore.actions.GetFlotta({ riga: this.flotta.riga, col_prima: this.flotta.col_prima, col_ultima: this.flotta.col_ultima })

    this.aggiorna()
    this.loading = false
  }

  public getnavestr(row) {
    return tools.getRiganave(row.riga) + '.' + tools.getColnave(row.col)
  }

  public getlinkchat(row) {
    return row.link_superchat
  }

  public clickseluser(rec) {
    this.seluser = rec
    this.showmsguser = true
    this.username_sostituire = ''
    this.userfreestr = ''
  }
  get allowSubmit() {
    let error = this.$v.$error || this.$v.$invalid

    error = error || (this.username_sostituire === this.seluser.username_sostituire)

    return !error

  }

  public async InviaMsgAFlotta(inviareale) {

    const msgtitle = translate('dialog.sendmsg')

    let msg = 'TEST msg alla Flotta ?';

    if (inviareale) {
      msg = 'Inviare a Tutta la Flotta il messaggio ?'
    }

    tools.askConfirm(this.$q, msgtitle, msg , translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.INVIA_MSG_A_FLOTTA, 0, {
      param1: this.flotta,
      param2: inviareale,
      param3: tools.TipoMsg.SEND_MSG_EFFETTUA_IL_DONO
    })

  }

}
