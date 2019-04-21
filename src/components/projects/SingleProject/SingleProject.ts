import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { Projects, UserStore } from '@modules'
import { tools } from '../../../store/Modules/tools'

import { IProject } from '../../../model/index'

import { SubMenusProj } from '../SubMenusProj'
import { CDate } from '../../CDate'

import { date } from 'quasar'

@Component({
  components: { SubMenusProj, CDate },
  name: 'SingleProject'
})
export default class SingleProject extends Vue {
  public selectPriority: [] = []
  public menuPopupProj: any[] = []
  public classDescr: string = ''
  public classDescrEdit: string = ''
  public classExpiring: string = 'flex-item data-item shadow-1 hide-if-small'
  public classExpiringEx: string = ''
  public iconPriority: string = ''
  public classRow: string = ''
  public sel: boolean = false
  public attivaEdit: boolean = false
  public inEdit: boolean = false
  public precDescr: string = ''
  public percProgress: string = 'percProgress'
  public colProgress: string = 'blue'
  public percentageProgress: number = 0
  public itemprojectPrec: IProject
  public clButtPopover: string = 'pos-item-popover'

  public $q: any

  get tools() {
    return tools
  }

  get isDisable() {
    return !Projects.getters.getifCanISeeProj(this.itemproject)
  }

  get CanIModifyProject() {
    return Projects.getters.CanIModifyPanelPrivacy(this.itemproject)
  }

  @Prop({ required: true }) public itemproject: IProject

  @Watch('itemproject.enableExpiring') public valueChanged4() {
    this.watchupdate('enableExpiring')
  }

  @Watch('itemproject.expiring_at') public valueChanged2() {
    this.watchupdate('expiring_at')
  }

  @Watch('itemproject.descr') public valueChanged5() {
    this.precDescr = this.itemproject.descr
  }

  @Watch('itemproject.longdescr') public valueChangedlongdescr() {
    this.watchupdate('longdescr')
  }

  @Watch('itemproject.hoursplanned') public valueChangedhoursplanned() {
    this.watchupdate('hoursplanned')
  }
  @Watch('itemproject.hoursworked') public valueChangedhoursworked() {
    this.watchupdate('hoursworked')
  }
  @Watch('itemproject.begin_development') public valueChangedbegin_development() {
    this.watchupdate('begin_development')
  }
  @Watch('itemproject.hoursweeky_plannedtowork') public valueChangedhoursweeky_plannedtowork() {
    this.watchupdate('hoursweeky_plannedtowork')
  }
  @Watch('itemproject.begin_test') public valueChangedbegin_test() {
    this.watchupdate('begin_test')
  }
  @Watch('itemproject.actualphase') public valueChangedactualphase() {
    this.watchupdate('actualphase')
  }
  @Watch('itemproject.privacyread') public valueChanged_privacyread() {
    this.watchupdate('privacyread')
  }
  @Watch('itemproject.privacywrite') public valueChanged_privacywrite() {
    this.watchupdate('privacywrite')
  }
  @Watch('itemproject.totalphases') public valueChangedtotalphases() {
    this.watchupdate('totalphases')
  }
  @Watch('itemproject.progressCalc') public valueChanged6() {
    console.log('itemproject.progressCalc')
    this.updateClasses()

    // console.log('this.percentageProgress', this.percentageProgress, 'this.itemproject.progressCalc', this.itemproject.progressCalc)
    this.watchupdate('progressCalc')
  }

  get isMainProject() {
    return tools.isMainProject(this.itemproject.id_parent)
  }

