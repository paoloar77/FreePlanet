import { IGlobalState, ITodo, ITodosState } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { rescodes } from './rescodes'
import { Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'


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

    console.log(' -------- sendSwMsgIfAvailable')

    let something = false

    let count = await checkPendingMsg(null)
    if (count > 0) {
      if (('serviceWorker' in navigator && 'SyncManager' in window)) {
        return navigator.serviceWorker.ready
          .then(function (sw) {

            globalroutines(null, 'readall', 'swmsg')
              .then(function (arr_recmsg) {
                let recclone = [...arr_recmsg]
                if (arr_recmsg.length > 0) {

                  console.log('      TROVATI MSG PENDENTI ! ORA LI MANDO: ', arr_recmsg)

                  console.log('----------------------  2)    navigator (2) .serviceWorker.ready')

                  something = true
                  for (let rec of arr_recmsg) {
                    console.log('             .... sw.sync.register ( ', rec._id)
                    sw.sync.register(rec._id)
                  }
                }
                return something
              })
          })
      }
    }
    return something
  }

  async function waitAndcheckPendingMsg(context) {

    await aspettansec(1000)

    // console.log('waitAndcheckPendingMsg')

    return await checkPendingMsg(context)
      .then(ris => {
        if (ris) {
          console.log('ris = ', ris)
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

    console.log('waitAndRefreshData')

    return await dbLoadTodo(context, false)
  }

  async function checkPendingMsg(context) {
    // console.log('checkPendingMsg')

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

    const token = UserStore.state.idToken

    let call = process.env.MONGODB_HOST + '/todos/' + UserStore.state.userId

    state.networkDataReceived = false

    let ris = await Api.SendReq(call, UserStore.state.lang, token, 'GET', null)
      .then((res) => {
        return res.json()
      }).then((resData) => {
        state.networkDataReceived = true

        // console.log('******* UPDATE TODOS.STATE.TODOS !:', resData.todos)
        state.todos = [...resData.todos]
        Todos.state.todos_changed++

        console.log('state.todos', state.todos, 'checkPending', checkPending)

        // After Login will store into the indexedDb...

        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          // console.log('dbLoadTodo ERRORE', error)
        }
        // If error network connection, take the data from IndexedDb

        return rescodes.ERR_GENERICO
      })

    console.log('fine della funz...')

    if (!Todos.state.networkDataReceived) {
      console.log('NETWORK UNREACHABLE ! (Error in fetch)')
      consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)')
      // Read all data from IndexedDB Store into Memory
      await updateArrayInMemory(context)
    } else {
      if (ris === rescodes.OK && checkPending) {
        waitAndcheckPendingMsg(context)
      }
    }
  }

  async function updateArrayInMemory(context) {
    console.log('Update the array in memory, from todos table from IndexedDb')
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
      Todos.state.todos_changed++
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
    console.log('PRIMA state.todos', state.todos)
    console.log('ITEM', newItem)
    if (method === 'POST') {
      state.todos.push(newItem)
      // } else if (method === 'PATCH') {
      //   state.todos.map(item => {
      //     if (item._id === newItem._id) {
      //       return newItem
      //     }
      //   })
    }


    console.log('DOPO state.todos', state.todos)
  }

  async function dbInsertSaveTodo(context, itemtodo: ITodo, method) {
    console.log('dbInsertSaveTodo', itemtodo, method)
    let call = process.env.MONGODB_HOST + '/todos/' + itemtodo._id

    const token = UserStore.state.idToken

    let res = await Api.SendReq(call, UserStore.state.lang, token, method, itemtodo)
      .then(function (response) {
        if (response)
          return response.json()
        else
          return null
      }).then(newItem => {
        console.log('RESDATA =', newItem)
        if (newItem) {
          const newId = newItem._id

          // if (method === 'PATCH') {
          //   newItem = newItem.todo
          // }

          // Update ID on local
          UpdateNewIdFromDB(itemtodo, newItem, method)
        }
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERRORE FETCH', 'dbInsertSaveTodo', method)
          console.log(error)
        }
        return rescodes.ERR_GENERICO
      })

    return res
  }

  async function dbDeleteTodo(context, item: ITodo) {
    console.log('dbDeleteTodo', item)
    let call = process.env.MONGODB_HOST + '/todos/' + item._id

    const token = UserStore.state.idToken

    let res = await Api.SendReq(call, UserStore.state.lang, token, 'DELETE', item)
      .then(function (res) {

        // Delete Item in to Array
        state.todos.splice(state.todos.indexOf(item), 1)

        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERRORE FETCH', 'dbDeleteTodo')
        }
        return rescodes.ERR_GENERICO
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
