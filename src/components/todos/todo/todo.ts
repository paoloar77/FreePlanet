import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

import { SingleTodo } from '../SingleTodo'
import { ITodo } from '@src/model'

import { rescodes } from '../../../store/Modules/rescodes'

import { Todos } from '@store'
import { UserStore } from '@store'

import _ from 'lodash'

import draggable from 'vuedraggable'

import VueIdb from 'vue-idb'

import globalroutines from '../../../globalroutines/index'

import $ from 'jquery'

@Component({

  components: { SingleTodo, draggable }
})
export default class Todo extends Vue {
  $q: any

  filter: boolean = false
  title: string = ''
  todo: string = ''
  todos_arr: ITodo[] = []
  drag: boolean = true
  startpos: number = 0
  listPriorityLabel: number[] = []
  arrPrior: number[] = []
  prioritySel: number = 0
  itemDragStart: any = null
  itemDragEnd: any = null
  selrowid: number = 0

  // @Prop({ required: false }) category: string

  $refs: {
    single: SingleTodo[]
  }

  @Watch('drag') changedrag() {
    console.log('drag = ' + this.drag)
  }

  @Watch('$route.params.category') changecat() {
    // console.log('changecat')
    this.load()
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

  async updateLinkedList(init: boolean, arr: ITodo[] = this.todos_arr) {

    // console.log('updateLinkedList', this.todos_arr)

    let idprev = ''
    let idnext = ''
    let pos = 1
    if (arr.length > 0) {
      idprev = arr[0].id_prev
      idnext = arr[0].id_next
    }
    await arr.forEach((elem, index) => {
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

      elem.modified = ((elem.id_prev !== idprev) || (elem.id_next !== idnext) || (elem.pos !== pos)) ? true : elem.modified
      elem.id_prev = idprev
      elem.id_next = idnext
      elem.pos = pos
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
      console.log('Newcompleted: ', completed)
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

    await this.updateLinkedList(false)

    // Updated only elements modified
    await this.updateModifyRecords(true)

  }

  async updateModifyRecords(refresh: boolean = false) {
    let update = false
    await this.todos_arr.forEach((elem: ITodo) => {
      if (elem.modified) {
        console.log('calling MODIFY 3')
        this.modify(elem, false)
        update = true
      }
    })

    if (update)
      await this.updatetable(refresh)
  }


  created() {
    this.load()
  }

  setarrPriority() {
    this.arrPrior = []
    const arr = rescodes.selectPriority[UserStore.state.lang]
    arr.forEach(rec => {
      this.arrPrior.push(rec.value)
    })
    // console.log('Array PRIOR:', this.arrPrior)
  }


  async load() {


    // Set last category selected
    localStorage.setItem(rescodes.localStorage.categorySel, this.getCategory())

    for (let todosKey in rescodes.Todos) {
      this.listPriorityLabel.push(rescodes.Todos[todosKey])
    }
    // console.log('Priority:' + this.listPriorityLabel)
    this.setarrPriority()
    this.clearArr()

    await this.updatetable()

    /*
        this.todos_arr.forEach((elem, index) => {
          this.logelem('LOAD ' + index, elem)
        })
    */

  }

  initcat() {

    const mydateexp = new Date().setDate((new Date()).getDate() + 1)

    console.log('User:' + UserStore.state.userId)

    const objtodo: ITodo = {
      _id: new Date().toISOString(),  // Create NEW
      userId: UserStore.state.userId,
      descr: '',
      priority: rescodes.Todos.PRIORITY_NORMAL,
      completed: false,
      created_at: new Date(),
      modify_at: new Date(),
      completed_at: null,
      category: '',
      expiring_at: mydateexp,
      enableExpiring: false,
      id_prev: '',
      id_next: '',
      pos: 0,
      modified: true,
      progress: 0
    }
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

  async insertTodo() {
    if (this.todo.trim() === '')
      return

    const objtodo = this.initcat()

    console.log('autologin userId STATE ', UserStore.state.userId)

    objtodo.descr = this.todo
    objtodo.category = this.getCategory()
    const lastelem: ITodo = this.getLastList()
    objtodo.id_prev = (lastelem !== null) ? lastelem._id : rescodes.LIST_START
    objtodo.id_next = rescodes.LIST_END
    objtodo.pos = (lastelem !== null) ? lastelem.pos + 1 : 1
    objtodo.modified = true

    if (objtodo.userId === undefined) {
      this.$q.notify(this.$t('todo.usernotdefined'))
      return
    }

    await globalroutines(this, 'write', 'todos', objtodo)
      .then((id) => {
        console.log('*** IDNEW (2) = ', id)

        // update also the last elem
        if (lastelem !== null) {
          lastelem.id_next = id
          lastelem.modified = true
          console.log('calling MODIFY 4', lastelem)
          this.modify(lastelem, false)
            .then(ris => {
              console.log('END calling MODIFY 4')

              this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS, 'POST', objtodo)
              this.updatetable(false)

            })
        } else {
          this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS, 'POST', objtodo)
          this.updatetable(false)
        }

      }).catch(err => {
      console.log('Errore: ' + err.message)
    })

    console.log('ESCO.........')

    // empty the field
    this.todo = ''
  }

  async cmdToSyncAndDb(cmd, table, method, item: ITodo, id, msg: String) {
    // Send to Server to Sync

    console.log('cmdToSyncAndDb', cmd, table, method, item, id, msg)

    const mythis = this
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      await navigator.serviceWorker.ready
        .then(function (sw) {
          // _id: new Date().toISOString(),
          console.log('----------------------      navigator.serviceWorker.ready')

          // mythis.sendMessageToSW(item, method)

          globalroutines(mythis, 'write', table, item, id)
            .then(function (id) {
              console.log('id', id)
              const sep = '|'

              let multiparams = cmd + sep + table + sep + method + sep + UserStore.state.idToken + sep + UserStore.state.lang
              return sw.sync.register(multiparams)
            })
            .then(function () {
              let snackbarContainer = document.querySelector('#confirmation-toast')
              let data = { message: msg }
              // snackbarContainer.MaterialSnackbar.showSnackbar(data)
            })
            .catch(function (err) {
              console.error('Errore in globalroutines', table, err)
            })
        })
    } else {
      if (cmd === rescodes.DB.CMD_SYNC_TODOS)
        Todos.actions.dbSaveTodo(item)
      else if (cmd === rescodes.DB.CMD_DELETE_TODOS)
        Todos.actions.dbDeleteTodo(id)
    }
  }

  saveItemToSyncAndDb(table: String, method, item: ITodo) {
    return this.cmdToSyncAndDb(rescodes.DB.CMD_SYNC_TODOS, table, method, item,  0, 'Your Post was saved for syncing!')
  }


  deleteItemToSyncAndDb(table: String, id) {
    return this.cmdToSyncAndDb(rescodes.DB.CMD_DELETE_TODOS, table, 'DELETE', null, id, 'Your Post was canceled for syncing!')
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
        this.modify(myobjprev, false)
      }

      if (myobjnext !== null) {
        myobjnext.id_prev = myobjtrov.id_prev
        myobjnext.modified = true
        console.log('calling MODIFY 1')
        this.modify(myobjnext, false)
      }

      this.deleteItemToSyncAndDb(rescodes.DB.TABLE_DELETE_TODOS, id)

      const mythis = this
      // Delete item
      await globalroutines(this, 'delete', 'todos', null, id)
        .then((ris) => {
          console.log('UpdateTable', ris)
          mythis.updatetable()
        }).catch((error) => {
        console.log('err: ', error)
      })
    }

