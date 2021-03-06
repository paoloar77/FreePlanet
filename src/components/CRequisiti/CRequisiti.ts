import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { toolsext } from '@src/store/Modules/toolsext'

@Component({})

export default class CRequisiti extends Vue {
  @Prop({ required: true }) public statebool: boolean
  @Prop({ required: true }) public msgTrue: string
  @Prop({ required: true }) public msgFalse: string
  @Prop({ required: false, default: false }) public color_ko: boolean

  get getcl() {
    if (this.statebool)
      return 'requisiti_on'
    else {
      if (this.color_ko)
        return 'requisiti_off_ko'
      else
        return 'requisiti_off'
    }
  }
}
