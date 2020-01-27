import Vue from 'vue'
import { Component } from 'vue-property-decorator'  // Questo va messo SEMPRE ! (ed anche $t ....) altrimenti non carica !

import { UserStore } from '@store'

import { serv_constants } from '../../../store/Modules/serv_constants'

import { ILinkReg } from '../../../model/other'
import { tools } from '../../../store/Modules/tools'

@Component({})
export default class Unsubscribe extends Vue {
  public risultato: string = '...'
  public riscode: number = 0
  public $t: any

  constructor() {
    super()
    console.log('Vreg constructor...')
  }

  public created() {
    console.log('vreg created')
    this.load()
  }

  get disiscritto() {
    return this.riscode === serv_constants.RIS_UNSUBSCRIBED_OK
  }

  get errore() {
    return this.riscode !== serv_constants.RIS_UNSUBSCRIBED_OK
  }

  get myrisultato() {
    return this.risultato
  }

  get email() {
    return this.$route.query.email
  }

  public load() {
    // console.log('load')
    let param
    param = { em: this.$route.query.em, mc: this.$route.query.mc, locale: tools.getLocale()  }
    console.log('idlink = ', param)
    return UserStore.actions.unsubscribe(param)
      .then((ris) => {
        this.riscode = ris.code
        this.risultato = ris.msg

      }).catch((err) => {
        console.log('ERR = ' + err)
    })
  }
}
