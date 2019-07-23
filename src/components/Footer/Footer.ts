import Vue from 'vue'

import { GlobalStore, UserStore } from '@modules'
import { Logo } from '../logo'

import { Component, Prop } from 'vue-property-decorator'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

import { db_data } from '@src/db/db_data'
import { static_data } from '@src/db/static_data'

import Quasar from 'quasar'
import { FormNewsletter } from '../FormNewsletter'

@Component({
  name: 'Footer',
  components: { Logo, FormNewsletter }
})

export default class Footer extends Vue {
  public $t
  public $v
  public $q

  get TelegramSupport() {
    return db_data.TELEGRAM_SUPPORT
  }

  get FBPage() {
    return db_data.URL_FACEBOOK
  }

  get static_data(){
    return static_data
  }
}
