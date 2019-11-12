import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IDiscipline } from '../../model'
import MixinBase from '../../mixins/mixin-base'

@Component({
  mixins: [MixinBase],
  name: 'CCardDiscipline'
})

export default class CCardDiscipline extends Vue {
  @Prop({ required: true }) public discipline: IDiscipline

  public getNextLesson(typol) {
    // Get next lesson
    return ''
  }
}
