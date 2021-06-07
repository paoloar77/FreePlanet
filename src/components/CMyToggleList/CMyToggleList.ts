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
  @Prop({ required: false, default: false }) public isarray

  public myvalue = ''
  public myarrvalues = []

  get tools() {
    return tools
  }

  public changeval(newval) {
    // Update value
    let totale = null
    if (this.isarray) {
      totale = this.myarrvalues.filter((rec) => rec.valbool).map((a) => a.value)
    } else {
      totale = this.myarrvalues.filter((rec) => rec.valbool).reduce((sum, rec) => sum + rec.value, 0)
    }
    console.log('totale', totale)
    this.myvalue = totale

    // Refresh value
    this.$emit('update:value', this.myvalue)
  }

  public mounted() {
    console.log('mounted')
    this.myarrvalues = []

    // console.log('value', this.value)
    // console.log('optval', this.optval)
    // console.log('optlab', this.optlab)

    if (this.isarray) {
      // console.table(this.options)
      this.options.forEach((rec) => {
        console.log('rec: ', rec, 'optval', this.optval, 'optlab', this.optlab)
        const mydata = {
          label: '',
          value: rec[this.optval],
          valbool: false
        }

        const lab = rec[`${this.optlab}`]
        console.log('lab', lab)

        if (tools.isObject(this.optlab)) {
          const arr = this.options.filter((myrec) => myrec[this.optval] === mydata.value).map(this.optlab)
          if (arr) {
            // @ts-ignore
            mydata.label = arr[0]
          }
        } else {
          mydata.label = this.$t(rec[this.optlab])
        }

        if (this.value) {
          mydata.valbool = this.value.includes(rec[this.optval])
        }
        console.log('mydata ', mydata)
        this.myarrvalues.push(mydata)
      })

    } else {
      // console.table(this.options)
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
}
