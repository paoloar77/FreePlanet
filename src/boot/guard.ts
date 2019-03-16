// import something here

export default ({ app, router, store, Vue }) => {
  // ******************************************
  // *** Per non permettere di accedere alle pagine in cui è necessario essere Loggati ! ***
  // ******************************************

  // Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
  function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index]
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) { return context.next }

    return (...parameters) => {
      // Run the default Vue Router `next()` callback first.
      context.next(...parameters)
      // Then run the subsequent Middleware with a new
      // `nextMiddleware()` callback.
      const nextMiddleware = nextFactory(context, middleware, index + 1)
      subsequentMiddleware({ ...context, next: nextMiddleware })
    }
  }

  router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
        ? to.meta.middleware
        : [to.meta.middleware];

      const context = {
        from,
        next,
        router,
        to,
      };
      const nextMiddleware = nextFactory(context, middleware, 1)

      return middleware[0]({ ...context, next: nextMiddleware })
    }

    return next()
  })


  /*router.beforeEach((to, from, next) => {
    var accessToken = store.state.session.userSession.accessToken
    // ESTANDO LOGEADO
    if (accessToken) {
      // SE PERMITE IR DE AREA PUBLICA A PRIVADA
      if (!from.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.requiresAuth)) {
        next()
      }
      // SE PERMITE IR DE UNA AREA PRIVADA A OTRA PRIVADA
      if (from.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.requiresAuth)) {
        next()
      }
      // NO SE PERMITE IR A UN AREA PUBLICA DESDE UN AREA PRIVADA
      if (from.matched.some(record => record.meta.requiresAuth) && !to.matched.some(record => record.meta.requiresAuth)) {
        next(false)
      }
      // SE REDIRIJE AL PANEL
      if (!from.matched.some(record => record.meta.requiresAuth) && !to.matched.some(record => record.meta.requiresAuth)) {
        next('/Panel')
      }
      // NO ESTA LOGEADO
    } else {
      // SE PERMITE IR DE UNA AREA PUBLICA A OTRA PUBLICA
      if (!from.matched.some(record => record.meta.requiresAuth) && !to.matched.some(record => record.meta.requiresAuth)) {
        next()
      }
      // SE PERMITE IR DE UNA AREA PRIVADA A UNA PUBLICA (LOGOUT)
      if (from.matched.some(record => record.meta.requiresAuth) && !to.matched.some(record => record.meta.requiresAuth)) {
        next()
      }
      // NO SE PERMITE IR DE UNA AREA PUBLICA A UNA PRIVADA
      if (!from.matched.some(record => record.meta.requiresAuth) && to.matched.some(record => record.meta.requiresAuth)) {
        // REDIRIGIR A LOGIN
        next('/')
      }
    }
  })*/

}
