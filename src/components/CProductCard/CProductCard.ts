import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '../../store/Modules/tools'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { GlobalStore } from '../../store'
import { CCopyBtn } from '../CCopyBtn'

import { date } from 'quasar'
import { IOrder, IProduct } from '@src/model'
import { Products, UserStore } from '@store'

@Component({
  name: 'CProductCard',
  components: { CTitleBanner, CCardState, CCopyBtn }
})

export default class CProductCard extends MixinBase {
  public $t
  @Prop({ required: true }) public product: IProduct
  @Prop({
    required: false,
    type: Object,
    default() {
      return {
        idapp: process.env.APP_ID,
        quantity: 1,
        idStorehouse: ''
      }
    }
  }) public order: IOrder

  public iconWhishlist(order: IProduct) {
    if (true) {
      return 'far fa-heart'
    } else {
      return 'fas fa-heart'
    }
  }

  public decqty() {
    if (this.order.quantity > 0)
      this.order.quantity--
  }

  public addqty() {
    if (this.order.quantity < 10)
      this.order.quantity++
  }

  public addtoCart() {

    // Controlla se esiste già nel carrello il prodotto
    if (Products.getters.existProductInCart(this.product._id)) {
      tools.showNegativeNotif(this.$q, 'Questo prodotto è stato già aggiunto al Carrello')
    } else {
      Products.actions.addToCart({ product: this.product, order: this.order }).then((ris) => {
        let strprod = 'prodotto'
        if (this.order.quantity > 1)
          strprod = 'prodotti'
        if (ris)
          tools.showPositiveNotif(this.$q, 'Hai Aggiunto ' + this.order.quantity + ' ' + strprod + ' al Carrello')
        else
          tools.showNegativeNotif(this.$q, 'Errore durante l\'inserimento del prodotto sul carrello, riprovare.')
      })
    }
  }

  public getnumstore() {
    if (!!this.product.storehouses)
      return this.product.storehouses.length
    else
      return 0
  }

  public getSingleStorehouse() {
    const mystore = this.product.storehouses[0]
    return mystore.name + ' (' + mystore.city + ')'
  }

  public getStorehouses() {

    const myarr = []
    let ind = 1
    this.product.storehouses.forEach((store) => {
      myarr.push(
        {
          id: ind,
          label: store.name + ' (' + store.city + ')',
          value: store._id
        })

      ind++
    })

    // console.log('arraystore', myarr)
    return myarr
  }

  get checkifCartDisable() {
    return !this.order.idStorehouse
  }

  public infoproduct() {

  }

  public created() {
    if (this.product.storehouses.length === 1) {
      this.order.idStorehouse = this.product.storehouses[0]._id
    }
  }
}
