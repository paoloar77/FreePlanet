import Vue from 'vue'
import { GlobalStore } from '@store'
import { NotevoleStore, UserStore } from '../../store/Modules'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '@src/store/Modules/toolsext'

import MixinBase from '../../mixins/mixin-base'
import { CTitleBanner, CMyFieldDb } from '@components'
import { CMyInnerPage } from '../CMyInnerPage'
import { tools } from '../../store/Modules/tools'
import { CVerifyTelegram } from '../CVerifyEmail'
import { CVerifyEmail } from '../CVerifyTelegram'
import { CCopyBtn } from '../CCopyBtn'
import { CVideo } from '../CVideo'
import { CRequisiti } from '../CRequisiti'
import { shared_consts } from '../../common/shared_vuejs'
import { CGuidelines } from '../CGuidelines'
import { CVideoPromo } from '../CVideoPromo'

@Component({
  components: { CTitleBanner, CMyFieldDb, CMyInnerPage, CVerifyTelegram, CVerifyEmail, CCopyBtn, CVideo, CRequisiti, CGuidelines, CVideoPromo }
})

export default class CStatus extends MixinBase {
  @Prop({ required: false, default: false }) public dense: boolean
  public $v
  public $t: any
  public step = 0
  public steptodo = 0
  public NUMSTEP_OBBLIGATORI = 9
  public my_dream: string = ''

  get numpayment() {
    if (UserStore.state.my.profile)
      if (UserStore.state.my.profile.paymenttypes)
        return UserStore.state.my.profile.paymenttypes.length

    return 0
  }

