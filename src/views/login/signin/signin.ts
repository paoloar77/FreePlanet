import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CSignIn } from '../../../components/CSignIn'
import { toolsext } from '../../../store/Modules/toolsext'
import { UserStore } from '../../../store/Modules'
import globalroutines from '../../../globalroutines/index'
import { tools } from '../../../store/Modules/tools'


// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

@Component({
  components: { CSignIn }
})

export default class Signin extends Vue {
  public $v
  public $q

  public loginOk() {
    tools.loginOk(this, true)
  }

  public loginInCorso() {
    tools.loginInCorso(this)
  }

  public checkErrors(riscode) {
    tools.SignIncheckErrors(this, riscode, true)
  }

  public showNotif(msgcode) {
    tools.showNotif(this.$q, this.$t(msgcode))
  }

  public mythis() {
    return this
  }

}
