import Api from '@api'
import { ICalendarState, IEvents } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from '../Store'

import { serv_constants } from '../../serv_constants'
import { tools } from '../../tools'

import translate from '../../../../globalroutines/util'
import * as Types from '../../../Api/ApiTypes'
import { db_data } from '@src/db/db_data'

// State
const state: ICalendarState = {
  editable: false,
  eventlist: [],
  bookedevent: [],
  // ---------------
  titlebarHeight: 0,
  locale: 'it-IT',
  maxDays: 1,
  fiveDayWorkWeek: false,
  shortMonthLabel: false,
  showDayOfYearLabel: false,
  shortWeekdayLabel: true,
  shortIntervalLabel: false,
  hour24Format: true,
  hideHeader: false,
  noScroll: false,
  showMonthLabel: false,
  showWorkWeeks: false,
  intervalRange: {min: 9, max: 23},
  intervalRangeStep: 1,
  intervalHeight: 35,
  resourceHeight: 60,
  resourceWidth: 100,
  dayHeight: 100,
  enableThemes: false,
  theme: {}
}

const b = storeBuilder.module<ICalendarState>('CalendarModule', state)
const stateGetter = b.state()

namespace Getters {

  const findEventBooked = b.read((mystate) => (myevent: IEvents) => {
    return mystate.bookedevent.find((bookedevent) => bookedevent.id_bookedevent === myevent._id)
  }, 'findEventBooked')

  export const getters = {
    get findEventBooked() {
      return findEventBooked()
    }
  }

}

namespace Mutations {
  // function authUser(state: ICalendarState, data: ICalendarState) {
  //   state.userId = data.userId
  // }
  //
  // export const mutations = {
  //   authUser: b.commit(authUser),
  // }

}

namespace Actions {
  async function loadAfterLogin(context) {
    // Load local data
    state.editable = db_data.userdata.calendar_editable
    state.eventlist = db_data.events
    state.bookedevent = db_data.userdata.bookedevent
  }

  async function BookEvent(context, event: IEvents) {
    console.log('BookEvent', event)
    state.bookedevent.push({id_bookedevent: event._id, numpeople: 1})
  }

  async function CancelBookingEvent(context, event: IEvents) {
    console.log('CancelBookingEvent', event)

    state.bookedevent = state.bookedevent.filter((eventbooked) => (eventbooked.id_bookedevent !== event._id) )
  }

  export const actions = {
    loadAfterLogin: b.dispatch(loadAfterLogin),
    BookEvent: b.dispatch(BookEvent),
    CancelBookingEvent: b.dispatch(CancelBookingEvent)
  }

  // async function resetpwd(context, paramquery: ICalendarState) {
  // }
  //
  // export const actions = {
  //   autologin_FromLocalStorage: b.dispatch(autologin_FromLocalStorage)
  // }
}

// Module
const CalendarModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters
  // mutations: Mutations.mutations
}

export default CalendarModule
