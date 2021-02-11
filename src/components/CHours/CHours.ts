import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { colTableHours } from '@src/store/Modules/fieldsTable'


import { CCard, CGridTableRec, CMyPage, CTitleBanner, CImgText } from '@components'

import MixinBase from '@src/mixins/mixin-base'
import { shared_consts } from '@src/common/shared_vuejs'
import { UserStore } from '@store'

@Component({
  name: 'CHours',
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class CHours extends MixinBase {

  @Prop({ required: true }) public todoId: string

  public pagination = {
    sortBy: 'descr',
    descending: false,
    page: 2,
    rowsPerPage: 5
    // rowsNumber: xx if getting data from a server
  }

  get extraparams() {
    return {
      lk_tab: 'users',
      lk_LF: 'userId',
      lk_FF: '_id',
      lk_as: 'user',
      lk_proj: {
        todoId: 1, userId: 1, descr: 1, date: 1, time_start: 1, time_end: 1, hours: 1,
        username: 1, name: 1, surname: 1
      }
    }
  }

  public arrfilterand = [
    {
      label: 'Tutte le ore',
      value: shared_consts.FILTER_HOURS_ALL
    }
  ]

  get myfilterdef() {
    return [shared_consts.FILTER_HOURS_MYLIST]
  }

  get myarrfilterand() {
    const myfiltrodef = {
      label: 'Mie Ore',
      value: shared_consts.FILTER_HOURS_MYLIST,
      hide: true,
      default: true
    }
    let myarr = []
    myarr.push(myfiltrodef)
    if (this.arrfilterand)
      myarr = [...myarr, ...this.arrfilterand]

    console.log('myarr', myarr)
    return myarr
  }

  public selected = []
  public dataPages = []

  get getcolHours() {
    return colTableHours
  }

  get defaultnewrec() {
    const myrec = {
      todoId: this.todoId,
      userId: UserStore.state.my._id,
      descr: ''
    }

    return myrec
  }

}
