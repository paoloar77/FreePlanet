import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import MixinBase from '@src/mixins/mixin-base'

@Component({

})

export default class CRequisito extends MixinBase {
  @Prop({ required: true }) public icon: string
  @Prop({ required: false, default: 'fas fa-exclamation-triangle' }) public icon_error: string
  @Prop({ required: true }) public text: string
  @Prop({ required: true }) public isok: boolean
  @Prop({ required: false, default: false }) public no_check: boolean
  @Prop({ required: true }) public info: string

  get checkifok() {
    if (this.no_check)
      return 'blue'
    else
      return this.isok ? 'green' : 'red'
  }

  get getris() {
    return (this.isok) ? this.$t('dialog.yes') : this.$t('dialog.no')
  }

  get iconris() {
    return (this.isok) ? 'fas fa-check' : this.icon_error
  }
}
