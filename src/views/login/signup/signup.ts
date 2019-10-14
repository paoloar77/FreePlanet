import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { CSignUp } from '../../../components/CSignUp'

@Component({
  components: { CSignUp }
})

export default class Signup extends Vue {
  public $t: any

}
