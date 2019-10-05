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
  @Prop({ required: false, default: '' }) public imgbackground: string
  @Prop({ required: false, default: '' }) public imghead: string
  @Prop({ required: false, default: '' }) public sizes: string
  @Prop({ required: true }) public headtitle: string

  get tools() {
    return tools
  }

  get getsrc() {
    // return this.src
    const filefull = tools.getimgFullpathbysize(this.imgbackground)

    return tools.getimgbysize(filefull.path, filefull.file)
  }

}
