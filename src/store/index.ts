import Vue from 'vue'
import Vuex from 'vuex'

import { IUserState, IGlobState } from '@/types'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
  glob: IGlobState
  role: IRootState
}

const store = new Vuex.Store<IRootState>({})

export default store
