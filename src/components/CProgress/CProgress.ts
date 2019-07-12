import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

@Component({
  name: 'CProgress'
})

export default class CProgress extends Vue {
  public cpr_colProgress: string = 'blue'
  public cpr_percProgress: string = 'cpr-percProgress'
  public progressvalinternal: number = 0

  @Watch('progressval')
  public changeprogress() {
    this.updateclasses()
  }

  @Prop({ required: true }) public progressval: number
  @Prop() public descr: string
  @Prop({ default: false }) public slider: boolean
  @Prop({ default: false }) public readonly: boolean

  @Watch('progressval')
  public valchanged(value) {
    this.progressvalinternal = value
  }

  public updateclasses() {
    this.cpr_colProgress = tools.getProgressColor(this.progressvalinternal)
  }

  public setchange(value) {
    this.progressvalinternal = value
    console.log('setchange', this.progressvalinternal)
    this.$emit('input', this.progressvalinternal)
  }

  get getdescr() {
    if (!!this.descr) {
      return this.descr + ' : '
    }
  }

  public create() {
    this.updateclasses()
  }

}
