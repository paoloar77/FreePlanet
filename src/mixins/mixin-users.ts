import Vue from 'vue'
import { GlobalStore, UserStore } from '../store/Modules'

import Component from 'vue-class-component'

// You can declare a mixin as the same style as components.
@Component
export default class MixinUsers extends Vue {
  public getUserByUsername(username) {
    return UserStore.getters.getNameSurnameByUsername(username)
  }
  public getImgByUsername(username) {
    return `statics/` + UserStore.getters.getImgByUsername(username)
  }
  public getMyUsername() {
    return UserStore.state.my.username
  }
  get getMyImg() {
    return UserStore.getters.getImgByUsername(UserStore.state.my.username)
  }
  get MenuCollapse() {
    return GlobalStore.state.menuCollapse
    // return true
  }
  get Username() {
    return UserStore.state.my.username
  }
  get myName() {
    return UserStore.state.my.name
  }
  get mySurname() {
    return UserStore.state.my.surname
  }
  get Verificato() {
    return UserStore.state.my.verified_email
  }
  get Email() {
    return UserStore.state.my.email
  }
}
