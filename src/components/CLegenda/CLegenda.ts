import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'

@Component({

})

export default class CLegenda extends MixinBase {
  @Prop({ required: true }) public icon: string
  @Prop({ required: true }) public text: string
}
