import Api from '@api'
import { ICalendarState } from 'model'
import { ILinkReg, IResult, IIdToken, IToken } from 'model/other'
import { storeBuilder } from '../Store'

import { serv_constants } from '../../serv_constants'
import { tools } from '../../tools'

import translate from '../../../../globalroutines/util'
import * as Types from '../../../Api/ApiTypes'

// State
const state: ICalendarState = {
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

  // const lang = b.read((state) => {
  //   if (state.lang !== '') {
  //     return state.lang
  //   } else {
  //     return process.env.LANG_DEFAULT
  //   }
  // }, 'lang')
  //
  // export const getters = {
  //   get lang() {
  //     return lang()
  //   },
  // }

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
  }
  // actions: Actions.actions,
  // getters: Getters.getters,
  // mutations: Mutations.mutations
}

export default CalendarModule
