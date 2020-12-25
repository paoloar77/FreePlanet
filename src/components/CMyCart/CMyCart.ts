import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '../../store/Modules/tools'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { CCopyBtn } from '../CCopyBtn'

import { IOrder, IProduct } from '@src/model'
import { Products, UserStore } from '@store'
import { CSingleCart } from '../../components/CSingleCart'
import MixinUsers from '@src/mixins/mixin-users'

@Component({
  name: 'CMyCart',
  components: { CTitleBanner, CCardState, CCopyBtn, CSingleCart }
})

export default class CMyCart extends MixinUsers {
  public $t

  get myCart() {
    return Products.state.cart
  }

  get myTotalPrice() {
    if (Products.state.cart) {
      return Products.state.cart.totalPrice
    } else {
      return 0
    }
  }

  get ordersCart() {
    if (!!Products.state.cart) {
      return Products.state.cart.items
    } else {
      return null
    }
  }
  get numOrders() {
    if (!!Products.state.cart) {
      return Products.state.cart.items.length
    } else {
      return 0
    }
  }
}
