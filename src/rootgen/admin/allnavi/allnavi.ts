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
export default class Allnavi extends MixinBase {
  public $t: any
  public $q
  public myloadingload: boolean = false
  public ris = {}

  public async mounted() {
    this.ris = await GlobalStore.actions.GetArrNavi()
  }
}
