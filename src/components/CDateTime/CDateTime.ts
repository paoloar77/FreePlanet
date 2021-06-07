import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { date } from 'quasar'
import { CalendarStore } from '../../store/Modules'
import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'CDateTime',
  mixins: [MixinBase]
})

export default class CDateTime extends Vue {
  public $q
  public $t
  @Prop({ required: false, default: null }) public value: Date
  @Prop({ required: false, default: null }) public valueDate: Date
  @Prop({ required: true, default: 'Val:' }) public label: string
  @Prop({ required: false, default: '' }) public data_class!: string
  @Prop({ required: false, default: true }) public canEdit!: boolean
  @Prop({ required: false, default: false }) public disable!: boolean
  @Prop({ required: false, default: '' }) public bgcolor!: string
  @Prop({ required: false, default: false }) public dense: boolean
  @Prop({ required: false, default: '5' }) public minuteinterval: boolean
  @Prop({ required: false, default: 'date-time' }) public view: string

  public mystyleicon: string = 'font-size: 1.5rem;'
  public showDateTimeScroller: boolean = false
  public saveit: boolean = false
  public myvalue: Date = new Date()
  public valueprec: Date = new Date()

  get getclass() {
    return 'calendar_comp ' + this.data_class
  }

  // @Watch('showDateTimeScroller')

  public Opening() {
    // console.log('Opening', 'myvalue', this.myvalue, 'value', this.value)
    this.saveit = false
    this.valueprec = this.myvalue
    if (this.myvalue === undefined) {
      this.valueDate = new Date()
      this.myvalue = tools.getstrYYMMDDDateTime(this.valueDate)
    }
    // console.log('Opening', this.valueDate, this.myvalue)
    this.$emit('show')
  }

  public Closing() {
    // console.log('Closing')
    if (!this.saveit) {
      if (this.myvalue !== this.valueprec) {
        this.myvalue = this.valueprec
        tools.showNeutralNotif(this.$q, this.$t('db.reccanceled'))
      }
    }
  }

  @Watch('valueDate')
  public changevalueDate() {
    if (this.valueDate)
      this.myvalue = tools.getstrYYMMDDDateTime(this.valueDate)

    // console.log('changevalueDate myvalue', this.myvalue)
  }
  @Watch('value')
  public changevalue() {
    this.myvalue = this.value
    // console.log('changevalue myvalue', this.myvalue)
  }

  public savetoclose() {
    // console.log('Close')
    this.saveit = true
    this.showDateTimeScroller = false
    this.$emit('savetoclose', this.myvalue, this.valueprec)
  }

  get scrollerPopupStyle280() {
    if (this.$q.screen.lt.sm) {
      return {
        width: '100vw',
        height: '100vh'
      }
    } else {
      return {
        maxHeight: '400px',
        height: '400px',
        width: '280px'
      }
    }
  }

  get locale() {
    return CalendarStore.state.locale
  }

  public created() {
    if (this.value !== null)
      this.myvalue = this.value
    else
      this.myvalue = tools.getstrYYMMDDDateTime(this.valueDate)

    // console.log('created myvalue', this.myvalue)
  }

  public changeval(newval) {
    // console.log('changeval', newval, 'value=', this.value, 'myvalue=', this.myvalue)
    this.$emit('update:value', newval)
  }

  public mystyle() {
    if (this.label !== '')
      return ''
    else
      return ''
  }

  public getstrDate(mydate) {
    if (this.view === 'date-time') {
      return tools.getstrDateTime(mydate)
    } else {
      return tools.getstrDate(mydate)
    }
  }
}
