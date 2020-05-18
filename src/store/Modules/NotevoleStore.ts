import Api from '@api'
import { IAction, INotevoleState, IParamsQuery } from 'model'
import { storeBuilder } from './Store/Store'

import { serv_constants } from '../Modules/serv_constants'
import { tools } from '../Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore, NotevoleStore, Todos, Projects, CalendarStore, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'

import { static_data } from '@src/db/static_data'
import { db_data } from '@src/db/db_data'

import translate from './../../globalroutines/util'
import * as Types from '@src/store/Api/ApiTypes'
import { ICalendarState, ICfgServer } from '@src/model'

const state: INotevoleState = {
  datastat: {

  }
}

const b = storeBuilder.module<INotevoleState>('NotevoleModule', state)

namespace Getters {
  // const fullName = b.read(function fullName(state): string {
  //   return state.NotevoleInfos.firstname?capitalize(state.NotevoleInfos.firstname) + " " + capitalize(state.NotevoleInfos.lastname):null;
  // })

  // const isNotevoleInvalid = b.read((mystate) => {
  //   try {
  //     const ris = (mystate.my._id === undefined) || (mystate.my._id.trim() === '') || (mystate.my.tokens[0] === undefined)
  //     // console.log('state._id', state._id, 'ris', ris)
  //     return ris
  //   } catch (e) {
  //     return true
  //   }
  // }, 'isNotevoleInvalid')

  export const getters = {
  }

}

namespace Mutations {
  export const mutations = {
  }
}

namespace Actions {

  async function notevoleload(context) {

    const paramquery = {
      locale: tools.getLocale(),
      username: UserStore.state.my.username
    }

    return await Api.SendReq('/site/load', 'POST', paramquery)
      .then((res) => {
        // console.log('res', res)
        state.datastat = res.data.datastat
        state.datastat.arr_nations = JSON.parse(state.datastat.arr_nations)
        state.datastat.reg_daily = JSON.parse(state.datastat.reg_daily)
        state.datastat.imbarcati_daily = JSON.parse(state.datastat.imbarcati_daily)
        state.datastat.imbarcati_weekly = JSON.parse(state.datastat.imbarcati_weekly)
        state.datastat.reg_weekly = JSON.parse(state.datastat.reg_weekly)
        state.datastat.checkuser = JSON.parse(state.datastat.checkuser)

        return state.datastat
      }).catch((error) => {
        return null
      })
  }

  export const actions = {
    notevoleload: b.dispatch(notevoleload)
  }

}

const stateGetter = b.state()

// Module
const NotevoleModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default NotevoleModule
