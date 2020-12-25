import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'
import { Action } from 'vuex'
import Products from '@src/store/Modules/Products'
import { CSingleCart } from '../../../components/CSingleCart'

const namespace: string = 'Products'

@Component({
  name: 'checkOut',
  components: { SingleProject, CProgress, CTodo, CDate, CSingleCart },
  filters: {
    capitalize(value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

export default class CheckOut extends Vue {
  public $q: any

  /*public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }*/

  get getItemsCart() {
    const cart = Products.getters.getCart()
    return cart.items || null
  }

  get myTotalPrice() {
    if (Products.state.cart) {
      return Products.state.cart.totalPrice
    } else {
      return 0
    }
  }

  public mounted() {
    // Products.actions.loadCart()
  }

}
