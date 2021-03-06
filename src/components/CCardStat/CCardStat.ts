import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'

@Component({
  name: 'CCardState'
})

export default class CCardStat extends MixinBase {
  @Prop({ required: true, default: '' }) public mytext
  @Prop({ required: true, default: 0 }) public myval
  @Prop({ required: false, default: 'primary' }) public mycol

  get getsize() {
    if (tools.isMobile())
      return '130px'
    else
      return '150px'
  }
}
