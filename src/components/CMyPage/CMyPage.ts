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
import MixinsMetaTags from '../../mixins/mixin-metatags'

@Component({
  name: 'CMyPage',
  mixins: [MixinsMetaTags],
  components: { Footer, CImgTitle, CTitle }
})
export default class CMyPage extends Vue {
  @Prop({ required: true, default: '' }) public title: string
  @Prop({ required: false, default: '' }) public img: string
  @Prop({ required: false, default: '' }) public imgbackground: string
  @Prop({ required: false, default: '' }) public sizes: string
  @Prop({ required: false, default: '' }) public styleadd: string
  @Prop({ required: false, default: false }) public nofooter: boolean
  public $t
  public $q

  // public metaInfo() {
  //   return {
  //     // title: this.$t('ws.sitename'),
  //     title: 'PROVA TITOLOOOOOOO!!!!!!!!!!!!!!!!!!!!**************************',
  //     titleTemplate: (title) => `${this.title} - ${this.$t('ws.sitename')}`,
  //     meta: {
  //       keywords: { name: 'keywords', content: this.keywords },
  //       description: { name: 'description', content: this.description },
  //       equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
  //     }
  //   }
  // }

  public mounted() {
    // console.log('CMYPage title=', this.title)
    // console.table(this.meta)
  }
}
