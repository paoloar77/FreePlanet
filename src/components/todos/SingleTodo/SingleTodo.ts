import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { UserStore } from '@modules'
import { tools } from '../../../store/Modules/tools'

import { ITodo } from '../../../model/index'

import { SubMenus } from '../SubMenus'

import { date } from 'quasar'
import { askConfirm } from '../../../classes/routinestd'
import { CDate } from '../../CDate'

@Component({
  components: { SubMenus, CDate },
  name: 'SingleTodo'
})
export default class SingleTodo extends Vue {
  public selectPriority: [] = []
  public menuPopupTodo: any[] = []
  public iconCompleted: string = ''
  public classCompleted: string = ''
  public classDescr: string = ''
  public classDescrEdit: string = ''
  public classExpiring: string = 'flex-item data-item shadow-1 hide-if-small'
  public classExpiringEx: string = ''
  public classMenuBtn: string = 'flex-item pos-item'
  public iconPriority: string = ''
  public popover: boolean = false
  public popover_menu: boolean = false  // Serve
  public classRow: string = ''
  public sel: boolean = false
  public inEdit: boolean = false
  public precDescr: string = ''
  public menuProgress: string = 'menuprogress'
  public percProgress: string = 'percProgress'
  public colProgress: string = 'blue'
  public togglemenu: boolean = false
  public percentageProgress: number = 0
  public itemtodoPrec: ITodo
  public clButtPopover: string = 'pos-item-popover'
  public numpos: number = 0

  public $q: any

  get tools() {
    return tools
  }

  @Prop({ required: true }) public itemtodo: ITodo
  @Prop({ required: false, default: true }) public CanIModifyTodo: boolean

  @Watch('itemtodo.enableExpiring') public valueChanged4() {
    this.watchupdate('enableExpiring')
  }

  @Watch('itemtodo.expiring_at') public valueChanged2() {
    this.watchupdate('expiring_at')
  }

  // @Watch('itemtodo.priority') valueChanged3() {
  //   this.watchupdate('priority')
  // }

  @Watch('itemtodo.descr') public valueChanged5() {
    this.precDescr = this.itemtodo.descr
    this.watchupdate('descr')
  }

  @Watch('itemtodo.hoursplanned') public valueChangedhoursplanned() {
    console.log('itemtodo.hoursplanned', this.itemtodo.hoursplanned)
    this.watchupdate('hoursplanned')
  }
  @Watch('itemtodo.statustodo') public valueChangedstatus() {
    console.log('itemtodo.statustodo', this.itemtodo.statustodo)
    this.watchupdate('statustodo')
  }
  @Watch('itemtodo.completed_at') public valueChangedcompleted_at() {
    console.log('itemtodo.completed_at', this.itemtodo.completed_at)
    this.watchupdate('completed_at')
  }
  @Watch('itemtodo.hoursworked') public valueChangedhoursworked() {
    console.log('itemtodo.hoursworked', this.itemtodo.hoursworked)
    this.watchupdate('hoursworked')
  }
  @Watch('itemtodo.start_date') public valueChangedstart_date() {
    this.watchupdate('start_date')
  }
  @Watch('itemtodo.assigned_to_userId') public valueChangedend_assigned_to_userId() {
    this.watchupdate('assigned_to_userId')
  }
  @Watch('itemtodo.phase') public valueChangedend_phase() {
    this.watchupdate('phase')
  }

  @Watch('itemtodo.progress') public valueChanged6() {
    console.log('itemtodo.progress')
    this.updateClasses()

    console.log('this.percentageProgress', this.percentageProgress, 'this.itemtodo.progress', this.itemtodo.progress)
    this.watchupdate('progress')
  }

/*
  public dateToYYYYMMDD(date) {
    // may have timezone caveats https://stackoverflow.com/a/29774197/1850609
    return date && date.toISOString().split('T')[0]
  }
*/

  // Computed:
  get isSel() {
    return this.sel
  }

  public isTodo() {
    return this.isTodoByElem(this.itemtodo)
  }

  public isTodoByElem(elem) {
    return elem.descr.slice(-1) !== ':'
  }

  public watchupdate(field = '') {
    console.log('watchupdate', field)
    this.$emit('eventupdate', {myitem: this.itemtodo, field } )
    this.updateicon()
  }

