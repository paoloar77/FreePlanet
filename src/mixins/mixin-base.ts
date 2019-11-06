import Vue from 'vue'

import Component from 'vue-class-component'
import { func_tools } from '../store/Modules/toolsext'
import { tools } from '../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore } from '../store/Modules'

// You can declare a mixin as the same style as components.
@Component
export default class MixinBase extends Vue {
  public mythis() {
    return this
  }

  get toolsext() {
    return toolsext
  }

  get func_tools() {
    return func_tools
  }

  get tools() {
    return tools
  }

  public getValDb(keystr) {
    return GlobalStore.getters.getValueSettingsByKey(keystr)
  }
  public getarrValDb(keystr) {
    const myval = GlobalStore.getters.getValueSettingsByKey(keystr)
    // console.log('myval', myval)
    try {
      if (myval) {
        const myrec = JSON.parse(myval)
        // console.log('*************** getarrValDb')
        // console.table(myrec)
        return myrec
      } else {
        return []
      }
    }catch (e) {
      return []
    }
  }
}
