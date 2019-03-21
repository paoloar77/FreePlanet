import { ITodo, ITodosState, IParamTodo, IDrag } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import { GlobalStore, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { Mutation } from 'vuex-module-decorators'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { GetterTree } from 'vuex'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'

const nametable = 'todos'

// import _ from 'lodash'

const state: ITodosState = {
  showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
  todos: {},
  categories: [],
  // todos_changed: 1,
  reload_fromServer: 0,
  testpao: 'Test',
  insidePending: false,
  visuLastCompleted: 10
}

const fieldtochange: string [] = ['descr', 'completed', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress']

const b = storeBuilder.module<ITodosState>('Todos', state)
const stateGetter = b.state()

function getindexbycategory(category: string) {
  return state.categories.indexOf(category)
}

function gettodosByCategory(category: string) {
  const indcat = state.categories.indexOf(category)
  if (!state.todos[indcat]) {
    return []
  }
  return state.todos[indcat]
}

function isValidIndex(cat, index) {
  const myarr = gettodosByCategory(cat)
  return (index >= 0 && index < myarr.length)
}

function getElemByIndex(cat, index) {
  const myarr = gettodosByCategory(cat)

  if (index >= 0 && index < myarr.length) {
    return myarr[index]
  }
  else {
    return null
  }
}

function getElemById(cat, id) {
  const myarr = gettodosByCategory(cat)
  return myarr.find((elem) => elem._id === id)
}

function getIndexById(cat, id) {
  const myarr = gettodosByCategory(cat)
  return myarr.findIndex((elem) => elem._id === id)
}

function getElemPrevById(cat, id_prev) {
  const myarr = gettodosByCategory(cat)
  return myarr.find((elem) => elem._id === id_prev)
}

function getLastFirstElemPriority(cat: string, priority: number, atfirst: boolean, escludiId: string) {
  const myarr = gettodosByCategory(cat)
  if (myarr === null) {
    return -1
  }

  let trovato: boolean = false

  console.log('priority', priority)

  for (let indrec = 0; indrec < myarr.length; indrec++) {
    if ((myarr[indrec].priority === priority) && (myarr[indrec]._id !== escludiId)) {
      trovato = true
      if (atfirst) {
        return indrec - 1
      }
    } else {
      if (trovato) {
        return indrec
      }
    }
  }

  console.log('trovato?', trovato, 'indrec')

  if (trovato) {
    return myarr.length - 1
  } else {
    if (priority === tools.Todos.PRIORITY_LOW) {
      return myarr.length - 1
    }
    else if (priority === tools.Todos.PRIORITY_HIGH) {
      return 0
    }
  }
}

function getFirstList(cat) {
  const myarr = gettodosByCategory(cat)
  return myarr.find((elem) => elem.id_prev === tools.LIST_START)
}

function getLastListNotCompleted(cat) {
  const arr = Todos.getters.todos_dacompletare(cat)
  // console.log('cat', cat, 'arr', arr)
  if (arr.length > 0) {
    return arr[arr.length - 1]
  }
  else {
    return null
  }
}

function getstrelem(elem) {
  return 'ID [' + elem._id + '] ' + elem.descr + ' [ID_PREV=' + elem.id_prev + '] modif=' + elem.modified
}

function update_idprev(indcat, indelemchange, indelemId) {
  if (indelemchange >= 0 && indelemchange < state.todos[indcat].length) {
    const id_prev = (indelemId >= 0) ? state.todos[indcat][indelemId]._id : tools.LIST_START
    if (state.todos[indcat][indelemchange].id_prev !== id_prev) {
      state.todos[indcat][indelemchange].id_prev = id_prev
      tools.notifyarraychanged(state.todos[indcat][indelemchange])
      // state.todos[indcat][indelemchange].modified = true
      console.log('Index=', indelemchange, 'indtoget', indelemId, getstrelem(state.todos[indcat][indelemchange]))
      return state.todos[indcat][indelemchange]
    }
  }
  return null
}

function initcat() {

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const objtodo: ITodo = {
    // _id: new Date().toISOString(),  // Create NEW
    _id: objectId(),
    userId: UserStore.state.userId,
    descr: '',
    priority: tools.Todos.PRIORITY_NORMAL,
    completed: false,
    created_at: new Date(),
    modify_at: new Date(),
    completed_at: new Date(),
    category: '',
    expiring_at: tomorrow,
    enableExpiring: false,
    id_prev: '',
    pos: 0,
    modified: false,
    progress: 0
  }
  // return this.copy(objtodo)
  return objtodo

}

namespace Getters {
  const todos_dacompletare = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      return state.todos[indcat].filter((todo) => !todo.completed)
    } else {
      return []
    }
  }, 'todos_dacompletare')

  const todos_completati = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED) {
        return state.todos[indcat].filter((todo) => todo.completed).slice(0, state.visuLastCompleted)
      }  // Show only the first N completed
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL) {
        return state.todos[indcat].filter((todo) => todo.completed)
      }
      else {
        return []
      }
    } else {
      return []
    }
  }, 'todos_completati')

  const doneTodosCount = b.read((state: ITodosState) => (cat: string): number => {
    return getters.todos_completati(cat).length
  }, 'doneTodosCount')
  const TodosCount = b.read((state: ITodosState) => (cat: string): number => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      return state.todos[indcat].length
    } else {
      return 0
    }
  }, 'TodosCount')

  export const getters = {
    get todos_dacompletare() {
      return todos_dacompletare()
    },
    get todos_completati() {
      return todos_completati()
    },
    get doneTodosCount() {
      return doneTodosCount()
    },
    get TodosCount() {
      return TodosCount()
    }
  }
}

