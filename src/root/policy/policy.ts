import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { static_data } from '@src/db/static_data'

import { PagePolicy } from '../../components/PagePolicy'

@Component({
  name: 'Policy',
  components: { PagePolicy }
})

export default class Policy extends Vue {

  public mioalert = false

  get static_data() {
    return static_data
  }

}
