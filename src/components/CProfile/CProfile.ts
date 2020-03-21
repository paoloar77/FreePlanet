import Vue from 'vue'
import { GlobalStore } from '@store'
import { UserStore } from '../../store/Modules'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '@src/store/Modules/toolsext'

import { validationMixin } from 'vuelidate'

import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'CProfile',
  mixins: [validationMixin],
  components: {  }
})

export default class CProfile extends MixinBase {
  public $v
  public $t: any


}
