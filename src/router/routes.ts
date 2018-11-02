import { RouteConfig } from 'vue-router'

import VueI18n from 'vue-i18n';
import Vue from 'vue'
Vue.use(VueI18n);

function load (component) {
  return () => import(`@/components/${component}.vue`)
}


const routes: [RouteConfig] = [
  { path: '/',  component: () => import('@/pages/Index.vue') },
  { path: '/signup', component: load('views/login/signup'), meta: { name: 'Registration' } },
  { path: '/signin', component: load('views/login/signin'), meta: { name: 'Login' } },
  { path: '/vreg', component: load('views/login/vreg'), meta: { name: 'Verify Reg' } },
  { path: '/requestresetpwd', component: load('views/login/requestresetpwd'), meta: { name: 'Reset your Password' } },
    { path: '/updatepwd', component: load('views/login/updatepassword'), meta: { name: 'Update your Password' } },
  { path: '/simpleform', component: load('views/form/simpleForm/simpleForm'), meta: { name: 'SimpleForm' } },
  { path: '/embeeded', component: load('views/form/embeeded/embeeded'), meta: { name: 'Embeeded' } },

];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
