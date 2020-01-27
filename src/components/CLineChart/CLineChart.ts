import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({

})

export default class CLineChart extends Vue {
  public $t
  public $q
  public mydatafixed = {}
  @Prop({ required: false, default: '' }) public mydata: any[]
  @Prop({ required: false, default: false }) public sum: boolean
  @Prop({ required: false, default: '' }) public title: string
  @Prop({ required: false, default: null }) public mycolors

  get tools() {
    return tools
  }

  public mounted() {
    this.mydatafixed = {}

    let somma = 0

    for (const rec of this.mydata) {
      if (this.sum) {
        somma += rec.count
      } else {
        somma = rec.count
      }
      this.mydatafixed[rec._id] = somma
    }
  }

  get getmydata() {
    return this.mydatafixed
  }

}
