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
  public $t
  public ris: any
  public riga: number = 0
  public col: number = 0
  public placca: string = ''

  public async EseguiFunz(miafunz) {
    this.$q.dialog({
      message: 'Continuare ' + miafunz + ' ?',
      cancel: {
        label: this.$t('dialog.cancel')
      },
      ok: {
        label: this.$t('dialog.yes'),
        push: true
      },
      title: 'Funzione:'
    }).onOk(async () => {
      const mydata = {
        dbop: miafunz,
        riga: this.riga,
        col: this.col
      }
      this.ris = await UserStore.actions.execDbOp({ mydata })

      if (miafunz === 'visuPlacca') {
        this.placca = this.ris.placca
      }

    })
  }
}
