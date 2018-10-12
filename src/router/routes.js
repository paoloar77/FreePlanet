
import VueI18n from 'vue-i18n';
import Vue from 'vue'
Vue.use(VueI18n);

function load (component) {
  return () => import(`components/${component}.vue`)
}


const routes = [
  { path: '/', component: load('views/dashboard/one/dashboard'), meta: { name: 'Dashboard One' } },
  { path: '/prec',  component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  { path: '/login', component: () => load('views/login/login'), meta: { name: 'Login' } },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
