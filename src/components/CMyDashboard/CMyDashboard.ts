import { Component, Prop, Watch } from 'vue-property-decorator'

import { UserStore } from '../../store/Modules'
import { DefaultUser } from '@src/store/Modules/UserStore'

import MixinUsers from '../../mixins/mixin-users'
import { CProfile } from '../CProfile'
import { CTitleBanner } from '../CTitleBanner'
import { CMyFieldDb } from '../CMyFieldDb'
import { CCopyBtn } from '../CCopyBtn'
import { CUserBadge } from '../CUserBadge'

@Component({
  components: { CProfile, CTitleBanner, CMyFieldDb, CCopyBtn, CUserBadge }
})

export default class CMyDashboard extends MixinUsers {
  @Prop({ required: true }) public username

  public $v
  public $q
  public dashboard = { aportador: DefaultUser, numpeople_aportador: 0, downline: [], downbyuser: [] }

  public mythis() {
    return this
  }

  public created() {
    this.update_username()
  }

  @Watch('this.username')
  public changeusername() {
    this.update_username()

  }
  public update_username() {
    if (this.username === '')
      this.username = this.getMyUsername()

    UserStore.actions.getDashboard({ username: this.username }).then((ris) => {
      // console.log('getDashboard', ris)
      if (ris.aportador === undefined) {
        this.dashboard.aportador = DefaultUser
      } else {
        this.dashboard.aportador = ris.aportador
      }
      if (ris.numpeople_aportador === undefined) {
        this.dashboard.numpeople_aportador = 0
      } else {
        this.dashboard.numpeople_aportador = ris.numpeople_aportador
      }
      if (ris.downline === undefined) {
        this.dashboard.downline = []
      } else {
        this.dashboard.downline = ris.downline
      }

      if (ris.downbyuser === undefined) {
        this.dashboard.downbyuser = []
      } else {
        this.dashboard.downbyuser = ris.downbyuser
      }

      // console.log('this.dashboard', this.dashboard)
    })
  }

  get getRefLink() {
    return UserStore.getters.getRefLink(this.username)
  }

}
