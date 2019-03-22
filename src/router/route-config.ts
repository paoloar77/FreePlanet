import { RouteConfig, Route, RouteRecord } from 'vue-router/types'

import { RouteNames } from './route-names'
import { tools } from '@src/store/Modules/tools'

import auth from '../middleware/auth'
import { Todos } from "@store"

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

export const routesList: IMyRouteConfig[] = [
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
    component: () => import('@/views/todo/todo.vue'),
    meta: {
      requiresAuth: true,
      async asyncData() {
        await Todos.actions.dbLoadTodo({ checkPending: false })
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
    path: '/offline',
    name: 'Offline',
    component: () => import('@/views/offline/offline.vue')
  },
  {
    path: '/projects',
    name: 'progetti',
    component: () => import('@/views/projects/proj-list/proj-list.vue'),
    meta: {
      requiresAuth: true
      // middleware: [auth]
    }
  }

  /*

  {
    path: '/requestresetpwd',
    component: () => import('@/views/login/requestresetpwd.vue'),
    meta: { name: 'Reset your Password' }
  },
  {
    path: '/updatepwd',
    component: () => import('@/views/login/updatepassword.vue'),
    meta: { name: 'Update your Password' }
  }


  {
    path: '/simpleform',
    component: () => import('@/views/form/simpleForm/simpleForm.vue'),
    meta: { name: 'SimpleForm' }
  },
  {
    path: '/embeeded',
    component: () => import('@/views/form/embeeded/embeeded.vue'),
    meta: { name: 'Embeeded' }
  }*/
]
