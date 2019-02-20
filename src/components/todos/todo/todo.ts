import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '../SingleTodo'
import { ITodo } from '@src/model'

import { rescodes } from '../../../store/Modules/rescodes'

import { Todos } from '@store'
import { UserStore } from '@store'

import objectId from '../../../js/objectId.js'

import _ from 'lodash'


// _.cloneDeep(  Per clonare un oggetto

import '../../../statics/css/dragula.css'

import globalroutines from '../../../globalroutines/index'

import $ from 'jquery'
import Api from '@api'

@Component({

  components: { SingleTodo }
})
export default class Todo extends Vue {
  $q: any

  filter: boolean = false
  title: string = ''
  todotop: string = ''
  todobottom: string = ''
  todos_arr: ITodo[] = []
  prevRecords: ITodo[] = []
  drag: boolean = true
  startpos: number = 0
  listPriorityLabel: number[] = []
  arrPrior: number[] = []
  prioritySel: number = 0
  itemDragStart: any = null
  itemDragEnd: any = null
  selrowid: number = 0
  polling = null
  mytypetransgroup: string = '' // 'flip-list'
  tmpstrTodos: string = ''
  loadDone: boolean = false
  public dragging: number
  public itemdrag: any = {}
  public service: any
  public actualMaxPosition: number = 15

  fieldtochange: String [] = ['descr', 'completed', 'category', 'expiring_at', 'priority', 'id_prev', 'id_next', 'pos', 'enableExpiring', 'progress']


  // @Prop({ required: false }) category: string

  $refs: {
    single: SingleTodo[]
  }

