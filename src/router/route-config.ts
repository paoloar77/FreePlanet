import { RouteConfig as VueRouteConfig } from 'vue-router'

import { RouteNames } from './route-names'
import { tools } from '@src/store/Modules/tools'

import auth from '../middleware/auth'


export const RouteConfig: VueRouteConfig[] = [
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
    component: () => import('@/components/todos/todo/todo.vue'),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('@/components/categories/category/category.vue')
  },
  {
    path: '/admin/cfgserv',
    name: 'cfgserv',
    component: () => import('@/components/admin/cfgServer/cfgServer.vue')
  },
  {
    path: '/admin/testp1/:category',
    name: 'Categories',
    component: () => import('@/components/admin/testp1/testp1.vue')
  },
  {
    path: '/offline',
    name: 'Offline',
    component: () => import('@/components/offline/offline.vue')
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
