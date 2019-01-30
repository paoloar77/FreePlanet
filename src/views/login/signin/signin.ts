import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { rescodes } from '../../../store/Modules/rescodes'
import { serv_constants } from '../../../store/Modules/serv_constants'


import { ISigninOptions, IUserState } from 'model'
import { validations, TSignin } from './signin-validate'

import { validationMixin } from 'vuelidate'

import { Logo } from '../../../components/logo'

import router from '@router'

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'


@Component({
  mixins: [validationMixin],
  validations: validations,
  components: { Logo }
})

export default class Signin extends Vue {
  public $v
  public $q
  loading: boolean
  $t: any

  public signin: ISigninOptions = {
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD
  }


  created() {
    this.$v.$reset()
    // this.$myconfig.socialLogin.facebook = true
    // console.log('PROVA fb:', this.$myconfig.socialLogin.facebook)
  }

  public env() {
    return process.env
  }

  showNotif(msg: any) {
    this.$q.notify(msg)
  }

  public getlinkforgetpwd() {
    return '/requestresetpwd'
  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) return ''
      if (item.$params.email && !item.email) return this.$t('reg.err.email')

      if (!item.required) return this.$t('reg.err.required')
      if (!item.minLength) return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char')
      if (!item.maxLength) return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char')
      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  checkErrors(riscode) {
    // console.log("RIS = " + riscode);
    if (riscode === rescodes.OK) {
      this.showNotif({ type: 'positive', message: this.$t('login.completato') })
      this.$router.push('/')
    } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR) {
      this.showNotif(this.$t('login.errato'))
      this.$router.push('/signin')
    } else {
      this.showNotif('Errore num ' + riscode)
    }

  }

  redirect(response) {
    this.loading = false
    window.location.href = response.data.redirect
  }

  error(error) {
    this.loading = false
    this.$errorHandler(this, error)
  }

  facebook() {
    this.loading = true
    this.$axios.get('/backend/loginFacebook')
      .then(response => this.redirect(response))
      .catch(error => this.error(error))
  }

  google() {

  }

  submit() {
    this.$v.signin.$touch()

    if (this.$v.signin.$error) {
      this.showNotif(this.$t('reg.err.errore_generico'))
      return
    }

    this.$q.loading.show({ message: this.$t('login.incorso') })

    console.log(this.signin)
    UserStore.actions.signin(this.signin)
      .then((riscode) => {
        if (riscode === rescodes.OK) {
          router.push('/signin')
        }
        this.checkErrors(riscode)
        this.$q.loading.hide()
      }).catch(error => {
      console.log('ERROR = ' + error)
      this.$q.loading.hide()
    })

  }
}
