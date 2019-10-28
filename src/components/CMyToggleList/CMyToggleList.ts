import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CMyToggleList'
})

export default class CMyToggleList extends Vue {
  public $t
  @Prop({ required: true }) public options: []
  @Prop({ required: true }) public value
  @Prop({ required: true, default: '' }) public label
  @Prop({ required: false, default: '' }) public myclass
  @Prop({ required: true, default: '' }) public optlab
  @Prop({ required: true, default: '' }) public optval

  public myvalue = ''
  public myarrvalues = []

  get tools() {
    return tools
  }

  public changeval(newval) {
    // Update value
    const totale = this.myarrvalues.filter((rec) => rec.valbool).reduce((sum, rec) => sum + rec.value, 0)
    this.myvalue = totale

    // Refresh value
    this.$emit('update:value', this.myvalue)
  }

  public mounted() {
    this.myarrvalues = []

    console.table(this.options)
    this.options.forEach((rec) => {
      const mydata = {
        label: this.$t(rec[this.optlab]),
        value: rec[this.optval],
        valbool: tools.isBitActive(this.value, rec[this.optval])
      }
      this.myarrvalues.push(mydata)
    })

  }
}
