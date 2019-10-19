import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Footer } from '../../components/Footer'

// import VueScrollReveal from 'vue-scroll-reveal'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'
import { CImgTitle } from '../../components/CImgTitle/index'
import { CTitle } from '../../components/CTitle/index'

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
  name: 'CMyPage',
  components: { Footer, CImgTitle, CTitle }
})
export default class CMyPage extends Vue {
  @Prop({ required: true, default: '' }) public title: string
  @Prop({ required: true, default: '' }) public keywords: string
  @Prop({ required: true, default: '' }) public description: string
  @Prop({ required: false, default: '' }) public img: string
  @Prop({ required: false, default: '' }) public imgbackground: string
  @Prop({ required: false, default: '' }) public sizes: string
  public $t
  public $q

  public meta() {
    return {
      title: this.$t('msg.myAppName'),
      titleTemplate: (title) => `${this.title} - ${this.$t('msg.myAppName')}`,
      meta: {
        keywords: { name: 'keywords', content: this.keywords },
        description: { name: 'description', content: this.description },
        equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
      }
    }
  }

  public mounted() {
    // console.log('CMYPage title=', this.title)
    // console.table(this.meta)
  }
}
