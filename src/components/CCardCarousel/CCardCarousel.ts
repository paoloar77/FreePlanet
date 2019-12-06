import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { GlobalStore } from '../../store'
import { CCardDiscipline } from '../CCardDiscipline'
import { ICategory } from '../../model'
import MixinBase from '../../mixins/mixin-base'

@Component({
  name: 'CCardCarousel',
  mixins: [MixinBase],
  components: { CCardDiscipline }
})

export default class CCardCarousel extends Vue {
  @Prop({ required: true }) public myarr: []

  public slidedisc = 0

  get autoplaydisc() {
    return GlobalStore.state.autoplaydisc
  }

  set autoplaydisc(value) {
    GlobalStore.state.autoplaydisc = value
  }


}
