import Vue from 'vue'
import { GlobalStore, UserStore, MessageStore, Products } from '../store/Modules'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { IMessage } from '@src/model'

// You can declare a mixin as the same style as components.
@Component
export default class MixinUsers extends Vue {
  get mythis() {
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

  get getnumItemsCart() {
    const arrcart = Products.state.cart
    if (!!arrcart) {
      if (!!arrcart.items) {
        const total = arrcart.items.reduce((sum, item) => sum + item.order.quantity, 0)
        return total
      }
    }
    return 0
  }

  public getImgByMsg(msg: IMessage) {
    return `statics/` + UserStore.getters.getImgByUsername(this.getUsernameChatByMsg(msg))
  }

  get getMyImg() {
    const ris = UserStore.getters.getImgByUsername(UserStore.state.my.username)
    return (ris !== '') ? 'statics/' + ris : ''
  }

  get getMyImgforIcon() {
    const ris = UserStore.getters.getImgByUsername(UserStore.state.my.username)
    return (ris !== '') ? 'img:statics/' + ris : 'fas fa-user'
  }

  get getIconCart() {
    const iconcart = 'fas fa-shopping-cart'

    return iconcart
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

  get myCell() {
    return UserStore.state.my.profile.cell
  }

  get Verificato() {
    return UserStore.state.my.verified_email
  }

  get MadeGift() {
    return UserStore.state.my.made_gift
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
