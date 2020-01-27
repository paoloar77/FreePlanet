import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import MixinBase from '../../../mixins/mixin-base'
import { CMyFieldDb, CTitleBanner, CProfile, CStatus } from '@components'
import { UserStore } from '../../../store/Modules'

@Component({
  components: { CProfile, CTitleBanner, CMyFieldDb, CStatus }
})

export default class Profile extends MixinBase {
  public $v
  public $q

  public mythis() {
    return this
  }

  get getpayment() {
    return UserStore.state.my.profile.paymenttypes
  }
  get profile() {
    return UserStore.state.my.profile
  }

}
