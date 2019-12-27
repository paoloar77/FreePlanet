import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'

// Vue.use(VueScrollReveal, {
//   class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
//   duration: 1200,
//   scale: 0.95,
//   distance: '10px',
//   rotate: {
//     x: 0,
//     y: 0,
//     z: 0
//   }
//   // mobile: true
// })

@Component({
  name: 'CTitleBanner'
})
export default class CTitleBanner extends Vue {
  @Prop({ required: true}) public title: string
  @Prop({ required: false, default: 'bg-primary' }) public bgcolor: string
  @Prop({ required: false, default: 'text-white' }) public clcolor: string
  @Prop({ required: false, default: '' }) public mystyle: string
  @Prop({ required: false, default: '' }) public myclass: string
  @Prop({ required: false, default: '' }) public myclasstext: string
  @Prop({ required: false, default: '' }) public icon: string
  @Prop({ required: false, default: true }) public visible: boolean

  public myvisible: boolean = true

  public mounted() {
    this.myvisible = this.visible
  }

  get iconopen() {
    if (!this.myvisible)
      return 'fas fa-chevron-down q-icon q-expansion-item__toggle-icon q-focusable '
    else
      return 'fas fa-chevron-down q-icon q-expansion-item__toggle-icon q-focusable rotate-180'
  }
}
