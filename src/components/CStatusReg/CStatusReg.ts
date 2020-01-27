import { Component, Prop, Watch } from 'vue-property-decorator'
import { INotData } from '../../model/index'
import { tools } from '../../store/Modules/tools'
import { NotevoleStore } from '@store'
import MixinBase from '@src/mixins/mixin-base'
import { validationMixin } from 'vuelidate'
import { validations } from '../CSignUpNotevole/CSignUp-validate'
import { CTitleBanner } from '@components'
import { CCardState } from '../CCardState'
import { UserStore } from '../../store/Modules'
import { CCardStat } from '../CCardStat'
import { CLineChart } from '../CLineChart'
import { CGeoChart } from '../CGeoChart'
import { CListNationality } from '../CListNationality'

@Component({
  name: 'CStatusReg',
  components: { CTitleBanner, CCardState, CCardStat, CLineChart, CGeoChart, CListNationality }
})

export default class CStatusReg extends MixinBase {
  public NUMSEC_TO_POLLING: number = 60
  public MAXNUM_POLLING: number = 10

  public myloadingload: boolean = false
  public eseguipolling: boolean = false
  public polling = null
  public numpolled: number = 0
  public datastat: INotData = {
    num_tot_lista: 0,
    num_reg_lista: 0,
    num_reg: 0,
    num_teleg_attivo: 0,
    email_non_verif: 0,
    num_teleg_pending: 0,
    lastsreg: [],
    checkuser: { verified_email: false }
  }

  public async checkifpolling() {
    if (UserStore.state.my.profile) {
      if (!UserStore.state.my.verified_email || UserStore.state.my.profile.teleg_id <= 0)
        this.NUMSEC_TO_POLLING = 10
    }

    if (this.eseguipolling) {
      clearInterval(this.polling)
      this.polling = null
      if (this.numpolled > 100) {
        this.NUMSEC_TO_POLLING = 60 * 5
      }
      if (this.numpolled < this.MAXNUM_POLLING) {
        if (!this.polling) {
          this.polling = setInterval(() => {
            this.load()
            this.numpolled++
          }, this.NUMSEC_TO_POLLING * 1000)
        }
      }
    }
  }

  public beforeDestroy() {
    clearInterval(this.polling)
  }

  public created() {
    if (tools.isManager()) {
      this.MAXNUM_POLLING = 1000
    }
    this.load()
  }

  get lastsreg() {
    return this.datastat.lastsreg
  }

  public async load() {
    // console.log('load')
    this.myloadingload = true
    const datastat = await NotevoleStore.actions.notevoleload()
    if (datastat) {
      this.datastat = datastat
    }

    // console.log('this.datastat.lastsreg')
    // console.table(this.datastat.lastsreg)

    // console.log('newsstate')
    // console.table('GlobalStore.state.serv_settings', GlobalStore.state.serv_settings)

    this.eseguipolling = true

    // console.log('this.eseguipolling', this.eseguipolling)
    this.myloadingload = false

    if (UserStore.state.my) {
      if (this.datastat.checkuser) {
        if (this.datastat.checkuser.verified_email && !UserStore.state.my.verified_email) {
          UserStore.state.my.verified_email = true
          this.riaggiorna()
        }
        if (UserStore.state.my.profile) {
          if ((UserStore.state.my.profile.teleg_id <= 0 && this.datastat.checkuser.profile.teleg_id > 0) ||
            (UserStore.state.my.profile.teleg_id !== this.datastat.checkuser.profile.teleg_id > 0)) {
            UserStore.state.my.profile.teleg_id = this.datastat.checkuser.profile.teleg_id
            this.riaggiorna()
          }
          if ((UserStore.state.my.profile.teleg_checkcode <= 0 && this.datastat.checkuser.profile.teleg_checkcode > 0) ||
            (UserStore.state.my.profile.teleg_checkcode !== this.datastat.checkuser.profile.teleg_checkcode)) {
            UserStore.state.my.profile.teleg_checkcode = this.datastat.checkuser.profile.teleg_checkcode
            this.riaggiorna()
          }
        }
      }
    }

    this.checkifpolling()
  }

  public riaggiorna() {
    // clearInterval(this.polling)
    // this.polling = null
    this.checkifpolling()
  }

  get perc_reg() {
    if (this.datastat.num_tot_lista > 0)
      return (this.datastat.num_reg_lista / this.datastat.num_tot_lista * 100)
    else
      return 0
  }

  get visustat() {
    return this.datastat.num_reg > 0 || this.datastat.num_reg_lista > 0
  }

  get telegnonattivi() {
    return this.datastat.num_reg - this.datastat.num_teleg_attivo
  }
  get emailnonverif() {
    return this.datastat.email_non_verif
  }
}
