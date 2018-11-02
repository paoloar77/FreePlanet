import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  { path: '/', component: () => import('@/pages/Index.vue'), meta: { name: 'Home' } },
/*  { path: '/signup', component: () => import('@/views/login/signup.vue'), meta: { name: 'Registration' } },
  { path: '/signin', component: () => import('@/views/login/signin.vue'), meta: { name: 'Login' } },
  { path: '/vreg', component: () => import('@/views/login/vreg.vue'), meta: { name: 'Verify Reg' } },
  {
    path: '/requestresetpwd',
    component: () => import('@/views/login/requestresetpwd.vue'),
    meta: { name: 'Reset your Password' }
  },
  {
    path: '/updatepwd',
    component: () => import('@/views/login/updatepassword.vue'),
    meta: { name: 'Update your Password' }
  },
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

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    name: 'pages.errors.e404',
    path: '*',
    component: () => import('@/pages/Error404.vue')
  })
}

export default routes
