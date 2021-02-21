import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { func_tools } from '@src/store/Modules/toolsext'
import { CalendarStore, UserStore } from '@store'
import { CTitle } from '../../../components/CTitle/index'
import { CMyPage } from '../../../components/CMyPage/index'
import { IBookedEvent, ICalendarState, IEvents, ITodo, ITodosState, IUserState, IUserFields } from '@src/model'
import { Getter } from 'vuex-class'
import { lists } from '@src/store/Modules/lists'
import MixinUsers from '@src/mixins/mixin-users'
import MixinOperator from '@src/mixins/mixin-operator'

const namespace = 'CalendarModule'

@Component({
  mixins: [MixinUsers, MixinOperator],
  name: 'EventList',
  components: { CTitle, CMyPage }
})
export default class Eventlist extends Vue {
  public $t: any
  public $q
  public showpeople: boolean = false
  public eventsel: IEvents = null
  public showPrev = false
  public numrec = 0

  @Getter('getEventsBookedByIdEvent', { namespace })
  public getEventsBookedByIdEvent: (state: ICalendarState, id, showall) => IBookedEvent[]

  @Getter('getNumParticipants', { namespace })
  public getNumParticipants: (state: ICalendarState, event: IEvents, showall, tipo) => number

  public getNameSurnameByUserId(userid) {
    return UserStore.getters.getNameSurnameByUserId(userid)
  }

  public getEventList() {
    const eventsloc = []

    const datenow = tools.addDays(tools.getDateNow(), -1)

    let numevent = 0

    CalendarStore.state.eventlist.forEach((myevent) => {
      // console.log('  ciclo i = ', i, CalendarStore.state.eventlist[i])
      // let dateEvent = new Date(myevent.date + ' 00:00:00')
      const dateEvent = new Date(myevent.dateTimeEnd)

      let add = true

      if (!this.showall) {
        add = CalendarStore.getters.getNumParticipants(myevent, this.showall, 0) > 0
      }

      if (add) {

        if (this.showPrev) {
          if (dateEvent < datenow) {
            eventsloc.push(myevent)
            numevent++
          }
        } else {
          if (dateEvent >= datenow) {
            eventsloc.push(myevent)
            numevent++
          }
        }

      }

    })

    this.numrec = numevent

    if (this.showPrev) {
      eventsloc.reverse()
    }

    return eventsloc
  }

  public getNumEvent() {
    const eventsloc = []

    const datenow = tools.addDays(tools.getDateNow(), -1)

    let numevent = 0

    CalendarStore.state.eventlist.forEach((myevent) => {
      // console.log('  ciclo i = ', i, CalendarStore.state.eventlist[i])
      // let dateEvent = new Date(myevent.date + ' 00:00:00')
      const dateEvent = new Date(myevent.dateTimeEnd)

      let add = true

      if (!this.showall) {
        add = CalendarStore.getters.getNumParticipants(myevent, this.showall, 0) > 0
      }

      if (add) {
        if (this.showPrev) {
          if (dateEvent < datenow)
            numevent++
        } else {
          if (dateEvent >= datenow)
            numevent++
        }
      }
    })

    this.numrec = numevent

    return eventsloc
  }

  get func_tools() {
    return func_tools
  }

  get tools() {
    return tools
  }

  get mythis() {
    return this
  }

  set mythis(my) {
    //
  }

  get mostra() {
    return this.$route.name
  }

  get showall() {
    return this.$route.name === 'otherpages.admin.usereventlist'
  }

  get gettitle() {
    if (this.showall)
      return this.$t('otherpages.admin.usereventlist')
    else
      return this.$t('otherpages.admin.eventlist')
  }

  get lists() {
    return lists
  }

  public mounted() {
    this.getNumEvent()
  }

}