  @Watch('drag') changedrag() {
    console.log('drag = ' + this.drag)
  }


  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    // Some action
  }


  @Watch('$route.params.category') changecat() {
    // console.log('changecat')
    // this.mytypetransgroup = ''
    this.updatetable(false, '$route.params.category').then(() => {

      const mythis = this
      setTimeout(function () {
        // mythis.mytypetransgroup = 'crossfade'
      }, 1000)

    })
  }

  // Computed:
  get todos_changed() {
    return Todos.state.todos_changed
  }

  // Computed:
  get reload_fromServer() {
    return Todos.state.reload_fromServer
  }

  set reload_fromServer(value: number) {
    Todos.state.reload_fromServer = value
  }

  // Computed:
  get showingDataTodo() {
    return this.todos_arr.slice(0, this.actualMaxPosition)
  }


  @Watch('todos_changed', { immediate: true, deep: true })
  changetodos_changed(value: number, oldValue: number) {

    // this.$q.notify('Changed...')

    if ((value > 1) && (this.loadDone)) {
      // console.log('Todos.state.todos_changed CHANGED!', value, oldValue)
      this.updatetable(true, 'todos_changed')
    }
  }

  @Watch('reload_fromServer', { immediate: true })
  reload_fromServer_changed(value: number, oldValue: number) {
    if (value > 0) {
      // console.log('reload_fromServer_changed!', value, oldValue)
      // if (value) {
      Todos.actions.dbLoadTodo(false)
        .then(() => {
          // return Todos.actions.updatefromIndexedDbToStateTodo()
        })
    }
    // }
  }


  get testPao() {
    return Todos.state.testpao
  }

  @Watch('testPao', { immediate: true, deep: true })
  changedTestpao(value: string, oldValue: string) {
    // console.log('testpao CHANGED', value, oldValue)
    // this.updatetable(true, 'testPao')
  }

  isTodoByElem(elem) {
    return elem.descr.slice(-1) !== ':'
  }

  getArrTodos() {

    let mystr = ''
    let mythis = this

    mythis.tmpstrTodos = ''
    return globalroutines(null, 'readall', 'todos', null)
      .then(function (alldata) {
        const myrecs = [...alldata]

        myrecs.forEach(rec => {
          mystr = mystr + rec.descr + ']   ['
        })

        mythis.tmpstrTodos = 'TODOS: ' + mystr
      })
  }

  setArrTodos() {

    let mystr = ''
    let mythis = this

    mythis.tmpstrTodos = ''
    return globalroutines(null, 'write', 'todos', this.todos_arr[0])
      .then(function (alldata) {
        mythis.getArrTodos()
      })
  }

  getCategory() {
    return this.$route.params.category
    // return this.category
  }

  change(param) {
    console.log('Change... ' + param)
  }

  getmyid(id) {
    return 'row' + id
  }

  getrefbyid(id) {
    return 'single' + id
  }


  getelem(indelem, arr: ITodo[] = this.todos_arr) {
    return (indelem >= 0) && (indelem < arr.length) ? arr[indelem] : null
  }

  getLastElem() {
    if (this.todos_arr.length > 0)
      return this.todos_arr[this.todos_arr.length - 1]
    else
      return null
  }


  onStart() {

    this.startpos = 0
    this.itemDragStart = null
  }

  updateLinkedList(drag: boolean, init: boolean, arr: ITodo[] = this.todos_arr) {

    // console.log('updateLinkedList', this.todos_arr)

    let idprev = ''
    let idnext = ''
    let pos = 1
    if (arr.length > 0) {
      idprev = arr[0].id_prev
      idnext = arr[0].id_next
    }
    arr.forEach((elem, index) => {
      if (index === 0) {
        idprev = rescodes.LIST_START
      } else {
        const elemprev = this.getelem(index - 1, arr)
        idprev = elemprev._id
      }
      if (index === arr.length - 1) {
        idnext = rescodes.LIST_END
      } else {
        const elemnext = this.getelem(index + 1, arr)
        idnext = elemnext._id
      }

      // elem.modified = ((elem.id_prev !== idprev) || (elem.id_next !== idnext) || (elem.pos !== pos)) ? true : elem.modified
      // elem.modified = elem.pos !== pos ? true : elem.modified

      elem.id_prev = idprev
      elem.id_next = idnext
      if (elem.pos !== pos) {
        elem.modified = true
        elem.pos = pos
      }

      if (elem.modified)
        console.log('MODIFICATO QUIIIIIII', elem.descr, elem.pos, pos, elem.id_prev, elem.id_next)

      if (init) {
        elem.modified = false
      }

      pos++

      // this.logelem('updateLinked', elem)

    })
  }

  logelem(mystr, elem) {
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, ' Pr(', this.getPriorityByInd(elem.priority), ') [', elem.id_prev, '-', elem.id_next, '] modif=', elem.modified)
  }

  getPriorityToSet(ind1, ind2) {
    let elem1 = this.getelem(ind1)
    let elem2 = this.getelem(ind2)

    if ((elem1 !== null) && (elem2 !== null)) {
      if (elem1.priority === elem2.priority) {
        return elem1.priority
      } else {
        // if different priority then take the first
        return elem1.priority
      }
    } else {
      return (elem1 != null) ? elem1.priority : ((elem2 != null) ? elem2.priority : null)
    }
  }

  getCompleted(ind1, ind2) {
    let elem1 = this.getelem(ind1)
    let elem2 = this.getelem(ind2)

    if ((elem1 !== null) && (elem2 !== null)) {
      if (elem1.completed === elem2.completed) {
        return elem1.completed
      } else {
        return elem1.completed
      }
    } else {
      return (elem1 != null) ? elem1.completed : ((elem2 != null) ? elem2.completed : null)
    }

  }

  getTitlePriority(priority) {
    let cl = ''

    if (priority === rescodes.Todos.PRIORITY_HIGH)
      cl = 'high_priority'
    else if (priority === rescodes.Todos.PRIORITY_NORMAL)
      cl = 'medium_priority'
    else if (priority === rescodes.Todos.PRIORITY_LOW)
      cl = 'low_priority'

    return cl + ' titlePriority'
  }

  logga_arr(myarr: ITodo[]) {
    let mystr = '\n'
    myarr.forEach(item => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + this.getPriorityByInd(item.priority) + ') [' + item.id_prev + '-' + item.id_next + '] modif=' + item.modified + '\n'
      // mystr += '[' + item.pos + '] ' + item.descr + '\n'
    })

    return mystr
  }

  async onEnd(itemdragend) {
    console.log('3) newindex=', itemdragend.newIndex, 'oldindex=', itemdragend.oldIndex)

    if (itemdragend.newIndex === itemdragend.oldIndex)
      return // If nothing change, exit

    // console.log('this.todos_arr PRIMA', this.logga_arr(this.todos_arr))
    // console.log('this.state.todos PRIMA', this.logga_arr(Todos.state.todos))
    // MOVE
    this.todos_arr.splice(itemdragend.newIndex, 0, this.todos_arr.splice(itemdragend.oldIndex, 1)[0])

    // console.log('this.todos_arr DOPO 1', this.logga_arr(this.todos_arr))


    let myobj = this.getelem(itemdragend.newIndex)

    const indini = itemdragend.newIndex - 1
    const indfine = itemdragend.newIndex + 1
    console.log('indini', indini, 'indfine', indfine)
    // If the newIndex is between another priority, then change priority

    let completed = this.getCompleted(indini, indfine)
    let changecompleted = false
    if (completed != null) {
      myobj.modified = (myobj.completed !== completed) ? true : myobj.modified
      myobj.completed = completed
      changecompleted = true
      console.log('Newcompleted: ', completed, 'modif', myobj.modified)
    }

    if (!changecompleted) {
      // if I changed the completed, I don't have to put in other list priority
      let newpriority = this.getPriorityToSet(indini, indfine)
      if (newpriority != null && newpriority >= 0) {
        myobj.modified = (myobj.priority !== newpriority) ? true : myobj.modified
        myobj.priority = newpriority
        console.log('NewPriority: ', newpriority)
      }
    }

    this.updateLinkedList(false, false)

    // console.log('this.todos_arr DOPO ORDERLIST POS', this.logga_arr(this.todos_arr))
    // console.log('this.state.todos DOPÔ ORDERLIST POS', this.logga_arr(Todos.state.todos))

    // Updated only elements modified
    await this.updateModifyRecords(true)

    await this.updatetable(false, 'onEnd')

    // console.log('this.todos_arr DOPO 2', this.logga_arr(this.todos_arr))
    // console.log('this.state.todos DOPÔ 2', this.logga_arr(Todos.state.todos))

  }

  async updateModifyRecords(refresh: boolean = false) {
    let update = false
    // console.log('updateModifyRecords - INI')

    for (const elem of this.todos_arr) {
      if (elem.modified) {
        console.log('calling MODIFY 3')
        await this.modify(elem, false)
          .then(() => {
            update = true
            elem.modified = false
          })
      }
    }

    // console.log('updateModifyRecords - FINE')

    if (update)
      return await this.updatetable(refresh, 'updateModifyRecords')
  }

  async updateAll(drag?: boolean) {
    this.updateLinkedList(drag, false)

    // Updated only elements modified
    await this.updateModifyRecords(true)

    await this.updatetable(false, 'onEnd')

  }

  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el)
  }

  private getElementOldIndex(el: any) {
    return parseInt(el.attributes['index'].value)
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

      let itemdragend = {
        newIndex: this.getElementIndex(args.el),
        oldIndex: this.getElementOldIndex(args.el)
      }

      this.onEnd(itemdragend)
    })

    this.load()
  }

  setarrPriority() {
    this.arrPrior = []
    const arr = rescodes.selectPriority[UserStore.state.lang]
    if (arr) {
      arr.forEach(rec => {
        this.arrPrior.push(rec.value)
      })
    }
    // console.log('Array PRIOR:', this.arrPrior)
  }

  beforedestroy() {
    clearInterval(this.polling)
  }

  async load() {


    // this.todos_arr = [...Todos.state.todos]

    // Set last category selected
    localStorage.setItem(rescodes.localStorage.categorySel, this.getCategory())

    for (let todosKey in rescodes.Todos) {
      this.listPriorityLabel.push(rescodes.Todos[todosKey])
    }
    // console.log('Priority:' + this.listPriorityLabel)
    this.setarrPriority()

    await this.updatetable(false, 'load')

    this.loadDone = true

    this.checkUpdate_everytime()

  }

  // Call to check if need to refresh
  checkUpdate_everytime() {
    this.polling = setInterval(() => {
      this.checkUpdate()
    }, 10000)
  }

  initcat() {

    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)


    const objtodo: ITodo = {
      // _id: new Date().toISOString(),  // Create NEW
      _id: objectId(),
      userId: UserStore.state.userId,
      descr: '',
      priority: rescodes.Todos.PRIORITY_NORMAL,
      completed: false,
      created_at: new Date(),
      modify_at: new Date(),
      completed_at: new Date(),
      category: '',
      expiring_at: tomorrow,
      enableExpiring: false,
      id_prev: '',
      id_next: '',
      pos: 0,
      modified: false,
      progress: 0
    }
    // return this.copy(objtodo)
    return objtodo

  }

  getPriorityByInd(index) {
    // console.log('LANG in PRIOR', UserStore.state.lang)
    try {
      const arr = rescodes.selectPriority[UserStore.state.lang]
      for (let rec of arr) {
        if (rec.value === index)
          return rec.label
      }
    } catch (e) {

    }
    return ''
  }

  isRegistered() {
    return localStorage.getItem(rescodes.localStorage.userId) !== ''
  }

  async insertTodo(atfirst: boolean = false) {
    let descr = this.todobottom.trim()
    if (atfirst)
      descr = this.todotop.trim()

    if (descr === '')
      return

    if (!this.isRegistered()) {
      // Not logged
      this.$q.notify(this.$t('user.notregistered'))
      return
    }

    const objtodo = this.initcat()

    objtodo.descr = descr
    objtodo.category = this.getCategory()

    let elemtochange: ITodo

    if (atfirst) {
      elemtochange = this.getFirstList()
      objtodo.id_prev = rescodes.LIST_START
      objtodo.id_next = (elemtochange !== null) ? elemtochange._id : rescodes.LIST_END
      objtodo.pos = (elemtochange !== null) ? elemtochange.pos - 1 : 1
    } else {
      elemtochange = this.getLastList()
      objtodo.id_prev = (elemtochange !== null) ? elemtochange._id : rescodes.LIST_START
      objtodo.id_next = rescodes.LIST_END
      objtodo.pos = (elemtochange !== null) ? elemtochange.pos + 1 : 1
    }
    objtodo.modified = false

    console.log('objtodo', objtodo)

    if (objtodo.userId === undefined) {
      this.$q.notify(this.$t('todo.usernotdefined'))
      return
    }

    // Create record in Memory
    Todos.mutations.createNewItem({ objtodo, atfirst })

    // 1) Insert into the IndexedDb
    const id = await globalroutines(this, 'write', 'todos', objtodo)

    // update also the last elem
    if (atfirst) {
      if (elemtochange !== null) {
        elemtochange.id_prev = id
      }
    } else {
      if (elemtochange !== null) {
        elemtochange.id_next = id
      }
    }
    // Modify the other record
    await this.modify(elemtochange, false)

    // empty the field
    if (atfirst)
      this.todotop = ''
    else
      this.todobottom = ''

    this.updatetable(false, 'insertTodo')

    this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS, 'POST', objtodo, true)

    // console.log('ESCO.........')

  }


  async cmdToSyncAndDb(cmd, table, method, item: ITodo, id, msg: String, update: boolean) {
    // Send to Server to Sync

    console.log('cmdToSyncAndDb', cmd, table, method, item.descr, id, msg)

    let cmdSw = cmd
    if ((cmd === rescodes.DB.CMD_SYNC_NEW_TODOS) || (cmd === rescodes.DB.CMD_DELETE_TODOS)) {
      cmdSw = rescodes.DB.CMD_SYNC_TODOS
    }

    // if (process.env.DEV) {
    //   console.log('serviceWorker ', ('serviceWorker' in navigator) ? 'PRESENT!' : 'DOESN\'T EXIST!')
    //   console.log('SyncManager ', ('SyncManager' in window) ? 'PRESENT!' : 'DOESN\'T EXIST!')
    // }

    const mythis = this
    if ('serviceWorker' in navigator) {
      const ready = await navigator.serviceWorker.ready
        .then(function (sw) {
          // _id: new Date().toISOString(),
          // console.log('----------------------      navigator.serviceWorker.ready')

          return globalroutines(mythis, 'write', table, item, id)
            .then(function (id) {
              // console.log('id', id)
              const sep = '|'

              let multiparams = cmdSw + sep + table + sep + method + sep + UserStore.state.x_auth_token + sep + UserStore.state.lang
              let mymsgkey = {
                _id: multiparams,
                value: multiparams
              }
              return globalroutines(mythis, 'write', 'swmsg', mymsgkey, multiparams)
                .then(ris => {
                  // if ('SyncManager' in window) {
                  //   console.log('   SENDING... sw.sync.register', multiparams)
                  //   return sw.sync.register(multiparams)
                  // } else {
                  // #Todo ++ Alternative 2 to SyncManager
                  return Api.syncAlternative(multiparams)
                  // }
                })
                .then(function () {
                  if (msg !== '') {
                    let data = { message: msg, position: 'bottom', timeout: 3000 }
                    mythis.$q.notify(data)
                  }
                })
                .catch(function (err) {
                  console.error('Errore in globalroutines', table, err)
                })
            })
        })

      // if (update) {
      //   // // Update the array in memory, from IndexedDb update the todos array
      //   await Todos.actions.updatefromIndexedDbToStateTodo()
      //     .then((ris) => {
      //       return ris
      //     })
      // }

    }

    if (cmd === rescodes.DB.CMD_SYNC_NEW_TODOS) {
      if (method === 'POST')
        await Todos.actions.dbInsertTodo(item)
      else if (method === 'PATCH')
        await Todos.actions.dbSaveTodo(item)
    } else if (cmd === rescodes.DB.CMD_DELETE_TODOS) {
      await Todos.actions.dbDeleteTodo(item)
    }
  }

  async saveItemToSyncAndDb(table: String, method, item: ITodo, update: boolean) {
    // let msg = (method === 'PATCH') ? 'Modif: ' : '++Create: '
    // msg = msg + item.descr
    return await this.cmdToSyncAndDb(rescodes.DB.CMD_SYNC_NEW_TODOS, table, method, item, 0, '', update)
  }


  deleteItemToSyncAndDb(table: String, item: ITodo, id, update: boolean) {
    // let msg = 'Delete: ' + item.descr
    this.cmdToSyncAndDb(rescodes.DB.CMD_DELETE_TODOS, table, 'DELETE', item, id, '', update)
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


  getElemById(id, lista = this.todos_arr) {
    let myobj: ITodo
    for (myobj of lista) {
      if (myobj._id === id) {
        return myobj
      }
    }

    return null
  }

  async deleteitem(id) {
    console.log('deleteitem: KEY = ', id)


    let myobjtrov = this.getElemById(id)

    if (myobjtrov !== null) {
      let myobjprev = this.getElemById(myobjtrov.id_prev)
      let myobjnext = this.getElemById(myobjtrov.id_next)

      if (myobjprev !== null) {
        myobjprev.id_next = myobjtrov.id_next
        myobjprev.modified = true
        console.log('calling MODIFY 2')
        await this.modify(myobjprev, false)
      }

      if (myobjnext !== null) {
        myobjnext.id_prev = myobjtrov.id_prev
        myobjnext.modified = true
        console.log('calling MODIFY 1')
        await this.modify(myobjnext, false)
      }

      // 1) Delete from the Todos Array
      Todos.mutations.deletemyitem(myobjtrov)
      Todos.mutations.setTodos_changed()

      // 2) Delete from the IndexedDb
      globalroutines(this, 'delete', 'todos', null, id)
        .then((ris) => {
          // Update in to the UI
          this.updatetable(true, 'deleteitem')

        }).catch((error) => {
        console.log('err: ', error)
      })

      // 3) Delete from the Server (call)
      this.deleteItemToSyncAndDb(rescodes.DB.TABLE_DELETE_TODOS, myobjtrov, id, true)

    }

    // console.log('FINE deleteitem')
  }

  getElem(myarray: ITodo[], id) {
    for (let i = 0; i < myarray.length - 1; i++) {
      if (myarray[i]._id === id)
        return myarray[i]
    }
    return null
  }

  isRecordModifPos(itemnew: ITodo, itemold: ITodo) {
    return itemnew.pos !== itemold.pos
  }

  async updatetable(refresh: boolean = false, strpos = '') {
    console.log('updatetable', strpos)

    this.prevRecords = [...this.todos_arr]

    // To cloning an array...
    // this.prevRecords = _.cloneDeep(this.todos_arr)


    return await Todos.actions.getTodosByCategory(this.getCategory())
      .then(arrris => {

        // this.todos_arr = []

        let arrtemp = [...arrris]

        arrtemp = _.orderBy(arrtemp, ['completed', 'priority', 'pos'], ['asc', 'desc', 'asc'])

        this.updateLinkedList(false, true, arrtemp)

        // If changed the position, then set modified
        arrtemp.forEach(itemNew => {
          const itemOld = this.getElem(this.prevRecords, itemNew._id)
          if (itemOld)
            itemNew.modified = this.isRecordModifPos(itemNew, itemOld) ? true : false
        })

        this.todos_arr = [...arrtemp]  // make copy

        console.log('AGGIORNA todos_arr [', this.todos_arr.length, ']')

      })
  }

  clearArr() {
    // this.todos_arr = []
  }

  existArr(x) {
    return x = (typeof x !== 'undefined' && x instanceof Array) ? x : []
  }

  getFirstList(arrlist = this.todos_arr) {
    let elem: ITodo
    for (elem of arrlist) {
      if (elem.id_prev === rescodes.LIST_START) {
        return elem
      }
    }
    return null
  }

  getLastList(arrlist = this.todos_arr) {
    let elem: ITodo
    for (elem of arrlist) {
      if (elem.id_next === rescodes.LIST_END) {
        return elem
      }
    }
    return null
  }

  setArrayFinale(arrris) {

    // Sort List:
    let myarr = []

    let current = this.getFirstList(arrris)
    let currentprec = current

    if (current !== null)
      myarr.push(current)

    let index = -1
    while (current !== null && current.id_next !== rescodes.LIST_END && index < arrris.length) {
      this.logelem('current : ', current)
      console.log('id_next', current.id_next)
      // let changed = (prior !== elem.priority) ? true : false
      current = this.getElemById(current.id_next, arrris)
      if (current === null)
        break
      if (current._id === currentprec._id)
        break
      myarr.push(current)
      currentprec = current
      this.logelem('current AFTER : ', current)
      index++
    }

    return myarr


  }

  sortarr(arr, field) {

    return arr.slice().sort(function (a, b) {
      return a[field] - b[field]
    })

    // let ind1 = -1
    // let val1 = -1
    // for (let x = 0; x <= arr.length; x++) {
    //   if (x[field] < ind1) {
    //     val11 = x[field]
    //     ind1 = x
    //   }
    //   for (let y: ITodo = null of arr) {
    //
    //   }
    // }
  }

  updateitem(myobj) {
    console.log('calling MODIFY 4 updateitem')
    this.modify(myobj, true)
  }

  // inactiveAllButtons() {
  //   let divs = this.$children.filter(function (child) {
  //     return child.$attrs['component-type'] === 'my-custom-button'
  //   })
  //   divs.forEach(i => {
  //     divs[i].isActive = false
  //   })
  // }
  //

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

  // updateRow(rec: ITodo) {
  //   let index = -1
  //   // get index
  //   this.$refs.single.forEach( (singletodo: SingleTodo) => {
  //     if (singletodo.itemtodo._id === rec._id)
  //       index = -1
  //   })
  //
  // }

  modifyField(recOut, recIn, field) {
    if (String(recOut[field]) !== String(recIn[field])) {
      // console.log('***************  CAMPO ', field, 'MODIFICATO!', recOut[field], recIn[field])
      recOut.modified = true
      recOut[field] = recIn[field]
      return true
    }
    return false
  }


  async modify(myobj: ITodo, update: boolean) {
    if (myobj === null)
      return new Promise(function (resolve, reject) {
        resolve()
      })
    return await globalroutines(this, 'read', 'todos', null, myobj._id)
      .then(miorec => {
        if (miorec === undefined) {
          console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobj._id)
          return
        }

        if (this.modifyField(miorec, myobj, 'completed'))
          miorec.completed_at = new Date().getDate()

        this.fieldtochange.forEach(field => {
          this.modifyField(miorec, myobj, field)
        })


        if (miorec.modified) {
          // console.log('Todo MODIFICATO! ', miorec.descr, miorec.pos, 'SALVALO SULLA IndexedDB todos')
          miorec.modify_at = new Date().getDate()
          miorec.modified = false

          // 1) Modify on Global Memory
          Todos.mutations.modifymyItem(miorec)

          if (update) {
            // 4) Update the filter in Memory
            this.updatetable(false, 'modify')
          }

          // this.logelem('modify', miorec)
          // 2) Modify on IndexedDb
          return globalroutines(this, 'write', 'todos', miorec)
            .then(ris => {

              // 3) Modify on the Server (call)
              return this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS_PATCH, 'PATCH', miorec, update)

            })
        }
      })
  }

  clicktest() {
    console.log('clicktest!')

    const objtodo = this.initcat()
    objtodo.descr = 'PROVA'
    objtodo.category = this.getCategory()
    Todos.state.todos.push(objtodo)
    Todos.mutations.setTodos_changed()

    console.log('Todos.state.todos', Todos.state.todos)
  }

  clicktest2() {
    this.updatetable(false, 'clicktest')
    console.log('Todos.state.todos', Todos.state.todos)
  }

  checkUpdate() {
    Todos.actions.waitAndcheckPendingMsg()
  }

  /*
    dragStart(which, ev) {
      this.itemdrag.indTemp = which
      console.log('1) DRAG INIZIO: ', which)
      this.itemdrag.oldIndex = which
      this.dragging = which
    }

    public randomHexColor() {
      return Math.random().toString(16).slice(2, 8)
    }

    dragEnter(index, ev) {
      if (this.itemdrag.indTemp !== index) {
        console.log(`[${index}] DRAG ENTER`)
        this.itemdrag.indTemp = index

        this.getItemDrag(index).addClass('draggato2').removeClass('non-draggato')
      }
    }

    getItemDrag(index) {
      return $('div[name=REF' + index + ']')
    }

    dragLeave(index, ev) {
      if (this.itemdrag.indTemp !== index) {
        this.getItemDrag(index).addClass('non-draggato').removeClass('draggato')
      }
    }

    dragEnd(ev) {
      this.dragging = -1
    }

    dragFinish(to, ev) {
      this.itemdrag.indTemp = -1
      this.getItemDrag(to).addClass('non-draggato').removeClass('draggato')
      console.log('2) DRAG FINE: ', to)
      this.itemdrag.newIndex = to
      this.onEnd(this.itemdrag)

    }
  */

  loadMoreTodo(index, done) {
    setTimeout(() => {
      this.actualMaxPosition += 15
      done()
    }, 100)

  }


}
