import Vue from 'vue'
import Component from 'vue-class-component'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import Quasar, { Screen } from 'quasar'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'FormNewsletter'
})

export default class FormNewsletter extends Vue {
  public $t
  public $q
  public name: string = null
  public email: string = null
  public accept: boolean = false

  public onSubmit() {
    if (this.accept !== true) {
      
      this.$q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'fas fa-exclamation-triangle',
        message: this.$t('newsletter.license')
      })
    }
    else {
      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'fas fa-check-circle',
        message: this.$t('newsletter.submitted')
      })
    }
  }

  public onReset() {
    this.name = null
    this.email = null
    this.accept = false
  }

}
