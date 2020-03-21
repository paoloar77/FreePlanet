import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { tools } from '../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { IDiscipline, IEvents } from '../../model'
import MixinBase from '../../mixins/mixin-base'
import MixinOperator from '../../mixins/mixin-operator'
import MixinUsers from '../../mixins/mixin-users'
import { CMyTeacher } from '../CMyTeacher'
import { CalendarStore } from '../../store/Modules'

@Component({
  mixins: [MixinBase, MixinOperator, MixinUsers],
  name: 'CCardDiscipline',
  components: { CMyTeacher }
})

export default class CCardDiscipline extends MixinBase {
  @Prop({ required: true }) public discipline: IDiscipline
  @Prop({ required: false, default: '' }) public mystyle: string
  @Prop({ required: false, default: false }) public autoplay: boolean

  public nextlesson: IEvents

  @Watch('discipline')
  public disciplinechanged(value) {
    this.nextlesson = this.getNextLesson(value.typol_code)
    // console.log('nextlesson', this.nextlesson)
  }

  public getNextLesson(typol) {
    // Get next lesson
    const datenow = tools.addDays(tools.getDateNow(), -1)
    return CalendarStore.state.eventlist.find((myevent) => (myevent.typol === typol) && (new Date(myevent.dateTimeEnd) >= datenow))
    // return CalendarStore.state.eventlist.find((myevent) => (myevent.typol === typol))
  }

  public ExistLesson() {
    return !!this.nextlesson
  }

  public NextEventDate() {
    return tools.getstrDateTimeEventSimple(this, this.nextlesson)
  }

  get getLinkEvent() {
    return `event/${this.nextlesson.typol}/${this.nextlesson._id}`
  }

  public created() {
    this.disciplinechanged(this.discipline)
  }

}
