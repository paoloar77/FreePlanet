import { IProject, IProjectsState, IDrag, IMenuList, IAction } from 'model'
import { Privacy } from '@src/model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { tools } from './tools'
import { lists } from './lists'
import * as ApiTables from './ApiTables'
import { GlobalStore, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import objectId from '@src/js/objectId'
import { costanti } from '@src/store/Modules/costanti'
import { RouteNames } from '@src/router/route-names'
import * as Types from '@src/store/Api/ApiTypes'
import { serv_constants } from '@src/store/Modules/serv_constants'

const nametable = 'projects'

// import _ from 'lodash'

const stateglob: IProjectsState = {
  showtype: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
  projects: [],
  insidePending: false,
  visuLastCompleted: 10
}

const listFieldsToChange: string [] = ['descr', 'longdescr', 'hoursplanned', 'hoursleft', 'hoursworked', 'id_parent', 'statusproj',
  'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progressCalc', 'live_url', 'test_url',
  'begin_development', 'begin_test', 'actualphase', 'totalphases', 'hoursweeky_plannedtowork', 'endwork_estimate',
  'privacyread', 'privacywrite', 'id_main_project', 'typeproj', 'favourite', 'themecolor', 'themebgcolor']

const listFieldsUpdateCalculation: string [] = ['hoursplanned', 'hoursleft', 'hoursworked', 'progressCalc', 'endwork_estimate']

const b = storeBuilder.module<IProjectsState>('Projects', stateglob)
const stateGetter = b.state()

function getarrByCategory(category: string) {
  if (!stateglob.projects) {
    return []
  }
  return stateglob.projects
}

function initcat() {
  const rec = Getters.getters.getRecordEmpty()
  rec.userId = UserStore.state.userId

  return rec
}

function updateDataCalculated(projout, projin) {
  listFieldsUpdateCalculation.forEach((field) => {
    projout[field] = projin[field]
  })
}

function getproj(projects, idproj, tipoproj: string) {

  if (tipoproj === RouteNames.myprojects)
    return tools.mapSort(projects.filter((proj) => (proj.id_parent === idproj) && (proj.userId === UserStore.state.userId) && (proj.privacyread === Privacy.onlyme)))
  else if (tipoproj === RouteNames.projectsshared)
    return tools.mapSort(projects.filter((proj) => (proj.id_parent === idproj) && (proj.userId === UserStore.state.userId) && (proj.privacyread !== Privacy.onlyme)))
  else if (tipoproj === RouteNames.projectsall)
    return tools.mapSort(projects.filter((proj) => (proj.id_parent === idproj) && (proj.userId !== UserStore.state.userId) ))
}

namespace Getters {
  const getRecordEmpty = b.read((state: IProjectsState) => (): IProject => {
    // const tomorrow = tools.getDateNow()
    // tomorrow.setDate(tomorrow.getDate() + 1)

    const obj: IProject = {
      _id: objectId(),
      descr: '',
      longdescr: '',
      typeproj: 0,
      id_parent: '',
      id_main_project: '',
      priority: tools.Priority.PRIORITY_NORMAL,
      statusproj: tools.Status.OPENED,
      created_at: tools.getDateNow(),
      modify_at: tools.getDateNow(),
      completed_at: tools.getDateNull(),
      category: '',
      // expiring_at: tomorrow,
      enableExpiring: false,
      id_prev: '',
      pos: 0,
      modified: false,
      live_url: '',
      test_url: '',
      totalphases: 1,
      actualphase: 1,
      hoursworked: 0,
      hoursplanned: 0,
      hoursleft: 0,
      progressCalc: 0,
      privacyread: 'onlyme',
      privacywrite: 'onlyme',
      begin_development: tools.getDateNull(),
      begin_test: tools.getDateNull(),
      hoursweeky_plannedtowork: 0,
      endwork_estimate: tools.getDateNull(),
      themecolor: '',
      themebgcolor: ''
    }

    return obj
  }, 'getRecordEmpty')

  const projs_dacompletare = b.read((state: IProjectsState) => (id_parent: string, tipoproj: string): IProject[] => {
    // console.log('projs_dacompletare', miei)
    if (state.projects) {
      // console.log('state.projects', state.projects)
      return getproj(state.projects, id_parent, tipoproj)
    } else {
      return []
    }
  }, 'projs_dacompletare')

  const listaprojects = b.read((state: IProjectsState) => (tipoproj: string): IMenuList[] => {
    if (state.projects) {
      // console.log('state.projects', state.projects)
      const listaproj = getproj(state.projects, process.env.PROJECT_ID_MAIN, tipoproj)
      const myarr: IMenuList[] = []
      for (const proj of listaproj) {
        myarr.push({ nametranslate: '', description: proj.descr, idelem: proj._id })
      }
      // console.log('   myarr', myarr, listaproj)
      return myarr

    } else {
      return []
    }
  }, 'listaprojects')

  const getDescrById = b.read((state: IProjectsState) => (id: string): string => {
    if (id === process.env.PROJECT_ID_MAIN)
      return 'Projects'
    if (state.projects) {
      const itemtrov = state.projects.find((item) => item._id === id)
      if (!!itemtrov)
        return itemtrov.descr
    }

    return ''
  }, 'getDescrById')

  const getRecordById = b.read((state: IProjectsState) => (id: string): IProject => {
    if (state.projects) {
      return state.projects.find((item) => item._id === id)
    }
    return null
  }, 'getRecordById')

  const getifCanISeeProj = b.read((state: IProjectsState) => (proj: IProject): boolean => {
    if ((proj === undefined) || (proj === null))
      return false

    if (!!UserStore.state) {

      if (UserStore.state.userId === proj.userId)  // If it's the owner
        return true

      return (proj.privacyread === Privacy.all) ||
        (proj.privacyread === Privacy.friends) && (UserStore.getters.IsMyFriend(proj.userId))
        || ((proj.privacyread === Privacy.mygroup) && (UserStore.getters.IsMyGroup(proj.userId)))
    } else {
      return false
    }

  }, 'getifCanISeeProj')

  const CanIModifyPanelPrivacy = b.read((state: IProjectsState) => (proj: IProject): boolean => {
    if ((proj === undefined) || (proj === null))
      return false

    if (!!UserStore) {
      if (!!UserStore.state)
        return ((UserStore.state.userId === proj.userId) || (proj.privacywrite === Privacy.all))  // If it's the owner
      else
        return false
    }
    return false
  }, 'CanIModifyPanelPrivacy')

  export const getters = {
    get getifCanISeeProj() {
      return getifCanISeeProj()
    },
    get CanIModifyPanelPrivacy() {
      return CanIModifyPanelPrivacy()
    },
    get getRecordEmpty() {
      return getRecordEmpty()
    },
    get projs_dacompletare() {
      return projs_dacompletare()
    },
    get listaprojects() {
      return listaprojects()
    },
    get getDescrById() {
      return getDescrById()
    },
    get getRecordById() {
      return getRecordById()
    }
  }
}

namespace Mutations {

  function createNewItem(state: IProjectsState, { objproj, atfirst, categorySel }) {
    // console.log('createNewItem', objproj, 'cat=', categorySel, 'state.projects', state.projects)
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
  }

  function updateProject(state: IProjectsState, { objproj }) {
    if (!!objproj) {
      console.log('updateProject', objproj)
      const index = tools.getIndexById(state.projects, objproj._id)
      console.log('index', index)
      if (index >= 0) {
        updateDataCalculated(state.projects[index], objproj)

        // state.projects.splice(index, 1, objproj)
        // tools.notifyarraychanged(state.projects)
      }
    }
  }

  function deletemyitem(state: IProjectsState, myitem: IProject) {
    // Find record
    const ind = tools.getIndexById(state.projects, myitem._id)

    ApiTables.removeitemfromarray(state.projects, ind)
  }

  async function movemyitem(state: IProjectsState, { myitemorig, myitemdest } ) {
    const indorig = tools.getIndexById(state.projects, myitemorig._id)

    state.projects.splice(indorig, 1)
    state.projects.push(myitemdest)

    await Actions.actions.modify({ myitem: myitemdest, field: 'id_parent' })
  }

  export const mutations = {
    deletemyitem: b.commit(deletemyitem),
    createNewItem: b.commit(createNewItem),
    updateProject: b.commit(updateProject),
    movemyitem: b.commit(movemyitem)
  }

}

namespace Actions {

  async function dbLoad(context, { checkPending, onlyiffirsttime }) {

    if (onlyiffirsttime) {
      if (stateglob.projects.length > 0) {
        // if already set, then exit.
        return new Types.AxiosError(0, null, 0, '')
      }
    }

    // if (UserStore.state.userId === '') {
    //   return false  // Login not made
    // }

    console.log('dbLoad', nametable, checkPending, 'userid=', UserStore.state.userId)

    const ris = await Api.SendReq('/projects/' + UserStore.state.userId, 'GET', null)
      .then((res) => {
        if (res.data.projects) {  // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          stateglob.projects = res.data.projects
        } else {
          stateglob.projects = []
        }

        stateglob.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({
          id: costanti.CONFIG_ID_SHOW_TYPE_TODOS,
          default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED
        }), 10)

        if (process.env.DEBUG === '1') {
          console.log('dbLoad', 'state.projects', stateglob.projects)
        }

        return res
      })
      .catch((error) => {
        console.log('error dbLoad', error)
        UserStore.mutations.setErrorCatch(error)
        return new Types.AxiosError(serv_constants.RIS_CODE_ERR, null, tools.ERR_GENERICO, error)
      })

    ApiTables.aftercalling(ris, checkPending, nametable)
  }

  async function deleteItem(context, { idobj }) {
    console.log('deleteItem: KEY = ', idobj)

    const myarr = getarrByCategory('')

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
    objproj.id_parent = myobj.id_parent
    objproj.id_main_project = myobj.id_main_project
    objproj.typeproj = myobj.typeproj
    objproj.privacyread = myobj.privacyread
    objproj.privacywrite = myobj.privacywrite
    objproj.actualphase = myobj.actualphase

    let elemtochange: IProject = null

    const myarr = getarrByCategory(objproj.category)

    if (atfirst) {
      console.log('INSERT AT THE TOP')
      elemtochange = tools.getFirstList(myarr)
      objproj.id_prev = ApiTables.LIST_START
    } else {
      console.log('INSERT AT THE BOTTOM')
      // INSERT AT THE BOTTOM , so GET LAST ITEM
      const lastelem = tools.getLastListNotCompleted(nametable, objproj.id_parent, this.tipoProj)

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
    await ApiTables.Sync_SaveItem(nametable, 'POST', objproj)

    return id
  }

  async function modify(context, { myitem, field }) {
    return await ApiTables.table_ModifyRecord(nametable, myitem, listFieldsToChange, field)
  }

  async function swapElems(context, itemdragend: IDrag) {
    console.log('PROJECT swapElems', itemdragend, stateglob.projects)

    const myarr = Getters.getters.projs_dacompletare(itemdragend.id_proj, itemdragend.tipoproj)

    tools.swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange)

  }

  async function ActionCutPaste(context, action: IAction) {

    if (action.type === lists.MenuAction.CUT) {
      GlobalStore.state.lastaction = action
    } else if (action.type === lists.MenuAction.PASTE) {
      if (GlobalStore.state.lastaction.type === lists.MenuAction.CUT) {

        // Change id_parent
        const orig_obj = Getters.getters.getRecordById(GlobalStore.state.lastaction._id)
        const dest = Getters.getters.getRecordById(action._id)

        // console.log('dest', dest)

        const dest_obj = tools.jsonCopy(orig_obj)

        if (!!dest_obj) {
          dest_obj.id_parent = dest._id
          dest_obj.id_main_project = dest.id_main_project
          dest_obj.modified = true
          dest_obj.id_prev = null

          GlobalStore.state.lastaction.type = 0

          return await Mutations.mutations.movemyitem({ myitemorig: orig_obj, myitemdest: dest_obj })
        }
      }
    }
  }

  export const actions = {
    dbLoad: b.dispatch(dbLoad),
    swapElems: b.dispatch(swapElems),
    deleteItem: b.dispatch(deleteItem),
    dbInsert: b.dispatch(dbInsert),
    modify: b.dispatch(modify),
    ActionCutPaste: b.dispatch(ActionCutPaste)
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
