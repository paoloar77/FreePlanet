import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { date } from 'quasar'
import { CalendarStore } from '../../store/Modules'
import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'CFacebookFrame',
  mixins: [MixinBase]
})

export default class CFacebookFrame extends Vue {
  public $q
  public $t
  @Prop({ required: true }) public urlfbpage: string
  @Prop({ required: true }) public title: string
  @Prop({ required: false, default: '' }) public myclass: string

  public geturlfbpageEncoded() {
    return encodeURIComponent(this.urlfbpage)
  }

  get mywidth() {
    let myw = 340
    if (tools.getwidth(this) < 400)
      return myw
    if ((tools.getwidth(this) > 400) && (tools.getwidth(this) < 1100))
      return Math.round((tools.getwidth(this) / 3) - 30)
    else
      return myw
  }
}
