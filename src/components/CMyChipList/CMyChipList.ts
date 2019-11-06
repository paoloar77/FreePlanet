import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CMyChipList'
})

export default class CMyChipList extends Vue {
  public $t
  @Prop({ required: true }) public options: []
  @Prop({ required: true }) public value
  @Prop({ required: true, default: '' }) public optlab
  @Prop({ required: true, default: '' }) public optval
  @Prop({ required: false, default: '' }) public myclass
  @Prop({ required: false, default: '' }) public opticon
  @Prop({ required: false, default: '' }) public optcolor

  public myvalue = ''
  public myarrvalues = []

  get tools() {
    return tools
  }

  @Watch('value', { immediate: true, deep: true })
  public valchange() {
    this.refreshval()
  }

  public refreshval() {
    this.myarrvalues = []

    // console.table(this.options)
    this.options.forEach((rec, index) => {
      if (tools.isBitActive(this.value, rec[this.optval])) {
        const mydata = {
          label: this.$t(rec[this.optlab]),
          value: rec[this.optval],
          valbool: tools.isBitActive(this.value, rec[this.optval]),
          icon: '',
          color: tools.getColorByIndexBest(index)
        }

        if (this.opticon)
          mydata.icon = rec[this.opticon]
        if (this.optcolor)
          mydata.color = rec[this.optcolor]

        this.myarrvalues.push(mydata)
      }
    })

    if (this.myarrvalues.length === 0)
      this.myarrvalues.push({ label: this.$t('otherpages.manage.nessuno'), color: 'gray' })

    // console.log('arrvalues=', this.myarrvalues)
  }

  public mounted() {
    this.refreshval()
  }
}
