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
import { CRequisiti } from '../CRequisiti'
import { CCardState } from '../CCardState'
import { CMyNave } from '../CMyNave'
import { validations } from './CMyDashboard-validate'
import { validationMixin } from 'vuelidate'

@Component({
  mixins: [validationMixin],
  validations,
  components: {
    CProfile,
    CTitleBanner,
    CMyFieldDb,
    CCopyBtn,
    CUserBadge,
    CLegenda,
    CRequisito,
    CMyRequirement,
    CRequisiti,
    CCardState,
    CMyNave
  },
})

export default class CMyDashboard extends MixinUsers {
  public $v
  public $q
  public myusername: string = ''
  public tab: string = 'requisiti'
  public tabcosa: string = ''
  public showuserinfo: boolean = false
  public shownuovoviaggio: boolean = false
  public notifBot: boolean = true
  public loading: boolean = false
  public seluser: IUserFields = null
  public aportador_solidario: string = ''
  public invitante_username: string = ''
  public showregalainv: boolean = false
  public id_listaingr: number = -1
  public ind_order_ingr: number = -1
  public dashboard: IDashboard = {
    myself: DefaultUser,
    aportador: DefaultUser,
    numpeople_aportador: 0,
    downline: [],
    downnotreg: [],
    downbyuser: [],
    arrimbarchi: [],
    arrposizioni: [],
    navi_partenza: [],
    lastnave: {},
    arrusers: [],
  }

  @Prop({ required: true }) public username

  @Watch('UserStore.state.my.dashboard')
  public changedash() {
    console.log('changedash')
    this.dashboard = UserStore.state.my.dashboard
    if (!!this.dashboard)
      this.invitante_username = this.dashboard.myself.aportador_solidario

  }

  get mythis() {
    return this
  }

  public created() {
    if (!!tools.getCookie(tools.TABBED_DASHBOARD)) {
      this.tab = tools.getCookie(tools.TABBED_DASHBOARD)
    }
    this.update_username()
  }

  public changetab(val) {
    tools.setCookie(tools.TABBED_DASHBOARD, val)
    console.log('setcook', val)
  }

  @Watch('this.username')
  public changeusername() {
    this.update_username()

  }

  public aggiorna() {
    this.dashboard = null
    this.update_username()
    this.showuserinfo = false
  }

