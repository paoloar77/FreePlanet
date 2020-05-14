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
import { validations } from './CMyRequirement-validate'
import { validationMixin } from 'vuelidate'
import { shared_consts } from '../../common/shared_vuejs'

@Component({
  mixins: [validationMixin],
  validations,
  components: { CProfile, CTitleBanner, CMyFieldDb, CCopyBtn, CUserBadge, CLegenda, CRequisito }
})

export default class CMyRequirement extends MixinUsers {
  @Prop({ required: true }) public myseluser
  @Prop({ required: false, default: -1 }) public ind_order_ingr: number
  @Prop({ required: false, default: -1 }) public id_listaingr: number
  @Prop({ required: true }) public mydashboard
  @Prop({ required: true }) public mydownline
  @Prop({ required: false, default: false }) public notitle
  @Prop({ required: false, default: false }) public showregalainv
  public $t
  public $v
  public $q
  public notifBot: boolean = true
  public aportador_solidario: string = ''
  public seluser: IUserFields = DefaultUser
  public dashboard: IDashboard = {
    myself: DefaultUser,
    aportador: DefaultUser,
    numpeople_aportador: 0
  }

  public downline: IDownline = {
    downline: [],
    downnotreg: [],
    downbyuser: []
  }

  @Watch('mydashboard')
  public changedash() {
    console.log('changedash')
    this.dashboard = this.mydashboard
  }

  @Watch('mydownline')
  public changedl() {
    console.log('changedl')
    this.downline = this.mydownline
  }

  @Watch('myusersel')
  public changemyusersel() {
    console.log('myseluser')
    this.seluser = this.myseluser
  }

