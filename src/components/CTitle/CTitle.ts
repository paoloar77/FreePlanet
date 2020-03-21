import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { Screen } from 'quasar'

@Component({
  name: 'CTitle'
})
export default class CTitle extends Vue {
  @Prop({ required: true }) public headtitle: string
  @Prop({ required: false, default: '' }) public imgbackground: string
  @Prop({ required: false, default: '' }) public imghead: string
  @Prop({ required: false, default: '' }) public sizes: string
  @Prop({ required: false, default: '' }) public styleadd: string

  get tools() {
    return tools
  }

  get getsrc() {
    // return this.src
    const filefull = tools.getimgFullpathbysize(this.imgbackground)

    return tools.getimgbysize(filefull.path, filefull.file)
  }

  get getaltimg() {
    if (this.headtitle) {
      return this.headtitle
    } else {
      const filefull = tools.getimgFullpathbysize(this.imgbackground)
      return tools.getaltimg(filefull.path, filefull.file, this.headtitle)
    }
  }

}
