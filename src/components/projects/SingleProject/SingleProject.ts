import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { Projects, UserStore } from '@modules'
import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { lists } from '../../../store/Modules/lists'

import { IProject, TipoVisu } from '../../../model/index'

import { SubMenusProj } from '../SubMenusProj'
import { CDate } from '../../CDate'

import { date } from 'quasar'
import { GlobalStore } from '@store'
import { RouteNames } from '@src/router/route-names'
import { shared_consts } from '@src/common/shared_vuejs'

@Component({
  components: { SubMenusProj, CDate },
  name: 'SingleProject'
})
export default class SingleProject extends Vue {
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

  get TipoVisu() {
    return TipoVisu
  }

  get getTipovisuByProjParent() {
    let myprojparent = Projects.getters.getRecordById(this.itemproject.id_parent)
    if (!myprojparent)
      myprojparent = this.itemproject
    return Projects.getters.getTipoVisuProj(myprojparent)
  }

  get getTipoViewByProjParent() {
    const myprojparent = Projects.getters.getRecordById(this.itemproject.id_parent)
    if (!myprojparent)
      return ''
    return myprojparent.view
  }

  @Prop({ required: true }) public itemproject: IProject

  @Watch('itemproject.enableExpiring')
  public valueChanged4() {
    this.watchupdate('enableExpiring')
  }

  @Watch('itemproject.expiring_at')
  public valueChanged2() {
    this.watchupdate('expiring_at')
  }

  @Watch('itemproject.descr')
  public valueChanged5() {
    this.precDescr = this.itemproject.descr
  }

  @Watch('itemproject.longdescr')
  public valueChangedlongdescr() {
    this.watchupdate('longdescr')
  }

  @Watch('itemproject.hoursplanned')
  public valueChangedhoursplanned() {
    this.watchupdate('hoursplanned')
  }

  @Watch('itemproject.themecolor')
  public valueChangedthemecolor() {
    this.watchupdate('themecolor')
  }

  @Watch('itemproject.pos')
  public valueChangedpos() {
    this.watchupdate('pos')
  }

  @Watch('itemproject.groupId')
  public valueChangedgroupId() {
    this.watchupdate('groupId')
  }

  @Watch('itemproject.respUsername')
  public valueChangedresp() {
    this.watchupdate('respUsername')
  }

  @Watch('itemproject.viceRespUsername')
  public valueChangedviceResp() {
    this.watchupdate('viceRespUsername')
  }

  @Watch('itemproject.vice2RespUsername')
  public valueChangedvice2Resp() {
    this.watchupdate('vice2RespUsername')
  }

  @Watch('itemproject.themebgcolor')
  public valueChangedthemebgcolor() {
    this.watchupdate('themebgcolor')
  }

  @Watch('itemproject.hoursworked')
  public valueChangedhoursworked() {
    this.watchupdate('hoursworked')
  }

  @Watch('itemproject.begin_development')
  public valueChangedbegin_development() {
    this.watchupdate('begin_development')
  }

  @Watch('itemproject.hoursweeky_plannedtowork')
  public valueChangedhoursweeky_plannedtowork() {
    this.watchupdate('hoursweeky_plannedtowork')
  }

  @Watch('itemproject.begin_test')
  public valueChangedbegin_test() {
    this.watchupdate('begin_test')
  }

  @Watch('itemproject.actualphase')
  public valueChangedactualphase() {
    this.watchupdate('actualphase')
  }

  @Watch('itemproject.privacyread')
  public valueChanged_privacyread() {
    this.watchupdate('privacyread')
  }

  @Watch('itemproject.privacywrite')
  public valueChanged_privacywrite() {
    this.watchupdate('privacywrite')
  }

  @Watch('itemproject.tipovisu')
  public valueChanged_tipovisu() {
    this.watchupdate('tipovisu')
  }

  @Watch('itemproject.totalphases')
  public valueChangedtotalphases() {
    this.watchupdate('totalphases')
  }

  @Watch('itemproject.progressCalc')
  public valueChanged6() {
    // console.log('itemproject.progressCalc')
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
    // console.log('watchupdate PROJ', field)
    this.$emit('eventupdateproj', { myitem: this.itemproject, field })
    this.updateicon()
  }

  public updateClasses() {
    // this.classCompleted = 'completed-item'
    this.classDescr = ''
    this.classDescrEdit = 'div_descr_edit donotdrag'
    if (!this.isProject()) {
      this.classDescr += ' titleLista-item'
      this.classDescrEdit += ' titleLista-item'
    }

    this.classDescr += ' text-' + this.itemproject.themecolor + ' bg-' + this.itemproject.themebgcolor
    this.classDescrEdit += ' text-' + this.itemproject.themecolor + ' bg-' + this.itemproject.themebgcolor

    this.percProgress = 'percProgress'

    this.classExpiring = 'data-item shadow-1 hide-if-small'
    this.classExpiringEx = ''

    this.clButtPopover = this.sel ? 'pos-item-popover comp_selected' : 'pos-item-popover'

    if (!!this.itemproject) {
      if (this.itemproject.statusproj !== tools.Status.COMPLETED) {
        this.clButtPopover += ' pos-item-popover_cursor'
      }

      if (this.itemproject.progressCalc > 100)
        this.itemproject.progressCalc = 100

      this.percentageProgress = this.itemproject.progressCalc

      this.colProgress = tools.getProgressColor(this.itemproject.progressCalc)
      this.percProgress += ' ' + tools.getProgressClassColor(this.itemproject.progressCalc)

    }

    if (this.isProject()) {
      this.menuPopupProj = tools.menuPopupProj[toolsext.getLocale()]
    }
    else {
      this.menuPopupProj = []
      this.menuPopupProj.push(tools.menuPopupProj[toolsext.getLocale()][tools.INDEX_MENU_DELETE])
    }

  }

