import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { CGridTableRec } from '@components'
import { CMyPage } from '../../../components/CMyPage/index'
import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '../../../store/Modules/tools'

@Component({
  components: { CGridTableRec, CMyPage }
})

export default class UsersList extends Vue {
  public arrfilterand = []

  public mounted() {
    if (tools.appid() === '7')
      this.arrfilterand = [
        {
          label: 'Non hanno visto Zoom',
          value: shared_consts.FILTER_USER_NO_ZOOM
        },
        {
          label: 'Non hanno l\'Invitante',
          value: shared_consts.FILTER_USER_NO_INVITANTE
        },
        {
          label: 'No Telegram ID',
          value: shared_consts.FILTER_USER_NO_TELEGRAM_ID
        },
        {
          label: 'Verifica Telegram interrotta',
          value: shared_consts.FILTER_USER_CODICE_AUTH_TELEGRAM
        },
        {
          label: 'Email non Verificata',
          value: shared_consts.FILTER_USER_NO_EMAIL_VERIFICATA
        },
        {
          label: 'Non hanno compilato il sogno',
          value: shared_consts.FILTER_USER_NO_DREAM
        }
      ]

  }

  get db_fieldsTable() {
    return fieldsTable
  }
}
