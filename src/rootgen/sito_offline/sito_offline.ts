import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GlobalStore, UserStore } from '@store'

import { Screen } from 'quasar'

import { colmypage } from '../../store/Modules/fieldsTable'

import { CImgText } from '../../components/CImgText/index'
import { CCard, CGridTableRec, CMyPage, CTitleBanner } from '@components'
import MixinMetaTags from '../../mixins/mixin-metatags'
import MixinBase from '../../mixins/mixin-base'

@Component({
  mixins: [MixinBase],
  components: { CImgText, CCard, CMyPage, CTitleBanner }
})
export default class Sito_offline extends MixinMetaTags {
}
