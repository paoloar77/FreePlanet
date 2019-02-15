import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '../SingleTodo'
import { ITodo } from '@src/model'

import { rescodes } from '../../../store/Modules/rescodes'

import { Todos } from '@store'
import { UserStore } from '@store'

import objectId from '../../../js/objectId.js'

import _ from 'lodash'

import draggable from 'vuedraggable'

import VueIdb from 'vue-idb'

import globalroutines from '../../../globalroutines/index'

import $ from 'jquery'
import Api from '@api'

@Component({

  components: { SingleTodo, draggable }
})
export default class Todo extends Vue {
  $q: any

  filter: boolean = false
  title: string = ''
  todo: string = ''
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
  mytypetransgroup: string = 'flip-list'
  tmpstrTodos: string = ''
  loadDone: boolean = false

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
    this.mytypetransgroup = 'nessuno'
    this.updatetable(false, '$route.params.category').then(() => {
      this.mytypetransgroup = 'crossfade'
    })
  }

  get todos_changed() {
    return Todos.state.todos_changed
  }

  get reload_fromServer() {
    return Todos.state.reload_fromServer
  }

  set reload_fromServer(value: number) {
    Todos.state.reload_fromServer = value
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

  getFirstelem() {
    return this.todos_arr[this.todos_arr.length - 1]
  }

  onStart() {

    this.startpos = 0
    this.itemDragStart = null
  }

  updateLinkedList(init: boolean, arr: ITodo[] = this.todos_arr) {

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
      // if (elem.modified)
      //   console.log('MODIFICATO QUIIIIIIIIIIIIIIIIIIII', elem.id_prev, idprev, elem.id_next, idnext, elem.pos, pos)

      elem.id_prev = idprev
      elem.id_next = idnext
      if (elem.pos !== pos) {
        elem.modified = true
        elem.pos = pos
      }
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

  async onEnd(itemdragend) {
    console.log('newindex=', itemdragend.newIndex, 'oldindex=', itemdragend.oldIndex)

    if (itemdragend.newIndex === itemdragend.oldIndex)
      return // If nothing change, exit

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

    this.updateLinkedList(false)

    // Updated only elements modified
    await this.updateModifyRecords(true)

    await this.updatetable(false, 'onEnd')

  }

  async updateModifyRecords(refresh: boolean = false) {
    let update = false

    await this.todos_arr.forEach((elem: ITodo) => {
      if (elem.modified) {
        console.log('calling MODIFY 3')
        return this.modify(elem, false)
          .then(() => {
            update = true
            elem.modified = false
          })
      }
    })

    if (update)
      return await this.updatetable(refresh, 'updateModifyRecords')
  }


  async created() {
    await this.load()
  }

  setarrPriority() {
    this.arrPrior = []
    const arr = rescodes.selectPriority[UserStore.state.lang]
    arr.forEach(rec => {
      this.arrPrior.push(rec.value)
    })
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
    const arr = rescodes.selectPriority[UserStore.state.lang]
    for (let rec of arr) {
      if (rec.value === index)
        return rec.label
    }
    return ''
  }

  isRegistered() {
    return localStorage.getItem(rescodes.localStorage.userId) !== ''
  }

  async insertTodo() {
    if (this.todo.trim() === '')
      return

    if (!this.isRegistered()) {
      // Not logged
      this.$q.notify(this.$t('user.notregistered'))
      return
    }

    const objtodo = this.initcat()

    objtodo.descr = this.todo
    objtodo.category = this.getCategory()

    const lastelem: ITodo = this.getLastList()
    objtodo.id_prev = (lastelem !== null) ? lastelem._id : rescodes.LIST_START
    objtodo.id_next = rescodes.LIST_END
    objtodo.pos = (lastelem !== null) ? lastelem.pos + 1 : 1
    objtodo.modified = false

    if (objtodo.userId === undefined) {
      this.$q.notify(this.$t('todo.usernotdefined'))
      return
    }

    // 1) Insert into the IndexedDb
    const id = await globalroutines(this, 'write', 'todos', objtodo)
    // update also the last elem
    if (lastelem !== null) {
      lastelem.id_next = id
      // lastelem.modified = true
      // console.log('calling MODIFY 4', lastelem)
    }

    // Create record in Memory
    Todos.mutations.createNewItem(objtodo)

    // Modify the record above to the new last
    await this.modify(lastelem, false)

    // empty the field
    this.todo = ''

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

    return await Todos.actions.getTodosByCategory(this.getCategory())
      .then(arrris => {

        // this.todos_arr = []

        let arrtemp = [...arrris]

        arrtemp = _.orderBy(arrtemp, ['completed', 'priority', 'pos'], ['asc', 'desc', 'asc'])

        this.updateLinkedList(true, arrtemp)

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

  getFirstList(arrlist) {
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
      // console.log('***************  CAMPO ', field, 'MODIFICATO!')
      // console.log(recOut[field])
      // console.log(recIn[field])
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
          console.log('Todo MODIFICATO! ', miorec.descr, 'SALVALO SULLA IndexedDB todos')
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
          globalroutines(this, 'write', 'todos', miorec)
            .then(ris => {

              // 3) Modify on the Server (call)
              this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS_PATCH, 'PATCH', miorec, update)

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

}
