import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'
import { UserStore } from '../../store'

@Component({
  components: {  }
})

export default class CVerifyEmail extends MixinBase {
  public $t
  public $q

  get isEmailVerified() {
    return UserStore.state.my.verified_email
  }

}
