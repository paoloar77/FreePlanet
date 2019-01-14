import { ITodosState } from 'model'
import { storeBuilder } from './Store/Store'


const state: ITodosState = {
  visuOnlyUncompleted: false
}

const b = storeBuilder.module<ITodosState>('TodosModule', state)

// Getters
namespace Getters {

  const visuOnlyUncompleted = b.read(state => state.visuOnlyUncompleted, 'visuOnlyUncompleted')

  export const getters = {
    get visuOnlyUncompleted() {
      return visuOnlyUncompleted
    }
  }
}

namespace Mutations {

  function deleteItem(state: ITodosState, num: number) {
    // state.conta = num
    // Cancella Item
  }

  export const mutations = {
    deleteItem: b.commit(deleteItem),
  }

}

namespace Actions {
  async function deleteItem(context, num: number) {
    Mutations.mutations.deleteItem(num)
  }

  export const actions = {
    setConta: b.dispatch(deleteItem)
  }

}

const stateGetter = b.state()

// Module
const TodosModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}


export default ITodosState

