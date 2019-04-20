import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IDrag, IProject, IProjectsState, ITodo, Privacy, TypeProj } from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects, Todos } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'

import { date, Screen } from 'quasar'
import { CProgress } from '../../../components/CProgress'
import { CDate } from '../../../components/CDate'

const namespace: string = 'Projects'

@Component({

  components: { SingleProject, CProgress, CTodo, CDate },
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
  public $q: any
  public projbottom: string = ''
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

  public selectStatus: [] = tools.selectStatus[UserStore.state.lang]
  public selectPhase: [] = tools.selectPhase[UserStore.state.lang]
  public selectPrivacy: [] = tools.selectPrivacy[UserStore.state.lang]

  public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }

  @Getter('items_dacompletare', { namespace })
  public items_dacompletare: (state: IProjectsState, id_parent: string) => IProject[]

  @Watch('items_dacompletare')
  public changeitems() {
    this.updateindexProj()
  }

  @Watch('$route.params.idProj')
  public changeparent() {
    this.idProjAtt = this.$route.params.idProj
    this.updateindexProj()
    this.selproj()
  }

  @Watch('itemselproj.progressCalc')
  public changeprogress() {
    this.updateclasses()
  }

  private updateindexProj() {
    console.log('idProjAtt', this.idProjAtt)
    this.itemproj = Projects.getters.getRecordById(this.idProjAtt)
    this.itemprojparent = Projects.getters.getRecordById(this.itemproj.id_parent)
    console.log('this.itemproj', this.itemproj)
    // console.log('idproj', this.idProjAtt, 'params' , this.$route.params)
  }

  get readonly_PanelPrivacy() {
    return !this.CanIModifyPanelPrivacy
  }

  get readonly_PanelPrivacySel() {
    return !this.CanIModifyPanelPrivacySel
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
    return '/projects/' + this.itemproj.id_parent
  }

  get tools() {
    return tools
  }

  get showtype() {
    return Projects.state.showtype
  }

  set showtype(value) {
    console.log('showtype', value)
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
    if (this.isMainProject)
      return tools.menuPopupConfigMAINProject[UserStore.state.lang]
    else
      return tools.menuPopupConfigProject[UserStore.state.lang]
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[UserStore.state.lang]
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

        let orerimaste = this.itemselproj.hoursplanned - this.itemselproj.hoursworked
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
        console.log('mydate', mydate)
        this.itemselproj.endwork_estimate = date.addToDate(mydate, { days })

        console.log('   days', days, 'weeks', weeks, 'orerimaste', orerimaste, 'dateestimated', this.itemselproj.endwork_estimate)

        return this.itemselproj.endwork_estimate
      }catch (e) {
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

  // I use this because the statustodo will disappear from the UI, so it won't call the status changed...
  // in this case I need to call manually the modify.
  public modifyfieldtodo(field) {
    console.log('modifyfieldtodo', field)
    Todos.actions.modify({ myitem: this.itemtodosel, field })
  }

  public selproj() {
    this.deselectAllRowsproj(null, false, false)
    this.deselectAllRowstodo(null, false, false)
    this.setidsel(this.idProjAtt)
  }

  public showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  public async onEndproj(itemdragend) {
    await Projects.actions.swapElems(itemdragend)
  }

  public created() {
    const $service = this.$dragula.$service
    tools.dragula_option($service, this.dragname)

    this.updateclasses()

    $service.eventBus.$on('dragend', (args) => {

      const itemdragend: IDrag = {
        field: '',
        id_proj: this.idProjAtt,
        newIndex: this.getElementIndex(args.el),
        oldIndex: this.getElementOldIndex(args.el)
      }

      // console.log('args', args, itemdragend)
      this.onEndproj(itemdragend)
    })

    $service.eventBus.$on('drag', (el, source) => {
      this.scrollable = false
    })
    $service.eventBus.$on('drop', (el, source) => {
      this.scrollable = true
    })

    this.load()
  }

  public mounted() {

    console.log('Screen.width', Screen.width)

    if (Screen.width < 400) {
      this.splitterModel = 100
    } else {
      this.splitterModel = 50
    }
    this.idProjAtt = this.$route.params.idProj
    this.updateindexProj()

    tools.touchmove(this.scrollable)
  }

  public async load() {
    console.log('LOAD PROJECTS....')
    if (!!this.$route.params.idProj) {
      this.idProjAtt = this.$route.params.idProj
      this.updateindexProj()
    }

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
    console.log('mydeleteitemtodo', idobj)
    return Projects.actions.deleteItem({ idobj })
  }

  public dbInsert() {
    const descr = this.projbottom.trim()

    this.projbottom = ''

    return this.addProject(descr)
  }

  public async clickMenuProjList(action) {
    console.log('clickMenuProjList: ', action)
    if (action === tools.MenuAction.ADD_PROJECT) {
      const idnewelem = await this.addProject('')
      // get element by id
      const elem = this.getCompProjectById(idnewelem)
      // @ts-ignore
      elem.activeEdit()
      // console.log('idnewelem', idnewelem, 'Elem Trovato', elem)
    }
  }

  public getCompProjectById(id): SingleProject {
    console.log('this.$refs.singleproject', this.$refs.singleproject)
    for (const elem of this.$refs.singleproject) {
      // @ts-ignore
      if (elem.itemproject._id === id) {
        return elem
      }
    }
  }

  // const descr = this.$t('project.newproj').toString()

  public async addProject(descr) {
    const myobj: IProject = {
      descr,
      id_parent: this.idProjAtt
    }

    if (this.itemproj === undefined)
      this.itemproj = Projects.getters.getRecordById(this.idProjAtt)

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

    if (!tools.checkIfUserExist(this)) {
      return
    }

    return await Projects.actions.dbInsert({ myobj, atfirst: false })
  }

  public setidsel(id: string) {
    this.idsel = id
    this.whatisSel = tools.WHAT_PROJECT
    this.itemselproj = Projects.getters.getRecordById(this.idsel)
  }
  public setitemsel(item: ITodo) {
    this.whatisSel = tools.WHAT_TODO
    this.itemtodosel = item
  }

  public cambiadata(value) {
    // console.log('*******   cambiadata', value)
    this.itemtodosel.start_date = new Date(arguments[0])
  }

  public async updateitemproj({ myitem, field }) {
    console.log('calling MODIFY updateitemproj', myitem, field)

    await Projects.actions.modify({ myitem, field })

  }

  public deselectAllRowstodo(item: ITodo, check, onlythis: boolean = false) {
    console.log('PROJ-LIST deselectAllRowstodo : ', item)

    return false

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

  public deselectAllRowsproj(item: IProject, check, onlythis: boolean = false) {
    console.log('deselectAllRowsproj: ', item)

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
    this.colProgress = tools.getProgressColor(this.itemselproj.progressCalc)
  }

  public checkUpdate() {
    ApiTables.waitAndcheckPendingMsg()
  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes.index.value, 10)
  }


}
