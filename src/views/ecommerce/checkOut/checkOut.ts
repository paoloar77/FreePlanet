import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'
import { Action } from 'vuex'
import Products from '@src/store/Modules/Products'
import { CSingleCart } from '../../../components/CSingleCart'
import { CTitleBanner } from '@components'
import { tools } from '@src/store/Modules/tools'
import { ICart } from '@src/model'
import MixinBase from '@src/mixins/mixin-base'
import { shared_consts } from '@src/common/shared_vuejs'

const namespace: string = 'Products'

@Component({
  name: 'checkOut',
  components: { SingleProject, CProgress, CTodo, CDate, CSingleCart, CTitleBanner },
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

export default class CheckOut extends MixinBase {
  public $q: any
  public mycart: ICart = {}
  public myrec: any[]
  public note: string = ''

  public conferma_carrello: boolean = false
  public conferma_ordine: boolean = false

  /*public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }*/

  get getItemsCart() {
    const cart = Products.getters.getCart()
    return cart.items || null
  }

  get getCart() {
    return Products.getters.getCart()
  }

  get getNote() {
    const cart = Products.getters.getCart()
    return cart.note
  }

  public change_field(fieldname) {
    if (this.myrec[fieldname] !== this[fieldname]) {
      this.myrec[fieldname] = this[fieldname]

      const mydata = {
        [fieldname]: this.myrec[fieldname]
      }

      const aggiorna = fieldname !== 'status'
      tools.saveFieldToServer(this, 'carts', this.mycart._id, mydata, aggiorna)
    }
  }

  get myTotalPrice() {
    if (Products.state.cart && Products.state.cart.totalPrice) {
      return Products.state.cart.totalPrice.toFixed(2)
    } else {
      return 0
    }
  }

  get myTotalQty() {
    if (Products.state.cart) {
      return Products.state.cart.totalQty
    } else {
      return 0
    }
  }

  public mounted() {
    this.mycart = this.getCart
    this.myrec = Object.keys(this.mycart)
    this.note = this.mycart.note

    console.log('myrec', this.myrec)
    // Products.actions.loadCart()
  }

  public CanBeShipped() {
    return Products.state.cart.items.filter((rec) => rec.order.product.canBeShipped).length
  }

  public CanBeBuyOnline() {
    return Products.state.cart.items.filter((rec) => rec.order.product.canBeBuyOnline).length
  }

  get getnumsteps() {
    let numsteps = 1

    if (this.CanBeShipped())
      numsteps++
    if (this.CanBeBuyOnline())
      numsteps++

    return numsteps
  }

  public docheckout() {

    // Può essere spedito?

    if (this.CanBeShipped()) {
      // mostra form di spedizione
    }

    if (this.CanBeBuyOnline()) {
      // mostra form di acquisto Online
    }
  }

  get nextstep() {
    return 0
  }

  public completeOrder() {
    this.$q.dialog({
      message: 'Confermare l\'ordine di acquisto di ' + this.myTotalQty + ' prodotti ?',
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      cancel: {
        label: this.$t('dialog.cancel')
      },
      title: 'Ordine'
    }).onOk(async () => {
      const status = shared_consts.OrderStatus.CHECKOUT_SENT
      const statusnow = await Products.actions.UpdateStatusCart({ cart_id: this.mycart._id, status })

      if (statusnow === status) {
        tools.showPositiveNotif(this.$q, 'Ordine Confermato')
      }
      // this.change_field('status')
      // this.change_field('status')
    })
  }

}
