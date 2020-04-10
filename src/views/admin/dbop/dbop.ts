import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { GlobalStore } from '@store'
import { tools } from '../../../store/Modules/tools'
import { UserStore } from '../../../store/Modules'
import { CTitleBanner } from '../../../components/CTitleBanner'
import { CDateTime } from '../../../components/CDateTime'
import { CMyFieldDb } from '../../../components/CMyFieldDb'

@Component({
  components: { CTitleBanner, CDateTime, CMyFieldDb }
})
export default class Dbop extends Vue {
  public $t
  public ris: any = ''
  public riga: number = 0
  public numpersone: number = 7
  public date_start: Date = new Date()
  public col: number = 0
  public placca: string = ''
  public incaricamento: boolean = false

  get tools() {
    return tools
  }

  public async EseguiFunz(miafunz) {
    this.$q.dialog({
      message: this.$t('dialog.continue') + ' ' + miafunz + ' ?',
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
        col: this.col,
        date_start: this.date_start,
        numpersone: this.numpersone
      }

      this.incaricamento = true
      this.$q.loading.show({ message: this.$t('otherpages.update') })

      const ris = await UserStore.actions.execDbOp({ mydata })

      this.$q.loading.hide()
      await GlobalStore.actions.loadSite()

      this.incaricamento = false

      console.log('this.ris', this.ris)

      this.ris = ''

      if (miafunz === 'visuPlacca') {
        this.placca = ris.placca
      } else if (miafunz === 'visuListaIngresso' || miafunz === 'visuListaIngressoNuovi' || miafunz === 'visuNaviUtentiEliminati'
        || miafunz === 'visuListaNave' || miafunz === 'visuNave' || miafunz === 'creaNavi'
        || (miafunz === 'visuUtentiNonInNavi')) {
        this.placca = ris.mystr
      } else {
        this.ris = ris
      }

    })
  }
}
