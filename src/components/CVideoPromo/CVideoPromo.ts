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
import { CVideo } from '../CVideo'

@Component({
  mixins: [MixinBase],
  components: { CMyPage, CTitleBanner, CImgText, CMyFieldDb, CVideo }
})
export default class CVideoPromo extends MixinBase {
  @Prop({required: false, default: false}) public showconditions: boolean
  public $t: any
  public $q
  public msg: string = ''
  public accetta_saw_video: boolean = false

  get static_data() {
    return static_data
  }

  public created() {
    this.aggiorna()
  }

  public aggiorna() {
    this.accetta_saw_video = tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
  }

  public changeval(value) {
    if (value)
      UserStore.state.my.profile.saw_and_accepted = tools.SetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
    else
      UserStore.state.my.profile.saw_and_accepted = tools.UnSetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)

    const mydata = {
      'profile.saw_and_accepted': UserStore.state.my.profile.saw_and_accepted
    }

    tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)
  }

}
