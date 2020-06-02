import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CSignIn } from '../../components/CSignIn'
import { tools } from '../../store/Modules/tools'

@Component({
  name: 'CSigninNoreg',
  components: { CSignIn }
})

export default class CSigninNoreg extends Vue {
  @Prop({ required: true }) public showregbutt: boolean
  public $v
  public $q
  public $t

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

  get mythis() {
    return this
  }

}
