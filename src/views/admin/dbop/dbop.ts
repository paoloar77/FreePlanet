import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { GlobalStore } from '@store'
import { tools } from '../../../store/Modules/tools'
import { UserStore } from '../../../store/Modules'
import { CTitleBanner } from '../../../components/CTitleBanner'

@Component({
  components: { CTitleBanner }
})
export default class Dbop extends Vue {
  public ris: string = ''

  public async changeCellInt() {

    const mydata = {
      dbop: 'changeCellInt'
    }

    this.ris = await UserStore.actions.execDbOp({ mydata })

  }

}