namespace Mutations {

  function findTodoById(state: ITodosState, data: IParamTodo) {
    const indcat = state.categories.indexOf(data.categorySel)
    if (indcat >= 0) {
      return state.todos[indcat].find((elem) => elem._id === data.id)
    }

    return -1
  }

  function createNewItem(state: ITodosState, { objtodo, atfirst, categorySel }) {
    let indcat = state.categories.indexOf(categorySel)
    if (indcat == -1) {
      state.categories.push(categorySel)
      indcat = state.categories.indexOf(categorySel)
    }
    console.log('createNewItem', objtodo, 'cat=', categorySel, 'state.todos[indcat]', state.todos[indcat])
    if (state.todos[indcat] === undefined) {
      state.todos[indcat] = []
      state.todos[indcat].push(objtodo)
      console.log('push state.todos[indcat]', state.todos)
      return
    }
    if (atfirst) {
      state.todos[indcat].unshift(objtodo)
    }
    else {
      state.todos[indcat].push(objtodo)
    }

    console.log('state.todos[indcat]', state.todos[indcat])

  }

  function deletemyitem(state: ITodosState, myitem: ITodo) {
    // Find record
    const indcat = state.categories.indexOf(myitem.category)
    const ind = findTodoById(state, { id: myitem._id, categorySel: myitem.category })

    console.log('PRIMA state.todos', state.todos)
    // Delete Item in to Array
    if (ind >= 0) {
      state.todos[indcat].splice(ind, 1)
    }

    console.log('DOPO state.todos', state.todos, 'ind', ind)

  }

  export const mutations = {
    // setTestpao: b.commit(setTestpao),
    deletemyitem: b.commit(deletemyitem),
    createNewItem: b.commit(createNewItem)
  }

}

namespace Actions {

