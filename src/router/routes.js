import VueI18n from 'vue-i18n';
import Vue from 'vue'
Vue.use(VueI18n);

function load (component) {
  return () => import(`components/${component}.vue`)
}


const routes = [
  { path: '/',  component: () => import('pages/Index.vue') },
  { path: '/signup', component: load('views/login/signup'), meta: { name: 'Registration' } },
  { path: '/login', component: load('views/login/login'), meta: { name: 'Login' } },
  { path: '/vreg', component: load('views/login/vreg'), meta: { name: 'Verify Reg' } },

];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
