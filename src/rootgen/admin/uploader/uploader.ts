import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { tools } from '../../../store/Modules/tools'
import { toolsext } from '../../../store/Modules/toolsext'
import { static_data } from '../../../db/static_data'
import { Screen } from 'quasar'

import { colmypage } from '../../../store/Modules/fieldsTable'

import { CImgText } from '../../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinBase from '../../../mixins/mixin-base'
import { IMyPage } from '../../../model/GlobalStore'
import Api from '@api'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner }
})
export default class Uploader extends Vue {

  get static_data() {
    return static_data
  }
}
