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
  @Prop({ required: false, default: null }) public product: IProduct
  public myproduct: IProduct = null
  @Prop({ required: false, default: '' }) public code: string
  @Prop({ required: false, default: false }) public complete: boolean
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

    if (!UserStore.state.isLogged) {
      tools.showNeutralNotif(this.$q, 'Devi prima accedere alla tua Area Personale')
      GlobalStore.state.rightDrawerOpen = true
      return false
    }

    // Controlla se esiste già nel carrello il prodotto
    if (Products.getters.existProductInCart(this.myproduct._id)) {
      tools.showNegativeNotif(this.$q, 'Questo prodotto è stato già aggiunto al Carrello')
    } else {
      Products.actions.addToCart({ product: this.myproduct, order: this.order }).then((ris) => {
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
    if (!!this.myproduct.storehouses)
      return this.myproduct.storehouses.length
    else
      return 0
  }

  public getSingleStorehouse() {
    const mystore = this.myproduct.storehouses[0]
    return mystore.name + ' (' + mystore.city + ')'
  }

  public getStorehouses() {

    const myarr = []
    let ind = 1
    this.myproduct.storehouses.forEach((store) => {
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


  @Watch('code')
  public codechanged(value) {
    console.log('change code')
    this.load()
  }

  public async load() {
    // console.log('created Cproductcard', this.code)
    if (this.code) {
      this.myproduct = await Products.actions.loadProduct({ code: this.code })
    } else {
      this.myproduct = this.product
    }
    // console.log('this.myproduct', this.myproduct)

    if (!!this.myproduct) {
      if (this.myproduct.storehouses.length === 1) {
        this.order.idStorehouse = this.myproduct.storehouses[0]._id
      }
    }
  }

  public async created() {
    this.load()
  }

  get getmycardcl() {
    return (this.complete) ? 'my-card-big' : 'my-card'
  }


}
