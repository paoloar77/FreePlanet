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
import { lists } from '../../store/Modules/lists'

@Component({
  components: {
    CTitleBanner,
    CMyFieldDb,
    CMyInnerPage,
    CVerifyTelegram,
    CVerifyEmail,
    CCopyBtn,
    CVideo,
    CRequisiti,
    CGuidelines,
    CVideoPromo
  }
})

export default class CStatus extends MixinBase {
  @Prop({ required: false, default: false }) public dense: boolean
  public $v
  public $t: any
  public step = 0
  public steptodo = 0
  public NUMSTEP_OBBLIGATORI = 7
  public my_dream: string = ''

  get numpayment() {
    if (UserStore.state.my.profile)
      if (UserStore.state.my.profile.paymenttypes)
        return UserStore.state.my.profile.paymenttypes.length

    return 0
  }

  private DiceDiAverPartec: boolean = false

  /*@Watch('UserStore.state.my.profile.ask_zoom_partecipato', { immediate: true, deep: true })
  public array_changed() {
    console.log('*** ask_zoom_partecipato *** ', '[', UserStore.state.my.profile.ask_zoom_partecipato, ']')
    if (UserStore.state.my.profile.ask_zoom_partecipato !== undefined)
      this.DiceDiAverPartec = UserStore.state.my.profile.ask_zoom_partecipato
    console.log('*** this.DiceDiAverPartec *** ', '[', this.DiceDiAverPartec, ']')
  }*/

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
        return tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)
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
        return tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value)
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
    /*{
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
    },*/
    {
      title: 'steps.paymenttype',
      descr: 'steps.paymenttype_long',
      page: '',
      funccheck(index) {
        return UserStore.state.my.profile.paymenttypes.length > 1
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
        return true
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
    }
    /*{
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
    },*/
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
    this.DiceDiAverPartec = UserStore.state.my.profile.ask_zoom_partecipato
    // this.my_dream = UserStore.state.my.profile.my_dream

    this.setstep()
    this.setsteptodo()

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
      return this.$t('reg.telegram', {botname: this.$t('ws.botname')}) + ' ' + this.$t('pages.statusreg.verified')
    else
      return this.$t('reg.telegram', {botname: this.$t('ws.botname')}) + ' ' + this.$t('pages.statusreg.nonverified')
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
    let tit = (index + 1) + ' - ' + this.$t(step.title, {botname: this.$t('ws.botname'), sitename: this.$t('ws.sitename')})

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

  public geterrcolor(mystep) {
    if ((mystep.title === 'steps.sharemovement') || (mystep.title === 'dashboard.inv_attivi')) {
      return 'blue'
    } else {
      return 'red'
    }
  }

  public geterricon(value, mystep) {
    if ((mystep.title === 'steps.sharemovement') || (mystep.title === 'dashboard.inv_attivi')) {
      return 'fas fa-user'
    } else {
      return 'fas fa-exclamation-triangle'
    }
  }

  get listasel() {
    return UserStore.state.my.profile.paymenttypes
  }

  public geticonstep(mystep) {
    if (!!mystep.icon)
      return mystep.icon
    else
      return 'check-circle'

  }

  public geticoncolor(title) {
    if (title === 'steps.enter_prog') {
      return this.CompletatoRequisiti ? 'blue' : (this.Completato9Req ? 'green' : 'blue')
    }

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
    try {
      return  this.RequisitoPayment &&
        this.TelegVerificato &&
        tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value) &&
        tools.isBitActive(UserStore.state.my.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value)
    }catch (e) {
      return false
    }

  }

  /*public hagiapartecipato() {
    tools.AskGiaPartecipatoZoom(this, UserStore.state.my)
  }*/

  get Completato9Req() {
    // return tools.Is9ReqOk(this.dashboard.myself)
    return this.CompletatoRequisiti && (this.getnuminvitati_attivi() >= 2)
  }

  get RequisitoPayment() {
    return (UserStore.state.my.profile.paymenttypes.length > 1)
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
    return this.$t(this.arrsteps[this.steptodo].title, {botname: this.$t('ws.botname')})
  }

  get strpercstep() {
    return this.$t('steps.completed') + ' ' + this.$t('steps.passi_su', {passo: this.getstep, totpassi: this.NUMSTEP_OBBLIGATORI })
  }

  get stepcompleti() {
    return this.getstep >= this.NUMSTEP_OBBLIGATORI
  }

  public NoPartNoZoom() {
    return !this.DiceDiAverPartec && !this.VistoZoom
  }

  public scrolltostep(mystep) {
    this.step = mystep
    if (mystep > 0)
      mystep -= 1
    const element = document.getElementById('step' + mystep)
    tools.scrollToElement(element)

  }

  public Callback(funz) {
    console.log('callback')
    if (funz === lists.MenuAction.ZOOM_GIA_PARTECIPATO) {
      UserStore.mutations.setDiceDiAverPartecipato(true)
      this.DiceDiAverPartec = UserStore.state.my.profile.ask_zoom_partecipato
      // UserStore.state.my.profile.ask_zoom_partecipato = true

      console.log('UserStore.state.my.profile.ask_zoom_partecipato = true')
      console.log('this.DiceDiAverPartec', this.DiceDiAverPartec)
    }
  }

  public nextstep(index) {
    this.step = index + 1
    this.setsteptodo()

    setTimeout(() => {
      this.scrolltostep(this.step)
    }, 500)

  }
}
