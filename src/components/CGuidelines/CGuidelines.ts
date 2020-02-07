import { Component, Prop } from 'vue-property-decorator'

import { CMyPage } from '../CMyPage/index'

import { tools } from '../../store/Modules/tools'
import { Screen } from 'quasar'
import { CCopyBtn, CImgText, CTitleBanner } from '@components'
import MixinBase from '../../mixins/mixin-base'
import { static_data } from '../../db/static_data'
import { UserStore } from '@modules'
import { CMyFieldDb } from '../CMyFieldDb'
import { shared_consts } from '../../common/shared_vuejs'

@Component({
  mixins: [MixinBase],
  components: { CMyPage, CTitleBanner, CImgText, CMyFieldDb }
})
export default class CGuidelines extends MixinBase {
  @Prop({required: false, default: false}) public showconditions: boolean
  public $t: any
  public $q
  public msg: string = ''

  get static_data() {
    return static_data
  }

  get accetta_guideline() {
    return tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES)
  }

  set accetta_guideline(value) {
    if (value)
      UserStore.state.my.profile.saw_and_accepted = tools.SetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES)
    else
      UserStore.state.my.profile.saw_and_accepted = tools.UnSetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES)

    const mydata = {
      'profile.saw_and_accepted': UserStore.state.my.profile.saw_and_accepted
    }

    tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)
  }

}
