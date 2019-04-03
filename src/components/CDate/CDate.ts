import Vue from 'vue'
import { Component, Emit, Inject, Model, Prop, Provide } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import * as moment from 'moment'

@Component({
  name: 'CDate'
})

export default class CDate extends Vue {
  // ************* IS NOT WORKING WELL ! ************
  // @Model('input', {
  //   default: ''
  // })
  // public mydate!: Date
  @Prop() public myhint: string
  @Model('input', {
    default: '1999/01/01'
  })
  public mydate!: string

  private valueInternal: string = '1988/01/01'

  @Emit('input')
  public onValueChanged(value: string) {
    this.valueInternal = value
  }

  // get getmydate() {
  //   console.log('getmydate', this.mydate)
  //   return tools.getstrDate(this.mydate)
  // }
  //
  // public updatedate(mydate) {
  //   console.log('updatedate', mydate)
  //   this.mydate = mydate
  // }

}
