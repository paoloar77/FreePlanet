import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'

@Component({
  name: 'CCardState'
})

export default class CCardState extends MixinBase {
  @Prop({ required: false, default: '' }) public mytext
  @Prop({ required: false, default: 0 }) public myval
  @Prop({ required: true, default: 0 }) public myperc
  @Prop({ required: false, default: '' }) public imgsrc
  @Prop({ required: false, default: false }) public isperc
  @Prop({ required: false, default: '' }) public textadd
  @Prop({ required: false, default: 'green' }) public mycolor
  @Prop({ required: false, default: '150px' }) public size
  @Prop({ required: false, default: '130px' }) public size_mob
  @Prop({ required: false, default: '1rem' }) public fontsize
  @Prop({ required: false, default: '' }) public mystyle
  @Prop({ required: false, default: 'my-card-stat' }) public myclass

  get getsize() {
    if (tools.isMobile())
      return this.size_mob
    else
      return this.size
  }
}
