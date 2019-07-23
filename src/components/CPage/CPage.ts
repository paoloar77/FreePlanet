import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Logo } from '../../components/logo'

import { Footer } from '../../components/Footer'

import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'

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
  name: 'CPage',
  components: { Logo, Footer }
})
export default class CPage extends Vue {
  @Prop({ required: true }) public imghead: string = ''
  @Prop({ required: true }) public headtitle: string = ''
  @Prop({ required: true }) public img1: string = ''
  @Prop({ required: true }) public text1: string = ''
}
