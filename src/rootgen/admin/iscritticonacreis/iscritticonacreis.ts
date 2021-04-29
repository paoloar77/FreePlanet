import { Component, Prop } from 'vue-property-decorator'

import { tools } from '../../../store/Modules/tools'
import { static_data } from '../../../db/static_data'

import { colTableIscrittiConacreis } from '@src/store/Modules/fieldsTable'

import { CImgText } from '../../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../../mixins/mixin-metatags'
import MixinBase from '@src/mixins/mixin-base'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class SitesPage extends MixinMetaTags {
  public pagination = {
    sortBy: 'name',
    descending: false,
    page: 2,
    rowsPerPage: 5
    // rowsNumber: xx if getting data from a server
  }

  public selected = []
  public dataPages = []

  get getcolIscrittiConacreis() {
    return colTableIscrittiConacreis
  }

  public meta() {
    return tools.metafunc(this)
  }

  get static_data() {
    return static_data
  }
}