  public arrrequisiti = [
    {
      icon: 'email',
      textlang: 'reg.verified_email',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user)
          return user.verified_email
        else
          return false
      },
      info: '',
    },
    {
      icon: 'fab fa-telegram',
      textlang: 'reg.telegram',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user)
          if (user.profile)
            return user.profile.teleg_id > 0

        return false
      },
      info: '',
    },
    {
      icon: 'fas fa-file-signature',
      textlang: 'steps.linee_guida',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user)
          if (user.profile)
            return tools.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)
        return false
      },
      info: '',
    },
    {
      icon: 'fas fa-tv',
      textlang: 'steps.video_intro',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user)
          if (user.profile)
            return tools.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
        return false
      },
      info: '',
    },
    {
      icon: 'fas fa-video',
      textlang: 'steps.zoom',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user) {
          return user.profile.saw_zoom_presentation
        }

      },
      info: '',
    },
    {
      icon: 'fas fa-heart',
      textlang: 'steps.dream',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user)
          if (user.profile.my_dream)
            return user.profile.my_dream.length > 10
          else
            return false
      },
      info: '',
    },
    {
      icon: 'far fa-credit-card',
      textlang: 'steps.paymenttype',
      textadd(user) {
        return ''
      },
      isok(user) {
        let ispaypal = false
        if (user) {
          if (!!user.profile.paymenttypes) {
            if (user.profile.paymenttypes.includes('paypal')) {
              if (user.profile.email_paypal) {
                ispaypal = true
              }
            }
            if (!!user.profile)
              if (!!user.profile.email_paypal) {
                const ris = (user.profile.email_paypal !== '') && ispaypal
                return ris
              }

          }
        }
        return false
      },
      info: '',
    },
  ]

  public arrrequisiti_liberi = [
    {
      icon: 'fas fa-users',
      textlang: 'steps.sharemovement',
      textadd(user) {
        return ''
      },
      isok(user) {
        if (user) {
          return user.numinvitati >= 2
        }
      },
      info: '',
    },
    {
      icon: 'fas fa-check',
      textlang: 'dashboard.inv_attivi',
      textadd(user) {
        return ' (' + user.numinvitatiattivi + ')'
      },
      isok(user) {
        if (user) {
          return user.numinvitatiattivi >= 2
        }
      },
      info: '',
    },
  ]

  get mythis() {
    return this
  }

  public created() {
    this.dashboard = this.mydashboard
    this.downline = this.mydownline
    this.seluser = this.myseluser

  }

  public async update_username() {

    await UserStore.actions.getDashboard({ username: this.dashboard.myself.username }).then((ris) => {
      this.dashboard = ris

      UserStore.actions.getDownline({ username: this.dashboard.myself.username }).then((ris2) => {
        this.downline = ris2
        this.$emit('aggiorna')
      })

    })

  }

  public isextralist(user) {
    return !!user.cell_complete
  }

  public ismyinvited_notreg(user) {
    // return this.dashboard.downnotreg.find((rec) => rec.ind_order === user.ind_order)
  }

  public ismydownline(user) {
    return this.downline.downline.find((rec) => rec.username === user.username)
  }

  public async deleteUserFromExtraList(user) {

    await tools.askConfirm(this.$q, translate('reg.cancella_invitato'), translate('reg.cancella_invitato') + ' ' + user.name + ' ' + user.surname + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DELETE_EXTRALIST, 0, {
      param1: user,
      param2: true
    })
  }

  public async deleteUserFromUsersList(user) {

    await tools.askConfirm(this.$q, translate('reg.cancella_invitato'), translate('reg.cancella_invitato') + ' ' + user.name + ' ' + user.surname + '?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.DELETE_USERLIST, 0, {
      param1: user,
      param2: true
    })
  }

  public async RegalaInvitato(user, aportador_solidario, notifBottxt) {
    let notiftxt = ''
    aportador_solidario = aportador_solidario.trim()
    if (this.notifBot)
      notiftxt = notifBottxt

    await tools.askConfirm(this.$q, translate('reg.regala_invitato'), translate('reg.regala_invitato') + ' ' + user.name + ' ' + user.surname + ' a ' + aportador_solidario + ' ?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.REGALA_INVITATO, 0, {
      param1: user,
      param2: { aportador_solidario },
      param3: notiftxt
    })
  }

  public async RegalaInvitante(user, invitante_username, ind_order_ingr, id_listaingr, notifBottxt) {
    let notiftxt = ''
    invitante_username = invitante_username.trim()
    if (this.notifBot)
      notiftxt = notifBottxt

    await tools.askConfirm(this.$q, translate('reg.regala_invitante'), translate('reg.regala_invitante') + ' ' + user.name + ' ' + user.surname + ' a ' + invitante_username + ' ?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.REGALA_INVITANTE, 0, {
      param1: id_listaingr,
      param2: { invitante_username, ind_order_ingr, name: user.name, surname: user.surname },
      param3: notiftxt
    })
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

      } else if (cosa === 'aportador_solidario') {
        // console.log(item);
        if (!item.aportadorexist) {
          // console.log('!item.aportadorexist !')
          return this.$t('reg.err.aportador_regalare_not_exist')
        }
      }

      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  get allowSubmit() {
    let error = this.$v.$error || this.$v.$invalid

    if (!this.showregalainv) {
      error = error || (this.aportador_solidario === this.seluser.aportador_solidario)
    }

    return !error

  }

  get getnotifBotTxt() {
    return this.$t('dashboard.ricevuto_dono', {
      invitato: this.seluser.name + ' ' + this.seluser.surname,
      mittente: this.dashboard.myself.username
    })
  }

  get getnotifBotTxtInvitante() {
    return this.$t('dashboard.ricevuto_dono_invitante', {
      mittente: this.dashboard.myself.username
    })
  }

  get myclassreq() {
    let mycl = 'text-center'
    mycl += (this.ismydownline) ? ' ' + 'background-color: green;' : ''

    return mycl
  }

  public geticonerror(mybool) {
    if (mybool)
      return 'fas fa-exclamation-triangle'
    else
      return ''
  }

  public isregalainvitante() {
    return this.ind_order_ingr >= 0
  }

  public gettitleregala() {
    if (this.isregalainvitante())
      return this.$t('reg.regala_invitante')
    else
      return this.$t('reg.regala_invitato')
  }


}
