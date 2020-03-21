import Vue from 'vue'
import Component from 'vue-class-component'
import { IMetaTags } from '@src/model'
import { tools } from '@src/store/Modules/tools'

// You can declare a mixin as the same style as components.
@Component
export default class MixinMetaTags extends Vue {
  public mymeta: IMetaTags = {title: '', description: '', keywords: ''}

  get mythis() {
    return this
  }

  set mythis(aa) {

  }

  public setmeta(mymeta: IMetaTags) {
    this.mymeta = mymeta
  }

  public getsrcbyimg(myimg) {
    // return this.src
    const filefull = tools.getimgFullpathbysize(myimg)

    return tools.getimgbysize(filefull.path, filefull.file)
  }

}
