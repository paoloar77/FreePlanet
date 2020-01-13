import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { static_data } from '../../../db/static_data'
import { Screen } from 'quasar'

import { colgallery } from '@src/store/Modules/fieldsTable'

import { CImgText } from '../../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinBase from '../../../mixins/mixin-base'

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
