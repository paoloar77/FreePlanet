import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { CSigninNoreg } from '@components'

@Component({
  components: { CSigninNoreg }
})

export default class SigninNoreg extends Vue {
  public $v
  public $q

}
