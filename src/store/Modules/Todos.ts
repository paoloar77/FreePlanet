import { ITodo, ITodosState, IParamTodo, IDrag, IProjectsState, IProject, Privacy } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import * as ApiTables from './ApiTables'
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

const listFieldsToChange: string [] = ['descr', 'statustodo', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress', 'phase', 'assigned_to_userId', 'hoursplanned', 'hoursworked', 'start_date', 'completed_at']

const b = storeBuilder.module<ITodosState>('Todos', state)
const stateGetter = b.state()

function getindexbycategory(category: string) {
  return state.categories.indexOf(category)
}

function gettodosByCategory(category: string): [] {
  const indcat = state.categories.indexOf(category)
  if (!state.todos[indcat]) {
    return []
  }
  return state.todos[indcat]
}

function initcat() {

  let rec = Getters.getters.getRecordEmpty()
  rec.userId = UserStore.state.userId

  return rec

}

namespace Getters {
  const getRecordEmpty = b.read((state: ITodosState) => (): ITodo => {

    const tomorrow = tools.getDateNow()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const objtodo: ITodo = {
      // _id: tools.getDateNow().toISOString(),  // Create NEW
      _id: objectId(),
      userId: UserStore.state.userId,
      descr: '',
      priority: tools.Priority.PRIORITY_NORMAL,
      statustodo: tools.Status.OPENED,
      created_at: tools.getDateNow(),
      modify_at: tools.getDateNow(),
      completed_at: tools.getDateNull(),
      category: '',
      expiring_at: tomorrow,
      enableExpiring: false,
      id_prev: '',
      pos: 0,
      modified: false,
      progress: 0,
      progressCalc: 0,
      phase: 0,
      assigned_to_userId: '',
      hoursplanned: 0,
      hoursworked: 0,
      start_date: tools.getDateNull(),
    }
    // return this.copy(objtodo)
    return objtodo
  }, 'getRecordEmpty')
  const items_dacompletare = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      return state.todos[indcat].filter((todo) => todo.statustodo !== tools.Status.COMPLETED)
    } else {
      return []
    }
  }, 'items_dacompletare')

  const todos_completati = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED) {   // Show only the first N completed
        return state.todos[indcat].filter((todo) => todo.statustodo === tools.Status.COMPLETED).slice(0, state.visuLastCompleted)
      }
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE) {
        return []
      }
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL) {
        return state.todos[indcat].filter((todo) => todo.statustodo === tools.Status.COMPLETED)
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

  const getRecordById = b.read((state: ITodosState) => (id: string, cat: string): ITodo => {
    const indcat = getindexbycategory(cat)
    if (state.todos) {
      return state.todos[indcat].find((item) => item._id === id)
    }
    return null
  }, 'getRecordById')

  export const getters = {
    get getRecordEmpty() {
      return getRecordEmpty()
    },
    get items_dacompletare() {
      return items_dacompletare()
    },
    get todos_completati() {
      return todos_completati()
    },
    get doneTodosCount() {
      return doneTodosCount()
    },
    get TodosCount() {
      return TodosCount()
    },
    get getRecordById() {
      return getRecordById()
    }
  }
}

namespace Mutations {

  function findIndTodoById(state: ITodosState, data: IParamTodo) {
    const indcat = state.categories.indexOf(data.categorySel)
    if (indcat >= 0) {
      return tools.getIndexById(state.todos[indcat], data.id)
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
    const ind = findIndTodoById(state, { id: myitem._id, categorySel: myitem.category })

    ApiTables.removeitemfromarray(state.todos[indcat], ind)
  }

  export const mutations = {
    deletemyitem: b.commit(deletemyitem),
    createNewItem: b.commit(createNewItem)
  }

}

namespace Actions {

