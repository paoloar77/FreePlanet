import Vue from 'vue'
import { GlobalStore } from '@store'
import { UserStore } from '../../store/Modules'
import { Component, Prop } from 'vue-property-decorator'
import { serv_constants } from '../../store/Modules/serv_constants'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { ISigninOptions, IUserState } from 'model'
import { validations } from './CSignIn-validate'

import { validationMixin } from 'vuelidate'

import { Logo } from '../logo'

import { static_data } from '../../db/static_data'

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

@Component({
  name: 'CSignIn',
  mixins: [validationMixin],
  validations,
  components: { Logo }
})

export default class CSignIn extends Vue {
  @Prop({required: true}) public showregbutt: boolean

  public $v
  public loading: boolean
  public $t: any
  public iswaitingforRes: boolean = false

  public signin: ISigninOptions = {
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || ''
  }

  get static_data() {
    return static_data
  }

  public created() {
    this.$v.$reset()

    if (UserStore.state.resStatus === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
      this.$emit('showNotif', 'fetch.error_doppiologin')
    }

    // this.$myconfig.socialLogin.facebook = true
    // console.log('PROVA fb:', this.$myconfig.socialLogin.facebook)
  }

  public env() {
    return process.env
  }

  public getlinkforgetpwd() {
    return '/requestresetpwd'
  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }
      if (item.$params.email && !item.email) {
        return this.$t('reg.err.email')
      }

      if (!item.required) {
        return this.$t('reg.err.required')
      }
      if (!item.minLength) {
        return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char')
      }
      if (!item.maxLength) {
        return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char')
      }
      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  public redirect(response) {
    this.loading = false
    window.location.href = response.data.redirect
  }

  public error(error) {
    this.loading = false
    // this.$errorHandler(this, error)
  }

  public facebook() {
    this.loading = true
    // this.$axios.get('/backend/loginFacebook')
    //   .then((response) => this.redirect(response))
    //   .catch((error) => this.error(error))
  }

  public google() {
    // ...
  }

  public submit() {
    // console.log('submit LOGIN')

    this.signin.username = tools.removespaces(this.signin.username)

    this.$v.signin.$touch()

    if (this.$v.signin.$error) {
      this.$emit('showNotif', 'reg.err.errore_generico')
      return
    }

    this.$emit('loginInCorso')

    // disable Button Login:
    this.iswaitingforRes = true

    if (process.env.DEBUG) {
      // console.log('this.signin', this.signin)
    }

    UserStore.actions.signin(this.signin)
      .then((riscode) => {
        // console.log('signin FINITO CALL: riscode=', riscode)
        if (riscode === tools.OK) {
          // router.push('/signin')
        }
        return riscode
      })
      .then((riscode) => {
        if (process.env.DEBUG) {
          // console.log('  riscode(1) =', riscode)
        }

        return riscode
      })
      .then((riscode) => {
        if (riscode === tools.OK) {
          // console.log('  -> eseguo $emit(loginOk)')

          this.$emit('loginOk')

          // GlobalStore.actions.createPushSubscription()
          //   .then((rissub) => {
          //     // ...
          //   })
          //   .catch((e) => {
          //     console.log('ERROR Subscription = ' + e)
          //   })
        } else {
          this.$emit('checkErrors', riscode)
        }

        this.iswaitingforRes = false

      })
      .catch((error) => {
        // console.log('ERROR SIGNIN = ' + error)

        this.$emit('checkErrors', error)
      })
    // console.log('   END submit')
  }

}
