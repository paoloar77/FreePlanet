import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { CSignIn } from '../../../components/CSignIn'
import { CSigninNoreg } from '@components'

@Component({
  components: { CSigninNoreg }
})

export default class Signin extends Vue {
  public $v
  public $q

}
