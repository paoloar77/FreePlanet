import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import MixinBase from '../../../mixins/mixin-base'
import { CMyDashboard } from '../../../components/CMyDashboard'

@Component({
  components: { CMyDashboard }
})

export default class Dashboard extends MixinBase {
  public $v
  public $q
}
