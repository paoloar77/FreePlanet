import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { rescodes } from '../../../store/Modules/rescodes'
import { UserStore } from '@modules'

import { ITodo } from '../../../model/index'

@Component({
  name: 'SingleTodo'
})
export default class SingleTodo extends Vue {
  public selectPriority: [] = []
  public iconCompleted: string = ''
  public iconPriority: string = ''
  public popover: boolean = false
  $q: any

  @Prop({required: true}) itemtodo: ITodo

  @Watch('itemtodo.completed') valueChanged() {
    this.$emit('eventupdate', this.itemtodo)
  }
  @Watch('itemtodo.expiring_at') valueChanged2() {
    this.$emit('eventupdate', this.itemtodo)
  }
  @Watch('itemtodo.priority') valueChanged3() {
    this.$emit('eventupdate', this.itemtodo)
  }

  setCompleted () {
    // console.log('setCompleted')
    this.itemtodo.completed = !this.itemtodo.completed

    this.updateicon()

    this.updatedata()
  }

  updatedata() {
    this.$emit('eventupdate', this.itemtodo)
  }

  updateicon () {
    if (this.itemtodo.completed)
      this.iconCompleted = 'check_circle'
    else
      this.iconCompleted = 'check_circle_outline'


    if (this.itemtodo.priority === rescodes.Todos.PRIORITY_HIGH)
      this.iconPriority = 'expand_less'  // expand_less
    else if (this.itemtodo.priority === rescodes.Todos.PRIORITY_NORMAL)
      this.iconPriority = 'remove'
    else if (this.itemtodo.priority === rescodes.Todos.PRIORITY_LOW)
      this.iconPriority = 'expand_more'  // expand_more

  }

  created() {
    this.updateicon()

    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]

  }

  remove(id) {
    this.$emit('event', id)
  }

  setPriority (newpriority) {

    this.itemtodo.priority = newpriority

    this.updatedata()

    // this.$q.notify('setPriority: ' + elem)
  }
}
