import { ITodo, ITodosState } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { rescodes } from './rescodes'
import { UserStore } from '@store'


const state: ITodosState = {
  visuOnlyUncompleted: false,
  networkDataReceived: false,
  todos: []
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

  async function dbLoadTodo(context) {
    console.log('dbLoadTodo')

    const token = UserStore.state.idToken

    let call = process.env.MONGODB_HOST + '/todos/' + UserStore.state.userId

    state.networkDataReceived = false

    let ris = await Api.SendReq(call, UserStore.state.lang, token, 'GET', null)
      .then((res) => {
        return res.json()
      }).then((resData) => {
        state.networkDataReceived = true

        state.todos = resData.todos

        // After Login will store into the indexedDb...

        console.log('state.todos', state.todos)
        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERROREEEEEEEEE')
          console.log(error)
        }
        return rescodes.ERR_GENERICO
      })



  }

  async function dbSaveTodo(context, itemtodo: ITodo) {
    console.log('dbSaveTodo', itemtodo)
    let call = process.env.MONGODB_HOST + '/todos/' + itemtodo._id

    const token = UserStore.state.idToken

    let res = await Api.SendReq(call, UserStore.state.lang, token, 'PATCH', itemtodo)
      .then(function (res) {
        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERROREEEEEEEEE')
          console.log(error)
        }
        return rescodes.ERR_GENERICO
      })


    return res
  }

  async function dbDeleteTodo(context, id: String) {
    console.log('dbDeleteTodo', id)
    let call = process.env.MONGODB_HOST + '/todos/' + id

    const token = UserStore.state.idToken

    let res = await Api.SendReq(call, UserStore.state.lang, token, 'DELETE', id)
      .then(function (res) {
        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERROREEEEEEEEE', error)
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
    dbSaveTodo: b.dispatch(dbSaveTodo),
    dbLoadTodo: b.dispatch(dbLoadTodo),
    dbDeleteTodo: b.dispatch(dbDeleteTodo),
    getTodosByCategory: b.dispatch(getTodosByCategory)
  }

}


// Module
const TodosModule = {
  get state() {
    return stateGetter()
  },
  getters: Getters.getters,
  // mutations: Mutations.mutations,
  actions: Actions.actions
}

export default TodosModule
