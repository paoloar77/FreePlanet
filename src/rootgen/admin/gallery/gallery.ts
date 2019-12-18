import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '../../../../../associazioneShen/src/store/Modules/tools'
import { static_data } from '../../../../../associazioneShen/src/db/static_data'
import { Screen } from 'quasar'

import { colgallery } from 'store/Modules/fieldsTable'

import { CImgText } from '../../../../../associazioneShen/src/components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../../../../associazioneShen/src/mixins/mixin-metatags'
import MixinBase from 'mixins/mixin-base'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner, CGridTableRec }
})
export default class Gallery extends Vue {

  get getcolgallery() {
    return colgallery
  }

  get static_data() {
    return static_data
  }
}
