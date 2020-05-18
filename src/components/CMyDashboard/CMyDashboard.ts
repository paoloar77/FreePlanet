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
import { IDashboard, IDownline, IUserProfile } from '../../model'
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
  public loading_invitati: boolean = false
  public seluser: IUserFields = null
  public aportador_solidario: string = ''
  public invitante_username: string = ''
  public showregalainv: boolean = false
  public id_listaingr: number = -1
  public ind_order_ingr: number = -1
  public myrigaattuale: number = 0
  public mycolattuale: number = 0
  public dashboard: IDashboard = {
    myself: DefaultUser,
    aportador: DefaultUser,
    numpeople_aportador: 0,
    arrimbarchi: [],
    arrposizioni: [],
    navi_partenza: [],
    lastnave: {},
    arrusers: [],
  }

  public downline: IDownline = {
    downline: [],
    downnotreg: [],
    downbyuser: []
  }

  @Prop({ required: true }) public username

  @Watch('UserStore.state.my.dashboard')
  public changedash() {
    // console.log('changedash')
    this.dashboard = UserStore.state.my.dashboard
    if (!!this.dashboard)
      this.invitante_username = this.dashboard.myself.username

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
    if (this.tab === 'invitati') {
      if (this.downline.downline.length <= 0) {
        this.loading_invitati = true
        UserStore.actions.getDownline({ username: this.myusername }).then((ris) => {
          this.downline = ris
          this.loading_invitati = false
        })
      }
    }
    // console.log('setcook', val)
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
    // console.log('update_username')
    this.loading = true
    if (this.username === '')
      this.myusername = this.getMyUsername()
    else
      this.myusername = this.username

    this.loading = true

    UserStore.actions.getDashboard({ username: this.myusername })
      .then((ris) => {
        this.dashboard = ris

        if (!!this.dashboard)
          this.invitante_username = this.dashboard.myself.username

        this.myrigaattuale = this.dashboard.lastnave.riga
        this.mycolattuale = this.dashboard.lastnave.col

        this.loading = false
      })
      .catch((e) => {
        this.loading = false
      })

    if (this.tab === 'invitati') {
      this.loading_invitati = true
      UserStore.actions.getDownline({ username: this.myusername })
        .then((ris2) => {
          this.downline = ris2
          this.loading_invitati = false
        })
        .catch((e) => {
          this.loading_invitati = false
        })

    }

    this.showuserinfo = false
  }

  get getRefLink() {
    return UserStore.getters.getRefLink(this.myusername)
  }

  get invitatinotreg() {
    if (this.downline)
      if (this.downline.downnotreg)
        return this.downline.downnotreg.length > 0
    return false
  }

  public selectclick(user, showregalainv, ind_order_ingr, id_listaingr, disabled) {
    if (!disabled) {
      this.showuserinfo = true
      this.seluser = user
      this.showregalainv = showregalainv
      this.ind_order_ingr = ind_order_ingr
      this.id_listaingr = id_listaingr
    }
  }

  get Completato7Req() {
    // return tools.Is7ReqOk(this.dashboard.myself)
    if (!!this.dashboard.myself)
      return this.dashboard.myself.qualified

    return false
  }

  get Completato9Req() {
    // return tools.Is9ReqOk(this.dashboard.myself)
    if (!!this.dashboard.myself)
      return this.dashboard.myself.qualified && (this.dashboard.myself.numinvitatiattivi >= 2)
    return false
  }

  get HasNave() {
    if (!!this.dashboard.arrposizioni)
      return this.dashboard.arrposizioni.length > 0
    else
      return false
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
        return tools.getstrDate(mianave.nave_partenza.date_start)
    }
    return ' --/-- '
  }

  public datagiftchat(mianave) {
    // const mynavepart = this.getnavePartenzaByRigaCol(tools.getRiganave(mianave.riga), tools.getColnave(mianave.col))
    if (!!mianave.nave_partenza) {
      if (!!mianave.nave_partenza.date_gift_chat_open)
        return tools.getstrDate(mianave.nave_partenza.date_gift_chat_open)
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

    await tools.askConfirm(this.$q, translate('steps.nuovo_imbarco'), translate('dialog.continue') + ' ?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.AGGIUNGI_NUOVO_IMBARCO, 0, {
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
      param2: { num_tess: imbarco.num_tess, rec: imbarco }
    })

  }

  public getnuminvperc(index, myrec) {

    return myrec.invattivi / 2 * 100
  }

  public getcolorinvitati(index, myrec) {

    if (myrec.invattivi === 1)
      return 'blue'
    if (myrec.invattivi === 2)
      return 'green'
    if (myrec.inv === 1)
      return 'orange'
  }

  public getnumtessstr(num_tess, index) {

    let str = index + 1 + '°'

    if (num_tess % 2 === 0) {
      str += ' (' + this.$t('dashboard.ritorno') + ')'
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

    // error = error || (this.invitante_username === this.dashboard.myself.username)

    return !error

  }

  public imbarchipresenti() {
    let presente = false
    for (const rec of this.dashboard.arrimbarchi) {
      if (!rec.added)
        presente = true
    }
    return presente
  }

  public getvalstrinv(posiz) {
    return Math.round((posiz.numinvitatiattiviTot - posiz.numNaviEntrato * 2) - (posiz.indimbarco - 1) * 2) + '/' + Math.round((posiz.numinvitatiTot - posiz.numNaviEntrato * 2) - (posiz.indimbarco - 1) * 2)
  }

  public isprovvisoria(mianave) {
    if (!!mianave && mianave.nave_partenza)
      return mianave.nave_partenza.provvisoria
    return false
  }

  public getcolorbynave(mianave) {
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

  public getNaveSognatoreStr(mianave) {
    const mynavedest = tools.getfirstnaveSognatore(mianave.riga, mianave.col)
    const ris = mynavedest.riga + '.' + mynavedest.col
    // console.log('ris', ris)
    return ris
  }

  public getNaveMediatoreStr(mianave) {
    return mianave.riga + '.' + mianave.col
  }

  get getstrinvitati() {
    if (!!this.dashboard && !!this.dashboard.myself)
      if (!!this.dashboard.myself.numinvitati)
        return this.dashboard.myself.numinvitati + ` ` + this.$t('dashboard.downline')

    if (this.loading_invitati)
      return ` (...) ` + this.$t('dashboard.downline')
    else
      return this.$t('dashboard.downline')
  }

  public getmyrigaattuale(mianave) {
    const rigamin = tools.getRiganave(mianave.riga)
    const colmin = tools.getColnave(mianave.col)

    let riga = this.myrigaattuale
    let col = this.mycolattuale

    let colvera = colmin
    if (rigamin > 3) {
      for (let index = rigamin; index < riga - 1; index++) {
        colvera = colvera * 2
      }
    } else {
      colvera = 7
    }

    if (col <= colvera) {
      riga = riga - 1
    }

    // console.log('[' + rigamin + '.' + colmin + ']', 'riga', riga, 'col', col, 'colvera', colvera)

    if (riga > rigamin + 6)
      riga = rigamin + 6

    if (riga < rigamin)
      riga = 0

    return riga
  }

  public getval7(mianave) {
    let val = this.getmyrigaattuale(mianave)
    if (val === 0)
      return ''
    else
      return val - tools.getRiganave(mianave.riga) + 1
  }

  public getcolornave(mianave) {
    if (mianave.num_tess % 2 !== 0)
      return 'blue'
    else
      return 'red'
  }

  public getcolorbyval(mianave) {
    let val = this.getval7(mianave)

    if (val === 7)
      return 'purple'
    else if (val === 6)
      return 'indigo'
    else if (val === 5)
      return 'blue'
    else if (val === 4)
      return 'green'
    else if (val === 3)
      return 'yellow'
    else if (val === 2)
      return 'orange'
    else if (val === 1)
      return 'red'

    return val
  }

  public gettextcolor(mianave) {
    return this.getval7(mianave) === 3 ? 'black' : 'white'
  }

  public getifdisableInvitante(imbarco, index) {
    if ((index === 0) && (this.dashboard.arrposizioni.length <= 0)) {
      return true
    }
    return false

  }

  public getIfregalareInvitati(seluser, showregalainv) {
    if (!showregalainv)
      return false

    let stato = true

    if (!!this.dashboard.myself) {

      if ((this.dashboard.myself.numNaviEntrato * 2) < this.dashboard.myself.numinvitati)
        stato = true
    }

    return stato
  }
}
