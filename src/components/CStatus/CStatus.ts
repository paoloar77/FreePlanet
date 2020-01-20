import Vue from 'vue'
import { GlobalStore } from '@store'
import { NotevoleStore, UserStore } from '../../store/Modules'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { toolsext } from '@src/store/Modules/toolsext'

import MixinBase from '../../mixins/mixin-base'
import { CTitleBanner, CMyFieldDb } from '@components'
import { CMyInnerPage } from '../CMyInnerPage'
import { tools } from '../../store/Modules/tools'

import { copyToClipboard } from 'quasar'

@Component({
  components: { CTitleBanner, CMyFieldDb, CMyInnerPage  }
})

export default class CStatus extends MixinBase {
  public $v
  public $t: any
  public step = 1
  public NUMSTEP_START = 3

  public arrsteps = [
    {
      title: 'steps.zoom',
      descr: 'steps.zoom_long',
      page: '/zoom',
      funccheck(index) {
        return UserStore.state.my.profile.saw_zoom_presentation
      },
      funccheck_error(index) {
        return true
      }
    },
    {
      title: 'steps.dream',
      descr: 'steps.dream_long',
      page: '/mydream',
      funccheck(index) {
        if (UserStore.state.my.profile.my_dream)
          if (UserStore.state.my.profile.my_dream.length > 10)
            return true

        return false
      },
      funccheck_error(index) {
        return true
      },
    },
    {
      title: 'steps.sharemovement',
      descr: 'steps.sharemovement_long',
      page: '/sharemovement',
      funccheck(index) {
        if (UserStore.state.my.calcstat)
          return UserStore.state.my.calcstat.numinvitati_attivi >= 2
      },
      funccheck_error(index) {
        return true
      },
    },
    {
      title: 'steps.paymenttype',
      descr: 'steps.paymenttype_long',
      page: '',
      funccheck(index) {
        return this.numpayment >= 2
      },
      funccheck_error(index) {
        return true
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
    },

/*
      sharemovement: 'Condivido il movimento',
      sharemovement_long: 'Condivido il movimento con almeno 2 amici e li guido alla registrazione e agli zoom',
      enter_prog: 'entro in Programmazione',
      enter_prog_long: 'entro in programmazione, e vengo aggiunto al Mandala, ed entro così nella chat corrispondente.',
      collaborate: 'Collaborazione',
      collaborate_long: 'Continuo a collaborare con il miei compagni, per arrivare al giorno della programmazione dove si attiverà il mio Mandala',
      dono: 'Dono',
      dono_long: 'Faccio il mio dono al proprietario della Bigliettera',
      support: 'Sostengo il movimento',
      support_long: 'Continuo a sostenere il movimento partecipando attivamente! Organizzando zoom e partecipando, sostenendo, informando, aiutando e diffondendo',
      ricevo_dono: 'Ricevo il mio dono e CELEBRO',
      ricevo_dono_long: 'Ricevo il mio dono e CELEBRO',
*/

  ]

  public setstep() {
    if (this.isEmailVerified) {
      this.step = 2
      if (this.TelegVerificato) {
        this.step = 3
        for (let indstep = 0; indstep < this.arrsteps.length; indstep++){
          if (this.arrsteps[indstep].funccheck(indstep)) {
            this.step++
          }
        }
        // if (this.numpayment > 0) {
        //   this.step = 4
        // }
      }
    }
    console.log('step', this.step)
  }

  public mounted() {
    this.setstep()
  }

  get TelegCode() {
    return UserStore.state.my.profile.teleg_checkcode
  }
  get TelegVerificato() {
    return UserStore.state.my.profile.teleg_id > 0
  }

  get isEmailVerified() {
    return UserStore.state.my.verified_email
  }

  get emailtext() {
    if (this.isEmailVerified)
      return `Email ` + this.$t('pages.statusreg.verified')
    else
      return `Email ` + this.$t('pages.statusreg.nonverified')
  }

  get telegramtext() {
    if (this.TelegVerificato)
      return `Telegram ` + this.$t('pages.statusreg.verified')
    else
      return `Telegram ` + this.$t('pages.statusreg.nonverified')
  }

  get paymenttext() {
    return ' (' + this.numpayment + ' ' + this.$t('reg.selected') + ')'
  }

  get numpayment() {
    if (UserStore.state.my.profile)
      if (UserStore.state.my.profile.paymenttypes)
        return UserStore.state.my.profile.paymenttypes.length

    return 0
  }

  get getLinkBotTelegram() {
    const link = this.getValDb('TELEG_BOT_LINK', false)
    // console.log('link', link)
    return link
  }

  get getlaststep() {
    return this.arrsteps.length + this.NUMSTEP_START - 1
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
        return UserStore.state.my.calcstat.numinvitati_attivi

    return 0
  }

  public gettextstep(step) {
    let tit = this.$t(step.title)

    if (step.title === 'steps.sharemovement') {
      tit += ' (' + this.getnuminvitati_attivi() + ' / ' + this.getnuminvitati() + ' invitati Attivi)'
    } else if (step.title === 'steps.paymenttype') {
      tit += this.paymenttext
    }

    return tit
  }

  get getRefLink() {
    return UserStore.getters.getRefLink()
  }

  public copylink() {
    copyToClipboard(this.getRefLink).then(() => {
      tools.showNotif(this.$q, this.$t('dialog.copyclipboard') + ' \'' + this.getRefLink + '\'')
    })

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

}
