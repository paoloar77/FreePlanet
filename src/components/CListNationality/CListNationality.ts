import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'

@Component({

})

export default class CListNationality extends MixinBase {
  @Prop({ required: true }) public mydata: any []

  get getsize() {
    if (tools.isMobile())
      return '130px'
    else
      return '150px'
  }
}
