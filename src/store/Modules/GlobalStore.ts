import { IGlobalState } from 'model'
import { storeBuilder } from './Store/Store'


const state: IGlobalState = {
  conta: 0,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  posts: []
}

const b = storeBuilder.module<IGlobalState>('GlobalModule', state)

// Getters
namespace Getters {

  const conta = b.read(state => state.conta , 'conta')

  export const getters = {
    get conta() {
      return conta()
    }
  }
}

namespace Mutations {

  function setConta(state: IGlobalState, num: number) {
    state.conta = num
  }

  export const mutations = {
    setConta: b.commit(setConta)
  }

}

namespace Actions {
  async function setConta(context, num: number) {
    Mutations.mutations.setConta(num)
  }

  export const actions = {
    setConta: b.dispatch(setConta)
  }

}

const stateGetter = b.state()

// Module
const GlobalModule = {
  get state() { return stateGetter()},
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}


export default GlobalModule

