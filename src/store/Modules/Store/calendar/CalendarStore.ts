import Api from '@api'
import { IBookedEvent, ICalendarState, IEvents } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from '../Store'

import { serv_constants } from '../../serv_constants'
import { tools } from '../../tools'

import translate from '../../../../globalroutines/util'
import * as Types from '../../../Api/ApiTypes'
import { db_data } from '@src/db/db_data'
import { UserStore } from '@store'

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
  intervalRange: { min: 9, max: 23 },
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

  const findEventBooked = b.read((mystate: ICalendarState) => (myevent: IEvents, isconfirmed: boolean) => {
    return mystate.bookedevent.find((bookedevent) => (bookedevent.id_bookedevent === myevent._id) && ((isconfirmed && bookedevent.booked) || (!isconfirmed)))
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
    console.log('CalendarStore: loadAfterLogin')
    // Load local data
    state.editable = db_data.userdata.calendar_editable
    state.eventlist = db_data.events
    // state.bookedevent = db_data.userdata.bookedevent

    if (UserStore.getters.isUserInvalid) {
      state.bookedevent = []
      return false
    }

    // Load local data
    console.log('CALENDAR loadAfterLogin', 'userid=', UserStore.state.userId)

    let ris = null

    ris = await Api.SendReq('/booking/' + UserStore.state.userId + '/' + process.env.APP_ID, 'GET', null)
      .then((res) => {
        if (res.data.bookedevent) {
          state.bookedevent = res.data.bookedevent
        } else {
          state.bookedevent = []
        }
      })
      .catch((error) => {
        console.log('error dbLoad', error)
        // UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    return ris

  }

  function getparambyevent(bookevent) {
    return {
      id_bookedevent: bookevent.id_bookedevent,
      infoevent: bookevent.infoevent,
      numpeople: bookevent.numpeople,
      msgbooking: bookevent.msgbooking,
      datebooked: bookevent.datebooked,
      userId: UserStore.state.userId,
      booked: bookevent.booked,
    }
  }

  async function BookEvent(context, bookevent: IBookedEvent) {
    console.log('BookEvent', bookevent)

    const param = getparambyevent(bookevent)

    return await Api.SendReq('/booking', 'POST', param)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            state.bookedevent.push(bookevent)
            return true
          }
        }
        return false
      })
      .catch((error) => {
        console.error(error)
        return false
      })

  }

  async function CancelBookingEvent(context, event: IEvents) {
    console.log('CALSTORE: CancelBookingEvent', event)

    const myeventtoCancel = state.bookedevent.find((eventbooked) => (eventbooked.id_bookedevent === event._id))

    const param = getparambyevent(myeventtoCancel)
    param.booked = false // Cancel Booking

    return await Api.SendReq('/booking', 'POST', param)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {

            state.bookedevent = state.bookedevent.filter((eventbooked) => (eventbooked.id_bookedevent !== event._id))

            return true
          }
        }
        return false

      })
      .catch((error) => {
        console.error(error)
        // UserStore.mutations.setErrorCatch(error)
        return false
      })


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
