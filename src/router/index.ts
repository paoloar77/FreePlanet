import Vue from 'vue'
import VueRouter, { RouterMode } from 'vue-router'
import { PositionResult } from 'vue-router/types/router'

import { IMyRoute, IMyRouteRecord } from './route-config'
import { ProgressBar } from '@src/store/Modules/Interface'
import { isEqual } from 'lodash'
import { UserStore } from '@store'
import { tools } from '@src/store/Modules/tools'

import { cfgrouter } from '../../cfg_locale'

Vue.use(VueRouter)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 } as PositionResult),
  routes: cfgrouter.routes,

  // Leave these as is and change from quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  mode: process.env.VUE_ROUTER_MODE as RouterMode,
  base: process.env.VUE_ROUTER_BASE
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) {
    return context.next
  }

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

Router.beforeEach(async (to: IMyRoute, from: IMyRoute, next) => {
    try {
      // Check session
      // if (!LoginStore.state.sessionChecked) {
      //   await LoginStore.actions.checkUserSession();
      // }

      // console.log(to, from)

      if (from.name && from.matched[0].name === to.name && from.meta.isModal) {
        next()
        console.log('Route interceptor log: <1>')
        return
      }
      else if (from.name === to.name && isEqual(from.params, to.params)) {
        console.log('Route interceptor log: <2>')
        next()
      } else {
        if (!to.meta.transparent && !to.meta.isModal) {
          // console.log('Route interceptor log: <4>')
          ProgressBar.mutations.start()
        }
        else if (to.meta.transparent && !from.name) {
          console.log('Route interceptor log: <5>')
          ProgressBar.mutations.start()
        }
        else if (to.meta.transparent && !to.matched.some((m) => m.name === from.name)) {
          console.log('Route interceptor log: <6>')
          ProgressBar.mutations.start()
        }

        // If page is initialazed on child
        /*
                  if (to.matched[0] && to.meta.isModal) {
                    console.log('Route interceptor log: <7>')
                    if (!from.nametranslate) {
                      getRouteData(to.matched[0])
                      GlobalStore.mutations.setPreviousModalRoute(to.matched[0].path)
                    } else {
                      GlobalStore.mutations.setPreviousModalRoute(from.fullPath)
                    }
                  }
        */


        // Check requires auth
        if (to.matched.some((m) => m.meta.requiresAuth)) {
          // await LoginStore.actions.refreshUserInfos()
          if (tools.isLoggedToSystem()) {
            if (!!to.meta.asyncData) {
              await getRouteData(to)
            }
            /*
            if (to.matched.some((m) => !!m.meta.isAuthorized)) {
            const results = await Promise.all([
                ...to.matched.filter((m) => !!m.meta.isAuthorized)
                  .map((m) => m.meta.isAuthorized(to))
              ])

                        if (!results.every((m) => m)) {
                          NotificationsStore.actions.addNotification({
                            type: 'warning',
                            message: `Vous n'avez pas accès à cette page`
                          })
                          ProgressBar.mutations.fail()
                          if (from.nametranslate) {
                            return
                          } else {
                            next('/')
                          }
                        }
            }
            */
          } else {
            // LoginStore.mutations.showLoginRoute(to.fullPath)
            if (from.name) {
              ProgressBar.mutations.hide()
            } else {
              // next('/')
            }

            return Router.push({ name: 'login' })
          }
        } else if (to.matched.some((m) => m.meta.noAuth) && UserStore.state.isLogged) {
          next('/')
        } else {
          if (!!to.meta.asyncData) {
            await getRouteData(to)
          }
        }
      }


      // if (to.meta.middleware) {
      //   const middleware = Array.isArray(to.meta.middleware)
      //     ? to.meta.middleware
      //     : [to.meta.middleware]
      //
      //   const context = {
      //     from,
      //     next,
      //     Router,
      //     to
      //   }
      //
      //   const nextMiddleware = nextFactory(context, middleware, 1)
      //
      //   return middleware[0]({ ...context, next: nextMiddleware })
      // }
      //
      return next()

    }
    catch
      (err) {
      console.log('Route error:', err)
      ProgressBar.mutations.fail()
    }
  }
)

const getRouteData = async (to: IMyRoute | IMyRouteRecord) => {
  if (!to.meta.transparent) {
    ProgressBar.mutations.start()
  }
  const titleToDisplay: any = await to.meta.asyncData(to)
  // if (to.meta.contentProp) {
  //   document.title = `${titleToDisplay.title || to.meta.title} - MovingMate`
  // }
}

Router.afterEach(async (from: IMyRoute, next) => {
  ProgressBar.mutations.finish()
  // AlertsStore.mutations.hideAlert()
  // EventBus.$emit('closePopups')
})

export default Router
