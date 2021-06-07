import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { SingleProject } from '../../projects/SingleProject'
import { CTodo } from '../../todos/CTodo'
import { GlobalStore } from '../../../store/Modules'

@Component({})
export default class CTesseraElettronica extends Vue {
  public $q
  public $t
  public $refs: {
    frametessera
  }

  public mounted() {
    // ...
    // $('#frametessera').contents().find('#nome').val("PPPP")
  }

  get getNome() {
    return ''
  }
  get getFrame() {

    // console.log('getFrame', $('#frametessera'))
    return ''
  }

  get rightDrawerOpen() {
    return GlobalStore.state.rightDrawerOpen
  }
}
