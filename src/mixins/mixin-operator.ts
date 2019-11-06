import Vue from 'vue'

import Component from 'vue-class-component'
import { CalendarStore } from '../store/Modules'
import { UserStore } from '@modules'

@Component
export default class MixinOperator extends Vue {
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
