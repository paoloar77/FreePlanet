import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '../../store/Modules/tools'
import MixinBase from '@src/mixins/mixin-base'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { GlobalStore } from '../../store'
import { CCopyBtn } from '../CCopyBtn'

import { date } from 'quasar'
import { IProduct } from '@src/model'

@Component({
  name: 'CProductCard',
  components: { CTitleBanner, CCardState, CCopyBtn }
})

export default class CProductCard extends MixinBase {
  @Prop({ required: true }) public product: IProduct
  public $t

}
