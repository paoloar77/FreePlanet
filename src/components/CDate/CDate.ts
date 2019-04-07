import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'

import { date } from 'quasar'

@Component({
  name: 'CDate'
})

export default class CDate extends Vue {
  @Prop() public mydate!: Date
  @Prop({ required: false, default: '' }) public label: string
  @Prop({ required: false, default: '' }) public data_class!: string
  @Prop({ required: false, default: false }) public readonly!: boolean
  @Prop({ required: false, default: false }) public disable!: boolean
  @Prop({ required: false, default: '' }) public color!: string

  public mystyleicon: string = 'font-size: 1.5rem;'

  @Watch('mydate')
  public valchanged(value) {
    this.valueInternal = value
  }

  public $refs: {
    datePicker
  }
  private valueInternal: Date = tools.getDateNull()

  public created() {
    this.valueInternal = this.mydate

    if (this.data_class !== '') {
      this.mystyleicon = 'font-size: 1rem;'
    }
  }

  public changedate(value) {
    const datavalida = tools.convertstrtoDate(value)
    if (!!datavalida) {
      this.valueInternal = datavalida
      console.log('EMIT: changedate', datavalida)
      this.$emit('input', this.getDate())
    } else {
      console.log('   DATA NON VALIDAAAAAAAAAAAAA ', value, datavalida)
    }
    this.$refs.datePicker.hide()
  }

  get getdatestring() {
    return tools.getstrDate(this.valueInternal)
  }
  get getdateyymmddstring() {
    return tools.getstrYYMMDDDate(this.valueInternal)
  }
  private getDate() {
    return this.valueInternal
  }

}
