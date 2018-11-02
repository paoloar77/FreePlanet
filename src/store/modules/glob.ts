/*
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import * as types from '../mutation-types'

export const state = {
  conta: 0,
  deferredPrompt: null,
  isLoginPage: false,
  layoutNeeded: true,
  mobileMode: false,
  menuCollapse: true,
  posts: [{title:'titolo 1'}, {title:'titolo 2'}],

};

export const getters = {
  getConta: state => state.conta,
  getDeferredPrompt: state => state.deferredPrompt,
  getIsLoginPage: state => state.isLoginPage,
  getLayoutNeeded: state => state.layoutNeeded,
  getMobileMode: state => state.mobileMode,
  getMenuCollapse: state => state.menuCollapse,
  getPosts: state => state.posts,
};


export const mutations = {
  [types.SET_VALUE]: (state, payload) => { state.conta = payload; },
  [types.SET_DEFFERED_PROMPT]: (state, payload) => { state.deferredPrompt = payload; },
  [types.SET_LOGIN_PAGE]: (state, payload) => { state.isLoginPage = payload; },
  [types.SET_LAYOUT_NEEDED]: (state, payload) => { state.layoutNeeded = payload; },
  [types.SET_MOBILE_MODE]: (state, payload) => { state.mobileMode = payload; },
  [types.SET_MENU_COLLAPSED]: (state, payload) => { state.menuCollapse = payload; },
  [types.SET_POSTS]: (state, payload) => { state.posts = payload; },
};


export const actions = {
  [types.SET_VALUE]: ({commit}, payload) => { commit(types.SET_VALUE, payload) },
  [types.SET_DEFFERED_PROMPT]: ({commit}, payload) => { commit(types.SET_DEFFERED_PROMPT, payload) },
  [types.SET_LOGIN_PAGE]: ({commit}, payload) => { commit(types.SET_LOGIN_PAGE, payload) },
  [types.SET_LAYOUT_NEEDED]: ({commit}, payload) => { commit(types.SET_LAYOUT_NEEDED, payload) },
  [types.SET_MOBILE_MODE]: ({commit}, payload) => { commit(types.SET_MOBILE_MODE, payload) },
  [types.SET_MENU_COLLAPSED]: ({commit}, payload) => { commit(types.SET_MENU_COLLAPSED, payload) },
  [types.SET_POSTS]: ({commit}, payload) => { commit(types.SET_POSTS, payload) },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
*/
