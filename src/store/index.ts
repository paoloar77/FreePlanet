import Vue from 'vue'
import Vuex from 'vuex'


import { IUserState, IGlobState } from 'model'
import {Route} from 'vue-router'

Vue.use(Vuex)


export interface RootState {
  GlobalModule: IGlobState
  route: Route
}

export const DebugMode = true

export * from './Modules'
export {default as EventBus} from './EventBus'
export {default as Api} from './Api'

export default new Vuex.Store<RootState>({
})
