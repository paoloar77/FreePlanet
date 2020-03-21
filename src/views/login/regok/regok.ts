import Vue from 'vue'
import { Component } from 'vue-property-decorator'  // Questo va messo SEMPRE ! (ed anche $t ....) altrimenti non carica !

import { UserStore } from '@store'
import { Footer } from '../../../components/Footer'

@Component({
  components: { Footer }
})
export default class Regok extends Vue {
  public $t

  get isEmailVerified() {
    if (UserStore.state.my)
      return UserStore.state.my.verified_email
    else
      return false
  }

}
