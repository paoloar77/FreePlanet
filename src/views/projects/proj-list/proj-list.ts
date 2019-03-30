import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IDrag, IProject, IProjectsState } from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'

import { Screen } from 'quasar'
import { CProgress } from '@src/components/CProgress'

const namespace: string = 'Projects'

@Component({

  components: { SingleProject, CProgress },
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
  public idProjAtt: string = tools.FIRST_PROJ
  public idProjParentAtt: string = ''
  public splitterModel = 50 // start at 50%
  public itemproj: IProject = null
  public idsel: string = ''
  public itemsel: IProject = Projects.getters.getRecordEmpty()
  public colProgress: string = 'blue'
  public percProgress: string = 'percProgress'

  public $refs: {
    single: SingleProject[]
  }

  get getrouteup() {
    return '/projects/' + this.idProjParentAtt
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

  get descrParent() {
    return Projects.getters.getDescrById(this.idProjParentAtt)
  }

  get descrProject() {
    return Projects.getters.getDescrById(this.idProjAtt)
  }

  // get ProjectsCount() {
  //   return Projects.getters.ProjectsCount(this.idProjParentAtt)
  // }

  @Getter('items_dacompletare', { namespace })
  public items_dacompletare: (state: IProjectsState, id_parent: string) => IProject[]

  @Watch('$route.params.idProj')
  public changeparent() {
    this.idProjAtt = this.$route.params.idProj
    this.idProjParentAtt = Projects.getters.getParentById(this.idProjAtt)
  }

  @Watch('itemsel.progressCalc')
  public changeprogress() {
    this.updateclasses()
  }

  public getmyid(id) {
    return 'row' + id
  }

  public showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  public async onEnd2(itemdragend) {
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
      this.onEnd2(itemdragend)
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
    }, 60000)
  }

  public beforeDestroy() {
    clearInterval(this.polling)
  }

  public mydeleteItem(idobj: string) {
    // console.log('mydeleteItem', idobj)
    return Projects.actions.deleteItem({ idobj })
  }

  public dbInsert(atfirst: boolean = false) {
    let descr = this.projbottom.trim()

    if (descr === '') {
      return
    }

    if (!tools.checkIfUserExist(this)) {
      return
    }

    const myobj: IProject = {
      descr,
      id_parent: this.idProjAtt
    }

    this.projbottom = ''

    return Projects.actions.dbInsert({ myobj, atfirst })
  }

  public setidsel(id: string) {
    this.idsel = id
    this.itemsel = Projects.getters.getRecordById(this.idsel)
  }

  public async updateitem({ myitem, field }) {
    console.log('calling MODIFY updateitem', myitem, field)

    const itemdragend: IDrag = {
      id_proj: this.idProjAtt,
      field,
      idelemtochange: myitem._id,
      atfirst: false
    }

    // await Projects.actions.swapElems(itemdragend)

    await Projects.actions.modify({ myitem, field })

  }

  public deselectAllRows(item: IProject, check, onlythis: boolean = false) {
    // console.log('deselectAllRows : ', item)

    for (let i = 0; i < this.$refs.single.length; i++) {

      const contr = this.$refs.single[i] as SingleProject
      // @ts-ignore
      const id = contr.itemproject._id
      // Don't deselect the actual clicked!
      let des = false
      if (onlythis) {
        des = item._id === id
      } else {
        des = ((check && (item._id !== id)) || (!check))
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
    let myperc = Math.round(this.itemsel.hoursworked / this.itemsel.hoursplanned * 100)

    return myperc

  }

}
