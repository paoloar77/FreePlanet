import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { CGridTableRec } from '@components'
import { CMyPage } from '../../../components/CMyPage/index'
import { fieldsTable } from '@src/store/Modules/fieldsTable'
import { shared_consts } from '@src/common/shared_vuejs'

@Component({
  components: { CGridTableRec, CMyPage }
})

export default class ExtraList extends Vue {

  public arrfilterand = [
    {
      label: 'Non Registrati',
      value: shared_consts.FILTER_EXTRALIST_NOT_REGISTERED
    },
    {
      label: 'Non Contattati',
      value: shared_consts.FILTER_EXTRALIST_NOT_CONTACTED
    },
    {
      label: 'Con Note',
      value: shared_consts.FILTER_EXTRALIST_WITH_NOTE
    }
  ]

  get db_fieldsTable() {
    return fieldsTable
  }


}
