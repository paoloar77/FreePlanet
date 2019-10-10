import { ICfgServer, IConfig, IBookingState, IListRoutes, IMenuList, StateConnection } from 'model'
import { storeBuilder } from './Store/Store'

import Vue from 'vue'

import translate from './../../globalroutines/util'

import urlBase64ToUint8Array from '../../js/utility'

import Api from '@api'
import * as Types from '@src/store/Api/ApiTypes'
import { costanti } from '@src/store/Modules/costanti'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore, Projects, Todos, UserStore } from '@store'

import { static_data } from '@src/db/static_data'
import { db_data } from '@src/db/db_data'
import { IEvents } from '../../model'
import { serv_constants } from '@src/store/Modules/serv_constants'

const state: IBookingState = {
  bookinglist: []
}

const b = storeBuilder.module<IBookingState>('BookingModule', state)

// Getters
namespace Getters {
  export const getters = {

  }
}

namespace Mutations {
  export const mutations = {

  }

}

namespace Actions {
  async function loadAfterLogin(context) {
    return true
  }

  export const actions = {
    loadAfterLogin: b.dispatch(loadAfterLogin)
  }

}

const stateGetter = b.state()

// Module
const BookingModule = {
  get state() {
    return stateGetter()
  },
  actions: Actions.actions,
  getters: Getters.getters,
  mutations: Mutations.mutations
}

export default BookingModule
