import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IPreloadImages } from '../../model'

@Component({
  name: 'CPreloadImages'
})

export default class CPreloadImages extends Vue {
  @Prop({ required: true }) public arrimg: IPreloadImages[]

  get tools() {
    return tools
  }

  public getimg(recimg: IPreloadImages) {
    if (recimg.mobile) {
      const filefull = tools.getimgFullpathbysize(recimg.imgname)

      return tools.getimgbysize(filefull.path, filefull.file)
    } else {
      return recimg.imgname
    }
  }

}
