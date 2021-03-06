import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { CGridTableRec } from '@components'
import { CMyPage } from '../../../components/CMyPage/index'
import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@src/common/shared_vuejs'
import { tools } from '../../../store/Modules/tools'
import { static_data } from '../../../db/static_data'

@Component({
  components: { CGridTableRec, CMyPage }
})

export default class UsersList extends Vue {
  public arrfilterand = []

  public mounted() {
    if (tools.appid() === tools.IDAPP_AYNI) {
      this.arrfilterand = [
        {
          label: 'Attivi',
          value: shared_consts.FILTER_ATTIVI
        },
        {
          label: 'Nascosti',
          value: shared_consts.FILTER_NASCOSTI
        },
        {
          label: 'Navi Non Presenti!',
          value: shared_consts.FILTER_NAVI_NON_PRESENTI
        },
        {
          label: 'Non hanno visto Zoom',
          value: shared_consts.FILTER_USER_NO_ZOOM
        },
        {
          label: 'hanno detto di aver visto lo Zoom',
          value: shared_consts.FILTER_ASK_ZOOM_VISTO
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
        },
        {
          label: 'Telegram BOT Rimosso',
          value: shared_consts.FILTER_USER_TELEGRAM_BLOCKED
        }
      ]

    }
  }

  get db_fieldsTable() {
    return fieldsTable
  }

  get userlist() {

    if (static_data.functionality.ENABLE_REG_AYNI) {
      return this.db_fieldsTable.colTableUsers
    } else if (static_data.functionality.ENABLE_REG_CNM) {
      return this.db_fieldsTable.colTableUsersCNM
    } else {
      return this.db_fieldsTable.colTableUsersBase
    }
  }
}
