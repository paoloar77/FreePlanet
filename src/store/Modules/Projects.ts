import { IProject, IProjectsState, IParamTodo, IDrag } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import * as ApiTables from './ApiTables'
import { GlobalStore, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'

const nametable = 'projects'

// import _ from 'lodash'

const state: IProjectsState = {
  showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
  projects: [],
  insidePending: false,
  visuLastCompleted: 10
}

const fieldtochange: string [] = ['descr', 'completed', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress']

const b = storeBuilder.module<IProjectsState>('Projects', state)
const stateGetter = b.state()

// function getindexbycategory(category: string) {
//   return state.categories.indexOf(category)
// }

function getarrByCategory(category: string) {
  // const indcat = state.categories.indexOf(category)
  if (!state.projects) {
    return []
  }
  return state.projects
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
    progressCalc: 0
  }
  // return this.copy(objproj)
  return objproj

}

namespace Getters {
  const items_dacompletare = b.read((state: IProjectsState) => (cat: string): IProject[] => {
    if (state.projects) {
      return state.projects.filter((proj) => !proj.completed)
    } else {
      return []
    }
  }, 'items_dacompletare')

  const projs_completati = b.read((state: IProjectsState) => (cat: string): IProject[] => {
    if (state.projects) {
      if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED) {
        return state.projects.filter((proj) => proj.completed).slice(0, state.visuLastCompleted)
      }  // Show only the first N completed
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL) {
        return state.projects.filter((proj) => proj.completed)
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
    if (state.projects) {
      return state.projects.length
    } else {
      return 0
    }
  }, 'ProjectsCount')

  export const getters = {
    get items_dacompletare() {
      return items_dacompletare()
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

  function createNewItem(state: IProjectsState, { objproj, atfirst, categorySel }) {
    console.log('createNewItem', objproj, 'cat=', categorySel, 'state.projects', state.projects)
    if (state.projects === undefined) {
      state.projects = []
      state.projects.push(objproj)
      console.log('push state.projects', state.projects)
      return
    }
    if (atfirst) {
      state.projects.unshift(objproj)
    }
    else {
      state.projects.push(objproj)
    }

    console.log('state.projects', state.projects)

  }

  function deletemyitem(state: IProjectsState, myitem: IProject) {
    // Find record
    const ind = tools.getIndexById(state.projects, myitem._id)

    ApiTables.removeitemfromarray(state.projects, ind)
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

    const ris = await Api.SendReq('/projects/' + UserStore.state.userId, 'GET', null)
      .then((res) => {
        if (res.data.projects) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          state.projects = res.data.projects
        } else {
          state.projects = []
        }

        state.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({
          id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
          default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED
        }), 10)

        // console.log('ARRAY TODOS = ', state.projects)
        if (process.env.DEBUG === '1') {
          console.log('dbLoad', 'state.projects', state.projects)
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

  async function deleteItem(context, { cat, idobj }) {
    console.log('deleteItem: KEY = ', idobj)

    const myarr = getarrByCategory(cat)

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

  async function dbInsert(context, { myobj, atfirst }) {

    const objproj = initcat()

    objproj.descr = myobj.descr
    objproj.category = myobj.category

    let elemtochange: IProject = null

    const myarr = getarrByCategory(objproj.category)

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
    console.log('PROJECT swapElems', itemdragend, state.projects)

    const cat = itemdragend.category
    const myarr = state.projects

    tools.swapGeneralElem(nametable, myarr, itemdragend, fieldtochange)

  }

  export const actions = {
    dbLoad: b.dispatch(dbLoad),
    swapElems: b.dispatch(swapElems),
    deleteItem: b.dispatch(deleteItem),
    dbInsert: b.dispatch(dbInsert),
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
