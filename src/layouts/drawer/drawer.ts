import menuOne from '../menuone/menuOne.vue'

import { UserStore } from '@modules'
import { GlobalStore } from '@modules'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { tools } from "@src/store/Modules/tools"

const namespace: string = 'GlobalModule'

@Component({
  components: {
    menuOne
  }
})

export default class Drawer extends Vue {
  public $q
  public $t: any
  public photo = ''
  public user = null


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

  public logoutHandler() {
    UserStore.actions.logout()
      .then(() => {
        this.$router.replace('/logout')

        setTimeout(() => {
          this.$router.replace('/')
        }, 1000)

        tools.showNotif(this.$q, this.$t('logout.uscito'), {icon: 'exit_to_app'})
      })
  }
}
