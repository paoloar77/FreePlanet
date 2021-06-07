import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { validationMixin } from 'vuelidate'
import MixinBase from '../../mixins/mixin-base'
import { ProductsList } from '@src/views/ecommerce'


@Component({
  mixins: [validationMixin],
  components: { ProductsList }
})

export default class CECommerce extends MixinBase {
  public $v
  public $t: any


}
