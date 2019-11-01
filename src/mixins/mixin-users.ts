import Vue from 'vue'
import { GlobalStore, UserStore, MessageStore } from '../store/Modules'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { IMessage } from '@src/model'

// You can declare a mixin as the same style as components.
@Component
export default class MixinUsers extends Vue {
  public mythis() {
    return this
  }

  get func_tools() {
    return func_tools
  }

  get tools() {
    return tools
  }

  public getUserByUsername(username) {
    return UserStore.getters.getNameSurnameByUsername(username)
  }

  public getImgByUsername(username) {
    return `statics/` + UserStore.getters.getImgByUsername(username)
  }

  public isValidUsername(username) {
    return username && username !== 'nessuno' && username !== 'none'
  }

  public getMyUsername() {
    return UserStore.state.my.username
  }

  public getUsernameChatByMsg(msg: IMessage) {
    if (msg) {
      if (msg.dest.username !== this.getMyUsername())
        return msg.dest.username
      else
        return msg.origin.username
    } else {
      return ''
    }
  }

  public getImgByMsg(msg: IMessage) {
    return `statics/` + UserStore.getters.getImgByUsername(this.getUsernameChatByMsg(msg))
  }

  get getMyImg() {
    return 'statics/' + UserStore.getters.getImgByUsername(UserStore.state.my.username)
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

  get getNumMsg() {
    return MessageStore.getters.getlasts_messages().length
  }

  get getNumMsgUnread() {
    // return UserStore.getters.getlasts_messages().length
    return MessageStore.getters.getnumMsgUnread()
  }

  public getMsgText(msg: IMessage, inarray: boolean) {
    let add = ''
    if (msg.origin.username === this.getMyUsername())
      add = 'Tu: '

    const ris = add + msg.message
    if (inarray)
      return [ris]
    else
      return ris
  }


}
