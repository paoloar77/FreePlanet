import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { ISignupOptions, IUserState, IUserFields } from 'model'
import { validations, TSignup } from './CSignUp-validate'

import { validationMixin } from 'vuelidate'

import { Logo } from '../../components/logo'
import { DefaultProfile } from '../../store/Modules/UserStore'

// import 'vue-country-code/dist/vue-country-code.css'
import { serv_constants } from '@src/store/Modules/serv_constants'

import VueCountryCode from 'vue-country-code'
import { registereduser } from '../../validation'
import MixinBase from '../../mixins/mixin-base'
import { CTitleBanner } from '../CTitleBanner'
import { PagePolicy } from '../PagePolicy'

Vue.use(VueCountryCode)
// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

@Component({
  name: 'CSignUp',
  mixins: [validationMixin],
  validations,
  components: { Logo, CTitleBanner, PagePolicy }
})

export default class CSignUpSIP extends MixinBase {
  @Prop({ required: false, default: false }) public showadultcheck: boolean
  @Prop({ required: false, default: false }) public showcell: boolean
  @Prop({ required: false, default: false }) public showaportador: boolean
  @Prop({ required: false, default: false }) public shownationality: boolean

  public $v
  public $q
  public $t: any
  public countryname: string = ''
  public iamadult: boolean = false

  public duplicate_email: boolean = false
  public duplicate_username: boolean = false
  public showdisclaimer: boolean = false


  public signup: ISignupOptions = {
    email: process.env.TEST_EMAIL || '',
    username: process.env.TEST_USERNAME || '',
    name: process.env.TEST_NAME || '',
    surname: process.env.TEST_SURNAME || '',
    password: process.env.TEST_PASSWORD || '',
    repeatPassword: process.env.TEST_PASSWORD || '',
    terms: !process.env.PROD,
    profile: DefaultProfile,
    aportador_solidario: process.env.TEST_APORTADOR,
  }

  public created() {
    this.$v.$reset()

    this.signup.aportador_solidario = this.$route.params.invited

    console.log('1) aportador_solidario', this.signup.aportador_solidario)

    if (!this.signup.aportador_solidario)
      this.signup.aportador_solidario = tools.getCookie(tools.APORTADOR_SOLIDARIO, this.signup.aportador_solidario)

    if (!this.signup.aportador_solidario || this.signup.aportador_solidario === 'undefined') {
      this.signup.aportador_solidario = tools.APORTADOR_NONE
    }
    this.$v.signup.aportador_solidario.$touch()

    console.log('this.signup.aportador_solidario', this.signup.aportador_solidario)
  }

  // @Watch('signup.already_registered')
  // public changealreadyreg() {
  //   if (this.signup.already_registered) {
  //     this.signup.aportador_solidario = tools.APORTADOR_NONE
  //   } else {
  //     this.signup.aportador_solidario = this.$route.params.invited
  //   }
  //   this.$v.signup.aportador_solidario.$touch()
  // }

  @Watch('$route.params.invited')
  public changeaportador() {
    if (this.showaportador) {
      console.log('changeaportador', this.$route.params.invited)
      if (!this.signup.aportador_solidario)
        this.signup.aportador_solidario = this.$route.params.invited
    }
  }

  get allowSubmit() {

    let error = this.$v.$error || this.$v.$invalid

    if (this.showadultcheck)
      error = error || !this.iamadult

    if (this.showcell)
      error = error || this.signup.profile.cell.length <= 6

    return !error
  }

  /*
  validations: {
    isAsync: true,
    form: {
      email: {
        required, email,
        isUnique: value => {
          if (value === '') return true;
          return axios.get(process.env.MONGODB_HOST + '/email/' + value)
            .then(res => {
              return (res.status !== 200)
            }).catch((e) => {
              return true;
            })
        }
      },
      password: {required, minLength: minLength(8), maxLength: maxLength(20)},
      username: {
        required, minLength: minLength(6), maxLength: maxLength(20),
        isUnique: value => {
          if (value === '') return true;
          return axios.get(process.env.MONGODB_HOST + '/users/' + value)
            .then(res => {
              return (res.status !== 200)
            }).catch((e) => {
              return true;
            })
        }
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      },
      terms: {required},

    }
  }, */
  public env() {
    return process.env
  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }
      // console.log('errorMsg', cosa, item)
      if (item.$params.email && !item.email) {
        return this.$t('reg.err.email')
      }

      if (cosa === 'repeatpassword') {
        if (!item.sameAsPassword) {
          return this.$t('reg.err.sameaspassword')
        }
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
        if (!item.isUnique) {
          return this.$t('reg.err.duplicate_username')
        }
      } else if (cosa === 'aportador_solidario') {
        // console.log(item);
        if (!item.aportadorexist) {
          // console.log('!item.aportadorexist !')
          return this.$t('reg.err.aportador_not_exist')
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

    this.signup.username = tools.removespaces(this.signup.username)

    this.duplicate_email = false
    this.duplicate_username = false

    if (!this.signup.terms) {
      tools.showNotif(this.$q, this.$t('reg.err.terms'))
      return
    }

    if (this.$v.signup.$error) {
      tools.showNotif(this.$q, this.$t('reg.err.errore_generico'))
      return
    }

    this.signup.name = tools.CapitalizeAllWords(this.signup.name).trim()
    this.signup.surname = tools.CapitalizeAllWords(this.signup.surname).trim()
    this.signup.profile.cell = tools.removespaces(this.signup.profile.cell).trim()
    this.signup.profile.intcode_cell = this.signup.profile.intcode_cell.trim()

    this.$q.loading.show({ message: this.$t('reg.incorso') })

    console.log(this.signup)
    return UserStore.actions.signup(tools.clone(this.signup))
      .then((ris) => {
        if (tools.SignUpcheckErrors(this, ris.code, ris.msg))
          this.$q.loading.hide()
      }).catch((error) => {
        console.log('ERROR = ' + error)
        this.$q.loading.hide()
      })

  }

  public intcode_change(coderec) {
    // console.log('intcode', coderec)
    this.signup.profile.intcode_cell = '+' + coderec.dialCode
    this.signup.profile.iso2_cell = coderec.iso2
  }

  public selectcountry({ name, iso2, dialCode }) {
    // console.log(name, iso2, dialCode)
    this.signup.profile.nationality = iso2
    this.countryname = name
  }

  public inputUsername(value) {
    this.signup.username = value.trim()
  }

  get nuovareg() {
    return (this.signup.aportador_solidario !== tools.APORTADOR_NONE)
  }

  get getplaceholdercell() {
    if (this.signup.aportador_solidario !== tools.APORTADOR_NONE)
      return this.$t('reg.cell')
    else
      return this.$t('reg.cellreg')
  }

  get regvisibile() {
    return true
    // return this.signup.already_registered || (!this.signup.already_registered && this.signup.aportador_solidario)
  }

  get gettitlereg() {
      return this.$t('pages.SignUp')
  }
}
