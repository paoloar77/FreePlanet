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
  @Prop({ required: true }) public type
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
    if (this.options) {
      this.options.forEach((rec, index) => {
        if (this.type === tools.FieldType.multiselect) {
          if (!!this.value) {
            if (this.value.includes(rec[this.optval])) {
              const mydata = {
                label: null,
                value: rec[this.optval],
                // myris = mylist.filter((myrec) => arrval.includes(myrec[key]))
                valbool: true,
                icon: '',
                color: tools.getColorByIndexBest(index)
              }

              if (tools.isObject(this.optlab)) {
                mydata.label = this.options.filter((myrec) => myrec[this.optval] === mydata.value).map(this.optlab)
                if (mydata.label)
                  mydata.label = mydata.label[0]
              } else {
                mydata.label = rec[this.optlab]
              }

              if (this.opticon)
                mydata.icon = rec[this.opticon]
              if (this.optcolor)
                mydata.color = rec[this.optcolor]

              this.myarrvalues.push(mydata)
            }
          }
        } else if (this.type === tools.FieldType.select) {
          if (this.value === rec[this.optval]) {
            const mydata = {
              label: null,
              value: this.value,
              valbool: true,
              icon: '',
              color: tools.getColorByIndexBest(index)
            }

            // console.log('mydata', mydata, 'optlab', this.optlab, 'value', this.value)

            if (tools.isObject(this.optlab)) {
              mydata.label = this.options.filter((myrec) => myrec[this.optval] === mydata.value).map(this.optlab)
              if (mydata.label)
                mydata.label = mydata.label[0]
            } else {
              mydata.label = rec[this.optlab]
            }

            if (this.opticon)
              mydata.icon = rec[this.opticon]
            if (this.optcolor)
              mydata.color = rec[this.optcolor]

            this.myarrvalues.push(mydata)
          }

        } else {
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
        }
      })
    }

    if (this.myarrvalues.length === 0)
      this.myarrvalues.push({ label: this.$t('otherpages.manage.nessuno'), color: 'gray' })

    // console.log('arrvalues=', this.myarrvalues)
  }

  public mounted() {
    this.refreshval()
  }
}
