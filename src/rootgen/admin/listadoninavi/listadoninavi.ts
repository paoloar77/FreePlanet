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

const namespace = 'CalendarModule'

@Component({
  components: { CTitle, CTitleBanner, CMyNave },
  mixins: []
})
export default class Listadoninavi extends MixinBase {
  public $t: any
  public $q
  public incaricamento: boolean = false
  public myloadingload: boolean = false
  public arrdoninavi = []
  public MyPagination: {
    sortBy: string,
    descending: boolean,
    page: number,
    rowsNumber: number, // specifying this determines pagination is server-side
    rowsPerPage: number
  } = { sortBy: 'index', descending: false, page: 1, rowsNumber: 10, rowsPerPage: 10 }
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
    { name: 'date_gift_chat_open', align: 'center', label: '⏰ Gift Chat', field: 'date_gift_chat_open', sortable: true },
    { name: 'date_start', align: 'center', label: '⏰ Partenza', field: 'date_start', sortable: true },
    { name: 'mediatore', align: 'center', label: '🌀 Mediatore', field: '', sortable: true },
    { name: 'sognatore', align: 'center', label: 'Sognatore', field: '', sortable: true },
    { name: 'DoniAttesaDiConferma', align: 'center', label: '🎁 Wait', field: 'DoniAttesaDiConferma', sortable: true },
    { name: 'DoniMancanti', align: 'center', label: '🎁 Mancano', field: 'DoniMancanti', sortable: true },
    { name: 'DoniConfermati', align: 'center', label: '🎁 OK', field: 'DoniConfermati', sortable: true },
  ]

  public async mounted() {
    this.incaricamento = true
    this.$q.loading.show({ message: this.$t('otherpages.update') })

    const ris = await GlobalStore.actions.GetArrDoniNavi()
    console.log('ris', ris)
    this.arrdoninavi = ris.arrnavi

    this.$q.loading.hide()

    this.incaricamento = false

  }

}
