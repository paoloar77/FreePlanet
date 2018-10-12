import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types from '../mutation-types'


export const state = {
  conta: 0,
  deferredPrompt: null,
  layoutNeeded: true,
  isLoginPage: false,
  mobileMode: false,
  menuCollapse: true,

  posts: [],
};

export const mutations = {
  setValue (state) {
    state.conta = value
  },
  setDefprompt (state, value) {
    state.deferredPrompt = value
  },
  setdefprompt (state, value) {
    state.deferredPrompt = value
  },
  setLayoutNeeded (state, value) {
    state.layoutNeeded = value
  },
  setIsLoginPage (state, value) {
    state.isLoginPage = value
  },
  setMobileMode (state, value) {
    state.mobileMode = value
  },
  setMenuCollapse (state, value) {
    state.menuCollapse = value
  },
  setPosts (state, posts) {
    state.posts = posts
  }
};


export const getters = {
  getConta () {
    return state.conta
  },
  getDeferredPrompt() {
    return state.deferredPrompt
  },
  getLayoutNeeded () {
    return state.layoutNeeded
  },
  getIsLoginPage () {
    return state.isLoginPage
  },
  getMobileMode () {
    return state.mobileMode
  },
  getMenuCollapse () {
    return state.menuCollapse
  },
  getPosts () {
    return state.posts
  },

  //evenOrsOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
