import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IDrag, IProject, IProjectsState, ITodo } from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'
import { CTodo } from '../../../components/todos/CTodo'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects, Todos } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'

import { Screen } from 'quasar'
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
  public idProjParentAtt: string = ''
  public splitterModel = 50 // start at 50%
  public itemproj: IProject = null
  public idsel: string = ''
  public itemsel: IProject = Projects.getters.getRecordEmpty()
  public itemtodosel: ITodo = Todos.getters.getRecordEmpty()
  public whatisSel: number = 0
  public colProgress: string = 'blue'
  public percProgress: string = 'percProgress'

  public selectStatus: [] = tools.selectStatus[UserStore.state.lang]
  public selectPhase: [] = tools.selectPhase[UserStore.state.lang]

  public $refs: {
    singleproject: SingleProject[],
    ctodo: CTodo
  }

  get getidProjParentAtt() {
    return this.idProjParentAtt
  }

  public watchupdatetodo(field = '') {
    console.log('watchupdate', field)
    this.$emit('eventupdate', {myitem: this.itemtodosel, field } )
  }

  get getrouteup() {
    return '/projects/' + this.idProjParentAtt
  }

  public selproj() {
    this.deselectAllRowsproj(null, false, false)
    this.deselectAllRowstodo(null, false, false)
    this.setidsel(this.idProjAtt)
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

  get menuPopupConfigProject() {
    return tools.menuPopupConfigProject[UserStore.state.lang]
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[UserStore.state.lang]
  }

  get descrProject() {
    return Projects.getters.getDescrById(this.idProjAtt)
  }

  @Getter('items_dacompletare', { namespace })
  public items_dacompletare: (state: IProjectsState, id_parent: string) => IProject[]

  @Watch('items_dacompletare')
  public changeitems() {
    this.idProjParentAtt = Projects.getters.getParentById(this.idProjAtt)
  }

  @Watch('$route.params.idProj')
  public changeparent() {
    this.idProjAtt = this.$route.params.idProj
    this.idProjParentAtt = Projects.getters.getParentById(this.idProjAtt)
    this.selproj()
  }

  @Watch('itemsel.progressCalc')
  public changeprogress() {
    this.updateclasses()
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
    this.idProjParentAtt = Projects.getters.getParentById(this.idProjAtt)

    console.log('this.idProjParentAtt', this.idProjParentAtt, 'idproj', this.idProjAtt, 'params' , this.$route.params)

    tools.touchmove(this.scrollable)
  }

  public async load() {
    console.log('LOAD PROJECTS....')
    if (!!this.$route.params.idProj) {
      this.idProjAtt = this.$route.params.idProj
      this.idProjParentAtt = Projects.getters.getParentById(this.idProjAtt)
      this.itemproj = Projects.getters.getRecordById(this.idProjAtt)
    }

    // console.log('this.idProjAtt', this.idProjAtt, this.idProjParentAtt)

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

    if (!tools.checkIfUserExist(this)) {
      return
    }

    return await Projects.actions.dbInsert({ myobj, atfirst: false })
  }

  public setidsel(id: string) {
    this.idsel = id
    this.whatisSel = tools.WHAT_PROJECT
    this.itemsel = Projects.getters.getRecordById(this.idsel)
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
    // console.log('deselectAllRowsproj: ', item)

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
    this.colProgress = tools.getProgressColor(this.itemsel.progressCalc)
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

  get getCalcHoursWorked() {
    if (this.itemsel.hoursplanned <= 0) {
      return 0
    }
    const myperc = Math.round(this.itemsel.hoursworked / this.itemsel.hoursplanned * 100)

    return myperc

  }

  get getCalcTodoHoursWorked() {
    if (this.itemtodosel.hoursplanned <= 0) {
      return 0
    }
    const myperc = Math.round(this.itemtodosel.hoursworked / this.itemtodosel.hoursplanned * 100)

    return myperc

  }

}