  public async update_username() {
    console.log('update_username')
    this.loading = true
    if (this.username === '')
      this.myusername = this.getMyUsername()
    else
      this.myusername = this.username

    this.loading = true

    await UserStore.actions.getDashboard({ username: this.myusername }).then((ris) => {
      this.dashboard = ris

      if (!!this.dashboard)
        this.invitante_username = this.dashboard.myself.aportador_solidario

      console.log('this.invitante_username', this.invitante_username)
      this.loading = false
    })

    this.showuserinfo = false
    this.loading = false
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

  public selectclick(user, showregalainv, ind_order_ingr, id_listaingr) {
    this.showuserinfo = true
    this.seluser = user
    this.showregalainv = showregalainv
    this.ind_order_ingr = ind_order_ingr
    this.id_listaingr = id_listaingr
  }

  get Completato7Req() {
    // return tools.Is7ReqOk(this.dashboard.myself)
    return this.dashboard.myself.qualified
  }

  get Completato9Req() {
    // return tools.Is9ReqOk(this.dashboard.myself)
    if (!!this.dashboard)
      return this.dashboard.myself.qualified && (this.dashboard.myself.numinvitatiattivi >= 2)
    return false
  }

  public HasNave() {
    return this.dashboard.arrposizioni.length > 0
  }

  public getnavePartenzaByRigaCol(riga, col) {
    for (const mynave of this.dashboard.navi_partenza) {
      if (!!mynave) {
        if ((mynave.riga === riga) && (mynave.col === col)) {
          return mynave
        }
      }
    }
    return null
  }

  public datanave(mianave) {
    // const mynavepart = this.getnavePartenzaByRigaCol(tools.getRiganave(mianave.riga), tools.getColnave(mianave.col))
    if (!!mianave.nave_partenza) {
      if (!!mianave.nave_partenza.date_start)
        return tools.getstrshortDate(mianave.nave_partenza.date_start)
    }
    return ' --/-- '
  }

  public geticon(mianave) {
    if (!mianave)
      return ''

    if (mianave.made_gift) {
      return 'fas fa-gift'
    }
  }

  public colordono(mianave) {
    if (mianave.made_gift) {
      return 'green'
    } else {
      return 'grey'
    }
  }

  public getposizioneattuale(mianave, totali) {
    const mynavedest = tools.getfirstnaveSognatore(mianave.riga, mianave.col)
    const ris = tools.getnumnavi_finoa(mianave, mynavedest, this.dashboard.lastnave)
    if (totali)
      return mianave.riga + '.' + mianave.col + ' ' + ris.contaattuale + '/' + ris.totale
    else
      return ris.perc
  }

  public async NuovoImbarco(username, invitante_username) {

    await tools.askConfirm(this.$q, translate('steps.nuovo_imbarco'), translate('dialog.continue'), translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.AGGIUNGI_NUOVO_IMBARCO, 0, {
      param1: { username, invitante_username }
    })
    this.shownuovoviaggio = false
  }

  public addNuovoImbarco() {
    this.NuovoImbarco(this.dashboard.myself.username, this.invitante_username)
  }

  public async cancellaImbarco(imbarco) {
    await tools.askConfirm(this.$q, translate('dashboard.attenzione'), translate('steps.vuoi_cancellare_imbarco'), translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.CANCELLA_IMBARCO, 0, {
      param1: { ind_order: imbarco.ind_order, username: imbarco.username },
      param2: { num_tess: imbarco.num_tess }
    })

  }

  public getnuminvitatistr(index, myuser) {
    let inv = myuser.numinvitati
    let invattivi = myuser.numinvitatiattivi

    const step = (index - 1) * 2

    inv -= step
    invattivi -= step
    if (inv < 0)
      inv = 0
    if (invattivi < 0)
      invattivi = 0
    if (inv > 2)
      inv = 2
    if (invattivi > 2)
      invattivi = 2

    return  invattivi + '/' + inv
  }

  public getinvit(index, myuser, posiz) {
    let inv = myuser.numinvitati
    let invattivi = myuser.numinvitatiattivi

    const step = (posiz.numNaviEntrato + index) * 2

    inv -= step
    // console.log('inv', inv, 'step = ', step)
    invattivi -= step
    if (inv < 0)
      inv = 0
    if (invattivi < 0)
      invattivi = 0
    if (inv > 2)
      inv = 2
    if (invattivi > 2)
      invattivi = 2

    return { invattivi, inv }
  }
  public getnuminv(index, myuser, posiz) {
    const ris = this.getinvit(index, myuser, posiz)

    return ris.inv
  }
  public getnuminvattivi(index, myuser, posiz) {
    const ris = this.getinvit(index, myuser, posiz)

    return ris.invattivi
  }
  public getnuminvperc(index, myuser, posiz) {
    const ris = this.getinvit(index, myuser, posiz)

    return ris.invattivi / 2 * 100
  }
  public getcolorinvitati(index, myuser, posiz) {

    const ris = this.getinvit(index, myuser, posiz)
    if (ris.invattivi === 1)
      return 'blue'
    if (ris.invattivi === 2)
      return 'green'
    if (ris.inv === 1)
      return 'orange'
  }

  public getnumtessstr(num_tess, index) {

    let str = index + 1 + '°'

    if (num_tess % 2 === 0) {
      str += ' (Gratis)'
    }
    return str
  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }

      if (item.required !== undefined) {
        if (!item.required) {
          return this.$t('reg.err.required')
        }

      } else if (cosa === 'invitante_username') {
        // console.log(item);
        if (!item.aportadorexist) {
          // console.log('!item.aportadorexist !')
          return this.$t('reg.err.invitante_username_not_exist')
        }
      }

      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  get allowSubmit() {
    let error = this.$v.$error || this.$v.$invalid

    error = error || (this.invitante_username === this.dashboard.myself.username)

    return !error

  }

  public imbarchipresenti() {
    let presente = false;
    for (const rec of this.dashboard.arrimbarchi) {
      if (!rec.added)
        presente = true
    }
    return presente
  }

  public getcolorbynave(mianave){
    if (!!mianave.nave_partenza)
      return mianave.nave_partenza.provvisoria ? 'gray' : 'green'
    else
      return 'green'
  }

  public change_mynote(mianave) {

    const mydata = {
      note: mianave.note
    }
    tools.saveFieldToServer(this, 'navi', mianave._id, mydata)
  }

  public getNaveSognatoreStr(mianave, index) {
    const mynavedest = tools.getfirstnaveSognatore(mianave.riga, mianave.col)
    return mynavedest.riga + '.' + parseInt(mynavedest.col, 10) + index
  }

  public getNaveMediatoreStr(mianave) {
    return mianave.riga + '.' + mianave.col
  }


}
