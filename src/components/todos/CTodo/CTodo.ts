import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import { IDrag, IProject, ITodo, ITodosState } from '../../../model/index'

import { tools } from '../../../store/Modules/tools'
import * as ApiTables from '../../../store/Modules/ApiTables'

import { GlobalStore, Todos } from '@store'
import { UserStore } from '@store'

import { Getter } from 'vuex-class'
import { SingleTodo } from '../SingleTodo'


const namespace: string = 'Todos'

@Component({
  components: { SingleTodo },
  filters: {
    capitalize(value) {
      return tools.capitalize(value)
    }
  }
})
export default class CTodo extends Vue {
  public $q: any
  public todotop: string = ''
  public todobottom: string = ''
  public polling = null
  public service: any
  public scrollable = true
  public dragname: string = 'first'

  @Prop({ required: true }) public categoryAtt: string
  @Prop({ required: true }) public title: string
  @Prop({ required: false, default: 'blue' }) public forecolor: string
  @Prop({ required: false, default: 'lightblue' }) public backcolor: string
  @Prop({ required: false, default: true }) public viewtaskTop: boolean

  public $refs: {
    single: SingleTodo[]
  }

  get tools() {
    return tools
  }

  get showtype() {
    return Todos.state.showtype
  }

  set showtype(value) {
    console.log('showtype', value)
    GlobalStore.mutations.setShowType(value)
  }

  get doneTodosCount() {
    return Todos.getters.doneTodosCount(this.categoryAtt)
  }

  get menuPopupConfigTodo() {
    return tools.menuPopupConfigTodo[UserStore.state.lang]
  }

  get listOptionShowTask() {
    return tools.listOptionShowTask[UserStore.state.lang]
  }

  get TodosCount() {
    return Todos.getters.TodosCount(this.categoryAtt)
  }

  @Getter('items_dacompletare', { namespace })
  public items_dacompletare: (state: ITodosState, category: string) => ITodo[]

  @Getter('todos_completati', { namespace })
  public todos_completati: (state: ITodosState, category: string) => ITodo[]

  public showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  public async onEndtodo(itemdragend) {
    await Todos.actions.swapElems(itemdragend)
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

      this.onEndtodo(itemdragend)
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
    tools.touchmove(this.scrollable)
  }

  public load() {
    console.log('LOAD TODO....')

    // Set last category selected
    localStorage.setItem(tools.localStorage.categorySel, this.categoryAtt)

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

  public mydeleteitemtodo(idobj: string) {
    // console.log('mydeleteitemtodo', idobj)
    return Todos.actions.deleteItemtodo({ cat: this.categoryAtt, idobj })
  }

  public async dbInsert(atfirst: boolean = false) {
    let descr = this.todobottom.trim()
    if (atfirst) {
      descr = this.todotop.trim()
    }

    if (descr === '') {
      return
    }

    if (!tools.checkIfUserExist(this)) {
      return
    }

    const myobj: ITodo = {
      descr,
      category: this.categoryAtt
    }

    // empty the field
    if (atfirst) {
      this.todotop = ''
    }
    else {
      this.todobottom = ''
    }

    return await Todos.actions.dbInsert({ myobj, atfirst })
  }

  public async updateitemtodo({ myitem, field }) {
    console.log('calling MODIFY updateitemtodo', myitem, field)

    const itemdragend: IDrag = {
      category: this.categoryAtt,
      field,
      idelemtochange: myitem._id,
      prioritychosen: myitem.priority,
      atfirst: false
    }

    await Todos.actions.swapElems(itemdragend)

    await Todos.actions.modify({ myitem, field })

  }

  public deselectAllRowsproj(item: IProject, check, onlythis: boolean = false) {
    this.$emit('deselectAllRowsproj', item, check, onlythis)
  }

  public setitemsel(item: ITodo) {
    this.$emit('setitemsel', item)
  }

  public deselectAllRowstodo(item: ITodo, check, onlythis: boolean = false) {
    console.log('CTODO deselectAllRowstodo : ', item)

    for (let i = 0; i < this.$refs.single.length; i++) {

      const contr = this.$refs.single[i] as SingleTodo
      // @ts-ignore
      const id = contr.itemtodo._id
      // Don't deselect the actual clicked!
      let des = false
      if (onlythis) {
        des = item._id === id
      } else {
        if (!!check) {
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