    console.log('FINE deleteitem')
  }

  async updatetable(refresh: boolean = false) {
    await this.filtertodos(refresh)
  }

  clearArr() {
    this.todos_arr = []
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

  async filtertodos(refresh: boolean = false) {
    console.log('filtertodos')

    return await Todos.actions.getTodosByCategory(this.getCategory())
      .then(arrtemp => {

        arrtemp = _.orderBy(arrtemp, ['completed', 'priority', 'pos'], ['asc', 'desc', 'asc'])

        this.updateLinkedList(true, arrtemp)

        this.todos_arr = [...arrtemp]  // make copy
      })

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
    console.log('updateitem')
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
    if (recOut[field] !== recIn[field]) {
      recOut.modified = true
      recOut[field] = recIn[field]
      return recOut[field]
    }
    return false
  }


  async modify(myobj: ITodo, update: boolean) {
    await globalroutines(this, 'read', 'todos', null, myobj._id)
      .then(miorec => {
        console.log('ArrTodos: ', myobj.descr, '[', myobj._id, ']')

        if (miorec === undefined) {
          console.log('Record not Found !!!!!! id=', myobj._id)
          return
        }

        this.modifyField(miorec, myobj, 'descr')
        if (this.modifyField(miorec, myobj, 'completed'))
          miorec.completed_at = new Date()

        this.modifyField(miorec, myobj, 'category')
        this.modifyField(miorec, myobj, 'expiring_at')
        this.modifyField(miorec, myobj, 'priority')
        this.modifyField(miorec, myobj, 'id_prev')
        this.modifyField(miorec, myobj, 'id_next')
        this.modifyField(miorec, myobj, 'pos')
        this.modifyField(miorec, myobj, 'enableExpiring')
        this.modifyField(miorec, myobj, 'progress')


        if (miorec.modified) {
          miorec.modify_at = new Date()

          // this.logelem('modify', miorec)

          globalroutines(this, 'write', 'todos', miorec)
            .then(ris => {

              this.saveItemToSyncAndDb(rescodes.DB.TABLE_SYNC_TODOS, 'PATCH', miorec)

              if (update)
                this.updatetable(false)
            })
        }
      })
  }

}
