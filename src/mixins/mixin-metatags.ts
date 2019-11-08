import Vue from 'vue'
import Component from 'vue-class-component'
import { IMetaTags } from '@src/model'
import { tools } from '@src/store/Modules/tools'

// You can declare a mixin as the same style as components.
@Component
export default class MixinMetaTags extends Vue {
  public mymeta: IMetaTags = {title: '', description: '', keywords: ''}

  public setmeta(mymeta: IMetaTags) {
    this.mymeta = mymeta
  }
}
