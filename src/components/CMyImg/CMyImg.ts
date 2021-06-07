import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CMyImg'
})

export default class CMyImg extends Vue {
  @Prop({ required: true, default: '' }) public src: string
  @Prop({ required: false, default: '' }) public alt: string
  @Prop({ required: false, default: '' }) public width: string
  public srcbase: string = ''
  public mystyle: string = ''

  public mounted() {
    console.log('mounted')
    console.log(this.src)

    if (this.width)
      this.mystyle = 'max-width: ' + this.width + 'px; '
    else
      this.mystyle = ''
  }

  public created() {
    console.log('created')

  }

  get getalt() {
    if (this.alt) {
      return this.alt
    } else {
      return tools.getimgFullpathbysize(this.src)
    }
  }
}
