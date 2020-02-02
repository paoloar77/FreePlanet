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
    if (!user)
      return ''
    if (!!user.name[0])
      return user.name[0].toUpperCase()
    else
      return ''
  }

  public getnumber(user, index) {
    return index
  }

  public getstatecolor(user) {
    if (user.profile)
      return (user.profile.teleg_id) ? 'green' : 'grey'
    else
      return 'grey'
  }

  public getindorder(user) {
    if (!!user.ind_order)
      return ' (' + user.ind_order + ')'
    else
      return ''
  }

  public getmoneycolor(user) {
    return (user.made_gift) ? 'green' : 'grey'
  }

  get madegift() {
    return UserStore.state.my.made_gift
  }

  public getzoomcolor(user) {
    if (user.profile)
      return (user.profile.saw_zoom_presentation) ? 'green' : 'grey'
    else
      return 'grey'
  }

  public get2peoplecolor(user) {
    if (this.isextralist(user))
      return 'grey'
    else
      return (this.getnumpeople() >= 2) ? 'green' : 'grey'
  }

  public isextralist(user) {
    return !!user.cell_complete
  }

  public getnumpeople() {
    return this.numpeople
  }

  public getusername(user) {
    if (this.isextralist(user)) {
      return user.cell_complete
    } else {
      return user.username
    }
  }

  public execclick(user) {
    this.$emit('myclick', user)
  }

}
