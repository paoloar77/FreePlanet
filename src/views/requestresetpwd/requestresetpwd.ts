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
  name: 'RequestResetPwd',
  mixins: [validationMixin],
  validations,
  components: { Logo, CTitleBanner }
})

export default class RequestResetPwd extends Vue {
  public $q
  public $t
  public $v

  public emailsent = false
  public form = {
    email: '',
    tokenforgot: ''
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

    this.form.tokenforgot = ''

    console.log(this.form)
    UserStore.actions.requestpwd(this.form)
      .then((ris) => {
        if (ris.code === serv_constants.RIS_CODE_OK)
          this.emailsent = true
        else if (ris.code === serv_constants.RIS_CODE_EMAIL_NOT_EXIST)
          tools.showNegativeNotif(this.$q, this.$t('reg.err.email_not_exist'))
        this.$q.loading.hide()
      }).catch((err) => {
        console.log('ERROR = ' + err.error)
        this.$q.loading.hide()
      })

  }

  public errorMsg(cosa: string, item: any) {
    try {
      if (!item.$error) {
        return ''
      }
      if (item.$params.email && !item.email) {
        return this.$t('reg.err.email')
      }

      if (item.required !== undefined) {
        if (!item.required) {
          return this.$t('reg.err.required')
        }
      }

      if (cosa === 'email') {
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
