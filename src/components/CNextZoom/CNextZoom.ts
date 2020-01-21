import { Component, Prop, Watch } from 'vue-property-decorator'
import { INotData } from '../../model/index'
import { tools } from '../../store/Modules/tools'
import { NotevoleStore } from '@store'
import MixinBase from '@src/mixins/mixin-base'
import { validationMixin } from 'vuelidate'
import { validations } from '../CSignUpNotevole/CSignUp-validate'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { UserStore } from '../../store/Modules'
import { GlobalStore } from '../../store'

@Component({
  name: 'CStatusReg',
  components: { CTitleBanner, CCardState }
})

export default class CNextZoom extends MixinBase {
  public $t

  get listacalzoom() {
    return GlobalStore.state.calzoom
  }

  get nextconf() {
    if (!!this.listacalzoom) {
      return tools.getstrTime(this.listacalzoom[0].date_start)
    }
  }
}
