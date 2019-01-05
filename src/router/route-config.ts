import { RouteConfig as VueRouteConfig } from 'vue-router'

import { RouteNames } from './route-names'

export const RouteConfig: VueRouteConfig[] = [
  {
    component: () => import('@/root/home/home.vue'),
    name: RouteNames.home,
    path: '/',
    meta: { name: 'Home' }
  },
  {
    path: '/test',
    component: () => import('@/views/login/test.vue'),
    meta: { name: 'Test' }
  },
  {
    path: '/signup',
    component: () => import('@/views/login/signup/signup.vue'),
    meta: { name: 'Registration' }
  },
  {
    path: '/signin',
    component: () => import('@/views/login/signin/signin.vue'),
    meta: { name: 'Login' }
  },
  {
    path: '/vreg',
    component: () => import('@/views/login/vreg/vreg.vue'),
    meta: { name: 'Verify Reg' }
  },
  {
    path: '/category',
    component: () => import('@/components/categories/category/category.vue'),
    meta: { name: 'Categories' }
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

