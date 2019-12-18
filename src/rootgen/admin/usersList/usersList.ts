import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { CGridTableRec } from '@components'
import { CMyPage } from '../../../components/CMyPage/index'
import { fieldsTable } from '@src/store/Modules/fieldsTable'

@Component({
  components: { CGridTableRec, CMyPage }
})

export default class UsersList extends Vue {

  get db_fieldsTable() {
    return fieldsTable
  }
}
