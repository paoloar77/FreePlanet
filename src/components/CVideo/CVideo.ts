import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import MixinBase from '../../mixins/mixin-base'
import { CTitleBanner } from '../CTitleBanner'

@Component({
  components: {  }
})

export default class CVideo extends MixinBase {
  @Prop({ required: true }) public myvideokey: string
  @Prop({ required: false, default: '' }) public title: boolean

  get getvideotit() {
    return this.title
  }
}
