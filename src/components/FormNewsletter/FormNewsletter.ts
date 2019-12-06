import Vue from 'vue'
import Component from 'vue-class-component'

import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import Quasar, { Screen } from 'quasar'
import { Prop } from 'vue-property-decorator'
import { Api } from '../../store'
import { serv_constants } from '../../store/Modules/serv_constants'
import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'FormNewsletter'
})

export default class FormNewsletter extends MixinBase {
  public $t
  public $q
  public name: string = null
  public surname: string = null
  public email: string = null
  public accept: boolean = false

  @Prop() public idwebsite: string
  @Prop() public locale: string

  public async onSubmit() {

    if (this.accept !== true) {
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: this.$t('newsletter.license')
      })
    }
    else {
      const usertosend = {
        email: this.email,
        firstName: this.name,
        lastName: this.surname,
        idwebsite: this.idwebsite,
        locale: this.locale,
        settomailchimp: this.getValDb('MAILCHIMP_ON', true, false)
      }
      console.log(usertosend)

      return await Api.SendReq('/news/signup', 'POST', usertosend, false)
        .then((res) => {

          console.log('res', res)
          if (res.data.code === serv_constants.RIS_SUBSCRIBED_OK) {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              // message: this.$t('newsletter.submitted')
              message: res.data.msg
            })
          } else if (res.data.code === serv_constants.RIS_SUBSCRIBED_ALREADYEXIST) {
            this.$q.notify({
              color: 'orange-4',
              textColor: 'white',
              icon: 'fas fa-check-circle',
              // message: this.$t('newsletter.submitted')
              message: res.data.msg
            })
          } else {
            this.$q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'fas fa-exclamation-triangle',
              message: res.data.msg
            })
          }

        })
        .catch((error) => {
          console.error(error)
          // UserStore.mutations.setErrorCatch(error)
          return false
        })
    }
  }

  public onReset() {
    this.name = null
    this.surname = null
    this.email = null
    this.accept = false
  }


}
