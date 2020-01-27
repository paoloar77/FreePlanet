import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { GlobalStore } from '@store'
import { tools } from '../../../store/Modules/tools'
import { UserStore } from '../../../store/Modules'
import { CTitleBanner } from '../../../components/CTitleBanner'

@Component({
  components: { CTitleBanner }
})
export default class Extralist extends Vue {
  public users_imported: string = ''
  private myloadingImport: boolean = false
  private errimport: boolean = false
  private okimport: boolean = false
  private myrisimport: string = ''

  public async importExtraList() {
    this.myloadingImport = true
    this.errimport = false
    this.okimport = false

    const mydata = {
      strdata: this.users_imported,
      locale: tools.getLocale()
    }

    const res = await UserStore.actions.importExtraList(mydata)

    let esistiti = ''
    if (res.data.numalreadyexisted > 0)
      esistiti = ` ${res.data.numalreadyexisted} email già esistenti`

    if (res.data.numadded > 0) {
      this.okimport = true
      this.myrisimport = `(${res.data.numadded} / ${res.data.numtot}) utenti extra importati !` + esistiti
    } else {
      this.errimport = true
      this.myrisimport = `Nessun utente extra importato (trovate ${res.data.numtot})` + esistiti
    }

    this.myloadingImport = false
  }

}
