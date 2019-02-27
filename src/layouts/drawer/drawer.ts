import menuOne from './menuOne.vue'

import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'
import { Store } from 'vuex'
import { UserStore } from '@modules'
import { GlobalStore } from '@modules'
import { ITodoList } from '../../model'


@Component({
  components: {
    menuOne
  }
})

export default class Drawer extends Vue {
  public $q
  $t: any
  public arrlista = GlobalStore.state.listatodo
  photo = ''
  user = null
  links

  created() {
    let listatodo = []

    this.arrlista.forEach((elem: ITodoList) => {
      let item = {
        route: '/todo/' + elem.namecat,
        faIcon: 'fa fa-list-alt',
        materialIcon: 'todo',
        name: 'pages.' + elem.description
      }
      listatodo.push(item)

    })

    if (UserStore.state.isAdmin) {
      this.links = {
        Dashboard: {
          routes: [
            { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home' },
            {
              route: '/todo', faIcon: 'fa fa-list-alt', materialIcon: 'todo', name: 'pages.Todo',
              routes2: listatodo
            },
            { route: '/category', faIcon: 'fa fa-list-alt', materialIcon: 'category', name: 'pages.Category' },
            { route: '/signup', faIcon: 'fa fa-registered', materialIcon: 'home', name: 'pages.SignUp' },
            { route: '/admin/cfgserv', faIcon: 'fa fa-database', materialIcon: 'admin', name: 'pages.Admin' },
            { route: '/admin/testp1/par1', faIcon: 'fa fa-database', materialIcon: 'admin', name: 'pages.Test1' },
            { route: '/admin/testp1/par2', faIcon: 'fa fa-database', materialIcon: 'admin', name: 'pages.Test2' },
            { route: '/signin', faIcon: 'fa fa-anchor', materialIcon: 'home', name: 'pages.SignIn' },
            /* {route: '/vreg?idlink=aaa', faIcon: 'fa fa-login', materialIcon: 'login', name: 'pages.vreg'},*/
          ],
          show: true,
        }
      }
    } else {
      // PRODUCTION USER:
      if (process.env.PROD) {
        this.links = {
          Dashboard: {
            routes: [
              { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home' },
            ],
            show: true,
          }
        }
      } else {
        // SERVER TEST
        this.links = {
          Dashboard: {
            routes: [
              { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'pages.home' },
              {
                route: '/todo', faIcon: 'fa fa-list-alt', materialIcon: 'todo', name: 'pages.Todo',
                routes2: listatodo
              },
              { route: '/category', faIcon: 'fa fa-list-alt', materialIcon: 'category', name: 'pages.Category' },
              { route: '/signup', faIcon: 'fa fa-registered', materialIcon: 'home', name: 'pages.SignUp' },
              { route: '/signin', faIcon: 'fa fa-anchor', materialIcon: 'home', name: 'pages.SignIn' },
              /* {route: '/vreg?idlink=aaa', faIcon: 'fa fa-login', materialIcon: 'login', name: 'pages.vreg'},*/
            ],
            show: true,
          }
        }

      }
    }


  }


  get MenuCollapse() {
    return GlobalStore.state.menuCollapse
    // return true
  }

  get Username() {
    return UserStore.state.username
  }

  get Verificato() {
    return UserStore.state.verified_email
  }

  get Email() {
    return UserStore.state.email
  }

  logoutHandler() {
    UserStore.actions.logout()
    this.$router.push('/signin')
    this.$q.notify(this.$t('logout.uscito'))
  }
}

