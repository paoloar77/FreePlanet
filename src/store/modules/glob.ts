import Vue from 'vue'
import Vuex from 'vuex'

import { Module, VuexModule, Mutation, MutationAction, Action, getModule } from 'vuex-module-decorators'

import * as types from '@/store/mutation-types'

import store from '@/store'

Vue.use(Vuex)

export interface IGlob {
  conta: number
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  posts: string[]
}


@Module({ dynamic: true, store, name: 'glob' })
class Glob extends VuexModule {   // Non occorrono i getters, basta questi qui:
  conta = 0
  isLoginPage = false
  layoutNeeded = true
  mobileMode = false
  menuCollapse = true
  posts = []

  getConta() {
    return this.conta
  }

  getIsLoginPage() {
    return this.isLoginPage
  }

  getLayoutNeeded() {
    return this.layoutNeeded
  }

  getMobileMode() {
    return this.mobileMode
  }

  getMenuCollapse() {
    return this.menuCollapse
  }

  getPosts() {
    return this.posts
  }

  @MutationAction({ mutate: ['conta'] })
  async setConta(num: number) {
    return { conta: num }
  }

}

export const GlobModule = getModule(Glob.prototype)
