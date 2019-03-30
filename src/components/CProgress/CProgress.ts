import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '@src/store/Modules/tools'

@Component({
  name: 'CProgress'
})

export default class CProgress extends Vue {
  public cpr_colProgress: string = 'blue'
  public cpr_percProgress: string = 'cpr-percProgress'

  @Watch('progressval')
  public changeprogress() {
    this.updateclasses()
  }

  @Prop({ required: true }) public progressval: number
  @Prop() public descr: string

  public updateclasses() {
    this.cpr_colProgress = tools.getProgressColor(this.progressval)
  }

  get getdescr(){
    if (!!this.descr) {
      return this.descr + ' : '
    }
  }

  public create() {
    this.updateclasses()
  }

}