  public created() {
    this.precDescr = this.itemproject.descr
    this.updateicon()

    this.updateClasses()

  }

  public getClassRow() {
    return 'row flex-container2 ' + this.classRow
  }

  public clickRiga(clickmenu: boolean = false) {
    // console.log('CLICK RIGA PROJ ************')

    // if (!this.sel) {

    if (!this.inEdit) {
      // console.log('entrato...')
      this.$emit('deselectAllRowstodo', null, false)
      this.$emit('deselectAllRowsproj', this.itemproject, true)

      // if (!this.sel) {
      this.selectRiga()
      // } else {
      //   this.$emit('deselectAllRowsproj', null, false, false, true)
      //   this.deselectRiga()
      // }
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

  public activeEdit() {
    // console.log('Attiva Edit')
    this.attivaEdit = true
    this.editProject()
  }

  get isMyProject() {
    return this.itemproject.userId === UserStore.state.my._id
  }

  get tipoProj() {
    const myarr = this.$route.name.split('.')
    if (myarr)
      return myarr[1]
    else
      return this.$route.name
  }

  get getrouteto() {
    return tools.getUrlByTipoProj(this.tipoProj) + this.itemproject._id
  }

  public goIntoTheProject() {
    this.$router.replace(tools.getUrlByTipoProj(this.tipoProj) + this.itemproject._id)
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
    }, 100)
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
      this.clickMenu(lists.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertProjectBottom', true)
          return
        })
    }

  }

  public keyDownArea(e) {
    // console.log('keyDownArea', e.keyCode, 'key', e.key)
    // console.log('precDescr', this.precDescr)
    // console.log('shiftKey', e.shiftKey)
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
      this.clickMenu(lists.MenuAction.DELETE)
        .then(() => {
          this.faiFocus('insertProjectBottom', true)
          return
        })
    }

    if (((e.key === 'Enter') || (e.key === 'Tab')) && !e.shiftKey) {
      // console.log('   updateTodo...')
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
    // console.log('this.itemproject.descr', this.itemproject.descr)
    // console.log('precDescr', this.precDescr)

    if (this.itemproject.descr === this.precDescr) {
      return
    }

    this.itemproject.descr = this.precDescr
    // console.log('updateTodo', this.precDescr, this.itemproject.descr)
    // console.log('itemproject', this.itemproject)
    // console.log('Prec:', this.itemprojectPrec)

    this.watchupdate('descr')
    this.inEdit = false
    this.attivaEdit = false
    // this.precDescr = this.itemproject.descr
    this.updateClasses()
  }

  public aggiornaProgress(value, initialval) {
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
    // console.log('calling this.$emit(eventupdateproj)', this.itemproject)
    this.$emit('eventupdateproj', { myitem: this.itemproject, field })
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
    // console.log('click menu: ', action)
    if (action === lists.MenuAction.DELETE) {
      return await this.askConfirmDelete()
    } else if (action === lists.MenuAction.TOGGLE_EXPIRING) {
      return await this.enableExpiring()
    } else if (action === lists.MenuAction.EDIT) {
      this.activeEdit()
    } else if (action === lists.MenuAction.CUT) {
      const myaction = {
        table: tools.projects,
        type: lists.MenuAction.CUT,
        _id: this.itemproject._id
      }
      return await Projects.actions.ActionCutPaste(myaction)
    } else if (action === 0) {
      this.deselectAndExitEdit()
    }

  }

  public selectSubMenu(action, elem) {
    if (action === lists.MenuAction.PRIORITY) {
      this.setPriority(elem)
    } else if (action === lists.MenuAction.THEME) {
      this.setThemeColor(elem, false)
    } else if (action === lists.MenuAction.THEMEBG) {
      this.setThemeColor(elem, true)
    }
  }

  public setThemeColor(newtheme, bg: boolean) {
    let changedfield = ''

    if (bg) {
      if (this.itemproject.themebgcolor !== newtheme) {
        this.itemproject.themebgcolor = newtheme
        changedfield = 'themebgcolor'
      }
    } else {
      if (this.itemproject.themecolor !== newtheme) {
        this.itemproject.themecolor = newtheme
        changedfield = 'themecolor'
      }
    }

    if (changedfield !== '') {
      this.updatedata(changedfield)

      this.updateicon()
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

    const msg = this.$t('dialog.msg.deleteTask', { mytodo: this.itemproject.descr })

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

  public getResp() {
    if (!!GlobalStore.state.resps)
      return this.itemproject.respUsername ? GlobalStore.getters.getRespByUsername(this.itemproject.respUsername) : ''
    else
      return ''
  }

  public getViceResp() {
    if (!!GlobalStore.state.resps)
      return this.itemproject.viceRespUsername ? GlobalStore.getters.getRespByUsername(this.itemproject.viceRespUsername) : ''
    else
      return ''
  }

  public getVice2Resp() {
    if (!!GlobalStore.state.resps)
      return this.itemproject.vice2RespUsername ? GlobalStore.getters.getRespByUsername(this.itemproject.vice2RespUsername) : ''
    else
      return ''
  }

}