  public arrsteps = [
    // {
    //   title: 'steps.chat_biblio',
    //   descr: 'steps.chat_biblio_long',
    //   page: '',
    //   funccheck(index) {
    //     return true
    //   },
    //   funccheck_error(index) {
    //     return false
    //   }
    // },

    {
      title: 'reg.email',
      descr: '',
      page: '',
      icon: 'mail',
      funccheck(index) {
        return UserStore.state.my.verified_email
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return 'pages.statusreg.verified'
      },
      funcko() {
        return 'pages.statusreg.nonverified'
      }
    },
    {
      title: 'reg.telegram',
      descr: '',
      page: '',
      icon: 'fab fa-telegram',
      funccheck(index) {
        return UserStore.state.my.profile.teleg_id > 0
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return 'pages.statusreg.verified'
      },
      funcko() {
        return 'pages.statusreg.nonverified'
      },
    },
    {
      title: 'steps.linee_guida',
      descr: '',
      page: '',
      funccheck(index) {
        return tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES)
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      }
    },
    {
      title: 'steps.video_intro',
      descr: '',
      page: '',
      funccheck(index) {
        return tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI)
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      }
    },
    {
      title: 'steps.zoom',
      descr: 'steps.zoom_long',
      page: '/zoom',
      funccheck(index) {
        return UserStore.getters.VistoZoom
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.dream',
      descr: 'steps.dream_long',
      page: '/mydream',
      funccheck(index) {
        if (UserStore.state.my.profile.my_dream)
          if (UserStore.state.my.profile.my_dream.length >= 10)
            return true

        return false
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.paymenttype',
      descr: 'steps.paymenttype_long',
      page: '',
      funccheck(index) {
        let ispaypal = false
        if (UserStore.state.my.profile.paymenttypes) {
          if (UserStore.state.my.profile.paymenttypes.includes('paypal')) {
            if (UserStore.state.my.profile.email_paypal)
              ispaypal = true
          }
          if (UserStore.state.my.profile)
            if (UserStore.state.my.profile.paymenttypes)
              return (UserStore.state.my.profile.paymenttypes.length >= 1) && ispaypal

        }
        return false
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.sharemovement',
      descr: 'steps.sharemovement_long',
      page: '/sharemovement',
      funccheck(index) {
        if (UserStore.state.my.calcstat)
          return UserStore.state.my.calcstat.numinvitati >= 2
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'dashboard.inv_attivi',
      descr: 'steps.inv_attivi_long',
      page: '',
      funccheck(index) {
        if (UserStore.state.my.calcstat)
          return UserStore.state.my.calcstat.numinvitati_attivi >= 2
      },
      funccheck_error(index) {
        return true
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.enter_prog',
      descr: 'steps.enter_prog_long',
      page: '/enter_prog',
      funccheck(index) {
        return false
      },
      funccheck_error(index) {
        return false
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.collaborate',
      descr: 'steps.collaborate_long',
      page: '/collaborate',
      funccheck(index) {
        return false
      },
      funccheck_error(index) {
        return false
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.dono',
      descr: 'steps.dono_long',
      page: '/gift',
      funccheck(index) {
        return false
      },
      funccheck_error(index) {
        return false
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.support',
      descr: 'steps.support_long',
      page: '/support',
      funccheck(index) {
        return false
      },
      funccheck_error(index) {
        return false
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
    {
      title: 'steps.ricevo_dono',
      descr: 'steps.ricevo_dono_long',
      page: '/receivegift',
      funccheck(index) {
        return false
      },
      funccheck_error(index) {
        return false
      },
      funcok() {
        return ''
      },
      funcko() {
        return ''
      },
    },
  ]

  public setstep() {
    this.step = 0
    for (let indstep = 0; indstep < this.arrsteps.length; indstep++) {
      if (this.arrsteps[indstep].funccheck(indstep)) {
        this.step++
      } else {
        return
      }
    }
  }

  public setsteptodo() {
    this.steptodo = 0
    for (let indstep = 0; indstep < this.arrsteps.length; indstep++) {
      if (this.arrsteps[indstep].funccheck(indstep)) {
        this.steptodo++
      } else {
        return
      }
    }
  }

  public created() {
    this.setstep()
    this.setsteptodo()

    this.my_dream = UserStore.state.my.profile.my_dream
  }

  public change_mydream() {
    if (UserStore.state.my.profile.my_dream !== this.my_dream) {
      UserStore.state.my.profile.my_dream = this.my_dream

      const mydata = {
        'profile.my_dream': UserStore.state.my.profile.my_dream
      }
      tools.saveFieldToServer(this, 'users', UserStore.state.my._id, mydata)
    }
  }

  get TelegVerificato() {
    return UserStore.state.my.profile.teleg_id > 0
  }

  get isEmailVerified() {
    return UserStore.state.my.verified_email
  }

  get telegramtext() {
    if (this.TelegVerificato)
      return this.$t('reg.telegram') + ' ' + this.$t('pages.statusreg.verified')
    else
      return this.$t('reg.telegram') + ' ' + this.$t('pages.statusreg.nonverified')
  }

  get paymenttext() {
    return ' (' + this.numpayment + ' ' + this.$t('reg.selected') + ')'
  }

  get getlaststep() {
    return this.arrsteps.length - 1
  }

  public getnuminvitati() {
    if (UserStore.state.my)
      if (UserStore.state.my.calcstat)
        return UserStore.state.my.calcstat.numinvitati

    return 0
  }

  public getnuminvitati_attivi() {
    if (UserStore.state.my)
      if (UserStore.state.my.calcstat)
      // console.log('numinvitati', UserStore.state.my.calcstat)
        return UserStore.state.my.calcstat.numinvitati_attivi

    return 0
  }

  public gettextstep(step, index) {
    let tit = (index + 1) + ' - ' + this.$t(step.title)

    if (step.funcok())
      tit += ' ' + this.$t(step.funcok())

    if (step.title === 'steps.sharemovement') {
      tit += ' (' + this.getnuminvitati() + ' ' + this.$t('dashboard.downline') + ')'
    } else if (step.title === 'steps.paymenttype') {
      tit += this.paymenttext
    }

    return tit
  }

  get getRefLink() {
    return UserStore.getters.getRefLink('')
  }

  public copylink() {
    tools.copyStringToClipboard(this, this.getRefLink, true)
  }

  public getiferror(checkerror, value) {
    if (checkerror) {
      return !value
    } else {
      return false
    }
  }

  public geterricon(value) {
    return 'fas fa-exclamation-triangle'
  }

  get listasel() {
    return UserStore.state.my.profile.paymenttypes
  }

  get isselectPaypal() {
    if (UserStore.state.my.profile) {
      // console.log('pay', UserStore.state.my.profile.paymenttypes)
      if (UserStore.state.my.profile.paymenttypes) {
        if (UserStore.state.my.profile.paymenttypes.includes('paypal')) {
          return true
        }
      }

      return false
    }

  }

  get TelegramBiblio() {
    return 'https://t.me/joinchat/AL2qKExZKvenLgpVhOyefQ'
  }

  public geticonstep(mystep) {
    if (!!mystep.icon)
      return mystep.icon
    else
      return 'check-circle'

  }

  public geticoncolor(title) {
    if (title === 'steps.chat_biblio') {
      return 'blue'
    } else {
      return 'green'
    }
  }

  get TelegCode() {
    return UserStore.state.my.profile.teleg_checkcode
  }

  get VistoZoom() {
    return UserStore.getters.VistoZoom
  }

  get getLinkBotTelegram() {
    const link = this.getValDb('TELEG_BOT_LINK', false)
    // console.log('link', link)
    return link
  }

  get CompletatoRequisiti() {
    return this.VistoZoom && this.getnuminvitati_attivi() >= 2 && this.RequisitoPayment
  }

  get RequisitoPayment() {
    let ispaypal = false
    if (UserStore.state.my.profile.paymenttypes) {
      if (UserStore.state.my.profile.paymenttypes.includes('paypal')) {
        if (UserStore.state.my.profile.email_paypal)
          ispaypal = true
      }
      if (UserStore.state.my.profile)
        if (UserStore.state.my.profile.paymenttypes)
          return (UserStore.state.my.profile.paymenttypes.length >= 1) && ispaypal

    }
    return false
  }

  get percstep() {
    return (this.getstep / this.NUMSTEP_OBBLIGATORI)
  }

  get getstep() {
    let mystep = 0
    for (let indstep = 0; indstep < this.arrsteps.length; indstep++) {
      if (this.arrsteps[indstep].funccheck(indstep)) {
        mystep++
      }
    }
    return mystep
  }

  get progressstep() {
    return this.$t(this.arrsteps[this.steptodo].title)
  }

  get strpercstep() {
    return this.$t('steps.completed') + ' ' + (this.getstep) + ' ' + this.$t('steps.passi_su') + ' ' + this.NUMSTEP_OBBLIGATORI
  }

  get stepcompleti() {
    return this.getstep === this.NUMSTEP_OBBLIGATORI
  }

  public scrolltostep(mystep) {
    this.step = mystep
    if (mystep > 0 )
      mystep -= 1
    const element = document.getElementById('step' + mystep)
    tools.scrollToElement(element)

  }

  public nextstep(index) {
    this.step = index + 1
    this.setsteptodo()

    setTimeout(() => {
      this.scrolltostep(this.step)
    }, 500)

  }
}
