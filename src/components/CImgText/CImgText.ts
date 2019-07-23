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
  name: 'CImgText'
})
export default class CImgText extends Vue {
  @Prop({ required: false, default: '' }) public src: string
  @Prop({ required: false, default: '' }) public class1: string
  @Prop({ required: false, default: '' }) public style1: string
}
