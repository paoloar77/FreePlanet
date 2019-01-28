import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { rescodes } from '../../../store/Modules/rescodes'
import { UserStore } from '@modules'

import { ITodo } from '../../../model/index'

import $ from 'jquery'

@Component({
  name: 'SingleTodo'
})
export default class SingleTodo extends Vue {
  public selectPriority: [] = []
  public menuPopupTodo: any[] = []
  public iconCompleted: string = ''
  public classCompleted: string = ''
  public classDescr: string = ''
  public classDescrEdit:string = ''
  public classExpiring: string = ''
  public classExpiringEx: string = ''
  public iconPriority: string = ''
  public popover: boolean = false
  public popover_menu: boolean = false
  public classRow: string = ''
  public sel: boolean = false
  public inEdit: boolean = false
  public descrtoEdit: string = ''
  $q: any

  @Prop({ required: true }) itemtodo: ITodo


  @Watch('itemtodo.completed') valueChanged() {
    this.watchupdate()
  }

  @Watch('itemtodo.enableExpiring') valueChanged4() {
    this.watchupdate()
  }

  @Watch('itemtodo.expiring_at') valueChanged2() {
    this.watchupdate()
  }

  @Watch('itemtodo.priority') valueChanged3() {
    this.watchupdate()
  }

  @Watch('itemtodo.descr') valueChanged5() {
    this.descrtoEdit = this.itemtodo.descr
  }

  isTodo () {
    return this.isTodoByElem(this.itemtodo)
  }

  isTodoByElem (elem) {
    return elem.descr.slice(-1) !== ':'
  }

  watchupdate() {
    this.$emit('eventupdate', this.itemtodo)
    this.updateicon()
  }

  updateClasses() {
    // this.classCompleted = 'completed-item'
    this.classCompleted = 'completed-item-popover'
    this.classDescr = 'flex-item div_descr'
    this.classDescrEdit = 'flex-item div_descr_edit'
    if (!this.isTodo())
      this.classDescr += ' titleLista-item'

    this.classExpiring = 'flex-item data-item'
    this.classExpiringEx = ''
    if (this.itemtodo.completed) {
      this.classCompleted += ' icon_completed'
      this.classDescr += ' status_completed'
      this.classExpiring += ' status_completed'
      this.classExpiringEx += ' status_completed'
    }

    if (this.inEdit) {
      this.classDescr += ' hide'
      this.classDescrEdit += ' show'
    } else {
      this.classDescrEdit += ' hide'
      this.classDescr += ' show'
    }

    // this.getinputdescr = 'inputdescr' + this.itemtodo.id

    console.log('classDescrEdit = ', this.classDescrEdit)
    console.log('classDescr', this.classDescr)

    if (this.isTodo())
      this.menuPopupTodo = rescodes.menuPopupTodo[UserStore.state.lang]
    else {
      this.menuPopupTodo = []
      this.menuPopupTodo.push(rescodes.menuPopupTodo[UserStore.state.lang][0])
    }

  }

  created() {
    this.updateicon()

    this.updateClasses()

    this.selectPriority = rescodes.selectPriority[UserStore.state.lang]


  }

  getClassRow() {
    return 'row flex-container2 ' + this.classRow
  }

  clickRiga () {
    console.log('CLICK RIGA ************')
    if (!this.inEdit) {
      this.$emit('deselectAllRows', this.itemtodo, true)

      if (!this.sel) {
        this.selectRiga()
      } else {
        this.deselectRiga()
      }
    }
  }

  selectRiga() {
    console.log('selectRiga', this.itemtodo.descr)
    this.sel = true
    this.classRow = 'rowselected'
    this.updateClasses()
    console.log('FINE selectRiga', this.itemtodo.descr)
  }

  deselectRiga() {
    console.log('DeselectRiga', this.itemtodo.descr)
    this.sel = false
    this.classRow = ''
    this.inEdit = false
    this.updateClasses()
  }

  deselectAndExitEdit () {
    this.deselectRiga()
    this.exitEdit()
  }

  mouseUp() {
    if (!this.inEdit) {
      if (this.sel) {
        this.selectRiga()
      } else {
        this.deselectRiga()
      }
    }
  }

  editTodo () {
    console.log('INIZIO - editTodo')
    this.$emit('click')
    this.inEdit = true
    if (!this.sel)
      this.selectRiga()
    else
      this.updateClasses()

    this.descrtoEdit = this.itemtodo.descr

    let theField = <HTMLInputElement>this.$refs.inputdescr
    theField.focus()
    console.log('focus()')

    console.log('FINE - editTodo')
  }

  exitEdit () {
    if (this.inEdit) {
      console.log('exitEdit')
      this.inEdit = false
      this.updateClasses
      this.$emit('deselectAllRows', this.itemtodo, false)
    }
  }


  updateTodo () {
    this.watchupdate()
    this.itemtodo.descr = this.descrtoEdit
    this.inEdit = false
    this.updateClasses()
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

    this.updateClasses()
  }


  removeitem(id) {
    this.$emit('deleteitem', id)
  }

  enableExpiring() {
    this.itemtodo.enableExpiring = !this.itemtodo.enableExpiring

  }

  clickMenu(action) {
    console.log('click menu: ', action)
    if (action === rescodes.MenuAction.DELETE) {
      this.removeitem(this.itemtodo.id)
    } else if (action === rescodes.MenuAction.TOGGLE_EXPIRING) {
      this.enableExpiring()
    }

  }

  setPriority(newpriority) {

    this.itemtodo.priority = newpriority

    this.updatedata()

    this.updateicon()

    // this.$q.notify('setPriority: ' + elem)
  }
}
