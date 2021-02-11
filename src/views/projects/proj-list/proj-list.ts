import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IAction, IDrag, IProject, IProjectsState, ITodo, Privacy, TypeProj } from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { tools } from '../../../store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'
import { lists } from '../../../store/Modules/lists'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects, Todos } from '@store'

import { Getter } from 'vuex-class'

import { date, Screen } from 'quasar'
import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'
import { CMyFieldDb } from '../../../components/CMyFieldDb'
import { CHours } from '../../../components/CHours'

const namespace: string = 'Projects'

@Component({

  components: { SingleProject, CProgress, CTodo, CDate, CMyFieldDb, CHours },
  filters: {
    capitalize(value) {
      if (!value) {
        return ''
      }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})

export default class ProjList extends Vue {

  public tabproj: string = 'lista'

  get classTitle() {
    let cl = 'flex-item categorytitle shadow-4'
    if (!!this.itemprojparent) {
      cl += ' text-' + this.itemprojparent.themecolor + ' bg-' + this.itemprojparent.themebgcolor
    } else {
      cl += ' text-black' + ' bg-light-blue'
    }
    return cl
  }

  get classTitleTodoSel() {
    let cl = 'flex-item shadow-4'
    if (!!this.itemtodosel) {
      cl += ' text-' + this.itemtodosel.themecolor + ' bg-' + this.itemtodosel.themebgcolor
    } else {
      cl += ' text-black' + ' bg-light-blue'
    }
    return cl
  }

  get classTitleProjSel() {
    let cl = 'flex-item categorytitle shadow-4'
    if (!!this.itemselproj) {
      cl += ' text-' + this.itemselproj.themecolor + ' bg-' + this.itemselproj.themebgcolor
    } else {
      cl += ' text-black' + ' bg-light-blue'
    }

    if (!tools.isMobile())
      cl += ' full-width '
    return cl
  }

  get tipoProj() {
    // console.log('this.$route.name', this.$route.name)
    const myarr = this.$route.name.split('.')
    if (myarr)
      return myarr[1]
    else
      return this.$route.name
  }

  get readonly_PanelPrivacy() {
    return !this.CanIModifyPanelPrivacy
  }

  get readonly_PanelPrivacySel() {
    return !this.CanIModifyPanelPrivacySel || this.readonly
  }

  get CanISeeProject() {
    return Projects.getters.getifCanISeeProj(this.itemproj)
  }

  get CanISeeProjectParent() {
    return Projects.getters.getifCanISeeProj(this.itemprojparent)
  }

  get CanISeeProjectSel() {
    return Projects.getters.getifCanISeeProj(this.itemselproj)
  }

  get CanIModifyPanelPrivacy() {
    return Projects.getters.CanIModifyPanelPrivacy(this.itemproj)
  }

  get CanIModifyPanelPrivacySel() {
    return Projects.getters.CanIModifyPanelPrivacy(this.itemselproj)
  }

  get getrouteup() {
    return tools.getUrlByTipoProj(this.tipoProj) + this.itemproj.id_parent
  }

  get tools() {
    return tools
  }

  get showtype() {
    return Projects.state.showtype
  }

  set showtype(value) {
    // console.log('showtype', value)
    GlobalStore.mutations.setShowType(value)
  }

  get isRootProject() {
    return this.idProjAtt === process.env.PROJECT_ID_MAIN
  }

  get getIdParent() {
    if (!!this.itemproj)
      return this.itemproj.id_parent
    else
      return ''
  }

  get isMainProject() {
    return tools.isMainProject(this.idProjAtt)
  }

  get menuPopupConfigProject() {
    let mymenu = null
    if (this.isMainProject)
      mymenu = tools.menuPopupConfigMAINProject[toolsext.getLocale()]
    else
      mymenu = tools.menuPopupConfigProject[toolsext.getLocale()]

    if (mymenu.length > 0)
      mymenu[0].disable = !(GlobalStore.state.lastaction.type === lists.MenuAction.CUT)

    return mymenu
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[toolsext.getLocale()]
  }

  get descrProject() {
    return Projects.getters.getDescrById(this.idProjAtt)
  }

  get getCalcHoursWorked() {

    if (this.itemselproj.hoursplanned <= 0) {
      return 0
    }
    return Math.round(this.itemselproj.hoursworked / this.itemselproj.hoursplanned * 100)

  }

  get getCalcHoursLeft() {

    if (this.itemselproj.hoursleft <= 0) {
      return 0
    }
    return Math.round(this.itemselproj.hoursworked / this.itemselproj.hoursleft * 100)

  }

  get calcprogressWeekly() {

    if (this.itemselproj.hoursplanned <= 0) {
      return 0
    }
    return Math.round(this.itemselproj.hoursworked / this.itemselproj.hoursplanned * 100)
  }

  get calcEndWork_Estimate() {
    if (date.isValid(this.itemselproj.begin_development) && (this.itemselproj.hoursweeky_plannedtowork > 0)) {
      const hoursw = this.itemselproj.hoursweeky_plannedtowork

      try {

        // let orerimaste = this.itemselproj.hoursplanned - this.itemselproj.hoursworked
        let orerimaste = this.itemselproj.hoursleft
        if (orerimaste < 0) {
          orerimaste = 0
        }

        const weeks = orerimaste / hoursw
        const days = Math.round(weeks * 7)

        let mydate = this.itemselproj.begin_development
        const datenow = tools.getDateNow()
        // if begin is in the past, take the day now
        if (date.getDateDiff(mydate, datenow) < 0) {
          mydate = datenow
        }
        // console.log('mydate', mydate)
        this.itemselproj.endwork_estimate = date.addToDate(mydate, { days })

        // console.log('   days', days, 'weeks', weeks, 'orerimaste', orerimaste, 'dateestimated', this.itemselproj.endwork_estimate)

        return this.itemselproj.endwork_estimate
      } catch (e) {
        this.itemselproj.endwork_estimate = tools.getDateNull()
      }

      return tools.getDateNull()

    } else {
      return tools.getDateNull()
    }
  }

  get getCalcTodoHoursWorked() {
    if (this.itemtodosel.hoursplanned <= 0) {
      return 0
    }
    const myperc = Math.round(this.itemtodosel.hoursworked / this.itemtodosel.hoursplanned * 100)

    return myperc

  }

  get isHorizontal() {
    return (Screen.width < 600)
  }

  get myStyle() {
    if (this.isHorizontal)
      return 'height: 600px'
    else
      return ''
  }

  public $q: any
  public projbottom: string = ''
  public prova: string = ''
  public provatr: string = ''
  public polling = null
  public service: any
  public scrollable = true
  public dragname: string = 'second'
  public idProjAtt: string = process.env.PROJECT_ID_MAIN
  public splitterModel = 50 // start at 50%
  public itemproj: IProject = null
  public itemprojparent: IProject = null
  public idsel: string = ''
  public itemselproj: IProject = Projects.getters.getRecordEmpty()
  public itemtodosel: ITodo = Todos.getters.getRecordEmpty()
  public whatisSel: number = 0
  public colProgress: string = 'blue'
  public percProgress: string = 'percProgress'
  public readonly: boolean = false

  public selectStatus: any[] = tools.selectStatus[toolsext.getLocale()]
  public selectPhase: any[] = tools.selectPhase[toolsext.getLocale()]
  public selectPrivacy: any[] = tools.selectPrivacy[toolsext.getLocale()]
  public selectGroup: any[] = []
  public selectResp: any[] = []
  public selectWorkers: any[] = []

  public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }

  @Getter('projs_dacompletare', { namespace })
  public projs_dacompletare: (state: IProjectsState, id_parent: string, tipoproj: string) => IProject[]

  // @Watch('projs_dacompletare')
  // public changeitems() {
  //   this.updateindexProj()
  // }

  @Watch('$route.name')
  public changename() {

    // console.log('tools.getUrlByTipoProj(this.tipoProj)', tools.getUrlByTipoProj(this.tipoProj))
    this.changeparent()
  }

  @Watch('$route.params.idProj')
  public changeparent() {
    // console.log('this.$route.params.idProj', this.$route.params)
    this.idProjAtt = this.$route.params.idProj
    this.updateindexProj()
    this.selproj()
  }

  @Watch('itemselproj.progressCalc')
  public changeprogress() {
    this.updateclasses()
  }

  @Watch('itemselproj._id')
  public changeidproj() {
    this.aggiornastat()
  }

  @Watch('tabproj')
  public changetabproj() {
    this.aggiornastat()
  }

  @Watch('itemtodosel._id')
  public changeidtodo() {
    this.aggiornastat()
  }

  public aggiornastat() {
    if (this.tabproj === 'stat') {
      if (!!this.itemselproj) {
        Projects.actions.calculateHoursProjects({
          projId: this.itemselproj._id,
          actualphase: this.itemselproj.actualphase
        })
          .then((rec) => {
            if (rec) {
              this.itemselproj.hoursworked = rec.hoursworked
            }
          })
      } else if (!!this.itemtodosel) {
        Todos.actions.calculateHoursTodo({ todoId: this.itemtodosel._id })
          .then((rec) => {
            if (rec) {
              this.itemtodosel.hoursworked = rec.hoursworked
            }
          })

      }
    }
  }

  public keyDownArea(e) {
    // console.log('keyDownArea')
  }

  // I use this because the statustodo will disappear from the UI, so it won't call the status changed...
  // in this case I need to call manually the modify.
  public modifyfieldtodo(field) {
    // console.log('modifyfieldtodo', field)
    Todos.actions.modify({ myitem: this.itemtodosel, field })
  }

  public selproj() {
    this.deselectAllRowsproj(null, false, false)
    this.deselectAllRowstodo(null, false, false)
    this.setidsel(this.idProjAtt)
  }

  public showTask(field_value) {
    return field_value === lists.MenuAction.SHOW_TASK
  }

  public async onEndproj(itemdragend) {
    // console.log('onEndproj...')
    await Projects.actions.swapElems(itemdragend)
  }

  public created() {
    const service = this.$dragula.$service
    tools.dragula_option(service, this.dragname)

    this.updateclasses()

    service.eventBus.$on('dragend', (args) => {

      // console.log('args proj-list', args)
      if (args.name === this.dragname) {
        const itemdragend: IDrag = {
          field: '',
          id_proj: this.idProjAtt,
          newIndex: this.getElementIndex(args.el),
          oldIndex: this.getElementOldIndex(args.el),
          tipoproj: this.tipoProj
        }

        // console.log('args', args, itemdragend)
        this.onEndproj(itemdragend)
      }
    })

    service.eventBus.$on('drag', (el, source) => {
      this.scrollable = false
    })
    service.eventBus.$on('drop', (el, source) => {
      this.scrollable = true
    })

    this.load()
  }

  public mounted() {

    // console.log('Screen.width', Screen.width)
    // console.log('this.$route', this.$route)

    // if (Screen.width < 400) {
    //   this.splitterModel = 100
    // } else {
    //   this.splitterModel = 50
    // }
    this.idProjAtt = this.$route.params.idProj
    this.updateindexProj()

    tools.touchmove(this.scrollable)
  }

  public async load() {
    // console.log('LOAD PROJECTS....')
    if (!!this.$route.params.idProj) {
      this.idProjAtt = this.$route.params.idProj
      this.updateindexProj()
    }

    this.selectGroup = tools.getGroupList()[toolsext.getLocale()]
    this.selectResp = tools.getRespList()[toolsext.getLocale()]
    this.selectWorkers = tools.getWorkersList()[toolsext.getLocale()]

    console.log('this.selectGroup', this.selectGroup)

    // Set last category selected
    // localStorage.setItem(tools.localStorage.categorySel, this.categoryAtt)

    this.checkUpdate_everytime()
  }

  // Call to check if need to refresh
  public checkUpdate_everytime() {
    this.polling = setInterval(() => {
      this.checkUpdate()
    }, tools.NUMSEC_CHECKUPDATE)
  }

  public beforeDestroy() {
    clearInterval(this.polling)
  }

  public mydeleteitemproj(idobj: string) {
    // console.log('mydeleteitemtodo', idobj)
    return Projects.actions.deleteItem({ idobj })
  }

  public dbInsert() {
    // console.log('dbInsert')
    const descr = this.projbottom.trim()

    this.projbottom = ''

    return this.addProject(descr, this.tipoProj)
  }

  public async clickMenuProjList(action) {
    // console.log('clickMenuProjList: ', action)
    if (action === lists.MenuAction.ADD_PROJECT) {
      const idnewelem = await this.addProject('test...', this.tipoProj)
      // console.log('idnewelem', idnewelem)
      // get element by id
      const elem = this.getCompProjectById(idnewelem)

      if (!!elem) {
        // @ts-ignore
        elem.activeEdit()
      }
      // console.log('idnewelem', idnewelem, 'Elem Trovato', elem)
    } else if (action === lists.MenuAction.PASTE) {

      const myaction: IAction = {
        table: GlobalStore.state.lastaction.table,
        type: lists.MenuAction.PASTE,
        _id: this.itemselproj._id
      }

      if (myaction.table === tools.projects)
        return await Projects.actions.ActionCutPaste(myaction)
      else if (myaction.table === tools.todos)
        return await Todos.actions.ActionCutPaste(myaction)
    }
  }

  public getCompProjectById(id): SingleProject {
    if (!!this.$refs.singleproject) {
      // console.log('this.$refs.singleproject', this.$refs.singleproject)
      for (const elem of this.$refs.singleproject) {
        // @ts-ignore
        if (elem.itemproject._id === id) {
          return elem
        }
      }
    }
    return null
  }

  // const descr = this.$t('project.newproj').toString()

  public async addProject(descr, tipoproj: string) {
    const projatt = Projects.getters.getRecordById(this.idProjAtt)
    // console.log('projatt', projatt)
    let myobj: IProject = null
    if (this.idProjAtt === process.env.PROJECT_ID_MAIN) {
      myobj = {
        descr,
        id_parent: this.idProjAtt,
        privacyread: tools.getprivacyreadbytipoproj(tipoproj),
        privacywrite: tools.getprivacywritebytipoproj(tipoproj),
      }

      if (projatt) {
        myobj.actualphase = projatt.actualphase
      }
    } else {
      myobj = {
        descr,
        id_parent: this.idProjAtt,
      }

      if (projatt) {
        myobj.actualphase = projatt.actualphase
        myobj.privacyread = projatt.privacyread
        myobj.privacywrite = projatt.privacywrite
      }
    }

    if (this.itemproj === undefined)
      this.itemproj = projatt

    if (this.isRootProject) {
      myobj.typeproj = TypeProj.TYPE_PROJECT
      myobj.id_main_project = this.idProjAtt
    } else {
      myobj.typeproj = TypeProj.TYPE_SUBDIR
      if (this.itemproj.id_main_project === process.env.PROJECT_ID_MAIN)
        myobj.id_main_project = this.itemproj._id
      else
        myobj.id_main_project = this.itemproj.id_main_project
    }

    // console.log('myobj', myobj)

    if (!tools.checkIfUserExist(this)) {
      return
    }

    // console.log('Nuovo PROJ', myobj)
    return await Projects.actions.dbInsert({ myobj, atfirst: false })
  }

  public setidsel(id: string) {
    this.idsel = id
    this.whatisSel = tools.WHAT_PROJECT
    this.itemtodosel = null
    this.itemselproj = Projects.getters.getRecordById(this.idsel)
    if ((this.itemselproj === undefined || this.itemselproj === null))
      this.whatisSel = tools.WHAT_NOTHING
    // console.log('readonly = true')
    this.readonly = true

    this.checkiftoenable()
  }

  public setitemsel(item: ITodo) {
    this.itemselproj = null
    this.itemtodosel = item
    if (item !== null)
      this.whatisSel = tools.WHAT_TODO

    this.checkiftoenable()
  }

  public checkiftoenable() {

    if (tools.isMobile()) {

      if (this.whatisSel === tools.WHAT_NOTHING)
        this.splitterModel = 100
      else
        this.splitterModel = 0
    } else {
      this.splitterModel = 0
    }
  }

  public setdeselectrow() {
    // console.log('setdeselectrow')
    this.itemtodosel = null
    this.itemselproj = null
    this.whatisSel = tools.WHAT_NOTHING
    this.checkiftoenable()
  }

  public cambiadata(value) {
    // console.log('*******   cambiadata', value)
    this.itemtodosel.start_date = new Date(arguments[0])
  }

  public async updateitemproj({ myitem, field }) {
    // console.log('calling MODIFY updateitemproj', myitem, field)

    await Projects.actions.modify({ myitem, field })

  }

  public deselectAllRowstodo(item: ITodo, check, onlythis: boolean = false) {
    // console.log('PROJ-LIST deselectAllRowstodo : ', item)

    // return false

    // @ts-ignore
    for (const i in this.$refs.ctodo.$refs.single) {
      // @ts-ignore
      const contr = this.$refs.ctodo.$refs.single[i] as SingleTodo
      let des = true
      if (check) {
        const id = contr.itemtodo._id
        // Don't deselect the actual clicked!
        if (onlythis) {
          des = item._id === id
        } else {
          if (!!item) {
            des = ((check && (item._id !== id)) || (!check))
          } else {
            des = !check
          }
        }
      }
      if (des) {
        // @ts-ignore
        contr.deselectAndExitEdit()
      }
    }
  }

  public deselectAllRowsproj(item: IProject, check, onlythis: boolean = false, deselectRiga: boolean = false) {
    // console.log('deselectAllRowsproj: ', item)

    if (deselectRiga) {
      this.setdeselectrow()
      return
    }

    if (!!item && check) {
      // This is the new selected
      // console.log('readonly = false')
      this.setidsel(item._id)
      this.readonly = false
    }

    if (this.$refs.singleproject === undefined)
      return

    for (const i in this.$refs.singleproject) {

      const contr = this.$refs.singleproject[i] as SingleProject
      // @ts-ignore
      const id = contr.itemproject._id
      // Don't deselect the actual clicked!
      let des = false
      if (onlythis) {
        des = item._id === id
      } else {
        if (!!item) {
          des = ((check && (item._id !== id)) || (!check))
        } else {
          des = !check
        }
      }
      if (des) {
        // @ts-ignore
        contr.deselectAndExitEdit()
      }
    }
  }

  public updateclasses() {
    if (!!this.itemselproj) {
      this.colProgress = tools.getProgressColor(this.itemselproj.progressCalc)
    } else {
      // this.whatisSel = tools.WHAT_NOTHING
    }
  }

  public checkUpdate() {
    ApiTables.waitAndcheckPendingMsg()
  }

  private updateindexProj() {
    // console.log('idProjAtt', this.idProjAtt)
    this.itemproj = Projects.getters.getRecordById(this.idProjAtt)
    if (!!this.itemproj) {
      this.itemprojparent = Projects.getters.getRecordById(this.itemproj.id_parent)
      // console.log('this.itemproj.descr', this.itemproj.descr)
    }
    // console.log('idproj', this.idProjAtt, 'params' , this.$route.params)
  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes.index.value, 10)
  }

  get iconPriority() {
    let iconpriority = ''
    if (this.itemtodosel.priority === tools.Priority.PRIORITY_HIGH) {
      iconpriority = 'expand_less'
    }  // expand_less
    else if (this.itemtodosel.priority === tools.Priority.PRIORITY_NORMAL) {
      iconpriority = 'remove'
    } else if (this.itemtodosel.priority === tools.Priority.PRIORITY_LOW) {
      iconpriority = 'expand_more'
    }  // expand_more

    return iconpriority
  }

}
