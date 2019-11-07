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
import { CCard, CMyAvatar, CMyPage } from '@components'
import MixinOperator from '@src/mixins/mixin-operator'
import MixinEvents from '../../mixins/mixin-events'
import { IEvents } from '@src/model'
import MixinBase from '@src/mixins/mixin-base'
import MixinUsers from '@src/mixins/mixin-users'

@Component({
  name: 'CMySingleEvent',
  mixins: [MixinOperator, MixinBase, MixinEvents, MixinUsers],
  components: { Logo, Footer, CImgText, CCard, CMyPage, CMyAvatar }
})
export default class CMySingleEvent extends MixinEvents {
  public $q
  public $t
  public myevent: IEvents = null
  public selected: boolean = false

  @Watch('$route.params.eventid')
  public changeevent() {
    // this.mytypetransgroup = ''
    this.myevent = CalendarStore.state.eventlist.find((rec) => rec._id === this.$route.params.eventid)
    // console.log('myevent', this.myevent, 'eventid=', this.$route.params.eventid)
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
    this.changeevent()
    console.log('myevent', this.myevent)
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
