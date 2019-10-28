import Api from '@api'
import { IBookedEvent, ICalendarState, IEvents, IMessage } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from '../Store'

import { serv_constants } from '../../serv_constants'
import { tools } from '../../tools'

import translate from '../../../../globalroutines/util'
import * as Types from '../../../Api/ApiTypes'
import { db_data } from '@src/db/db_data'
import { GlobalStore, UserStore } from '@store'
import { lists } from '@src/store/Modules/lists'

// State
const state: ICalendarState = {
  editable: false,
  eventlist: [],
  bookedevent: [],
  operators: [],
  wheres: [],
  contribtype: [],
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
    return mystate.bookedevent.find((bookedevent) => (bookedevent.id_bookedevent === myevent._id) && (bookedevent.userId === UserStore.state.my._id) && ((isconfirmed && bookedevent.booked) || (!isconfirmed)))
  }, 'findEventBooked')

  const getNumParticipants = b.read((mystate: ICalendarState) => (myevent: IEvents, showall) => {
    const myarr = mystate.bookedevent.filter((bookedevent) => (bookedevent.id_bookedevent === myevent._id) && (bookedevent.booked) && (showall || (!showall && bookedevent.userId === UserStore.state.my._id) ))
    if (myarr)
      return myarr.reduce((sum, bookedevent) => sum + bookedevent.numpeople, 0)
    else
      return 0
  }, 'getNumParticipants')

  const getEventsBookedByIdEvent = b.read((mystate: ICalendarState) => (idevent, showall) => {
    return mystate.bookedevent.filter((bookedevent) => (bookedevent.id_bookedevent === idevent) && (bookedevent.booked) && (showall || (!showall && bookedevent.userId === UserStore.state.my._id) ))
  }, 'getEventsBookedByIdEvent')

  const getWhereRec = b.read((mystate: ICalendarState) => (wherecode) => {
    const whererec = mystate.wheres.find((mywhere) => mywhere.code === wherecode)
    return (whererec)

  }, 'getWhereRec')

  const getContribtypeRec = b.read((mystate: ICalendarState) => (id) => {
    const ctrec = mystate.contribtype.find((mycontr) => mycontr._id === id)
    return (ctrec)

  }, 'getContribtypeRec')

  const getContribtypeById = b.read((mystate: ICalendarState) => (id) => {
    const ctrec = mystate.contribtype.find((mycontr) => mycontr._id === id)
    return (ctrec) ? ctrec.label : ''

  }, 'getContribtypeById')
  const getContribtypeRecByLabel = b.read((mystate: ICalendarState) => (label) => {
    const ctrec = mystate.contribtype.find((mycontr) => mycontr.label === label)
    return (ctrec)

  }, 'getContribtypeRecByLabel')

  export const getters = {
    get findEventBooked() {
      return findEventBooked()
    },
    get getNumParticipants() {
      return getNumParticipants()
    },
    get getEventsBookedByIdEvent() {
      return getEventsBookedByIdEvent()
    },
    get getWhereRec() {
      return getWhereRec()
    },
    get getContribtypeRec() {
      return getContribtypeRec()
    },
    get getContribtypeById() {
      return getContribtypeById()
    },
    get getContribtypeRecByLabel() {
      return getContribtypeRecByLabel()
    }
  }
}

namespace Mutations {
  // function authUser(state: ICalendarState, data: ICalendarState) {
  //   state._id = data._id
  // }
  //
  // export const mutations = {
  //   authUser: b.commit(authUser),
  // }

}

namespace Actions {

  function getparambyevent(bookevent) {
    return {
      _id: bookevent._id,
      id_bookedevent: bookevent.id_bookedevent,
      infoevent: bookevent.infoevent,
      numpeople: bookevent.numpeople,
      msgbooking: bookevent.msgbooking,
      datebooked: bookevent.datebooked,
      userId: UserStore.state.my._id,
      booked: bookevent.booked,
      modified: bookevent.modified
    }
  }

  async function BookEvent(context, bookevent: IBookedEvent) {
    console.log('BookEvent', bookevent)

    const param = getparambyevent(bookevent)

    return await Api.SendReq('/booking', 'POST', param)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {
            bookevent._id = res.data.id
            if (bookevent.modified) {

              const foundIndex = state.bookedevent.findIndex((x) => x.id_bookedevent === bookevent.id_bookedevent)
              if (foundIndex >= 0)
                state.bookedevent[foundIndex] = bookevent

            } else {
              state.bookedevent.push(bookevent)
            }
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

  async function CancelEvent(context, { id }) {
    return await GlobalStore.actions.DeleteRec({table: tools.TABEVENTS, id } )
  }

  async function CancelBookingEvent(context, { ideventbook, notify }) {
    console.log('CALSTORE: CancelBookingEvent', ideventbook, notify)

    return await Api.SendReq('/booking/' + ideventbook + '/' + notify + '/' + process.env.APP_ID, 'DELETE', null)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === serv_constants.RIS_CODE_OK) {

            // Remove this record from my list
            state.bookedevent = state.bookedevent.filter((eventbooked) => (eventbooked._id !== ideventbook))

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
    BookEvent: b.dispatch(BookEvent),
    CancelBookingEvent: b.dispatch(CancelBookingEvent),
    CancelEvent: b.dispatch(CancelEvent)
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
