import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IOperators } from '../../model'

@Component({
  name: 'CCard',
  filters: {
    firstchars(value) {
      return tools.firstchars(value, 250)
    }
  }
})

export default class CCard extends Vue {
  @Prop({ required: true, default: 'one' }) public tab
  @Prop({ required: true }) public op: IOperators

  public clicca() {
    this.tab = 'two'
  }

  get tools() {
    return tools
  }

  get myop(): IOperators {
    if (!!this.op) {
      return this.op
    } else {
      return {
        tab: '',
        username: '',
        name: '',
        surname: '',
        qualification: '',
        usertelegram: '',
        disciplines: '',
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
