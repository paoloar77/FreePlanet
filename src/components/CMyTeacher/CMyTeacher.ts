import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { GlobalStore, UserStore } from '../../store/Modules'
import { CMyAvatar } from '../CMyAvatar'
import MixinBase from '../../mixins/mixin-base'
import MixinOperator from '../../mixins/mixin-operator'
import MixinUsers from '../../mixins/mixin-users'


@Component({
  name: 'CMyTeacher',
  mixins: [MixinBase, MixinOperator, MixinUsers],
  components: { CMyAvatar }
})

export default class CMyTeacher extends MixinOperator {
  @Prop({ required: true, default: '' }) public username

  public showuserdetails = false
  public autoplaydiscsaved: number
  public tab: string = 'one'

  @Watch('showuserdetails')
  public changeshowuserdetails() {
    if (!this.showuserdetails) {
      GlobalStore.state.autoplaydisc = this.autoplaydiscsaved
    }
  }

  public executeclick(event) {
    console.log('executeclick')
    this.showuserdetails = true

    this.autoplaydiscsaved = GlobalStore.state.autoplaydisc
    GlobalStore.state.autoplaydisc = 0
  }

  get myop() {
    return this.getOperatorByUsername(this.username)
  }
}
