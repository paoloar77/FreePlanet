import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { ISignupIscrizioneConacreisOptions } from 'model'
import { validations, ISignupConacreis } from './CSignUpIscrizioneConacreis-validate'

import { validationMixin } from 'vuelidate'

import { Logo } from '../../components/logo'
import { DefaultProfile } from '../../store/Modules/UserStore'

// import 'vue-country-code/dist/vue-country-code.css'
import { serv_constants } from '@src/store/Modules/serv_constants'

import VueCountryCode from 'vue-country-code'
import { registereduser } from '../../validation'
import MixinBase from '../../mixins/mixin-base'
import { CTitleBanner } from '../CTitleBanner'
import { CDate } from '../../components/CDate'
import { date } from 'quasar'
import { CMyPage } from '@src/components/CMyPage'
import MixinUsers from '@src/mixins/mixin-users'

Vue.use(VueCountryCode)
// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

@Component({
  name: 'CSignUpIscrizioneConacreis',
  mixins: [validationMixin],
  validations,
  components: { Logo, CTitleBanner, CDate, CMyPage }
})

export default class CSignUpIscrizioneConacreis extends MixinUsers {
  public $v
  public $q
  public $t: any
  public countryname: string = ''
  public iamadult: boolean = false

  public duplicate_email: boolean = false
  public duplicate_username: boolean = false

  public signup: ISignupIscrizioneConacreisOptions = {
    accetta_carta_costituzionale_on: false,
    newsletter_on: false,
    terms: false
  }

  public created() {
    if (!!this.getMyUsername()) {
      this.signup.name = UserStore.state.my.name
      this.signup.surname = this.mySurname.toString()
      this.signup.email = this.Email
      this.signup.cell_phone = this.myCell.toString()
    }
    this.$v.$reset()
  }

  get allowSubmit() {

    const error = this.$v.$error || this.$v.$invalid

    // console.log('v', this.$v, 'error', error, 'terms', this.signup.terms, 'carta', this.signup.accetta_carta_costituzionale_on)
    return !error && this.signup.terms && this.signup.accetta_carta_costituzionale_on
  }

  public env() {
    return process.env
  }

  public setDateOfBirth(param) {
    console.log('param', param)
    // this.signup.dateofbirth = tools.convertstrtoDate(arguments[0])
    this.signup.dateofbirth = new Date(arguments[0])
  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }
      console.log('item', item)
      // console.log('errorMsg', cosa, item)
      if (item.$params.email && !item.email) {
        return this.$t('reg.err.email')
      }

      // console.log('item', item)

      if (item.minLength !== undefined) {
        if (!item.minLength) {
          return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char')
        }
      }
      if (item.complexity !== undefined) {
        if (!item.complexity) {
          return this.$t('reg.err.complexity')
        }
      }
// if (!item.maxLength) { return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char') }

      if (item.required !== undefined) {
        if (!item.required) {
          return this.$t('reg.err.required')
        }
      }

      // console.log('    ....avanti')
      if (cosa === 'email') {
        // console.log("EMAIL " + item.isUnique);
        // console.log(item);
        if (!item.isUnique) {
          return this.$t('reg.err.duplicate_email')
        }
      } else if (cosa === 'username') {
        // console.log(item);
        console.log('username')
        console.log(item.$error)
        if (!item.isUnique) {
          return this.$t('reg.err.duplicate_username')
        }
      } else if ((cosa === 'name') || (cosa === 'surname')) {
        // console.log(item);
      }

      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  public submitOk() {
    this.$v.signup.$touch()

    this.signup.email = tools.removespaces(this.signup.email)
    this.signup.email = this.signup.email.toLowerCase()

    this.signup.residency_country = tools.CapitalizeAllWords(this.signup.residency_country)
    this.signup.residency_address = tools.CapitalizeAllWords(this.signup.residency_address)
    this.signup.residency_city = tools.CapitalizeAllWords(this.signup.residency_city)
    this.signup.residency_province = this.signup.residency_province.toUpperCase()

    this.duplicate_email = false
    this.duplicate_username = false

    if (!this.signup.terms) {
      tools.showNotif(this.$q, this.$t('reg.err.terms'))
      return
    }

    if (!this.signup.accetta_carta_costituzionale_on) {
      tools.showNotif(this.$q, this.$t('reg.err.accetta_carta_costituzionale_on'))
      return
    }

    if (this.$v.signup.$error) {
      tools.showNotif(this.$q, this.$t('reg.err.errore_generico'))
      return
    }

    this.signup.name = tools.CapitalizeAllWords(this.signup.name)
    this.signup.surname = tools.CapitalizeAllWords(this.signup.surname)
    this.signup.annoTesseramento = 2021

    this.$q.loading.show({ message: this.$t('reg.iscrizioneincorso') })

    console.log(this.signup)
    return UserStore.actions.iscrivitiConacreis(tools.clone(this.signup))
      .then((ris) => {
        if (tools.SignUpcheckErrors(this, ris.code, ris.msg))
          this.$q.loading.hide()
      }).catch((error) => {
        console.log('ERROR = ' + error)
        this.$q.loading.hide()
      })

  }

  public selectcountry({ name, iso2, dialCode }) {
    // console.log(name, iso2, dialCode)
    this.signup.residency_country = iso2
    this.countryname = name
  }

}
