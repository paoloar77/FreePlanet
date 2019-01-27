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
  public menuPopupTodo: [] = []
  public iconCompleted: string = ''
  public classCompleted: string = ''
  public classDescr: string = ''
  public classExpiring: string = ''
  public classExpiringEx: string = ''
  public iconPriority: string = ''
  public popover: boolean = false
  public popover_menu: boolean = false
  public classRow: string = ''
  public sel: boolean = false
  $q: any

  @Prop({ required: true }) itemtodo: ITodo


  @Watch('itemtodo.completed') valueChanged() {
    this.$emit('eventupdate', this.itemtodo)
    this.updateicon()
  }

  @Watch('itemtodo.expiring_at') valueChanged2() {
    this.$emit('eventupdate', this.itemtodo)
  }

  @Watch('itemtodo.priority') valueChanged3() {
    this.$emit('eventupdate', this.itemtodo)
    this.updateicon()
  }

  updateClasses() {
    this.classCompleted = 'priority-item-popover'
    this.classDescr = 'flex-item div_descr'
    this.classExpiring = 'flex-item data-item'
    this.classExpiringEx = ''
    if (this.itemtodo.completed) {
      this.classCompleted += ' icon_completed'
      this.classDescr += ' status_completed'
      this.classExpiring += ' status_completed'
      this.classExpiringEx += ' status_completed'
    }

  }

  created() {
    this.updateicon()

    this.updateClasses()

    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]
    this.menuPopupTodo = rescodes.menuPopupTodo[UserStore.state.lang]


  }

  getClassRow() {
    return 'row flex-container2 ' + this.classRow
  }

  clickRiga () {
    this.sel = false
    if (this.classRow !== 'rowselected') {
      this.sel = true
    } else {
      this.sel = false
    }
    this.$emit('click', this.itemtodo)

    this.classRow = 'rowselected'

    this.updateClasses()
  }

  mouseUp() {

    if (this.sel) {
      this.classRow = 'rowselected'
    } else {
      this.classRow = ''
    }

  }

  setCompleted() {
    // console.log('setCompleted')
    this.itemtodo.completed = !this.itemtodo.completed

    this.updateicon()

    this.updatedata()
  }

  updatedata() {
    console.log('calling this.$emit(eventupdate)')
    this.$emit('eventupdate', this.itemtodo)
  }

  updateicon() {
    console.log('updateicon')
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


  removeitem(id) {
    this.$emit('deleteitem', id)
  }

  clickMenu(action) {
    console.log('click menu: ', action)
    if (action === rescodes.MenuAction.DELETE)
      this.removeitem(this.itemtodo.id)
  }

  setPriority(newpriority) {

    this.itemtodo.priority = newpriority

    this.updatedata()

    this.updateicon()

    // this.$q.notify('setPriority: ' + elem)
  }
}
