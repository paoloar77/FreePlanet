import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CCopyBtn'
})

export default class CCopyBtn extends Vue {
  public $t
  public $q
  @Prop({ required: false, default: '' }) public title: string
  @Prop({ required: true }) public texttocopy: string

  get tools() {
    return tools
  }

  public copytoclip() {
    tools.copyStringToClipboard(this, this.texttocopy)
  }

}
