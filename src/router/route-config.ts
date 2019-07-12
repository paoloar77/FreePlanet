import { RouteConfig, Route, RouteRecord } from 'vue-router/types'

import { tools } from '@src/store/Modules/tools'

import auth from '../middleware/auth'
import { GlobalStore, Projects, Todos, UserStore } from '@store'
import { RouteNames } from '@src/router/route-names'
import { IListRoutes, IMenuList } from '@src/model'

interface IMyMeta {
  title?: string,
  headerShadow?: boolean,
  contentProp?: boolean,
  transparent?: boolean,
  isModal?: boolean,
  requiresAuth?: boolean,
  isTab?: boolean,
  noAuth?: boolean,
  asyncData?: (to?: IMyRoute | IMyRouteRecord) => Promise<{title?: string} | void>,
  isAuthorized?: (to?: any) => boolean
  middleware?: any[]
}

export interface IMyRoute extends Route {
  meta: IMyMeta,
  matched: IMyRouteRecord[]
}

export interface IMyRouteRecord extends RouteRecord {
  meta: IMyMeta,
}

export interface IMyRouteConfig extends RouteConfig {
  children?: IMyRouteConfig[],
  meta?: IMyMeta
}

export const cfgrouter = {
  routes: [
    {
      path: '/',
      name: RouteNames.home,
      component: () => import('@/root/home/home.vue')
    },
    {
      path: '/signup',
      name: 'Registration',
      component: () => import('@/views/login/signup/signup.vue')
    },
    {
      path: '/signin',
      name: RouteNames.login,
      component: () => import('@/views/login/signin/signin.vue')
    },
    {
      path: '/vreg',
      name: 'Verify Reg',
      component: () => import('@/views/login/vreg/vreg.vue')
    },
    {
      path: '/todo/:category',
      name: 'Todos',
      component: () => import('@/views/todo-list/todo-list.vue'),
      meta: {
        requiresAuth: true,
        async asyncData() {
          await Todos.actions.dbLoad({ checkPending: false })
        }
        // middleware: [auth]
      }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/views/categories/category/category.vue')
    },
    {
      path: '/admin/cfgserv',
      name: 'cfgserv',
      component: () => import('@/views/admin/cfgServer/cfgServer.vue'),
      meta: {
        requiresAuth: true
        // middleware: [auth]
      }
    },
    {
      path: '/admin/testp1/:category',
      name: 'Categories',
      component: () => import('@/views/admin/testp1/testp1.vue')
    },
    {
      path: '/estimate',
      name: 'Estimate',
      component: () => import('@/views/pages/estimate/estimate.vue')
    },
    {
      path: '/offline',
      name: 'Offline',
      component: () => import('@/views/offline/offline.vue')
    },
    // {
    //   path: '/malaga',
    //   name: 'malaga',
    //   component: () => import('@/root/malaga/malaga.vue')
    // },
    {
      path: '/' + RouteNames.projectsall + '/:idProj',
      name: RouteNames.projectsall,
      component: () => import('@/views/projects/proj-list/proj-list.vue'),
      meta: {
        requiresAuth: false,
        async asyncData() {
          // await Todos.actions.dbLoad({ checkPending: false })
          await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
        }
        // middleware: [auth]
      }
    },
    {
      path: '/' + RouteNames.myprojects + '/:idProj',
      name: RouteNames.myprojects,
      component: () => import('@/views/projects/proj-list/proj-list.vue'),
      meta: {
        requiresAuth: true,
        async asyncData() {
          // await Todos.actions.dbLoad({ checkPending: false })
          await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
        }
        // middleware: [auth]
      }
    },
    {
      path: '/' + RouteNames.projectsshared + '/:idProj',
      name: RouteNames.projectsshared,
      component: () => import('@/views/projects/proj-list/proj-list.vue'),
      meta: {
        requiresAuth: true,
        async asyncData() {
          // await Todos.actions.dbLoad({ checkPending: false })
          await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
        }
        // middleware: [auth]
      }
    },
    {
      path: '/' + RouteNames.listprojects,
      name: RouteNames.listprojects,
      component: () => import('@/views/projects/proj-list/proj-list.vue'),
      meta: {
        requiresAuth: true,
        async asyncData() {
          // await Todos.actions.dbLoad({ checkPending: false })
          await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
        }
        // middleware: [auth]
      }
    },
    {
      path: '/' + RouteNames.favouriteprojects,
      name: RouteNames.favouriteprojects,
      component: () => import('@/views/projects/proj-list/proj-list.vue'),
      meta: {
        requiresAuth: true,
        async asyncData() {
          // await Todos.actions.dbLoad({ checkPending: false })
          await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: true })
        }
        // middleware: [auth]
      }
    }
    /*

      {
        path: '/requestresetpwd',
        component: () => import('@/views/login/requestresetpwd.vue'),
        meta: { nametranslate: 'Reset your Password' }
      },
      {
        path: '/updatepwd',
        component: () => import('@/views/login/updatepassword.vue'),
        meta: { nametranslate: 'Update your Password' }
      }

      {
        path: '/simpleform',
        component: () => import('@/views/form/simpleForm/simpleForm.vue'),
        meta: { nametranslate: 'SimpleForm' }
      },
      {
        path: '/embeeded',
        component: () => import('@/views/form/embeeded/embeeded.vue'),
        meta: { nametranslate: 'Embeeded' }
      }*/
  ],

  getmenu() {
    const arrlista = GlobalStore.state.listatodo
    const lista: IListRoutes[] = []

    arrlista.forEach((elem: IMenuList) => {
      const item: IListRoutes = {
        faIcon: 'fa fa-list-alt',
        materialIcon: 'todo',
        name: 'pages.' + elem.description,
        route: '/todo/' + elem.nametranslate
      }
      lista.push(item)
    })

    const SHOW_PROJINTHEMENU = false

    let arrlistafavourite = []
    let arrlistaprojtutti = []
    let arrlistaprojmiei = []
    if (SHOW_PROJINTHEMENU) {
      arrlistaprojtutti = Projects.getters.listaprojects(RouteNames.projectsall)
      arrlistaprojmiei = Projects.getters.listaprojects(RouteNames.myprojects)
      arrlistafavourite = Projects.getters.listaprojects(RouteNames.favouriteprojects)
    }

    const arrMenu: IMenuList[] = []

    // PROGETTI -> FAVORITI :
    if (arrlistafavourite.length > 0) {
      arrMenu.push({
        icon: 'favorite_border',
        nametranslate: 'pages.' + RouteNames.favouriteprojects,
        urlroute: RouteNames.favouriteprojects,
        level_parent: 0.0,
        level_child: 0.5,
        routes2: arrlistafavourite,
        idelem: ''
      })
    }

    // PROGETTI -> TUTTI :
    arrMenu.push({
      icon: 'accessibility_new',
      nametranslate: 'pages.' + RouteNames.projectsall,
      urlroute: RouteNames.projectsall,
      level_parent: 0.0,
      level_child: 0.5,
      routes2: [],
      idelem: process.env.PROJECT_ID_MAIN
    })

    // PROGETTI -> CONDIVISI :
    arrMenu.push({
      icon: 'people_outline',
      nametranslate: 'pages.' + RouteNames.projectsshared,
      urlroute: RouteNames.projectsshared,
      level_parent: 0.0,
      level_child: 0.5,
      routes2: arrlistaprojtutti,
      idelem: process.env.PROJECT_ID_MAIN
    })

    // PROGETTI -> PERSONALI :
    arrMenu.push({
      icon: 'person',
      nametranslate: 'pages.' + RouteNames.myprojects,
      urlroute: RouteNames.myprojects,
      level_parent: 0.0,
      level_child: 0.5,
      routes2: arrlistaprojmiei,
      idelem: process.env.PROJECT_ID_MAIN
    })

    const listaprojectMenu: IListRoutes[] = tools.convertMenuListInListRoutes(arrMenu)

    const arrroutes: IListRoutes[] = []

    tools.addRoute(arrroutes, { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home' })   // HOME

    tools.addRoute(arrroutes, {
      route: '/todo', faIcon: 'fa fa-list-alt', materialIcon: 'format_list_numbered', name: 'pages.Todo',
      routes2: lista,
      level_parent: 0.5,
      level_child: 0.5
    })

    const myarrproj = []
    for (const myitem of listaprojectMenu) {
      tools.addRoute(myarrproj, myitem)
    }

    tools.addRoute(arrroutes, {
      route: '', faIcon: 'fa fa-list-alt', materialIcon: 'next_week', name: 'pages.projects',
      routes2: myarrproj,
      level_parent: 0.0,
      level_child: 0.5
    })

    console.log('arrroutes', arrroutes)
    console.log('listaprojectMenu', listaprojectMenu)
    // console.log('arrlistaprojmiei', arrlistaprojmiei)

    if (UserStore.state.isAdmin) {
      tools.addRoute(arrroutes, {
        route: '/category',
        faIcon: 'fa fa-list-alt',
        materialIcon: 'category',
        name: 'pages.Category',
        level_parent: 0.0,
        level_child: 0.0
      })
      tools.addRoute(arrroutes, {
        route: '/admin/cfgserv',
        faIcon: 'fa fa-database',
        materialIcon: 'event_seat',
        name: 'pages.Admin',
        level_parent: 0.0,
        level_child: 0.0
      })
      tools.addRoute(arrroutes, {
        route: '/admin/testp1/par1',
        faIcon: 'fa fa-database',
        materialIcon: 'restore',
        name: 'pages.Test1',
        level_parent: 0.0,
        level_child: 0.0
      })
      tools.addRoute(arrroutes, {
        route: '/admin/testp1/par2',
        faIcon: 'fa fa-database',
        materialIcon: 'restore',
        name: 'pages.Test2',
        level_parent: 0.0,
        level_child: 0.0
      })
    }

    return arrroutes
  }
}
