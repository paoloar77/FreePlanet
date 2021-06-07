import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'
import { UserStore } from '../../store'
import { CCopyBtn } from '../CCopyBtn'

@Component({
  name: 'CCardState',
  components: { CCopyBtn }
})

export default class CVerifyTelegram extends MixinBase {
  public $t
  public $q

  get TelegCode() {
    if (UserStore.state.my.profile) {
      return UserStore.state.my.profile.teleg_checkcode
    }else {
      return 0
    }
  }

  get TelegVerificato() {
    return UserStore.state.my.profile.teleg_id > 0
  }

  get getLinkBotTelegram() {
    const link = this.getValDb('TELEG_BOT_LINK', false)
    // console.log('link', link)
    return link
  }
  get isEmailVerified() {
    return UserStore.state.my.verified_email
  }

}
