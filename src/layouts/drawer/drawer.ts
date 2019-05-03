import menuOne from '../menuone/menuOne.vue'

import { UserStore } from '@modules'
import { GlobalStore } from '@modules'
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

const namespace: string = 'Drawer'

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
