import Vue from 'vue'
import VueRouter, { RouterMode } from 'vue-router'
import { PositionResult } from 'vue-router/types/router'

import { RouteConfig } from './route-config'

Vue.use(VueRouter)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const Router = new VueRouter({
  scrollBehavior: () => ({ y: 0 } as PositionResult),
  routes: RouteConfig,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE as RouterMode,
  base: process.env.VUE_ROUTER_BASE
})

export default Router
