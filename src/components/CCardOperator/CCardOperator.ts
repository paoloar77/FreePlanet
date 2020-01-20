import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { CCard } from '@components'
import MixinOperator from '../../mixins/mixin-operator'

@Component({
  name: 'CCardOperator',
  components: { CCard }
})

export default class CCardOperator extends MixinOperator {
  @Prop({ required: true}) public username
  public tab: string = 'one'

  get tools() {
    return tools
  }

}
