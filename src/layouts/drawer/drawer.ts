import menuOne from '../menuone/menuOne.vue'

import { UserStore } from '@modules'
import { GlobalStore } from '@modules'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'

const namespace: string = 'GlobalModule'

@Component({
  components: {
    menuOne
  }
})

export default class Drawer extends Vue {
  public $q
  public $t: any
  public user = null


}
