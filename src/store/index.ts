import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { IGlobalState } from 'model'
import { Route } from 'vue-router'
import { getStoreBuilder } from 'vuex-typex'


export interface RootState {
  GlobalModule: IGlobalState
  route: Route
}

Vue.use(Vuex)

export const DebugMode = true

export * from './Modules'

export { default as EventBus } from './EventBus'
export { default as Api } from './Api'

const store: Store<RootState> = getStoreBuilder<RootState>().vuexStore()
export default store

// export function createStore() {
//   const store: Store<RootState> = storeBuilder.vuexStore({
//     strict: DebugMode
//   })
//
//   return store
//
// }
// export default new Vuex.Store<RootState>({

// })