  public updateClasses() {
    // this.classCompleted = 'completed-item'
    this.classCompleted = 'completed-item-popover'
    this.classDescr = 'flex-item div_descr show donotdrag'
    this.classDescrEdit = 'flex-item div_descr_edit donotdrag'
    if (!this.isTodo()) {
      this.classDescr += ' titleLista-item'
      this.classDescrEdit += ' titleLista-item'
    }

    if (this.itemtodo.progress > 100)
      this.itemtodo.progress = 100

    this.classExpiring = 'flex-item data-item shadow-1 hide-if-small'
    this.classMenuBtn = 'flex-item pos-item'
    if (!this.CanIModifyTodo)
      this.classMenuBtn += ' donotdrag'

    this.classExpiringEx = ''
    if (this.itemtodo.statustodo === tools.Status.COMPLETED) {
      this.percentageProgress = 100
      this.classCompleted += ' icon_completed'
      this.classDescr += ' status_completed'
      this.classDescrEdit += ' status_completed'
      this.classExpiring += ' status_completed'
      this.classExpiringEx += ' status_completed'
    } else {
      this.percentageProgress = this.itemtodo.progress
    }

    this.menuProgress = 'menuProgress'
    this.percProgress = 'percProgress'

    let mycolcl = ' ' + tools.getProgressClassColor(this.itemtodo.progress)
    this.colProgress = tools.getProgressColor(this.itemtodo.progress)

    if (this.itemtodo.statustodo === tools.Status.COMPLETED) {
      mycolcl = ' percompleted'
      this.colProgress = 'gray'
    }

    this.colProgress = tools.getProgressColor(this.itemtodo.progress)

    this.menuProgress += mycolcl
    this.percProgress += mycolcl

    this.clButtPopover = this.sel ? 'pos-item-popover comp_selected' : 'pos-item-popover'

    if (this.itemtodo.statustodo !== tools.Status.COMPLETED) {
      if (this.CanIModifyTodo) {
        this.clButtPopover += ' pos-item-popover_cursor'
      }
    }

    if (this.isTodo()) {
      this.menuPopupTodo = tools.menuPopupTodo[UserStore.state.lang]
    }
    else {
      this.menuPopupTodo = []
      this.menuPopupTodo.push(tools.menuPopupTodo[UserStore.state.lang][tools.INDEX_MENU_DELETE])
    }

  }

  public created() {
    this.precDescr = this.itemtodo.descr
    this.updateicon()

    this.updateClasses()

    this.selectPriority = tools.selectPriority[UserStore.state.lang]

  }

  public getClassRow() {
    return 'row flex-container2 ' + this.classRow
  }

  public clickRiga(clickmenu: boolean = false) {
    // console.log('CLICK RIGA ************')

    if (!this.sel) {
      if (!this.inEdit) {
        this.$emit('deselectAllRowsproj', null, false, false)
        this.$emit('deselectAllRowstodo', this.itemtodo, true)

        if (!this.sel) {
          this.selectRiga()
        } else {
          this.deselectRiga()
        }
      }
    }
  }

  public selectRiga() {
    // console.log('selectRiga', this.itemtodo.descr)
    this.sel = true
    this.classRow = 'rowselected'
    this.updateClasses()
    // console.log('FINE selectRiga', this.itemtodo.descr)
  }

  public deselectRiga() {
    // console.log('DeselectRiga', this.itemtodo.descr)
    this.sel = false
    this.classRow = ''
    this.inEdit = false
    this.updateClasses()
  }

  public deselectAndExitEdit() {
    this.deselectRiga()
    this.exitEdit()
  }

  public mouseUp() {
    if (!this.inEdit) {
      if (this.sel) {
        this.selectRiga()
      } else {
        this.deselectRiga()
      }
    }
  }

  public clickRow() {
    this.$emit('setitemsel', null)
    this.$emit('setitemsel', this.itemtodo)
    this.clickRiga()
  }

  public editTodo() {
    if (this.itemtodo.statustodo !== tools.Status.COMPLETED) {
      // console.log('INIZIO - editTodo')
      this.$emit('click')
      this.precDescr = this.itemtodo.descr
      this.inEdit = true
      if (!this.sel) {
        this.selectRiga()
      }
      else {
        this.updateClasses()
      }

      this.faiFocus('inputdescr')
    }
    // console.log('FINE - editTodo')
  }

  public faiFocus(elem, isparent: boolean = false) {
    setTimeout(() => {
      let theField = null
      if (isparent) {
        theField = this.$parent.$parent.$parent.$parent.$refs[elem] as HTMLInputElement
      }
      else {
        theField = this.$refs[elem] as HTMLInputElement
      }

      if (!!theField) {
        console.log('FOCUS TODO', theField)
        theField.focus()
      }
      // console.log('focus()')
    }, 300)
  }

  public exitEdit(singola: boolean = false) {
    if (this.inEdit) {
      if (this.precDescr !== this.itemtodo.descr) {
        this.updateTodo()
      }
      // console.log('exitEdit')
      this.inEdit = false
      this.updateClasses()
      this.$emit('deselectAllRowsproj', null, false, false)
      this.$emit('deselectAllRowstodo', this.itemtodo, false, singola)
    }
  }

