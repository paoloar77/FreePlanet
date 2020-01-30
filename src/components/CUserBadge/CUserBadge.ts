import Vue from 'vue'
import { GlobalStore } from '@store'
import { UserStore } from '../../store/Modules'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '@src/store/Modules/toolsext'

import { validationMixin } from 'vuelidate'

import MixinBase from '../../mixins/mixin-base'
import { IUserFields } from '../../model'

@Component({
  name: 'CUserBadge',
  components: {  }
})

export default class CUserBadge extends MixinBase {
  @Prop({ required: true }) public index: number
  @Prop({ required: false, default: false }) public yourinvite: boolean
  @Prop({ required: true }) public user: IUserFields
  @Prop({ required: true }) public numpeople: number
  @Prop({ required: true }) public mycolor: string
  public $v
  public $t: any

  public getletter(user) {
    return user.name[0].toUpperCase()
  }

  public getnumber(user, index) {
    return index
  }

  public getstatecolor(user) {
    return (user.profile.teleg_id) ? 'green' : 'gray'
  }

  public getmoneycolor(user) {
    return (user.made_gift) ? 'green' : 'gray'
  }

  get madegift() {
    return UserStore.state.my.made_gift
  }

  public getzoomcolor(user) {
    return (user.profile.saw_zoom_presentation) ? 'green' : 'gray'
  }

  public get2peoplecolor() {
    return (this.getnumpeople() >= 2) ? 'green' : 'gray'
  }

  public getnumpeople() {
    return this.numpeople
  }

}
