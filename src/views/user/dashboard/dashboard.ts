import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import MixinBase from '../../../mixins/mixin-base'
import { CMyFieldDb, CTitleBanner, CProfile } from '@components'
import { UserStore } from '../../../store/Modules'
import { tools } from '../../../store/Modules/tools'
import { DefaultUser } from '@src/store/Modules/UserStore'

@Component({
  components: { CProfile, CTitleBanner, CMyFieldDb }
})

export default class Dashboard extends MixinBase {
  public $v
  public $q
  public dashboard = {aportador: DefaultUser, downline: []}

  public mythis() {
    return this
  }

  public created() {

    UserStore.actions.getDashboard({}).then((ris) => {
      console.log('getDashboard', ris)
      if (ris.aportador === undefined) {
        this.dashboard.aportador = DefaultUser
      } else {
        this.dashboard.aportador = ris.aportador
      }
      if (ris.downline === undefined) {
        this.dashboard.downline = []
      } else {
        this.dashboard.downline = [...ris.downline]
      }

      // console.log('this.dashboard', this.dashboard)
    })
  }

  public getletter(user) {
    return user.name[0].toUpperCase()
  }

  public getnumber(user, index) {
    return index
  }

  public getstatecolor(user) {
    return (this.dashboard.aportador.verified_email) ? 'green' : 'gray'
  }

  public getmoneycolor(user) {
    return (this.dashboard.aportador.made_gift) ? 'green' : 'gray'
  }

  public get2peoplecolor(user, index) {
    if (!!user.downline)
      return (user.downline.length >= 2) ? 'green' : 'gray'
    else
      return 'grey'
  }
  public getnumpeople(user) {
    if (!!user.downline)
      return (user.downline.length)
    else
      return 0
  }

  get getRefLink() {
    return UserStore.getters.getRefLink()
  }

  public copylink() {
    tools.copyStringToClipboard(this, this.getRefLink)
  }

  get madegift() {
    return UserStore.state.my.made_gift
  }

}
