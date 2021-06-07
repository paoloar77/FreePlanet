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
import { CMyFlotta } from '../../../components/CMyFlotta'

const namespace = 'CalendarModule'

@Component({
  components: { CTitle, CTitleBanner, CMyNave, CMyFlotta },
  mixins: []
})
export default class Listaflotte extends MixinBase {
  public $t: any
  public $q
  public incaricamento: boolean = false
  public loading: boolean = false
  public showall: boolean = false
  public tutteleflotte: boolean = false
  public mostratemporanee: boolean = false
  public arrflotte = []
  public async mounted() {

    this.Ricalcola(false)
  }

  public async Ricalcola(ricalcola) {
    this.loading = true
    // this.$q.loading.show({ message: this.$t('otherpages.update') })

    this.arrflotte = await GlobalStore.actions.GetFlotte({ ricalcola, showall: this.showall })

    console.log('this.arrflotte', this.arrflotte)

    // this.$q.loading.hide()

    this.loading = false
  }

  public SaveField(rec, table, myfield) {
    if (!!rec) {
      const mydata = {}
      mydata[myfield] = rec[myfield]
      // console.log('mydata', mydata, 'id', rec._id)
      tools.saveFieldToServer(this, table, rec._id, mydata)
    }
  }

}
