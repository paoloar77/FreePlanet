import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IPerson } from '../../model/GlobalStore'

@Component({
  name: 'CMySelect'
})

export default class CMySelect extends Vue {
  @Prop({ required: true }) public value
  @Prop({ required: true, default: '' }) public label
  @Prop({ required: false, default: '' }) public myclass
  @Prop({ required: true, default: '' }) public optlab
  @Prop({ required: true, default: '' }) public optval
  @Prop({ required: false, default: true }) public useinput: boolean
  @Prop({ required: false, default: null }) public newvaluefunc
  @Prop({ required: false, default: null }) public funcgetvaluebyid
  @Prop({ required: true }) public options

  public myvalue = ''

  get tools() {
    return tools
  }

  public nothing() {

  }

  public changeval(newval) {
    // console.log('changeval', newval)
    // const newvallab = newval[`${this.optval}`]
    // this.myvalue = newvallab
    this.$emit('update:value', newval)
  }

  public mounted() {
    const rec = this.options.find((myrec) => myrec[`${this.optval}`] === this.value)
    // console.log('rec', rec)
    if (!this.useinput) {
      this.myvalue = this.value
    } else {
      if (rec) {
        if (this.funcgetvaluebyid)
          this.myvalue = this.funcgetvaluebyid(rec[`${this.optval}`])
        else
          this.myvalue = rec[`${this.optlab}`]

        // console.log('this.myvalue', this.myvalue, 'this.optval', this.optval, 'rec', rec[`${this.optval}`])
      }
    }
  }
}
