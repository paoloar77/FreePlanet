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

const fieldtochange: String [] = ['descr', 'completed', 'category', 'expiring_at', 'priority', 'id_prev', 'pos', 'enableExpiring', 'progress']

const b = storeBuilder.module<ITodosState>('Todos', state)
const stateGetter = b.state()

function getindexbycategory(category: string) {
  return state.categories.indexOf(category)
}

function gettodosByCategory(category: string) {
  const indcat = state.categories.indexOf(category)
  if (!state.todos[indcat])
    return []
  return state.todos[indcat]
}

function isValidIndex(cat, index) {
  const myarr = gettodosByCategory(cat)
  return (index >= 0 && index < myarr.length)
}

function getElemByIndex(cat, index) {
  const myarr = gettodosByCategory(cat)

  if (index >= 0 && index < myarr.length)
    return myarr[index]
  else
    return null
}

function getElemById(cat, id) {
  const myarr = gettodosByCategory(cat)
  for (let indrec = 0; indrec < myarr.length; indrec++) {
    if (myarr[indrec]._id === id) {
      return myarr[indrec]
    }
  }

  return null
}

function getIndexById(cat, id) {
  const myarr = gettodosByCategory(cat)
  for (let indrec = 0; indrec < myarr.length; indrec++) {
    if (myarr[indrec]._id === id) {
      return indrec
    }
  }

  return -1
}

function getElemPrevById(cat, id_prev) {
  const myarr = gettodosByCategory(cat)
  for (let indrec = 0; indrec < myarr.length; indrec++) {
    if (myarr[indrec].id_prev === id_prev) {
      return myarr[indrec]
    }
  }

  return null
}

function getLastFirstElemPriority(cat: string, priority: number, atfirst: boolean, escludiId: string) {
  const myarr = gettodosByCategory(cat)
  if (myarr === null)
    return -1

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
    if (priority === tools.Todos.PRIORITY_LOW)
      return myarr.length - 1
    else if (priority === tools.Todos.PRIORITY_HIGH)
      return 0
  }
}

function getFirstList(cat) {
  const myarr = gettodosByCategory(cat)
  for (let indrec in myarr) {
    if (myarr[indrec].id_prev === tools.LIST_START) {
      return myarr[indrec]
    }
  }
  return null
}