  public keyDownRow(e) {
    console.log('keyDownRow')
    // Delete Key or Backspage
    if (((e.keyCode === 8) || (e.keyCode === 46)) && (this.precDescr === '') && !e.shiftKey) {
      e.preventDefault()
      this.deselectRiga()
      this.clickMenu(tools.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertTask', true)
          return
        })
    }

  }

  public keyDownArea(e) {
    console.log('keyDownArea')
/*
    if ((e.key === 'ArrowUp') && !e.shiftKey) {
      e.key = 'Tab'
      e.shiftKey = true
    }

    if ((e.key === 'ArrowDown') && !e.shiftKey) {
      let nextInput = inputs.get(inputs.index(this) + 1)
      if (nextInput) {
        nextInput.focus()
      }
    }
*/
    // Delete Key or Backspage
    if (((e.keyCode === 8) || (e.keyCode === 46)) && (this.precDescr === '') && !e.shiftKey) {
      e.preventDefault()
      this.deselectRiga()
      this.clickMenu(tools.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertTask', true)
          return
        })
    }

    if (((e.key === 'Enter') || (e.key === 'Tab')) && !e.shiftKey) {
      this.updateTodo()

      if ((e.key === 'Tab') && !e.shiftKey) {

      } else {
        e.preventDefault()
        this.deselectRiga()
        this.faiFocus('insertTask', false)
      }
    }

    // console.log('keyDownArea', e)
    if (e.key === 'Escape') {
      this.deselectRiga()
      // this.faiFocus('insertTask', true)
      console.log('LOAD this.precDescr', this.precDescr)
      this.precDescr = this.itemtodo.descr
    }

  }

  public updateTodo() {
    if (this.itemtodo.descr === this.precDescr) {
      return
    }

    this.itemtodo.descr = this.precDescr
    console.log('updateTodo', this.precDescr, this.itemtodo.descr)
    console.log('itemtodo', this.itemtodo)
    console.log('Prec:', this.itemtodoPrec)

    this.watchupdate('descr')
    this.inEdit = false
    // this.precDescr = this.itemtodo.descr
    this.updateClasses()
  }

  public aggiornaProgress(value, initialval) {
    if (value !== initialval) {
      this.itemtodo.progress = parseInt(value, 10)
      this.updatedata('progress')
      this.deselectAndExitEdit()
    }
  }

  public setCompleted() {
    if (!this.CanIModifyTodo)
      return false

    // console.log('setCompleted')
    if (this.itemtodo.statustodo === tools.Status.COMPLETED) {
      this.itemtodo.statustodo = tools.Status.OPENED
    } else {
      this.itemtodo.statustodo = tools.Status.COMPLETED
    }
    this.itemtodo.progress = 100

    this.watchupdate('statustodo')

    this.deselectAndExitEdit()
  }

  public updatedata(field: string) {
    // const myitem = tools.jsonCopy(this.itemtodo)
    console.log('calling this.$emit(eventupdate)', this.itemtodo)
    this.$emit('eventupdate', { myitem: this.itemtodo, field } )
  }

  public updateicon() {
    // console.log('updateicon')
    if (this.itemtodo.statustodo === tools.Status.COMPLETED) {
      this.iconCompleted = 'check_circle'
    }
    else {
      this.iconCompleted = 'check_circle_outline'
    }

    if (this.itemtodo.priority === tools.Priority.PRIORITY_HIGH) {
      this.iconPriority = 'expand_less'
    }  // expand_less
    else if (this.itemtodo.priority === tools.Priority.PRIORITY_NORMAL) {
      this.iconPriority = 'remove'
 }
    else if (this.itemtodo.priority === tools.Priority.PRIORITY_LOW) {
      this.iconPriority = 'expand_more'
 }  // expand_more

    this.updateClasses()
  }

  public removeitem(id) {
    this.$emit('deleteItemtodo', id)
  }

  public enableExpiring() {
    this.itemtodo.enableExpiring = !this.itemtodo.enableExpiring

  }

  public async clickMenu(action) {
    console.log('click menu: ', action)
    if (action === tools.MenuAction.DELETE) {
      return await this.askConfirmDelete()
    } else if (action === tools.MenuAction.TOGGLE_EXPIRING) {
      return await this.enableExpiring()
    } else if (action === tools.MenuAction.COMPLETED) {
      return await this.setCompleted()
    } else if (action === tools.MenuAction.PROGRESS_BAR) {
      return await this.updatedata('progress')
    } else if (action === 0) {
      this.deselectAndExitEdit()
    }

  }

  public setPriority(newpriority) {

    if (this.itemtodo.priority !== newpriority) {
      this.itemtodo.priority = newpriority

      this.updatedata('priority')

      this.updateicon()
    }

  }

  public async askConfirmDelete() {
    const deletestr = this.$t('dialog.delete')
    const cancelstr = this.$t('dialog.cancel')

    const msg = this.$t('dialog.msg.deleteTask', {mytodo : this.itemtodo.descr })

    this.$q.dialog({
      cancel: {
        label: cancelstr
      },
      message: msg,
      ok: {
        label: deletestr,
        push: true
      },
      title: this.$t('dialog.msg.titledeleteTask')
    }).onOk(() => {
      console.log('OK')
      this.removeitem(this.itemtodo._id)
    }).onCancel(() => {
      console.log('CANCEL')
    })

    /*
        // return await askConfirm(this.$q, this.$t('dialog.msg.titledeleteTask'), msg, deletestr, cancelstr)
          .then((ris) => {
            console.log('ris', ris)
            if (ris) {
              this.removeitem(this.itemtodo._id)
            }
          }).catch((err) => {

        })
    */
  }

}