  async function dbLoadTodo(context, { checkPending }) {
    console.log('dbLoadTodo', checkPending, 'userid=', UserStore.state.userId)

    if (UserStore.state.userId === '') {
      return false
    } // Login not made

    const ris = await Api.SendReq('/todos/' + UserStore.state.userId, 'GET', null)
      .then((res) => {
        if (res.data.todos) {
          // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.todos = res.data.todos
          state.categories = res.data.categories
        } else {
          state.todos = [[]]
        }

        // console.log('PRIMA showtype = ', state.showtype)

        state.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({
          id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
          default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED
        }), 10)

        // console.log('ARRAY TODOS = ', state.todos)
        if (process.env.DEBUG === '1') {
          console.log('dbLoadTodo', 'state.todos', state.todos, 'state.categories', state.categories)
        }

        return res
      })
      .catch((error) => {
        console.log('error dbLoadTodo', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

    if (ris.status !== 200) {
      if (process.env.DEBUG === '1') {
        console.log('ris.status', ris.status)
      }
      if (ris.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
        tools.consolelogpao('UNAUTHORIZING... TOKEN EXPIRED... !! ')
      } else {
        tools.consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)', UserStore.getters.getServerCode, ris.status)
      }
      if ('serviceWorker' in navigator) {
        // Read all data from IndexedDB Store into Memory
        await tools.updatefromIndexedDbToStateTodo('categories')
      }
    } else {
      if (ris.status === tools.OK && checkPending) {
        tools.waitAndcheckPendingMsg()
      }
    }
  }

  function aspettansec(numsec) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('anything')
      }, numsec)
    })
  }

  async function testfunc() {
    while (true) {
      tools.consolelogpao('testfunc')
      // console.log('Todos.state.todos_changed:', Todos.state.todos_changed)
      await aspettansec(5000)
    }
  }

  function setmodifiedIfchanged(recOut, recIn, field) {
    if (String(recOut[field]) !== String(recIn[field])) {
      // console.log('***************  CAMPO ', field, 'MODIFICATO!', recOut[field], recIn[field])
      recOut.modified = true
      recOut[field] = recIn[field]
      return true
    }
    return false
  }

  async function deleteItem(context, { cat, idobj }) {
    console.log('deleteItem: KEY = ', idobj)

    const myobjtrov = getElemById(cat, idobj)

    if (!!myobjtrov) {
      const myobjnext = getElemPrevById(cat, myobjtrov._id)

      if (!!myobjnext) {
        myobjnext.id_prev = myobjtrov.id_prev
        myobjnext.modified = true
        console.log('calling MODIFY 1')
        await modify(context, { myitem: myobjnext, field: 'id_prev' })
      }

      // 1) Delete from the Todos Array
      Todos.mutations.deletemyitem(myobjtrov)

      // 2) Delete from the IndexedDb
      globalroutines(context, 'delete', nametable, null, idobj)
        .catch((error) => {
          console.log('err: ', error)
        })

      // 3) Delete from the Server (call)
      tools.deleteItemToSyncAndDb(nametable, myobjtrov, idobj)

    }

    // console.log('FINE deleteItem')
  }

  async function insertTodo(context, { myobj, atfirst }) {

    const objtodo = initcat()

    objtodo.descr = myobj.descr
    objtodo.category = myobj.category

    let elemtochange: ITodo = null

    if (atfirst) {
      console.log('INSERT AT THE TOP')
      elemtochange = getFirstList(objtodo.category)
      objtodo.id_prev = tools.LIST_START
      // objtodo.pos = (elemtochange !== null) ? elemtochange.pos - 1 : 1
    } else {
      console.log('INSERT AT THE BOTTOM')
      // INSERT AT THE BOTTOM , so GET LAST ITEM
      const lastelem = getLastListNotCompleted(objtodo.category)

      console.log('lastelem', lastelem)

      objtodo.id_prev = (lastelem !== null) ? lastelem._id : tools.LIST_START
      // objtodo.pos = (elemtochange !== null) ? elemtochange.pos + 1 : 1
    }
    console.log('elemtochange TORNATO:', elemtochange)
    objtodo.modified = false

    console.log('objtodo', objtodo, 'ID_PREV=', objtodo.id_prev)

    // 1) Create record in Memory
    Todos.mutations.createNewItem({ objtodo, atfirst, categorySel: objtodo.category })

    // 2) Insert into the IndexedDb
    const id = await globalroutines(context, 'write', nametable, objtodo)

    let field = ''
    // update also the last elem
    if (atfirst) {
      if (elemtochange !== null) {
        elemtochange.id_prev = id
        console.log('elemtochange', elemtochange)
        field = 'id_prev'

        // Modify the other record
        await modify(context, { myitem: elemtochange, field })
      }
    }

    // 3) send to the Server
    return await tools.saveItemToSyncAndDb(nametable, 'POST', objtodo)
      .then((ris) => {
        // Check if need to be moved...
        const indelem = getIndexById(objtodo.category, objtodo._id)
        let itemdragend
        if (atfirst) {
          // Check the second item, if it's different priority, then move to the first position of the priority
          const secondindelem = indelem + 1
          if (isValidIndex(objtodo.category, secondindelem)) {
            const secondelem = getElemByIndex(objtodo.category, secondindelem)
            if (secondelem.priority !== objtodo.priority) {
              itemdragend = {
                field: 'priority',
                idelemtochange: objtodo._id,
                prioritychosen: objtodo.priority,
                category: objtodo.category,
                atfirst
              }
            }
          }

        } else {
          // get previous of the last
          const prevlastindelem = indelem - 1
          if (isValidIndex(objtodo.category, prevlastindelem)) {
            const prevlastelem = getElemByIndex(objtodo.category, prevlastindelem)
            if (prevlastelem.priority !== objtodo.priority) {
              itemdragend = {
                field: 'priority',
                idelemtochange: objtodo._id,
                prioritychosen: objtodo.priority,
                category: objtodo.category,
                atfirst
              }
            }
          }
        }

        if (itemdragend) {
          swapElems(context, itemdragend)
        }

        return ris

      })

  }

  async function modify(context, { myitem, field }) {
    if (myitem === null) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
    const myobjsaved = tools.jsonCopy(myitem)
    // get record from IndexedDb
    const miorec = await globalroutines(context, 'read', nametable, null, myobjsaved._id)
    if (miorec === undefined) {
      console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobjsaved._id)
      return
    }

    if (setmodifiedIfchanged(miorec, myobjsaved, 'completed')) {
      miorec.completed_at = new Date().getDate()
    }

    fieldtochange.forEach((field) => {
      setmodifiedIfchanged(miorec, myobjsaved, field)
    })

    if (miorec.modified) {
      // console.log('Todo MODIFICATO! ', miorec.descr, miorec.pos, 'SALVALO SULLA IndexedDB todos')
      miorec.modify_at = new Date().getDate()
      miorec.modified = false

      // 1) Permit to Update the Views
      tools.notifyarraychanged(miorec)

      // Todos.mutations.modifymyItem(miorec)

      // this.logelem('modify', miorec)
      // 2) Modify on IndexedDb
      return globalroutines(context, 'write', nametable, miorec)
        .then((ris) => {

          // 3) Modify on the Server (call)
          tools.saveItemToSyncAndDb(nametable, 'PATCH', miorec)

        })
    }
  }

  async function swapElems(context, itemdragend: IDrag) {
    console.log('swapElems', itemdragend)
    console.log('state.todos', state.todos)
    console.log('state.categories', state.categories)
    const cat = itemdragend.category
    const indcat = state.categories.indexOf(cat)

    if (itemdragend.field === 'priority') {
      // get last elem priority
      console.log('get last elem priority')
      itemdragend.newIndex = getLastFirstElemPriority(itemdragend.category, itemdragend.prioritychosen, itemdragend.atfirst, itemdragend.idelemtochange)
      itemdragend.oldIndex = getIndexById(itemdragend.category, itemdragend.idelemtochange)

      console.log('swapElems PRIORITY', itemdragend)
    }

    console.log('indcat', indcat)

    if (isValidIndex(cat, indcat) && isValidIndex(cat, itemdragend.newIndex) && isValidIndex(cat, itemdragend.oldIndex)) {
      console.log('isValidIndex')
      state.todos[indcat].splice(itemdragend.newIndex, 0, state.todos[indcat].splice(itemdragend.oldIndex, 1)[0])
      tools.notifyarraychanged(state.todos[indcat][itemdragend.newIndex])
      tools.notifyarraychanged(state.todos[indcat][itemdragend.oldIndex])

      if (itemdragend.field !== 'priority') {
        const precind = itemdragend.newIndex - 1
        const nextind = itemdragend.newIndex + 1

        if (isValidIndex(cat, precind) && isValidIndex(cat, nextind)) {
          if ((state.todos[indcat][precind].priority === state.todos[indcat][nextind].priority) && (state.todos[indcat][precind].priority !== state.todos[indcat][itemdragend.newIndex].priority)) {
            console.log('   1)')
            state.todos[indcat][itemdragend.newIndex].priority = state.todos[indcat][precind].priority
            tools.notifyarraychanged(state.todos[indcat][itemdragend.newIndex])
          }
        } else {
          if (!isValidIndex(cat, precind)) {
            if ((state.todos[indcat][nextind].priority !== state.todos[indcat][itemdragend.newIndex].priority)) {
              console.log('   2)')
              state.todos[indcat][itemdragend.newIndex].priority = state.todos[indcat][nextind].priority
              tools.notifyarraychanged(state.todos[indcat][itemdragend.newIndex])
            }

          } else {
            if ((state.todos[indcat][precind].priority !== state.todos[indcat][itemdragend.newIndex].priority)) {
              console.log('   3)')
              state.todos[indcat][itemdragend.newIndex].priority = state.todos[indcat][precind].priority
              tools.notifyarraychanged(state.todos[indcat][itemdragend.newIndex])
            }
          }

        }
      }

      // Update the id_prev property
      const elem1 = update_idprev(indcat, itemdragend.newIndex, itemdragend.newIndex - 1)
      const elem2 = update_idprev(indcat, itemdragend.newIndex + 1, itemdragend.newIndex)
      const elem3 = update_idprev(indcat, itemdragend.oldIndex, itemdragend.oldIndex - 1)
      const elem4 = update_idprev(indcat, itemdragend.oldIndex + 1, itemdragend.oldIndex)

      // Update the records:
      await modify(context, { myitem: elem1, field: 'id_prev' })
      await modify(context, { myitem: elem2, field: 'id_prev' })
      await modify(context, { myitem: elem3, field: 'id_prev' })
      await modify(context, { myitem: elem4, field: 'id_prev' })
    }

  }

  export const actions = {
    dbLoadTodo: b.dispatch(dbLoadTodo),
    swapElems: b.dispatch(swapElems),
    deleteItem: b.dispatch(deleteItem),
    insertTodo: b.dispatch(insertTodo),
    modify: b.dispatch(modify)
  }

}

// Module
const TodosModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}

export default TodosModule
