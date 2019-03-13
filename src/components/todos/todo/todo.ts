import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { ICfgServer, IDrag, IGlobalState, ITodo, ITodosState } from '@src/model'
import { SingleTodo } from '../SingleTodo'

import { tools } from '../../../store/Modules/tools'

import { GlobalStore, Todos } from '@store'
import { UserStore } from '@store'

// _.cloneDeep(  Per clonare un oggetto

import { costanti } from '@src/store/Modules/costanti'
import { Getter, Mutation, State } from 'vuex-class'
const namespace: string = 'Todos'

import globalroutines from './../../../globalroutines/index'

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

  // get mytodos_dacompletare() {
  //   return todos_dacompletare(this.categoryAtt)
  // }

  // @Watch('$route', { immediate: true, deep: true })
  // onUrlChange(newVal: any) {
  //   // Some action
  // }

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
  public startpos: number = 0
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
  // public showtype: number = Todos.state.showtype

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

  // clickaggshowtype () {
  //   console.log('1B) clickaggshowtype Todos.state.showtype=', Todos.state.showtype)
  //   Todos.state.showtype = costanti.ShowTypeTask.SHOW_ALL
  //   console.log('2B) Dopo: showtype=', this.showtype)
  // }

  public loadval(e) {
    console.log('1) loadval, showtype=', this.showtype)
    this.showtype = Todos.state.showtype
    console.log('2) Dopo: showtype=', this.showtype)
  }

  public getmyid(id) {
    return 'row' + id
  }

  public showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  public onStart() {

    this.startpos = 0
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

    if (priority === tools.Todos.PRIORITY_HIGH) {
      cl = 'high_priority'
    }
    else if (priority === tools.Todos.PRIORITY_NORMAL) {
      cl = 'medium_priority'
 }
    else if (priority === tools.Todos.PRIORITY_LOW) {
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
    $service.options('first',
      {
        // isContainer: function (el) {
        //   return el.classList.contains('dragula-container')
        // },
        moves(el, source, handle, sibling) {
          // console.log('moves')
          return !el.classList.contains('donotdrag') // elements are always draggable by default
        },
        accepts(el, target, source, sibling) {
          // console.log('accepts dragging '+ el.id + ' from ' + source.id + ' to ' + target.id)
          return true // elements can be dropped in any of the `containers` by default
        },
        invalid(el, handle) {
          // console.log('invalid')
          return el.classList.contains('donotdrag') // don't prevent any drags from initiating by default
        },
        direction: 'vertical'
      })
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

    for (const todosKey in tools.Todos) {
      this.listPriorityLabel.push(tools.Todos[todosKey])
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
    console.log('mydeleteItem', idobj)
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
      this.$q.notify(this.$t('todo.usernotdefined'))
      return
    }

    if (!this.isRegistered()) {
      // Not logged
      this.$q.notify(this.$t('user.notregistered'))
      return
    }

    const myobj: ITodo = {
      descr,
      category: this.categoryAtt
    }

    return Todos.actions.insertTodo({ myobj, atfirst })
      .then((data) => {

        console.log('data', data)
        if (data !== null) {
          this.$q.notify(data)
        }

        // empty the field
        if (atfirst) {
          this.todotop = ''
        }
        else {
          this.todobottom = ''
        }
      })
  }

  /*
    sendMessageToSW(recdata, method) {

      navigator.serviceWorker.controller.postMessage({
        type: 'sync',
        recdata,
        method,
        cmd: 'sync-new-todos',
        token: UserStore.state.idToken,
        lang: UserStore.state.lang
      })
    }
  */

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
    Todos.actions.waitAndcheckPendingMsg()
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

  // setArrTodos() {
  //
  //   let mystr = ''
  //   let mythis = this
  //
  //   mythis.tmpstrTodos = ''
  //   return globalroutines(null, 'write', 'todos', this.todos_arr[0])
  //     .then(function (alldata) {
  //       mythis.getArrTodos()
  //     })
  // }
  //

}
