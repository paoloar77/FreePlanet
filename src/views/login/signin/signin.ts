import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { CSignIn } from '../../../components/CSignIn'
import CSigninNoreg from '../../../components/CSigninNoreg/CSigninNoreg'

@Component({
  components: { CSigninNoreg }
})

export default class Signin extends Vue {
  public $v
  public $q

}
