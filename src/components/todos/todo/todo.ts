import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '../SingleTodo'
import { ITodo, ITodosState, IDrag, IGlobalState, ICfgServer } from '@src/model'

import { tools } from '../../../store/Modules/tools'

import { GlobalStore, Todos } from '@store'
import { UserStore } from '@store'

// _.cloneDeep(  Per clonare un oggetto

import { Getter, State, Mutation } from 'vuex-class'
import { costanti } from '@src/store/Modules/costanti'
const namespace: string = 'Todos'

import globalroutines from './../../../globalroutines/index'


@Component({

  components: { SingleTodo },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
export default class Todo extends Vue {
  $q: any
  filter: boolean = false
  title: string = ''
  todotop: string = ''
  todobottom: string = ''
  drag: boolean = true
  startpos: number = 0
  listPriorityLabel: number[] = []
  arrPrior: number[] = []
  itemDragStart: any = null
  polling = null
  loadDone: boolean = false
  public inddragging: number = -1
  public service: any
  public actualMaxPosition: number = 15
  public scrollable = true
  public tmpstrTodos: string = ''
  public categoryAtt: string = ''
  // public showtype: number = Todos.state.showtype

  $refs: {
    single: SingleTodo[]
  }

  @Getter('todos_dacompletare', { namespace })
  public todos_dacompletare: (state: ITodosState, category: string) => ITodo[]

  @Getter('todos_completati', { namespace })
  public todos_completati: (state: ITodosState, category: string) => ITodo[]

  @Watch('$route.params.category') changecat() {
    this.categoryAtt = this.$route.params.category
  }

  get showtype () {
    return Todos.state.showtype
  }

  set showtype (value) {
    console.log('showtype', value)
    GlobalStore.mutations.setShowType(value)
  }

  // clickaggshowtype () {
  //   console.log('1B) clickaggshowtype Todos.state.showtype=', Todos.state.showtype)
  //   Todos.state.showtype = costanti.ShowTypeTask.SHOW_ALL
  //   console.log('2B) Dopo: showtype=', this.showtype)
  // }


  loadval (e) {
    console.log('1) loadval, showtype=', this.showtype)
    this.showtype = Todos.state.showtype
    console.log('2) Dopo: showtype=', this.showtype)
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
    for (let ind in arr) {
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

  getmyid(id) {
    return 'row' + id
  }

  showTask(field_value) {
    return field_value === tools.MenuAction.SHOW_TASK
  }

  onStart() {

    this.startpos = 0
    this.itemDragStart = null
  }


  logelem(mystr, elem) {
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, ' Pr(', this.getPriorityByInd(elem.priority), ') [', elem.id_prev, '] modif=', elem.modified)
  }

  getstrelem(elem) {
    return 'elem [' + elem._id + '] ' + elem.descr + ' Pr(' + this.getPriorityByInd(elem.priority) + ') [ID_PREV=' + elem.id_prev + '] modif=' + elem.modified + ' '
  }

  // getPriorityToSet(ind1, ind2) {
  //   let elem1 = this.getelem(ind1)
  //   let elem2 = this.getelem(ind2)
  //
  //   if ((elem1 !== null) && (elem2 !== null)) {
  //     if (elem1.priority === elem2.priority) {
  //       return elem1.priority
  //     } else {
  //       // if different priority then take the first
  //       return elem1.priority
  //     }
  //   } else {
  //     return (elem1 != null) ? elem1.priority : ((elem2 != null) ? elem2.priority : null)
  //   }
  // }
  //

  getCompleted(ind1, ind2) {
    // let elem1 = this.getelem(ind1)
    // let elem2 = this.getelem(ind2)
    //
    // if ((elem1 !== null) && (elem2 !== null)) {
    //   if (elem1.completed === elem2.completed) {
    //     return elem1.completed
    //   } else {
    //     return elem1.completed
    //   }
    // } else {
    //   return (elem1 != null) ? elem1.completed : ((elem2 != null) ? elem2.completed : null)
    // }

  }

  getTitlePriority(priority) {
    let cl = ''

    if (priority === tools.Todos.PRIORITY_HIGH)
      cl = 'high_priority'
    else if (priority === tools.Todos.PRIORITY_NORMAL)
      cl = 'medium_priority'
    else if (priority === tools.Todos.PRIORITY_LOW)
      cl = 'low_priority'

    return cl + ' titlePriority'
  }

  logga_arr(myarr: ITodo[]) {
    let mystr = '\n'
    myarr.forEach(item => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + this.getPriorityByInd(item.priority) + ') [' + item.id_prev + '] modif=' + item.modified + '\n'
      // mystr += '[' + item.pos + '] ' + item.descr + '\n'
    })

    return mystr
  }

  async onEnd(itemdragend) {
    console.log('************  END DRAG: ', itemdragend)
    this.inddragging = -1

    await Todos.actions.swapElems(itemdragend)

    // If the newIndex is between another priority, then change priority

    // if (!changecompleted) {
    //   // if I changed the completed, I don't have to put in other list priority
    //   let newpriority = this.getPriorityToSet(indini, indfine)
    //   if (newpriority != null && newpriority >= 0) {
    //     myobj.modified = (myobj.priority !== newpriority) ? true : myobj.modified
    //     myobj.priority = newpriority
    //     console.log('NewPriority: ', newpriority)
    //   }
    // }

    // let completed = this.getCompleted(indini, indfine)
    // let changecompleted = false
    // if (completed != null) {
    //   myobj.modified = (myobj.completed !== completed) ? true : myobj.modified
    //   myobj.completed = completed
    //   changecompleted = true
    //   console.log('Newcompleted: ', completed, 'modif', myobj.modified)
    // }

  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes['index'].value)
  }


  private getElementParentId(el: any) {
    const elem = [].slice.call(el.parentElement.children)
    console.log('elem', elem)
    const id = elem.attributes['id'].substring(3)
    return id
  }

  private getElementId(el: any) {
    console.log(' el ', el)
    const id = el.attributes['id'].value.substring(3)
    return id
  }


  created() {
    const $service = this.$dragula.$service
    $service.options('first',
      {
        // isContainer: function (el) {
        //   return el.classList.contains('dragula-container')
        // },
        moves: function (el, source, handle, sibling) {
          // console.log('moves')
          return !el.classList.contains('donotdrag') // elements are always draggable by default
        },
        accepts: function (el, target, source, sibling) {
          // console.log('accepts dragging '+ el.id + ' from ' + source.id + ' to ' + target.id)
          return true // elements can be dropped in any of the `containers` by default
        },
        invalid: function (el, handle) {
          // console.log('invalid')
          return el.classList.contains('donotdrag') // don't prevent any drags from initiating by default
        },
        direction: 'vertical'
      })
    $service.eventBus.$on('dragend', (args) => {

      let itemdragend: IDrag = {
        // newIndex: this.getElementIndex(args.el),
        // oldIndex: this.getElementOldIndex(args.el)
        category: this.categoryAtt,
        newIndex: this.getElementIndex(args.el),
        oldIndex: this.getElementOldIndex(args.el)
      }

      this.onEnd(itemdragend)
    })

    let mythis = this

    $service.eventBus.$on('drag', function (el, source) {
      // mythis.inddragging = mythis.getElementIndex(el)
      console.log('+++ DRAG ind=', mythis.inddragging)
      mythis.scrollable = false
    })
    $service.eventBus.$on('drop', function (el, source) {
      console.log('+++ DROP')
      mythis.scrollable = true
    })


    this.load()
  }

  mounted() {
    // console.log('*** MOUNTED ***')

    this.categoryAtt = this.$route.params.category

    let mythis = this
    if (window) {
      window.addEventListener('touchmove', function (e) {
        // console.log('touchmove')
        if (!mythis.scrollable) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  }

  setarrPriority() {
    this.arrPrior = []
    const arr = tools.selectPriority[UserStore.state.lang]
    if (arr) {
      arr.forEach(rec => {
        this.arrPrior.push(rec.value)
      })
    }
    // console.log('Array PRIOR:', this.arrPrior)
  }

  async load() {
    console.log('LOAD TODO....')
    this.categoryAtt = this.$route.params.category

    // Set last category selected
    localStorage.setItem(tools.localStorage.categorySel, this.categoryAtt)

    for (let todosKey in tools.Todos) {
      this.listPriorityLabel.push(tools.Todos[todosKey])
    }
    // console.log('Priority:' + this.listPriorityLabel)
    this.setarrPriority()

    this.loadDone = true

    this.checkUpdate_everytime()

  }

  // Call to check if need to refresh
  checkUpdate_everytime() {
    this.polling = setInterval(() => {
      this.checkUpdate()
    }, 60000)
  }

  beforedestroy() {
    clearInterval(this.polling)
  }


  getPriorityByInd(index) {
    // console.log('LANG in PRIOR', UserStore.state.lang)
    try {
      const arr = tools.selectPriority[UserStore.state.lang]
      for (let rec of arr) {
        if (rec.value === index)
          return rec.label
      }
    } catch (e) {

    }
    return ''
  }

  isRegistered() {
    return localStorage.getItem(tools.localStorage.userId) !== ''
  }

  mydeleteItem(idobj: string) {
    console.log('mydeleteItem', idobj)
    return Todos.actions.deleteItem({ cat: this.categoryAtt, idobj })
  }

  insertTodo(atfirst: boolean = false) {
    let descr = this.todobottom.trim()
    if (atfirst)
      descr = this.todotop.trim()

    if (descr === '')
      return

    if (UserStore.state.userId === undefined) {
      this.$q.notify(this.$t('todo.usernotdefined'))
      return
    }

    if (!this.isRegistered()) {
      // Not logged
      this.$q.notify(this.$t('user.notregistered'))
      return
    }

    let myobj: ITodo = {
      descr: descr,
      category: this.categoryAtt
    }

    return Todos.actions.insertTodo({ myobj, atfirst })
      .then((data) => {

        console.log('data', data)
        if (data !== null)
          this.$q.notify(data)

        // empty the field
        if (atfirst)
          this.todotop = ''
        else
          this.todobottom = ''




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

  async updateitem({ myitem, field }) {
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

  deselectAllRows(item: ITodo, check, onlythis: boolean = false) {
    // console.log('deselectAllRows : ', item)

    for (let i = 0; i < this.$refs.single.length; i++) {

      let contr = <SingleTodo>this.$refs.single[i]
      // @ts-ignore
      let id = contr.itemtodo._id
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

  checkUpdate() {
    Todos.actions.waitAndcheckPendingMsg()
  }

  loadMoreTodo(index, done) {
    setTimeout(() => {
      this.actualMaxPosition += 15
      done()
    }, 100)

  }

  getArrTodos() {

    let mystr = ''
    let mythis = this

    mythis.tmpstrTodos = ''
    return globalroutines(null, 'readall', 'todos', null)
      .then(function (alldata) {
        const myrecs = [...alldata]

        myrecs.forEach(rec => {
          mystr = mystr + rec.descr + rec.completed + ']   ['
        })

        mythis.tmpstrTodos = 'TODOS: ' + mystr
      })
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
