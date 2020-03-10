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
  public myguideline: boolean = false

  get static_data() {
    return static_data
  }

  public created() {
     this.aggiorna_guideline()
  }

  public aggiorna_guideline() {
    this.myguideline = tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)
  }

  public changeval(value) {
    console.log('PRIMA saw_and_accepted', UserStore.state.my.profile.saw_and_accepted)
    if (value)
      UserStore.state.my.profile.saw_and_accepted = tools.SetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)
    else
      UserStore.state.my.profile.saw_and_accepted = tools.UnSetBit(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)

    const mydata = {
      'profile.saw_and_accepted': UserStore.state.my.profile.saw_and_accepted
    }
    this.aggiorna_guideline()

    console.log('DOPO saw_and_accepted', UserStore.state.my.profile.saw_and_accepted)

    tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)
  }

}
