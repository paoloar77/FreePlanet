import { IGlobalState } from 'model'
import { storeBuilder } from './Store/Store'


const state: IGlobalState = {
  conta: 0,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  leftDrawerOpen: true,
  category: 'personal',
  posts: [],
  listatodo: [
    {namecat: 'personal', description: 'personal'},
    {namecat: 'work', description: 'work'},
    {namecat: 'shopping', description: 'shopping'}
    ]
}

const b = storeBuilder.module<IGlobalState>('GlobalModule', state)

// Getters
namespace Getters {

  const conta = b.read(state => state.conta, 'conta')
  const listatodo = b.read(state => state.listatodo, 'listatodo')
  const category = b.read(state => state.category, 'category')

  export const getters = {
    get conta() {
      return conta()
    },

    get listaTodo() {
      return listatodo()
    },

    get category() {
      return category()
    }
  }
}

namespace Mutations {

  function setConta(state: IGlobalState, num: number) {
    state.conta = num
  }

  function setleftDrawerOpen(state: IGlobalState, bool: boolean) {
    state.leftDrawerOpen = bool
  }

  function setCategorySel(state: IGlobalState, cat: string) {
    state.category = cat
  }


  export const mutations = {
    setConta: b.commit(setConta),
    setleftDrawerOpen: b.commit(setleftDrawerOpen),
    setCategorySel: b.commit(setCategorySel)
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
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}


export default GlobalModule

