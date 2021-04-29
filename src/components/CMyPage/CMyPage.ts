import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Footer } from '../../components/Footer'

import { CImgTitle } from '../../components/CImgTitle/index'
import { CTitle } from '../../components/CTitle/index'
import MixinsMetaTags from '../../mixins/mixin-metatags'
import { IMyPage } from '@src/model'

@Component({
  name: 'CMyPage',
  mixins: [MixinsMetaTags],
  components: { Footer, CImgTitle, CTitle }
})
export default class CMyPage extends Vue {
  @Prop({ required: false, default: '' }) public title: string
  @Prop({ required: false, default: '' }) public mypath: string
  @Prop({ required: false, default: '' }) public img: string
  @Prop({ required: false, default: '' }) public imgbackground: string
  @Prop({ required: false, default: '' }) public sizes: string
  @Prop({ required: false, default: '' }) public styleadd: string
  @Prop({ required: false, default: false }) public nofooter: boolean
  public $t
  public $q
  public rec: IMyPage = null

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

  public async mounted() {
    // console.log('CMYPage title=', this.title)
    // console.table(this.meta)
    if (this.mypath !== '')
      this.rec = await GlobalStore.actions.loadPage(this.mypath)
  }
}
