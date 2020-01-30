import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { serv_constants } from '../../store/Modules/serv_constants'

import { UserStore } from '../../store/Modules/index'
import { tools } from '../../store/Modules/tools'
import { Logo } from '../../components/logo'
import { validationMixin } from 'vuelidate'
import { CTitleBanner } from '../../components/CTitleBanner'
import { validations } from './request-resetpwd-validate'

@Component({
  mixins: [validationMixin],
  validations,
  components: { Logo, CTitleBanner }
})

export default class Updatepassword extends Vue {
  public $q
  public $t
  public $v

  public emailsent = false
  public form = {
    password: '',
    repeatPassword: '',
    tokenforgot: '',
    email: '',
    idapp: ''
  }

  public created() {
    // this.load()
  }

  get emailinviata() {
    return this.emailsent
  }

  public submit() {
    this.$v.form.$touch()

    if (this.$v.form.$error) {
      tools.showNotif(this.$q, this.$t('reg.err.errore_generico'))
      return
    }

    this.$q.loading.show({ message: this.$t('reset.incorso') })

    // console.log('this.$route.query', this.$route.query)
    this.form.tokenforgot = this.$route.query.tokenforgot.toString()
    this.form.email = this.$route.query.email.toString()
    this.form.idapp = process.env.APP_ID

    console.log(this.form)
    UserStore.actions.resetpwd(this.form)
      .then((ris) => {
        console.log('ris', ris)
        if (ris.code === serv_constants.RIS_CODE_OK)
          this.$router.push('/signin')
        else if (ris.code === serv_constants.RIS_CODE_TOKEN_RESETPASSWORD_NOT_FOUND)
          tools.showNegativeNotif(this.$q, this.$t('reset.token_scaduto'))
        else
          tools.showNegativeNotif(this.$q, this.$t('fetch.errore_server'))

        this.$q.loading.hide()
      }).catch(error => {
      console.log('ERROR = ' + error)
      this.$q.loading.hide()
    })

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
      }

      return ''
    } catch (error) {
      // console.log("ERR : " + error);
    }
  }

}
