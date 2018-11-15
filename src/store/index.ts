import Vue from 'vue'
import Vuex from 'vuex'

import { IUserState, IGlobState } from 'model'
import {Route} from 'vue-router'


Vue.use(Vuex)

export interface RootState {
  user: IUserState
  glob: IGlobState
  route: Route
}

// const store = new Vuex.Store<IRootState>({})

// export default store

export * from './Modules'
// export {default as EventBus} from './EventBus';
export {default as Api} from './Api'
