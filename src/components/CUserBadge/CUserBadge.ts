import Vue from 'vue'
import { GlobalStore } from '@store'
import { UserStore } from '../../store/Modules'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '@src/store/Modules/toolsext'

import { validationMixin } from 'vuelidate'

import MixinBase from '../../mixins/mixin-base'
import { IUserFields } from '../../model'
import { shared_consts } from '../../common/shared_vuejs'
import { tools } from '../../store/Modules/tools'
import { CCardState } from '../CCardState'

@Component({
  name: 'CUserBadge',
  components: { CCardState }
})

export default class CUserBadge extends MixinBase {
  @Prop({ required: true }) public index: number
  @Prop({ required: false, default: false }) public yourinvite: boolean
  @Prop({ required: true }) public user: IUserFields
  @Prop({ required: true }) public numpeople: number
  @Prop({ required: true }) public mycolor: string
  @Prop({ required: false, default: true }) public showsteps: boolean
  @Prop({ required: false, default: true }) public showregalainv: boolean
  @Prop({ required: false, default: -1 }) public ind_order_ingr: number
  @Prop({ required: false, default: -1 }) public id_listaingr: number
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
    /*if (!!user.username)
      return ' (' + user.ind_order + ')'
    else
      return ''
      */
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
      return (this.getnumpeople(user) >= 2) ? 'green' : 'grey'
  }

  public isextralist(user) {
    return !!user.cell_complete
  }

  public getnumpeople(user) {
    return user.numinvitati
  }

  public getusername(user) {
    if (this.isextralist(user)) {
      return user.cell_complete
    } else {
      return user.username
    }
  }

  public execclick(user) {
    this.$emit('myclick', user, this.showregalainv, this.ind_order_ingr, this.id_listaingr)
  }

  public getnumreq(user) {
    let val = tools.getnumrequisiti(user)

    if (val === 7) {
      val += user.numinvitati >= 2 ? 1 : 0
      val += user.numinvitatiattivi >= 2 ? 1 : 0
    }

    return val
  }

  public getnumperc(user) {
    let perc = (this.getnumreq(user) / 9) * 100

    // console.log('numperc', perc)
    return perc
  }

  public getnumpercpeople(user) {
    if (user.numinvitati > 2)
      return 100
    else
      return (user.numinvitati / 2) * 100
  }

  public getcolorpeople(user){
    if (user.numinvitati === 1)
      return 'blue'
    else if (user.numinvitati === 2)
      return 'green'
    else if (user.numinvitati > 2)
      return 'green'

  }

  public getcolor(user) {
    let mycol = this.getnumreq(user) === 7 ? 'orange' : 'red'

    if (user.numinvitati >= 2) {
      mycol = 'blue'
    }
    if (user.numinvitatiattivi >= 2) {
      mycol = 'green'
    }

    return mycol
  }

}
