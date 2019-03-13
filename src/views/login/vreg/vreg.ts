import Vue from 'vue'
import { Component } from 'vue-property-decorator'  // Questo va messo SEMPRE ! (ed anche $t ....) altrimenti non carica !

import { UserStore } from '@store'

import { serv_constants } from '../../../store/Modules/serv_constants'

import './vreg.scss'
import { ILinkReg } from '../../../model/other'

@Component({})
export default class Vreg extends Vue {
  public risultato: string = '---'
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

  get myrisultato() {
    return this.risultato
  }

  get giaverificato() {
    return this.riscode !== serv_constants.RIS_CODE_EMAIL_VERIFIED
  }

  get verificatook() {
    return this.riscode === serv_constants.RIS_CODE_EMAIL_VERIFIED
  }

  public load() {
    // console.log('load')
    let param: ILinkReg
    param = { idlink: this.$route.query.idlink.toString() }
    console.log('idlink = ', param)
    return UserStore.actions.vreg(param)
      .then((ris) => {
        this.riscode = ris.code
        this.risultato = ris.msg
        console.log('RIS = ', ris)

        if (this.verificatook) {
          setTimeout(() => {
            this.$router.replace('/signin')
          }, 3000)
        }

      }).catch((err) => {
        console.log('ERR = ' + err)
    })
  }
}
