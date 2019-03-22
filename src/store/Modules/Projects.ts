import { IProject, IProjectsState, IParamTodo, IDrag } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import * as ApiTables from './ApiTables'
import { GlobalStore, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'

const nametable = 'projs'

// import _ from 'lodash'

const state: IProjectsState = {
  showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
  projs: {},
  categories: [],
  insidePending: false,
  visuLastCompleted: 10
}

const fieldtochange: string [] = ['descr', 'completed', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress']

const b = storeBuilder.module<IProjectsState>('Projects', state)
const stateGetter = b.state()

function getindexbycategory(category: string) {
  return state.categories.indexOf(category)
}

function gettodosByCategory(category: string) {
  const indcat = state.categories.indexOf(category)
  if (!state.projs[indcat]) {
    return []
  }
  return state.projs[indcat]
}

function isValidIndex(cat, index) {
  const myarr = gettodosByCategory(cat)
  return (index >= 0 && index < myarr.length)
}

function initcat() {

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const objproj: IProject = {
    // _id: new Date().toISOString(),  // Create NEW
    _id: objectId(),
    userId: UserStore.state.userId,
    descr: '',
    priority: tools.Priority.PRIORITY_NORMAL,
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
  // return this.copy(objproj)
  return objproj

}

namespace Getters {
  const projs_dacompletare = b.read((state: IProjectsState) => (cat: string): IProject[] => {
    const indcat = getindexbycategory(cat)
    if (state.projs[indcat]) {
      return state.projs[indcat].filter((proj) => !proj.completed)
    } else {
      return []
    }
  }, 'projs_dacompletare')

  const projs_completati = b.read((state: IProjectsState) => (cat: string): IProject[] => {
    const indcat = getindexbycategory(cat)
    if (state.projs[indcat]) {
      if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED) {
        return state.projs[indcat].filter((proj) => proj.completed).slice(0, state.visuLastCompleted)
      }  // Show only the first N completed
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL) {
        return state.projs[indcat].filter((proj) => proj.completed)
      }
      else {
        return []
      }
    } else {
      return []
    }
  }, 'projs_completati')

  const doneProjectsCount = b.read((state: IProjectsState) => (cat: string): number => {
    return getters.projs_completati(cat).length
  }, 'doneProjectsCount')
  const ProjectsCount = b.read((state: IProjectsState) => (cat: string): number => {
    const indcat = getindexbycategory(cat)
    if (state.projs[indcat]) {
      return state.projs[indcat].length
    } else {
      return 0
    }
  }, 'ProjectsCount')

  export const getters = {
    get projs_dacompletare() {
      return projs_dacompletare()
    },
    get projs_completati() {
      return projs_completati()
    },
    get doneProjectsCount() {
      return doneProjectsCount()
    },
    get ProjectsCount() {
      return ProjectsCount()
    }
  }
}

namespace Mutations {

  function findIndTodoById(state: IProjectsState, data: IParamTodo) {
    const indcat = state.categories.indexOf(data.categorySel)
    if (indcat >= 0) {
      return state.projs[indcat].findIndex((elem) => elem._id === data.id)
    }
    return -1
  }

  function createNewItem(state: IProjectsState, { objproj, atfirst, categorySel }) {
    let indcat = state.categories.indexOf(categorySel)
    if (indcat === -1) {
      state.categories.push(categorySel)
      indcat = state.categories.indexOf(categorySel)
    }
    console.log('createNewItem', objproj, 'cat=', categorySel, 'state.projs[indcat]', state.projs[indcat])
    if (state.projs[indcat] === undefined) {
      state.projs[indcat] = []
      state.projs[indcat].push(objproj)
      console.log('push state.projs[indcat]', state.projs)
      return
    }
    if (atfirst) {
      state.projs[indcat].unshift(objproj)
    }
    else {
      state.projs[indcat].push(objproj)
    }

    console.log('state.projs[indcat]', state.projs[indcat])

  }

  function deletemyitem(state: IProjectsState, myitem: IProject) {
    // Find record
    const indcat = state.categories.indexOf(myitem.category)
    const ind = findIndTodoById(state, { id: myitem._id, categorySel: myitem.category })

    ApiTables.removeitemfromarray(state.projs[indcat], ind)
  }

  export const mutations = {
    deletemyitem: b.commit(deletemyitem),
    createNewItem: b.commit(createNewItem)
  }

}

namespace Actions {

  async function dbLoadProjects(context, { checkPending }) {
    console.log('dbLoadProjects', checkPending, 'userid=', UserStore.state.userId)

    if (UserStore.state.userId === '') {
      return false  // Login not made
    }

    const ris = await Api.SendReq('/projects/' + UserStore.state.userId, 'GET', null)
      .then((res) => {
        if (res.data.projs) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.projs = res.data.projs
          state.categories = res.data.categories
        } else {
          state.projs = [[]]
        }

        state.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({
          id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
          default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED
        }), 10)

        // console.log('ARRAY TODOS = ', state.projs)
        if (process.env.DEBUG === '1') {
          console.log('dbLoadProjects', 'state.projs', state.projs, 'state.categories', state.categories)
        }

        return res
      })
      .catch((error) => {
        console.log('error dbLoadProjects', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

    ApiTables.aftercalling(ris, checkPending, 'categories')
  }

  async function deleteItem(context, { cat, idobj }) {
    console.log('deleteItem: KEY = ', idobj)

    const myarr = gettodosByCategory(cat)

    const myobjtrov = tools.getElemById(myarr, idobj)

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

  async function insertProject(context, { myobj, atfirst }) {

    const objproj = initcat()

    objproj.descr = myobj.descr
    objproj.category = myobj.category

    let elemtochange: IProject = null

    const myarr = gettodosByCategory(objproj.category)

    if (atfirst) {
      console.log('INSERT AT THE TOP')
      elemtochange = tools.getFirstList(myarr)
      objproj.id_prev = ApiTables.LIST_START
    } else {
      console.log('INSERT AT THE BOTTOM')
      // INSERT AT THE BOTTOM , so GET LAST ITEM
      const lastelem = tools.getLastListNotCompleted(nametable, objproj.category)

      objproj.id_prev = (!!lastelem) ? lastelem._id : ApiTables.LIST_START
    }
    objproj.modified = false

    Mutations.mutations.createNewItem({ objproj, atfirst, categorySel: objproj.category })    // 1) Create record in Memory

    const id = await globalroutines(context, 'write', nametable, objproj)           // 2) Insert into the IndexedDb

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
    return await ApiTables.Sync_SaveItem(nametable, 'POST', objproj)
      .then((ris) => {
        // *** Check if need to be moved because of the --- Priority Ordering --- ...

        const indelem = tools.getIndexById(myarr, objproj._id)
        let itemdragend
        if (atfirst) {
          // Check the second item, if it's different priority, then move to the first position of the priority
          const secondindelem = indelem + 1
          if (tools.isOkIndex(myarr, secondindelem)) {
            const secondelem = tools.getElemByIndex(myarr, secondindelem)
            if (secondelem.priority !== objproj.priority) {
              itemdragend = {
                field: 'priority',
                idelemtochange: objproj._id,
                prioritychosen: objproj.priority,
                category: objproj.category,
                atfirst
              }
            }
          }

        } else {
          // get previous of the last
          const prevlastindelem = indelem - 1
          if (tools.isOkIndex(myarr, prevlastindelem)) {
            const prevlastelem = tools.getElemByIndex(myarr, prevlastindelem)
            if (prevlastelem.priority !== objproj.priority) {
              itemdragend = {
                field: 'priority',
                idelemtochange: objproj._id,
                prioritychosen: objproj.priority,
                category: objproj.category,
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
    return await ApiTables.table_ModifyRecord(nametable, myitem, fieldtochange)
  }

  async function swapElems(context, itemdragend: IDrag) {
    console.log('swapElems', itemdragend)
    console.log('state.projs', state.projs)
    console.log('state.categories', state.categories)

    const cat = itemdragend.category
    const indcat = state.categories.indexOf(cat)
    const myarr = state.projs[indcat]

    tools.swapGeneralElem(nametable, myarr, itemdragend, fieldtochange)

  }

  export const actions = {
    dbLoadProjects: b.dispatch(dbLoadProjects),
    swapElems: b.dispatch(swapElems),
    deleteItem: b.dispatch(deleteItem),
    insertProject: b.dispatch(insertProject),
    modify: b.dispatch(modify)
  }

}

// Module
const ProjectsModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  mutations: Mutations.mutations,
  actions: Actions.actions
}

export default ProjectsModule
