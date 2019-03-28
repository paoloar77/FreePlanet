import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { IDrag, IProject, IProjectsState } from '../../../model/index'
import { SingleProject } from '../../../components/projects/SingleProject/index'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Projects } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'

const namespace: string = 'Projects'

@Component({

  components: { SingleProject },
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
  public categoryAtt: string = tools.FIRST_PROJ
  public dragname: string = 'second'

  public $refs: {
    single: SingleProject[]
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

  get doneProjectsCount() {
    return Projects.getters.doneProjectsCount(this.categoryAtt)
  }

  get menuPopupConfigProject() {
    return tools.menuPopupConfigProject[UserStore.state.lang]
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[UserStore.state.lang]
  }

  get ProjectsCount() {
    return Projects.getters.ProjectsCount(this.categoryAtt)
  }

  @Getter('items_dacompletare', { namespace })
  public items_dacompletare: (state: IProjectsState, category: string) => IProject[]

  @Getter('projs_completati', { namespace })
  public projs_completati: (state: IProjectsState, category: string) => IProject[]

  @Watch('$route.params.category')
  public changecat() {
    this.categoryAtt = this.$route.params.category
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

    $service.eventBus.$on('dragend', (args) => {

      const itemdragend: IDrag = {
        category: this.categoryAtt,
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
    this.categoryAtt = this.$route.params.category

    tools.touchmove(this.scrollable)
  }

  public async load() {
    console.log('LOAD PROJECTS....')
    if (!!this.$route.params.category) {
      this.categoryAtt = this.$route.params.category
    }

    // Set last category selected
    localStorage.setItem(tools.localStorage.categorySel, this.categoryAtt)

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
    return Projects.actions.deleteItem({ cat: this.categoryAtt, idobj })
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
      category: this.categoryAtt
    }

    this.projbottom = ''

    return Projects.actions.dbInsert({ myobj, atfirst })
  }

  public async updateitem({ myitem, field }) {
    console.log('calling MODIFY updateitem', myitem, field)

    const itemdragend: IDrag = {
      category: this.categoryAtt,
      field,
      idelemtochange: myitem._id,
      prioritychosen: myitem.priority,
      atfirst: false
    }

    await Projects.actions.swapElems(itemdragend)

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
