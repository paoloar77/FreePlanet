import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'


@Component({
  name: 'CInput'
})
export default class CInput extends Vue {
  @Prop({ required: false, default: '' }) public src: string
  @Prop({ required: false, default: '' }) public src2: string
  @Prop({ required: false, default: 'myclimg' }) public class1: string
  @Prop({ required: false, default: '' }) public style1: string
  @Prop({ required: false, default: 'image' }) public alt1: string
  @Prop({ required: false, default: 'image' }) public alt2: string

  get clrowcol() {
    let mycl = 'row'
    if (tools.isMobile())
      mycl = 'column'

    return mycl
  }

  get myclass() {

    return this.clrowcol + ' items-start q-col-gutter-xs imgtext '
  }
}
