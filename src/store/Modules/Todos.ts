import { IGlobalState, ITodo, ITodosState } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { rescodes } from './rescodes'
import { GlobalStore, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { Mutation } from 'vuex-module-decorators'
import { serv_constants } from '@src/store/Modules/serv_constants'


const state: ITodosState = {
  visuOnlyUncompleted: false,
  networkDataReceived: false,
  todos: [],
  todos_changed: 1,
  reload_fromServer: false,
  testpao: 'Test',
  insidePending: false
}

const b = storeBuilder.module<ITodosState>('TodosModule', state)
const stateGetter = b.state()

// Getters
namespace Getters {

  const visuOnlyUncompleted = b.read(state => state.visuOnlyUncompleted, 'visuOnlyUncompleted')

  export const getters = {
    get visuOnlyUncompleted() {
      return visuOnlyUncompleted
    }
  }
}

namespace Mutations {

  function setTestpao(state: ITodosState, testpao: String) {
    state.testpao = testpao
  }

  function setTodos_changed(state: ITodosState) {
    state.todos_changed++
    mutations.setTestpao('Cambiato : ' + String(state.todos_changed))
    console.log('*******  state.todos_changed', state.todos_changed)
  }

  export const mutations = {
    setTestpao: b.commit(setTestpao),
    setTodos_changed: b.commit(setTodos_changed)
  }

}

function consolelogpao(strlog, strlog2 = '', strlog3 = '') {
  globalroutines(null, 'log', strlog + strlog2 + strlog3, null)
}


namespace Actions {

  function json2array(json) {
    let result = []
    let keys = Object.keys(json)
    keys.forEach(function (key) {
      result.push(json[key])
    })
    return result
  }

  // If something in the call of Service Worker went wrong (Network or Server Down), then retry !
  async function sendSwMsgIfAvailable() {
    let something = false

    if ('serviceWorker' in navigator) {
      console.log(' -------- sendSwMsgIfAvailable')

      let count = await checkPendingMsg(null)
      if (count > 0) {
        return navigator.serviceWorker.ready
          .then(function (sw) {

            globalroutines(null, 'readall', 'swmsg')
              .then(function (arr_recmsg) {
                // let recclone = [...arr_recmsg]
                if (arr_recmsg.length > 0) {

                  // console.log('      TROVATI MSG PENDENTI ! ORA LI MANDO: ', arr_recmsg)

                  // console.log('----------------------  2)    navigator (2) .serviceWorker.ready')

                  something = true
                  for (let rec of arr_recmsg) {
                    // console.log('             .... sw.sync.register ( ', rec._id)
                    // if ('SyncManager' in window) {
                    //   sw.sync.register(rec._id)
                    // } else {
                      // #Todo ++ Alternative to SyncManager
                      Api.syncAlternative(rec._id)
                    // }
                  }
                  return something
                }
              })

          })
      }
    }

    return something
  }

  async function waitAndcheckPendingMsg(context) {

    await aspettansec(1000)

    return await checkPendingMsg(context)
      .then(ris => {
        if (ris) {
          console.log('risPending = ', ris)
          const result = sendSwMsgIfAvailable()
            .then(something => {
              if (something) {
                // Refresh data
                waitAndRefreshData(context)
              }
            })
        }
      })

  }

  async function waitAndRefreshData(context) {
    await aspettansec(3000)

    return await dbLoadTodo(context, false)
  }

  async function checkPendingMsg(context) {
    // console.log('checkPendingMsg')

    const config = await globalroutines(null, 'readall', 'config', null)
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

      /*
              globalroutines(null, 'readall', 'swmsg')
                .then(function (arr_recmsg) {
                  if (arr_recmsg.length > 0) {
      */

      // Check if there is something
      globalroutines(null, 'count', 'swmsg')
        .then(function (count) {
          if (count > 0) {
            console.log('count = ', count)
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

  async function dbLoadTodo(context, checkPending: boolean = false) {
    console.log('dbLoadTodo', checkPending)

    if (UserStore.state.userId === '')
      return false // Login not made

    let call = process.env.MONGODB_HOST + '/todos/' + UserStore.state.userId

    state.networkDataReceived = false

    let ris = await Api.SendReq(call, 'GET', null)
      .then(({ res, body, status }) => {
        state.networkDataReceived = true

        // console.log('******* UPDATE TODOS.STATE.TODOS !:', res.todos)
        if (body.todos) {
          state.todos = [...body.todos]
          Todos.mutations.setTodos_changed()
        }

        console.log('**********  res', res, 'state.todos', state.todos, 'checkPending', checkPending)

        // After Login will store into the indexedDb...

        return { status }
      })
      .catch(error => {
        console.log('error=', error)
        UserStore.mutations.setErrorCatch(error)
        return { status }
      })

    // console.log('ris : ', ris)
    // console.log('ris STATUS: ', ris.status)

    if (!Todos.state.networkDataReceived) {

      if (ris.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
        consolelogpao('UNAUTHORIZING... TOKEN EXPIRED... !! ')
      } else {
        consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)', UserStore.getters.getServerCode, ris.status)
      }
      // Read all data from IndexedDB Store into Memory
      await updateArrayInMemory(context)
    } else {
      if (ris.status === rescodes.OK && checkPending) {
        waitAndcheckPendingMsg(context)
      }
    }
  }

  async function updateArrayInMemory(context) {
    // console.log('Update the array in memory, from todos table from IndexedDb')
    await globalroutines(null, 'updateinMemory', 'todos', null)
      .then(() => {
        // console.log('updateArrayInMemory! ')
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
      Todos.mutations.setTodos_changed()
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

  function UpdateNewIdFromDB(oldItem, newItem, method) {
    // console.log('PRIMA state.todos', state.todos)
    // console.log('ITEM', newItem)
    if (method === 'POST') {
      state.todos.push(newItem)
      Todos.mutations.setTodos_changed()
      // } else if (method === 'PATCH') {
      //   state.todos.map(item => {
      //     if (item._id === newItem._id) {
      //       return newItem
      //     }
      //   })
    }


    // console.log('DOPO state.todos', state.todos)
  }

  async function dbInsertSaveTodo(context, itemtodo: ITodo, method) {
    console.log('dbInsertSaveTodo', itemtodo, method)
    let call = process.env.MONGODB_HOST + '/todos'

    if (UserStore.state.userId === '')
      return false // Login not made

    if (method !== 'POST')
      call += '/' + itemtodo._id

    console.log('TODO TO SAVE: ', itemtodo)

    let res = await Api.SendReq(call, method, itemtodo)
      .then(({ res, newItem }) => {
        console.log('dbInsertSaveTodo RIS =', newItem)
        if (newItem) {

          // Update ID on local
          UpdateNewIdFromDB(itemtodo, newItem, method)
        }
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return res
  }

  async function dbDeleteTodo(context, item: ITodo) {
    // console.log('dbDeleteTodo', item)
    let call = process.env.MONGODB_HOST + '/todos/' + item._id

    if (UserStore.state.userId === '')
      return false // Login not made

    let res = await Api.SendReq(call, 'DELETE', item)
      .then(function ({ res, itemris }) {

        if (res.status === 200) {
          // Delete Item in to Array
          state.todos.splice(state.todos.indexOf(item), 1)

          Todos.mutations.setTodos_changed()
        }

        return rescodes.OK
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return res
  }

  async function getTodosByCategory(context, category: string) {
    let myarr = state.todos.filter((p) => {
      return p.category === category
    })

    return myarr
  }

  export const actions = {
    dbInsertTodo: b.dispatch(dbInsertTodo),
    dbSaveTodo: b.dispatch(dbSaveTodo),
    dbLoadTodo: b.dispatch(dbLoadTodo),
    dbDeleteTodo: b.dispatch(dbDeleteTodo),
    updateArrayInMemory: b.dispatch(updateArrayInMemory),
    getTodosByCategory: b.dispatch(getTodosByCategory),
    checkPendingMsg: b.dispatch(checkPendingMsg),
    waitAndcheckPendingMsg: b.dispatch(waitAndcheckPendingMsg)
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
