import Vue from 'vue'
import Vuex from 'vuex'

import { Module, VuexModule, Mutation, MutationAction, Action, getModule } from 'vuex-module-decorators'

import { IGlobalState } from '@types'

import { storeBuilder } from '@store'

Vue.use(Vuex)


const state: IGlobalState = {
  conta: 0,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  posts: []
}

const b = storeBuilder.module<IGlobalState>('GlobalModule', state)
const stateGetter = b.state()

// Getters
namespace Getters {

  const getConta = b.read(function getConta(state: IGlobalState): number {
    return state.conta
  })

  const getIsLoginPage = b.read(function getIsLoginPage(state: IGlobalState): boolean {
    return state.isLoginPage
  })

  const getLayoutNeeded = b.read(function getLayoutNeeded(state: IGlobalState): boolean {
    return state.layoutNeeded
  })

  const getMobileMode = b.read(function getMobileMode(state: IGlobalState): boolean {
    return state.mobileMode
  })

  const getMenuCollapse = b.read(function getMenuCollapse(state: IGlobalState): boolean {
    return state.menuCollapse
  })

  const getPosts = b.read(function getPosts(state: IGlobalState): boolean {
    return state.posts
  })

  export const getters = {
    get getConta() { return getConta() },
    get getIsLoginPage() { return getIsLoginPage() },
    get getLayoutNeeded() { return getLayoutNeeded() },
    get getMobileMode() { return getMobileMode() },
    get getMenuCollapse() { return getMenuCollapse() },
    get getPosts() { return getPosts() }
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
  async function setConta(num: number) {
    Mutations.mutations.setConta(num)
  }

  export const actions = {
    setConta: b.dispatch(setConta)
  }

}

// Module
const GlobalModule = {
  get state() { return stateGetter()},
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}


export default GlobalModule

