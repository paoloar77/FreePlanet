import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IOperators } from '../../model'

@Component({
  name: 'CBook',
  filters: {
    firstchars(value) {
      return tools.firstchars(value, 250)
    }
  }
})

export default class CBook extends Vue {
  @Prop({ required: true, default: 'one' }) public tab

  public clicca() {
    this.tab = 'two'
  }

  @Prop({ required: true }) public op: IOperators

  get tools() {
    return tools
  }

  get myop() {
    if (!!this.op) {
      return this.op
    } else {
      return {
        index: 0,
        tab: '',
        name: '',
        qualification: '',
        sub2: '',
        certifications: '',
        img: '',
        cell: '',
        email: '',
        paginaweb: '',
        paginafb: '',
        intro: '',
        info: ''
      }
    }
  }

}
