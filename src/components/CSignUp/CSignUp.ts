import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { UserStore } from '@store'
import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { ISignupOptions, IUserState, IUserFields } from 'model'
import { validations, TSignup } from './CSignUp-validate'

import { validationMixin } from 'vuelidate'

import { Logo } from '../../components/logo'

// import {Loading, QSpinnerFacebook, QSpinnerGears} from 'quasar'

@Component({
  name: 'CSignUp',
  mixins: [validationMixin],
  validations,
  components: { Logo }
})

export default class CSignUp extends Vue {
  @Prop({ required: false, default: false }) public adult: boolean
  public $v
  public $q
  public $t: any

  public duplicate_email: boolean = false
  public duplicate_username: boolean = false

  public signup: ISignupOptions = {
    email: process.env.TEST_EMAIL || '',
    username: process.env.TEST_USERNAME || '',
    name: process.env.TEST_NAME || '',
    surname: process.env.TEST_SURNAME || '',
    password: process.env.TEST_PASSWORD || '',
    repeatPassword: process.env.TEST_PASSWORD || '',
    terms: !process.env.PROD,
  }

  public created() {
    this.$v.$reset()

    this.signup.aportador_solidario = tools.getCookie(tools.APORTADOR_SOLIDARIO, this.$route.params.invited || process.env.TEST_APORTADOR)
  }

  @Watch('$route.params.invited')
  public changeaportador() {
    if (!this.signup.aportador_solidario)
      this.signup.aportador_solidario = this.$route.params.invited
  }

  public mounted() {

  }

  get allowSubmit() {

    const error = this.$v.$error || this.$v.$invalid
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
      if (!item.$error) { return '' }
      if (item.$params.email && !item.email) { return this.$t('reg.err.email') }

      if (cosa === 'repeatpassword') {
        if (!item.sameAsPassword) {
          return this.$t('reg.err.sameaspassword')
        }
      }

      if (!item.required) { return this.$t('reg.err.required') }
      if (cosa === 'email') {
        // console.log("EMAIL " + item.isUnique);
        // console.log(item);
        if (!item.isUnique) { return this.$t('reg.err.duplicate_email') }
      } else if (cosa === 'username') {
        // console.log(item);
        if (!item.isUnique) { return this.$t('reg.err.duplicate_username') }
      } else if ((cosa === 'name') || (cosa === 'surname')) {
        // console.log(item);

      }

      if (!item.complexity) { return this.$t('reg.err.complexity') }
      if (!item.minLength) { return this.$t('reg.err.atleast') + ` ${item.$params.minLength.min} ` + this.$t('reg.err.char') }
      if (!item.maxLength) { return this.$t('reg.err.notmore') + ` ${item.$params.maxLength.max} ` + this.$t('reg.err.char') }
      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

  public SignUpcheckErrors(riscode: number) {
    console.log('SignUpcheckErrors', riscode)
    if (riscode === tools.DUPLICATE_EMAIL_ID) {
      tools.showNotif(this.$q, this.$t('reg.err.duplicate_email'))
    } else if (riscode === tools.DUPLICATE_USERNAME_ID) {
      tools.showNotif(this.$q, this.$t('reg.err.duplicate_username'))
    } else if (riscode === tools.ERR_SERVERFETCH) {
      tools.showNotif(this.$q, this.$t('fetch.errore_server'))
    } else if (riscode === tools.ERR_GENERICO) {
      const msg = this.$t('fetch.errore_generico') + UserStore.mutations.getMsgError(riscode)
      tools.showNotif(this.$q, msg)
    } else if (riscode === tools.OK) {
      this.$router.push('/signin')
      tools.showNotif(this.$q, this.$t('components.authentication.email_verification.link_sent'), {color: 'warning', textColor: 'black'})
    } else {
      tools.showNotif(this.$q, 'Errore num ' + riscode)
    }

  }

  public submitOk() {
    this.$v.signup.$touch()

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

    this.$q.loading.show({ message: this.$t('reg.incorso') })

    console.log(this.signup)
    UserStore.actions.signup(this.signup)
      .then((riscode) => {
        tools.SignUpcheckErrors(this, riscode)
        this.$q.loading.hide()
      }).catch((error) => {
      console.log('ERROR = ' + error)
      this.$q.loading.hide()
    })

  }

}
