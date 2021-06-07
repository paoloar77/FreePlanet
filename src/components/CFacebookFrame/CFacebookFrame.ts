import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { date } from 'quasar'
import { CalendarStore } from '../../store/Modules'
import MixinBase from '../../mixins/mixin-base'

import VueScrollReveal from 'vue-scroll-reveal'
import { CImgText } from '../CImgText'


Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1200,
  scale: 0.95,
  distance: '10px',
  rotate: {
    x: 0,
    y: 0,
    z: 0
  }
  // mobile: true
})


@Component({
  name: 'CFacebookFrame',
  components: { CImgText },
  mixins: [MixinBase]
})

export default class CFacebookFrame extends Vue {
  public $q
  public $t
  @Prop({ required: true }) public urlfbpage: string
  @Prop({ required: true }) public title: string
  @Prop({ required: true }) public fbimage: string
  @Prop({ required: false, default: '' }) public myclass: string

  public geturlfbpageEncoded() {
    return encodeURIComponent(this.urlfbpage)
  }

  get mywidth() {
    let myw = 340
    if (tools.getwidth(this) < 410)
      return myw
    if ((tools.getwidth(this) > 410) && (tools.getwidth(this) < 1100))
      return Math.round((tools.getwidth(this) / 3) - 30)
    else
      return myw
  }
}