  get getlabeltext() {
    if (this.isMainProject)
      return this.$t('proj.newproj')
    else
      return this.$t('proj.newsubproj')
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

  public isProject() {
    return this.isProjectByElem(this.itemproject)
  }

  public isProjectByElem(elem) {
    return elem.descr.slice(-1) !== ':'
  }

  public watchupdate(field = '') {
    console.log('watchupdate PROJ', field)
    this.$emit('eventupdateproj', {myitem: this.itemproject, field } )
    this.updateicon()
  }

  public updateClasses() {
    // this.classCompleted = 'completed-item'
    this.classDescr = 'flex-item div_descr show donotdrag'
    this.classDescrEdit = 'flex-item div_descr_edit donotdrag'
    if (!this.isProject()) {
      this.classDescr += ' titleLista-item'
      this.classDescrEdit += ' titleLista-item'
    }

    if (this.itemproject.progressCalc > 100)
      this.itemproject.progressCalc = 100

    this.classExpiring = 'flex-item data-item shadow-1 hide-if-small'
    this.classExpiringEx = ''

    this.percentageProgress = this.itemproject.progressCalc

    this.percProgress = 'percProgress'

    this.colProgress = tools.getProgressColor(this.itemproject.progressCalc)

    this.percProgress += ' ' + tools.getProgressClassColor(this.itemproject.progressCalc)

    this.clButtPopover = this.sel ? 'pos-item-popover comp_selected' : 'pos-item-popover'

    if (this.itemproject.statusproj !== tools.Status.COMPLETED) {
      this.clButtPopover += ' pos-item-popover_cursor'
    }

    if (this.isProject()) {
      this.menuPopupProj = tools.menuPopupProj[UserStore.state.lang]
    }
    else {
      this.menuPopupProj = []
      this.menuPopupProj.push(tools.menuPopupProj[UserStore.state.lang][tools.INDEX_MENU_DELETE])
    }

  }

  public created() {
    this.precDescr = this.itemproject.descr
    this.updateicon()

    this.updateClasses()

    this.selectPriority = tools.selectPriority[UserStore.state.lang]

  }

  public getClassRow() {
    return 'row flex-container2 ' + this.classRow
  }

  public clickRiga(clickmenu: boolean = false) {
    console.log('CLICK RIGA PROJ************')

    if (!this.sel) {
      if (!this.inEdit) {
        // this.attivaEdit = true
        this.$emit('deselectAllRowstodo', null, false)
        this.$emit('deselectAllRowsproj', this.itemproject, true)

        if (!this.sel) {
          this.selectRiga()
        } else {
          this.deselectRiga()
        }
      }
    }
  }

  public selectRiga() {
    // console.log('selectRiga', this.itemproject.descr)
    this.sel = true
    this.classRow = 'rowselected'
    this.updateClasses()
    // console.log('FINE selectRiga', this.itemproject.descr)
  }

  public deselectRiga() {
    // console.log('DeselectRiga', this.itemproject.descr)
    this.sel = false
    this.classRow = ''
    this.inEdit = false
    this.attivaEdit = false
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

  public clickProject() {
    this.$emit('idsel', this.itemproject._id)
    this.clickRiga()
  }

  public activeEdit(){
    console.log('Attiva Edit')
    this.attivaEdit = true
    this.editProject()
  }

  get isMyProject() {
    return this.itemproject.userId === UserStore.state.userId
  }

  get getrouteto() {
    return tools.getUrlByTipoProj(this.isMyProject) + this.itemproject._id
  }

  public goIntoTheProject() {
    this.$router.replace(tools.getUrlByTipoProj(this.isMyProject) + this.itemproject._id)
  }

  public editProject() {
    // console.log('INIZIO - editProject')
    if (this.attivaEdit) {
      // this.$emit('click')
      this.precDescr = this.itemproject.descr
      this.inEdit = true
      if (!this.sel) {
        this.selectRiga()
      }
      else {
        this.updateClasses()
      }

     this.faiFocus('inputprojdescr', false, true)
    }
    // console.log('FINE - editProject')
  }

  public faiFocus(elem, isparent: boolean = false, select: boolean = false) {
    setTimeout(() => {
      let theField = null
      if (isparent) {
        theField = this.$parent.$parent.$parent.$parent.$refs[elem] as HTMLInputElement
      }
      else {
        theField = this.$refs[elem] as HTMLInputElement
      }

      if (!!theField) {
        console.log('FOCUS PROJ', theField)
        theField.focus()
      }

      // console.log('focus()')
    }, 500)
  }

  public getFocus(e) {
    e.target.select()
  }

  public exitEdit(singola: boolean = false) {
    if (this.inEdit) {
      if (this.precDescr !== this.itemproject.descr) {
        this.updateTodo()
      }
      // console.log('exitEdit')
      this.inEdit = false
      this.attivaEdit = false
      this.updateClasses()
      this.$emit('deselectAllRowstodo', null, false, false)
      this.$emit('deselectAllRowsproj', this.itemproject, false, singola)
    }
  }

  public keyDownRow(e) {
    console.log('keyDownRow', e.keyCode)
    // Delete Key or Backspage
    if (((e.keyCode === 46)) && (this.precDescr === '') && !e.shiftKey) {
      e.preventDefault()
      this.deselectRiga()
      this.clickMenu(tools.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertProjectBottom', true)
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
    if (((e.keyCode === 46)) && (this.precDescr === '') && !e.shiftKey) {
      e.preventDefault()
      this.deselectRiga()
      this.clickMenu(tools.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertProjectBottom', true)
          return
        })
    }

    if (((e.key === 'Enter') || (e.key === 'Tab')) && !e.shiftKey) {
      this.updateTodo()

      if ((e.key === 'Tab') && !e.shiftKey) {

      } else {
        e.preventDefault()
        this.deselectRiga()
        this.faiFocus('insertProjectBottom', false)
      }
    }

    // console.log('keyDownArea', e)
    if (e.key === 'Escape') {
      this.deselectRiga()
      // this.faiFocus('insertProject', true)
      console.log('LOAD this.precDescr', this.precDescr)
      this.precDescr = this.itemproject.descr
    }

  }

  public updateTodo() {
    if (this.itemproject.descr === this.precDescr) {
      return
    }

    this.itemproject.descr = this.precDescr
    console.log('updateTodo', this.precDescr, this.itemproject.descr)
    console.log('itemproject', this.itemproject)
    console.log('Prec:', this.itemprojectPrec)

    this.watchupdate('descr')
    this.inEdit = false
    this.attivaEdit = false
    // this.precDescr = this.itemproject.descr
    this.updateClasses()
  }

  public aggiornaProgress(value, initialval){
    if (value !== initialval) {
      this.itemproject.progressCalc = value
      this.updatedata('progressCalc')
      this.deselectAndExitEdit()
    }
  }

  public setCompleted() {
    // console.log('setCompleted')

    if (this.itemproject.statusproj === tools.Status.COMPLETED) {
      this.itemproject.statusproj = tools.Status.OPENED
    } else {
      this.itemproject.statusproj = tools.Status.COMPLETED
    }

    this.updateicon()

    this.deselectAndExitEdit()
  }

  public updatedata(field: string) {
    // const myitem = tools.jsonCopy(this.itemproject)
    console.log('calling this.$emit(eventupdateproj)', this.itemproject)
    this.$emit('eventupdateproj', { myitem: this.itemproject, field } )
  }

  public updateicon() {
    // console.log('updateicon')

    if (this.itemproject.priority === tools.Priority.PRIORITY_HIGH) {
      this.iconPriority = 'expand_less'
    }  // expand_less
    else if (this.itemproject.priority === tools.Priority.PRIORITY_NORMAL) {
      this.iconPriority = 'remove'
 }
    else if (this.itemproject.priority === tools.Priority.PRIORITY_LOW) {
      this.iconPriority = 'expand_more'
 }  // expand_more

    this.updateClasses()
  }

  public removeitem(id) {
    this.$emit('deleteItemproj', id)
  }

  public enableExpiring() {
    this.itemproject.enableExpiring = !this.itemproject.enableExpiring

  }

  public async clickMenu(action) {
    console.log('click menu: ', action)
    if (action === tools.MenuAction.DELETE) {
      return await this.askConfirmDelete()
    } else if (action === tools.MenuAction.TOGGLE_EXPIRING) {
      return await this.enableExpiring()
    } else if (action === tools.MenuAction.EDIT) {
      this.activeEdit()
    } else if (action === 0) {
      this.deselectAndExitEdit()
    }

  }

  public setPriority(newpriority) {

    if (this.itemproject.priority !== newpriority) {
      this.itemproject.priority = newpriority

      this.updatedata('priority')

      this.updateicon()
    }

  }

  public async askConfirmDelete() {
    const deletestr = this.$t('dialog.delete')
    const cancelstr = this.$t('dialog.cancel')

    const msg = this.$t('dialog.msg.deleteTask', {mytodo : this.itemproject.descr })

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
      this.removeitem(this.itemproject._id)
    }).onCancel(() => {
      console.log('CANCEL')
    })

    /*
        // return await askConfirm(this.$q, this.$t('dialog.msg.titledeleteTask'), msg, deletestr, cancelstr)
          .then((ris) => {
            console.log('ris', ris)
            if (ris) {
              this.removeitem(this.itemproject._id)
            }
          }).catch((err) => {

        })
    */
  }

}
