import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ICfgServer, IDrag, IGlobalState, ITodo, ITodosState } from '../../model/index'
import { SingleTodo } from '../../components/todos/SingleTodo/index'

import { tools } from '../../store/Modules/tools'
import * as ApiTables from '../../store/Modules/ApiTables'

import { GlobalStore, Todos } from '@store'
import { UserStore } from '@store'

import { Getter, Mutation, State } from 'vuex-class'

import globalroutines from '../../globalroutines/index'

const namespace: string = 'Todos'

@Component({

  components: { SingleTodo },
  filters: {
    capitalize(value) {
      if (!value) { return '' }
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
export default class Todo extends Vue {
  public dragname: string = 'first'

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

  get todos_vista() {
    let mystr = ''
    const arr = Todos.getters.todos_dacompletare(this.categoryAtt)
    for (const ind in arr) {
      mystr += this.getstrelem(arr[ind]) + '\n'
    }

    return mystr + ''

  }

  // Computed:
  get reload_fromServer() {
    return Todos.state.reload_fromServer
  }

  set reload_fromServer(value: number) {
    Todos.state.reload_fromServer = value
  }
  public $q: any
  public filter: boolean = false
  public title: string = ''
  public todotop: string = ''
  public todobottom: string = ''
  public drag: boolean = true
  public listPriorityLabel: number[] = []
  public arrPrior: number[] = []
  public itemDragStart: any = null
  public polling = null
  public loadDone: boolean = false
  public inddragging: number = -1
  public service: any
  public actualMaxPosition: number = 15
  public scrollable = true
  public tmpstrTodos: string = ''
  public categoryAtt: string = ''

  public $refs: {
    single: SingleTodo[]
  }

  @Getter('todos_dacompletare', { namespace })
  public todos_dacompletare: (state: ITodosState, category: string) => ITodo[]

  @Getter('todos_completati', { namespace })
  public todos_completati: (state: ITodosState, category: string) => ITodo[]

  @Watch('$route.params.category') public changecat() {
    this.categoryAtt = this.$route.params.category
  }

  public getmyid(id) {
    return 'row' + id
  }

  public showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  public onStart() {

    this.itemDragStart = null
  }

  public logelem(mystr, elem) {
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, ' Pr(', this.getPriorityByInd(elem.priority), ') [', elem.id_prev, '] modif=', elem.modified)
  }

  public getstrelem(elem) {
    return 'elem [' + elem._id + '] ' + elem.descr + ' Pr(' + this.getPriorityByInd(elem.priority) + ') [ID_PREV=' + elem.id_prev + '] modif=' + elem.modified + ' '
  }

  public getTitlePriority(priority) {
    let cl = ''

    if (priority === tools.Priority.PRIORITY_HIGH) {
      cl = 'high_priority'
    }
    else if (priority === tools.Priority.PRIORITY_NORMAL) {
      cl = 'medium_priority'
 }
    else if (priority === tools.Priority.PRIORITY_LOW) {
      cl = 'low_priority'
 }

    return cl + ' titlePriority'
  }

  public logga_arr(myarr: ITodo[]) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + this.getPriorityByInd(item.priority) + ') [' + item.id_prev + '] modif=' + item.modified + '\n'
      // mystr += '[' + item.pos + '] ' + item.descr + '\n'
    })

    return mystr
  }

  public async onEnd(itemdragend) {
    console.log('************  END DRAG: ', itemdragend)
    this.inddragging = -1

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

      this.onEnd(itemdragend)
    })

    $service.eventBus.$on('drag', (el, source) => {
      // mythis.inddragging = mythis.getElementIndex(el)
      console.log('+++ DRAG ind=', this.inddragging)
      this.scrollable = false
    })
    $service.eventBus.$on('drop', (el, source) => {
      console.log('+++ DROP')
      this.scrollable = true
    })

    this.load()
  }

  public mounted() {
    // console.log('*** MOUNTED ***')

    this.categoryAtt = this.$route.params.category

    if (window) {
      window.addEventListener('touchmove', (e) => {
        // console.log('touchmove')
        if (!this.scrollable) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  }

  public setarrPriority() {
    this.arrPrior = []
    const arr = tools.selectPriority[UserStore.state.lang]
    if (arr) {
      arr.forEach((rec) => {
        this.arrPrior.push(rec.value)
      })
    }
    // console.log('Array PRIOR:', this.arrPrior)
  }

  public async load() {
    console.log('LOAD TODO....')
    this.categoryAtt = this.$route.params.category

    // Set last category selected
    localStorage.setItem(tools.localStorage.categorySel, this.categoryAtt)

    for (const todosKey in tools.Priority) {
      this.listPriorityLabel.push(tools.Priority[todosKey])
    }
    // console.log('Priority:' + this.listPriorityLabel)
    this.setarrPriority()

    this.loadDone = true

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

  public getPriorityByInd(index) {
    // console.log('LANG in PRIOR', UserStore.state.lang)
    try {
      const arr = tools.selectPriority[UserStore.state.lang]
      for (const rec of arr) {
        if (rec.value === index) {
          return rec.label
        }
      }
    } catch (e) {

    }
    return ''
  }

  public isRegistered() {
    return localStorage.getItem(tools.localStorage.userId) !== ''
  }

  public mydeleteItem(idobj: string) {
    // console.log('mydeleteItem', idobj)
    return Todos.actions.deleteItem({ cat: this.categoryAtt, idobj })
  }

  public insertTodo(atfirst: boolean = false) {
    let descr = this.todobottom.trim()
    if (atfirst) {
      descr = this.todotop.trim()
    }

    if (descr === '') {
      return
    }

    if (UserStore.state.userId === undefined) {
      tools.showNotif(this.$q, this.$t('todo.usernotdefined'))
      return
    }

    if (!this.isRegistered()) {
      // Not logged
      tools.showNotif(this.$q, this.$t('user.notregistered'))
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

    return Todos.actions.insertTodo({ myobj, atfirst })
  }

  public async updateitem({ myitem, field }) {
    console.log('calling MODIFY updateitem', myitem, field)
    // Update the others components...

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

  public deselectAllRows(item: ITodo, check, onlythis: boolean = false) {
    // console.log('deselectAllRows : ', item)

    for (let i = 0; i < this.$refs.single.length; i++) {

      const contr = this.$refs.single[i] as SingleTodo
      // @ts-ignore
      const id = contr.itemtodo._id
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

  public loadMoreTodo(index, done) {
    setTimeout(() => {
      this.actualMaxPosition += 15
      done()
    }, 100)

  }

  public getArrTodos() {

    let mystr = ''

    this.tmpstrTodos = ''
    return globalroutines(null, 'readall', 'todos', null)
      .then((alldata) => {
        const myrecs = [...alldata]

        myrecs.forEach((rec) => {
          mystr = mystr + rec.descr + rec.completed + ']   ['
        })

        this.tmpstrTodos = 'TODOS: ' + mystr
      })
  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes.index.value, 10)
  }

}
