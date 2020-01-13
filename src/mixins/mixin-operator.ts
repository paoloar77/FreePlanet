import Vue from 'vue'

import Component from 'vue-class-component'
import { CalendarStore } from '../store/Modules'
import { UserStore } from '@modules'
import MixinMetaTags from './mixin-metatags'
import { CImgText, CTitle, CCardOperator } from '@components'
import { tools } from '@src/store/Modules/tools'

@Component({
  components: { CImgText, CTitle, CCardOperator }
})

export default class MixinOperator extends MixinMetaTags {
  public $q
  public $t: any

  get mythis() {
    return this
  }

  get tools() {
    return tools
  }

  get isEstate(){
    const now = new Date()
    return (now.getMonth() === 5) || (now.getMonth() === 6) || (now.getMonth() === 7) || (now.getMonth() === 8)
  }

  get isEstateRiprenderanno(){
    const now = new Date()
    return (now.getMonth() === 9)
  }

  public getOperators() {
    return CalendarStore.state.operators
  }

  public getOperatorByUsername(username) {
    return CalendarStore.getters.getOperatorByUsername(username)
  }

  public getImgTeacherByUsername(username) {
    return `statics/images/` + CalendarStore.getters.getImgTeacherByUsername(username)
  }

  public getTeacherByUsername(username) {
    const op = this.getOperatorByUsername(username)
    if (!!op) {
      return op.name + ' ' + op.surname
    } else {
      return ''
    }
  }

}