  async function dbLoad(context, { checkPending }) {
    console.log('dbLoad', nametable, checkPending, 'userid=', UserStore.state.userId)

    if (UserStore.state.userId === '') {
      return false  // Login not made
    }

    const ris = await Api.SendReq('/todos/' + UserStore.state.userId, 'GET', null)
      .then((res) => {
        if (res.data.todos) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.todos = res.data.todos
          state.categories = res.data.categories
        } else {
          state.todos = [[]]
        }

        state.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({
          id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
          default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED
        }), 10)

        // console.log('ARRAY TODOS = ', state.todos)
        if (process.env.DEBUG === '1') {
          console.log('dbLoad', 'state.todos', state.todos, 'state.categories', state.categories)
        }

        return res
      })
      .catch((error) => {
        console.log('error dbLoad', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

    ApiTables.aftercalling(ris, checkPending, 'categories')
  }

  async function deleteItemtodo(context, { cat, idobj }) {
    console.log('deleteItemtodo: KEY = ', idobj)

    const myarr = gettodosByCategory(cat)

    const myobjtrov = tools.getElemById(myarr, idobj)
    if (!!myobjtrov) {

      console.log('myobjtrov', myobjtrov.descr)

      if (!!myobjtrov) {
        const myobjnext = tools.getElemPrevById(myarr, myobjtrov._id)

        if (!!myobjnext) {
          myobjnext.id_prev = myobjtrov.id_prev
          myobjnext.modified = true
          await modify(context, { myitem: myobjnext, field: 'id_prev' })
        }

        ApiTables.table_DeleteRecord(nametable, myobjtrov, idobj)
      }
    }
  }

  async function dbInsert(context, { myobj, atfirst }) {

    const objtodo = initcat()

    objtodo.descr = myobj.descr
    objtodo.category = myobj.category

    let elemtochange: ITodo = null

    const myarr = gettodosByCategory(objtodo.category)

    if (atfirst) {
      console.log('INSERT AT THE TOP')
      elemtochange = tools.getFirstList(myarr)
      objtodo.id_prev = ApiTables.LIST_START
    } else {
      console.log('INSERT AT THE BOTTOM')
      // INSERT AT THE BOTTOM , so GET LAST ITEM
      const lastelem = tools.getLastListNotCompleted(nametable, objtodo.category)

      objtodo.id_prev = (!!lastelem) ? lastelem._id : ApiTables.LIST_START
    }
    objtodo.modified = false

    Todos.mutations.createNewItem({ objtodo, atfirst, categorySel: objtodo.category })    // 1) Create record in Memory

    const id = await globalroutines(context, 'write', nametable, objtodo)           // 2) Insert into the IndexedDb

    let field = ''
    if (atfirst) {    // update also the last elem
      if (!!elemtochange) {
        elemtochange.id_prev = id
        console.log('elemtochange', elemtochange)
        field = 'id_prev'

        // Modify the other record
        await modify(context, { myitem: elemtochange, field })
      }
    }

    // 3) send to the Server
    return await ApiTables.Sync_SaveItem(nametable, 'POST', objtodo)
      .then((ris) => {
        // *** Check if need to be moved because of the --- Priority Ordering --- ...

        const indelem = tools.getIndexById(myarr, objtodo._id)
        let itemdragend
        if (atfirst) {
          // Check the second item, if it's different priority, then move to the first position of the priority
          const secondindelem = indelem + 1
          if (tools.isOkIndex(myarr, secondindelem)) {
            const secondelem = tools.getElemByIndex(myarr, secondindelem)
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
          if (tools.isOkIndex(myarr, prevlastindelem)) {
            const prevlastelem = tools.getElemByIndex(myarr, prevlastindelem)
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
    return await ApiTables.table_ModifyRecord(nametable, myitem, listFieldsToChange, field)
  }

  async function swapElems(context, itemdragend: IDrag) {
    console.log('TODOS swapElems', itemdragend, state.todos, state.categories)

    const cat = itemdragend.category
    const indcat = state.categories.indexOf(cat)
    const myarr = state.todos[indcat]

    tools.swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange)

  }

  export const actions = {
    dbLoad: b.dispatch(dbLoad),
    swapElems: b.dispatch(swapElems),
    deleteItemtodo: b.dispatch(deleteItemtodo),
    dbInsert: b.dispatch(dbInsert),
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
