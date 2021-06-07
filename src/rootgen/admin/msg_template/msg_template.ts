import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '../../../store/Modules/tools'
import { toolsext } from '../../../store/Modules/toolsext'
import { static_data } from '../../../db/static_data'
import { Screen } from 'quasar'

import { CImgText } from '../../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../../mixins/mixin-metatags'
import MixinBase from '@src/mixins/mixin-base'
import { colmsg_templates } from '../../../store/Modules/fieldsTable'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class Msgtemplate extends MixinMetaTags {
  public pagination = {
    sortBy: 'name',
    descending: false,
    page: 2,
    rowsPerPage: 5
    // rowsNumber: xx if getting data from a server
  }

  public selected = []
  public dataMsg_Templates = []

  public async mounted() {
    this.dataMsg_Templates = await GlobalStore.actions.GetMsgTemplates()
  }

  get getcolmsg_templates() {
    return colmsg_templates
  }

  public meta() {
    return tools.metafunc(this)
  }

  get static_data() {
    return static_data
  }
}
