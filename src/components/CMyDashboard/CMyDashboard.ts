import { Component, Prop, Watch } from 'vue-property-decorator'

import { UserStore } from '../../store/Modules'
import { DefaultUser } from '@src/store/Modules/UserStore'

import MixinUsers from '../../mixins/mixin-users'
import { CProfile } from '../CProfile'
import { CTitleBanner } from '../CTitleBanner'
import { CMyFieldDb } from '../CMyFieldDb'
import { CCopyBtn } from '../CCopyBtn'
import { CUserBadge } from '../CUserBadge'
import { CLegenda } from '../CLegenda'
import { IDashboard, IUserProfile } from '../../model'
import { IUserFields } from '../../model/UserStore'
import { CRequisito } from '../CRequisito'
import translate from '../../globalroutines/util'
import { tools } from '../../store/Modules/tools'
import { lists } from '../../store/Modules/lists'
import { shared_consts } from '../../common/shared_vuejs'
import { CMyRequirement } from '../CMyRequirement'

@Component({
  components: { CProfile, CTitleBanner, CMyFieldDb, CCopyBtn, CUserBadge, CLegenda, CRequisito, CMyRequirement }
})

export default class CMyDashboard extends MixinUsers {
  public $v
  public $q
  public myusername: string = ''
  public showuserinfo: boolean = false
  public notifBot: boolean = true
  public seluser: IUserFields = null
  public aportador_solidario: string = ''
  public dashboard: IDashboard = {
    myself: DefaultUser,
    aportador: DefaultUser,
    numpeople_aportador: 0,
    downline: [],
    downnotreg: [],
    downbyuser: []
  }

  @Prop({ required: true }) public username

  @Watch('UserStore.state.my.dashboard')
  public changedash() {
    console.log('changedash')
    this.dashboard = UserStore.state.my.dashboard
  }

  get mythis() {
    return this
  }

  public created() {
    this.update_username()
  }

  @Watch('this.username')
  public changeusername() {
    this.update_username()

  }

  public async update_username() {
    // console.log('update_username')
    if (this.username === '')
      this.myusername = this.getMyUsername()
    else
      this.myusername = this.username

    await UserStore.actions.getDashboard({ username: this.myusername }).then((ris) => {
      this.dashboard = UserStore.state.my.dashboard
    })
  }

  get getRefLink() {
    return UserStore.getters.getRefLink(this.myusername)
  }

  get invitatinotreg() {
    if (this.dashboard)
      if (this.dashboard.downnotreg)
        return this.dashboard.downnotreg.length > 0
    return false
  }

  public selectclick(user) {
    this.showuserinfo = true
    this.seluser = user
  }

}