function getLastListNotCompleted(cat) {
  const arr = Todos.getters.todos_dacompletare(cat)
  // console.log('cat', cat, 'arr', arr)
  if (arr.length > 0)
    return arr[arr.length - 1]
  else
    return null
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

  let tomorrow = new Date()
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

function deleteItemToSyncAndDb(table: String, item: ITodo, id) {
  cmdToSyncAndDbTodo(tools.DB.CMD_DELETE_TODOS, table, 'DELETE', item, id, '')
}

async function saveItemToSyncAndDb(table: String, method, item: ITodo) {
  return await cmdToSyncAndDbTodo(tools.DB.CMD_SYNC_NEW_TODOS, table, method, item, 0, '')
}

async function cmdToSyncAndDbTodo(cmd, table, method, item: ITodo, id, msg: String) {
  // Send to Server to Sync

  console.log('cmdToSyncAndDbTodo', cmd, table, method, item.descr, id, msg)

  const risdata = await tools.cmdToSyncAndDb(cmd, table, method, item, id, msg)

  if (cmd === tools.DB.CMD_SYNC_NEW_TODOS) {
    if (method === 'POST')
      await Todos.actions.dbInsertTodo(item)
    else if (method === 'PATCH')
      await Todos.actions.dbSaveTodo(item)
  } else if (cmd === tools.DB.CMD_DELETE_TODOS) {
    await Todos.actions.dbdeleteItem(item)
  }

  return risdata
}


namespace Getters {
  // const fullName = b.read(function fullName(state): string {
  //   return state.userInfos.firstname?capitalize(state.userInfos.firstname) + " " + capitalize(state.userInfos.lastname):null;
  // })
  const todos_dacompletare = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      return state.todos[indcat].filter(todo => !todo.completed)
    } else return []
  }, 'todos_dacompletare')

  const todos_completati = b.read((state: ITodosState) => (cat: string): ITodo[] => {
    const indcat = getindexbycategory(cat)
    if (state.todos[indcat]) {
      if (state.showtype === costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED)
        return state.todos[indcat].filter(todo => todo.completed).slice(0, state.visuLastCompleted)  // Show only the first N completed
      else if (state.showtype === costanti.ShowTypeTask.SHOW_ALL)
        return state.todos[indcat].filter(todo => todo.completed)
      else
        return []
    } else return []
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
    // get fullName() { return fullName();},
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

  function setTestpao(state: ITodosState, testpao: String) {
    state.testpao = testpao
  }

  function findTodoById(state: ITodosState, data: IParamTodo) {
    const indcat = state.categories.indexOf(data.categorySel)
    if (indcat >= 0) {
      if (state.todos[indcat]) {
        for (let i = 0; i < state.todos[indcat].length; i++) {
          if (state.todos[indcat][i]._id === data.id)
            return i
        }
      }
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
    if (atfirst)
      state.todos[indcat].unshift(objtodo)
    else
      state.todos[indcat].push(objtodo)

    console.log('state.todos[indcat]', state.todos[indcat])

  }

  function deletemyitem(state: ITodosState, myitem: ITodo) {
    // Find record
    const indcat = state.categories.indexOf(myitem.category)
    const ind = findTodoById(state, { id: myitem._id, categorySel: myitem.category })

    console.log('PRIMA state.todos', state.todos)
    // Delete Item in to Array
    if (ind >= 0)
      state.todos[indcat].splice(ind, 1)

    console.log('DOPO state.todos', state.todos, 'ind', ind)

    // tools.notifyarraychanged(state.todos[indcat])
  }


  export const mutations = {
    setTestpao: b.commit(setTestpao),
    deletemyitem: b.commit(deletemyitem),
    createNewItem: b.commit(createNewItem)
  }

}

function consolelogpao(strlog, strlog2 = '', strlog3 = '') {
  globalroutines(null, 'log', strlog + ' ' + strlog2 + ' ' + strlog3, null)
}


namespace Actions {

  // If something in the call of Service Worker went wrong (Network or Server Down), then retry !
  async function sendSwMsgIfAvailable() {
    let something = false

    if ('serviceWorker' in navigator) {
      console.log(' -------- sendSwMsgIfAvailable')

      let count = await checkPendingMsg(null)
      if (count > 0) {
        return await navigator.serviceWorker.ready
          .then(function (sw) {

            return globalroutines(null, 'readall', 'swmsg')
              .then(function (arr_recmsg) {
                // let recclone = [...arr_recmsg]
                if (arr_recmsg.length > 0) {

                  // console.log('----------------------  2)    navigator (2) .serviceWorker.ready')
                  let promiseChain = Promise.resolve()

                  for (let indrec in arr_recmsg) {
                    // console.log('             .... sw.sync.register ( ', rec._id)
                    // if ('SyncManager' in window) {
                    //   sw.sync.register(rec._id)
                    // } else {

                    // #Alternative to SyncManager
                    promiseChain = promiseChain.then(() => {
                      return Api.syncAlternative(arr_recmsg[indrec]._id)
                        .then(() => {
                          something = true
                        })
                    })

                    // }
                  }
                  return promiseChain
                }
              })

          })
      }
    }

    return new Promise(function (resolve, reject) {
      resolve(something)
    })
  }


  async function waitAndcheckPendingMsg(context) {

    // await aspettansec(1000)

    return await checkPendingMsg(context)
      .then(ris => {
        if (ris) {
          // console.log('risPending = ', ris)
          return sendSwMsgIfAvailable()
            .then(something => {
              if (something) {
                if (process.env.DEBUG === '1')
                  console.log('something')
                // Refresh data
                return waitAndRefreshData(context)
              }
            })
        }
      })
  }

  async function waitAndRefreshData(context) {
    // await aspettansec(3000)

    return await dbLoadTodo(context, { checkPending: false })
  }

  async function readConfig(id) {
    return await globalroutines(null, 'read', 'config', null, String(id))
  }

  async function checkPendingMsg(context) {
    // console.log('checkPendingMsg')

    const config = await globalroutines(null, 'read', 'config', null, '1')
    // console.log('config', config)

    try {
      if (config) {
        if (config[1].stateconn !== undefined) {
          // console.log('config.stateconn', config[1].stateconn)

          if (config[1].stateconn !== GlobalStore.state.stateConnection) {
            GlobalStore.mutations.setStateConnection(config[1].stateconn)
          }

        }
      }
    } catch (e) {
    }

    return new Promise(function (resolve, reject) {
      // Check if there is something
      return globalroutines(null, 'count', 'swmsg')
        .then(function (count) {
          if (count > 0) {
            // console.log('count = ', count)
            return resolve(true)
          } else {
            return resolve(false)
          }
        })
        .catch(e => {
          return reject()
        })
    })


  }

  async function dbLoadTodo(context, { checkPending }) {
    console.log('dbLoadTodo', checkPending, 'userid=', UserStore.state.userId)

    if (UserStore.state.userId === '')
      return false // Login not made

    let ris = await Api.SendReq('/todos/' + UserStore.state.userId, 'GET', null)
      .then(res => {
        if (res.data.todos) {
          // console.log('RISULTANTE CATEGORIES DAL SERVER = ', res.data.categories)
          // console.log('RISULTANTE TODOS DAL SERVER = ', res.data.todos)

          state.todos = res.data.todos
          state.categories = res.data.categories
        } else {
          state.todos = [[]]
        }

        // console.log('PRIMA showtype = ', state.showtype)

        state.showtype = parseInt(GlobalStore.getters.getConfigStringbyId({id: costanti.CONFIG_ID_SHOW_TYPE_TODOS, default: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED }))

        // console.log('showtype = ', state.showtype)

        // console.log('ARRAY TODOS = ', state.todos)
        if (process.env.DEBUG === '1')
          console.log('dbLoadTodo', 'state.todos', state.todos, 'state.categories', state.categories)

        return res
      })
      .catch(error => {
        console.log('error dbLoadTodo', error)
        UserStore.mutations.setErrorCatch(error)
        return error
      })

    if (ris.status !== 200) {
      if (process.env.DEBUG === '1')
        console.log('ris.status', ris.status)
      if (ris.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
        consolelogpao('UNAUTHORIZING... TOKEN EXPIRED... !! ')
      } else {
        consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)', UserStore.getters.getServerCode, ris.status)
      }
      if ('serviceWorker' in navigator) {
        // Read all data from IndexedDB Store into Memory
        await updatefromIndexedDbToStateTodo(context)
      }
    } else {
      if (ris.status === tools.OK && checkPending) {
        waitAndcheckPendingMsg(context)
      }
    }
  }

  async function updatefromIndexedDbToStateTodo(context) {
    // console.log('Update the array in memory, from todos table from IndexedDb')
    await globalroutines(null, 'updatefromIndexedDbToStateTodo', 'categories', null)
      .then(() => {
        console.log('updatefromIndexedDbToStateTodo! ')
        return true
      })
  }

  function aspettansec(numsec) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('anything')
      }, numsec)
    })
  }

  async function testfunc() {
    while (true) {
      consolelogpao('testfunc')
      // console.log('Todos.state.todos_changed:', Todos.state.todos_changed)
      await aspettansec(5000)
    }
  }

  async function dbSaveTodo(context, itemtodo: ITodo) {
    return await dbInsertSaveTodo(context, itemtodo, 'PATCH')
  }

  async function dbInsertTodo(context, itemtodo: ITodo) {
    return await dbInsertSaveTodo(context, itemtodo, 'POST')
  }

  async function dbInsertSaveTodo(context, itemtodo: ITodo, method) {

    if (!('serviceWorker' in navigator)) {

      console.log('dbInsertSaveTodo', itemtodo, method)
      let call = '/todos'

      if (UserStore.state.userId === '')
        return false // Login not made

      if (method !== 'POST')
        call += '/' + itemtodo._id

      console.log('TODO TO SAVE: ', itemtodo)

      let res = await Api.SendReq(call, method, itemtodo)
        .then(res => {
          console.log('dbInsertSaveTodo to the Server', res.data)

          return (res.status === 200)
        })
        .catch((error) => {
          UserStore.mutations.setErrorCatch(error)
          // return UserStore.getters.getServerCode
          return false
        })
    }

    return true
  }

  async function dbdeleteItem(context, item: ITodo) {

    if (!('serviceWorker' in navigator)) {
      // console.log('dbdeleteItem', item)
      if (UserStore.state.userId === '')
        return false // Login not made

      let res = await Api.SendReq('/todos/' + item._id, 'DELETE', item)
        .then(res => {
          console.log('dbdeleteItem to the Server')
        })
        .catch((error) => {
          UserStore.mutations.setErrorCatch(error)
          return UserStore.getters.getServerCode
        })

      return res
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

    let myobjtrov = getElemById(cat, idobj)

    if (myobjtrov !== null) {
      let myobjnext = getElemPrevById(cat, myobjtrov._id)

      if (myobjnext !== null) {
        myobjnext.id_prev = myobjtrov.id_prev
        myobjnext.modified = true
        console.log('calling MODIFY 1')
        await modify(context, { myitem: myobjnext, field: 'id_prev' })
      }

      // 1) Delete from the Todos Array
      Todos.mutations.deletemyitem(myobjtrov)

      // 2) Delete from the IndexedDb
      globalroutines(context, 'delete', 'todos', null, idobj)
        .then((ris) => {

        }).catch((error) => {
        console.log('err: ', error)
      })

      // 3) Delete from the Server (call)
      deleteItemToSyncAndDb(tools.DB.TABLE_DELETE_TODOS, myobjtrov, idobj)

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
    const id = await globalroutines(context, 'write', 'todos', objtodo)

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
    return await saveItemToSyncAndDb(tools.DB.TABLE_SYNC_TODOS, 'POST', objtodo)
      .then((ris) => {
        // Check if need to be moved...
        const indelem = getIndexById(objtodo.category, objtodo._id)
        let itemdragend = undefined
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

        if (itemdragend)
          swapElems(context, itemdragend)

        return ris

      })

  }


  async function modify(context, { myitem, field }) {
    if (myitem === null)
      return new Promise(function (resolve, reject) {
        resolve()
      })
    const myobjsaved = tools.jsonCopy(myitem)
    // get record from IndexedDb
    const miorec = await globalroutines(context, 'read', 'todos', null, myobjsaved._id)
    if (miorec === undefined) {
      console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobjsaved._id)
      return
    }

    if (setmodifiedIfchanged(miorec, myobjsaved, 'completed'))
      miorec.completed_at = new Date().getDate()

    fieldtochange.forEach(field => {
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
      return globalroutines(context, 'write', 'todos', miorec)
        .then(ris => {

          // 3) Modify on the Server (call)
          saveItemToSyncAndDb(tools.DB.TABLE_SYNC_TODOS_PATCH, 'PATCH', miorec)

        })
    }
  }

  // async function updateModifyRecords(context, cat: string) {
  //
  //   const indcat = getindexbycategory(cat)
  //   for (const elem of state.todos[indcat]) {
  //     if (elem.modified) {
  //       console.log('calling MODIFY 3')
  //       await modify(context, { myitem: elem, field })
  //         .then(() => {
  //           elem.modified = false
  //         })
  //     }
  //   }
  // }
  //


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
        let precind = itemdragend.newIndex - 1
        let nextind = itemdragend.newIndex + 1

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
    dbInsertTodo: b.dispatch(dbInsertTodo),
    dbSaveTodo: b.dispatch(dbSaveTodo),
    dbLoadTodo: b.dispatch(dbLoadTodo),
    dbdeleteItem: b.dispatch(dbdeleteItem),
    updatefromIndexedDbToStateTodo: b.dispatch(updatefromIndexedDbToStateTodo),
    checkPendingMsg: b.dispatch(checkPendingMsg),
    waitAndcheckPendingMsg: b.dispatch(waitAndcheckPendingMsg),
    swapElems: b.dispatch(swapElems),
    // updateModifyRecords: b.dispatch(updateModifyRecords),
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
