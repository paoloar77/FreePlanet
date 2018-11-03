import Vue from 'vue'
import Vuex from 'vuex'

import { IUserState } from '@/types'

Vue.use(Vuex)

export interface IRootState {
  user: IUserState
  role: IRootState
}

export default new Vuex.Store<IRootState>({})
