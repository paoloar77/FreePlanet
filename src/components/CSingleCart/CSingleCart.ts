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
  components: { CTitleBanner, CCardState, CCopyBtn }
})

export default class CSingleCart extends MixinBase {
  public $t
  @Prop({ required: true }) public order: IOrder
  @Prop({ required: false, default: false }) public showall: boolean

  get myimgclass() {
    if (this.showall) {
      return 'imgNormal'
    } else {
      return 'imgSmall'
    }
  }

  public addsubqty(addqty, subqty) {
    if (addqty) {
      if (this.order.quantity >= 10)
        return false
    }

    if (subqty) {
      if (this.order.quantity === 0)
        return false
    }

    Products.actions.addSubQtyToItem({
      addqty,
      subqty,
      order: this.order
    }).then((newqty) => {
      this.order.quantity = newqty
    })
  }

  public removeFromCard() {
    Products.actions.removeFromCart({ order: this.order })
  }
}
