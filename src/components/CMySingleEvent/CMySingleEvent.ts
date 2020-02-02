import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CalendarStore, GlobalStore, UserStore } from '@store'

import { Logo } from '../../components/logo/index'

import { Footer } from '../../components/Footer/index'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { static_data } from '@src/db/static_data'
import { Screen } from 'quasar'

import { CImgText } from '../../components/CImgText/index'
import { CCard, CMyAvatar, CMyTeacher, CMyPage } from '@components'
import MixinOperator from '@src/mixins/mixin-operator'
import MixinEvents from '../../mixins/mixin-events'
import { IEvents } from '@src/model'
import MixinBase from '@src/mixins/mixin-base'
import MixinUsers from '@src/mixins/mixin-users'

@Component({
  name: 'CMySingleEvent',
  mixins: [MixinOperator, MixinBase, MixinEvents, MixinUsers],
  components: { Logo, Footer, CImgText, CCard, CMyPage, CMyAvatar, CMyTeacher }
})
export default class CMySingleEvent extends MixinEvents {
  @Prop({ required: true }) public myevent: IEvents
  public $q
  public $t
  public selected: boolean = false

  get mythis() {
    return this
  }

  set mythis(aa) {

  }

  public selectEvent(eventparam: IEvents) {
    this.selected = !this.selected
  }

  public getTextEvent(myevent: IEvents) {
    if (myevent.bodytext === '') {
      return myevent.details
    } else {
      return myevent.bodytext
    }
  }

  public mounted() {
    // console.log('MYSINGLEEVENT: myevent', this.myevent)
  }

  get static_data() {
    return static_data
  }

  public duplicateEvent(event, numgg) {
    this.$emit('duplicateEvent', event, numgg)
  }

  public askForInfoEventMenu(event) {
    this.$emit('askForInfoEventMenu', event)
  }

  public deleteEvent(event) {
    this.$emit('deleteEvent', event)
  }

  public editEvent(event) {
    this.$emit('editEvent', event)
  }

  public addBookEventMenu(event) {
    this.$emit('addBookEventMenu', event)
  }

  public EditBookEvent(event) {
    this.$emit('EditBookEvent', event)
  }

}
