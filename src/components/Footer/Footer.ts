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
import { IUserState } from '../../model'
import MixinBase from '../../mixins/mixin-base'
import { CFacebookFrame } from '../CFacebookFrame'

@Component({
  mixins: [MixinBase],
  name: 'Footer',
  components: { Logo, FormNewsletter, CFacebookFrame }
})

export default class Footer extends Vue {
  public $t
  public $v
  public $q

  get tools() {
    return tools
  }

  get mythisfoot() {
    return this
  }

  get TelegramSupport() {
    return GlobalStore.getters.getValueSettingsByKey('TELEGRAM_SUPPORT', false)
  }

  get Whatsapp_Cell() {
    return GlobalStore.getters.getValueSettingsByKey('WHATSAPP_CELL', false)
  }

  get Telegram_UsernameHttp() {

    return tools.getHttpForTelegram(GlobalStore.getters.getValueSettingsByKey('TELEGRAM_USERNAME', false))
  }

  get FBPage() {
    const fb = GlobalStore.getters.getValueSettingsByKey('URL_FACEBOOK', false)
    return fb
  }

  get InstagramPage() {
    return GlobalStore.getters.getValueSettingsByKey('URL_INSTAGRAM', false)
  }

  get TwitterPage() {
    return GlobalStore.getters.getValueSettingsByKey('URL_TWITTER', false)
  }

  get static_data() {
    return static_data
  }

  get ChatWhatsapp() {
    return tools.getHttpForWhatsapp(this.Whatsapp_Cell)
  }

}
