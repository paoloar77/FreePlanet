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
  @Prop({ required: true }) public mydashboard
  @Prop({ required: false, default: false }) public notitle
  public $t
  public $v
  public $q
  public notifBot: boolean = true
  public aportador_solidario: string = ''
  public seluser: IUserFields = DefaultUser
  public dashboard: IDashboard = {
    myself: DefaultUser,
    aportador: DefaultUser,
    numpeople_aportador: 0,
    downline: [],
    downnotreg: [],
    downbyuser: []
  }

  @Watch('mydashboard')
  public changedash() {
    console.log('changedash')
    this.dashboard = this.mydashboard
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
            return tools.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES)
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
            return tools.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI)
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
            return user.profile.my_dream.length > 20
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
              if (!!user.profile.paymenttypes) {
                const ris = (user.profile.paymenttypes.length >= 1) && ispaypal
                return ris
              }

          }
        }
        return false
      },
      info: '',
    },
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
      icon: 'fas fa-users',
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
    this.seluser = this.myseluser

  }

  public isextralist(user) {
    return !!user.cell_complete
  }

  public ismyinvited_notreg(user) {
    return this.dashboard.downnotreg.find((rec) => rec.ind_order === user.ind_order)
  }

  public ismydownline(user) {
    return this.dashboard.downline.find((rec) => rec.username === user.username)
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
    if (this.notifBot)
      notiftxt = notifBottxt

    await tools.askConfirm(this.$q, translate('reg.regala_invitato'), translate('reg.regala_invitato') + ' ' + user.name + ' ' + user.surname + ' a ' + aportador_solidario + ' ?', translate('dialog.yes'), translate('dialog.no'), this, '', lists.MenuAction.REGALA_INVITATO, 0, {
      param1: user,
      param2: aportador_solidario,
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

    error = error || (this.aportador_solidario === this.seluser.aportador_solidario)

    return !error

  }

  get getnotifBotTxt() {
    return this.$t('dashboard.ricevuto_dono', {
      invitato: this.seluser.name + ' ' + this.seluser.surname,
      mittente: this.dashboard.myself.username
    })
  }

}