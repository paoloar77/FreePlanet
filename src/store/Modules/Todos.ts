import VueIdb from 'vue-idb'
import { ISigninOptions, ITodo, ITodosState } from 'model'
import { storeBuilder } from './Store/Store'

import Api from '@api'
import { serv_constants } from '../Modules/serv_constants'
import { rescodes } from './rescodes'
import { UserStore } from '@store'
import { IResult } from 'model/other'


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

  function deleteItem(state: ITodosState, num: number) {
    // state.conta = num
    // Cancella Item
  }

  async function clearAllData(state: ITodosState) {
    // Delete item

    VueIdb.$db.todos
      .where('userId').equals(UserStore.state.userId)
      .delete()
      .then(() => {
        console.log('Todo clearAllData !')

        // state

      }).catch((error) => {
      console.log('err: ', error)
    })
  }

  async function readdbTodoData(state: ITodosState) {
    // Delete item

    VueIdb.$db.todos
      .where('userId').equals(UserStore.state.userId)
    // .and(todo => todo.category === this.getCategory())
      .toArray()
      .then(ristodos => {
        console.log('readdbTodoData OK !')
        state.todos = ristodos
      }).catch((error) => {
      console.log('err: ', error)
    })

  }

  export const mutations = {
    deleteItem: b.commit(deleteItem),
    clearAllData: b.commit(clearAllData),
    readdbTodoData: b.commit(readdbTodoData)
  }

}

namespace Actions {
  async function deleteItem(context, num: number) {
    Mutations.mutations.deleteItem(num)
  }

  function json2array(json){
    var result = []
    var keys = Object.keys(json);
    keys.forEach(function(key){
      result.push(json[key])
    });
    return result;
  }

  async function dbLoadTodo(context) {

    console.log('dbLoadTodo')

    const token = localStorage.getItem(rescodes.localStorage.token)

    let call = process.env.MONGODB_HOST + '/todos/' + UserStore.state.userId

    return await Api.SendReq(call, UserStore.state.lang, token, 'GET', null)
      .then((res) => {
        return res.json()
      }).then((resData) => {
        // console.log('res.todos:', res.todos)

        state.todos = []
        for(var i in resData.todos)
          state.todos.push(resData.todos [i])

        // state.todos = Object.keys(resData.todos).map((key) => {
        //   return resData.todos[key]
        // })

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
    let call = process.env.MONGODB_HOST + '/todos/' + itemtodo._id

    const token = localStorage.getItem(rescodes.localStorage.token)

    let res = await Api.SendReq(call, UserStore.state.lang, token, 'PATCH', itemtodo)
      .then(function (res) {
        state.networkDataReceived = true
        return rescodes.OK
      })
      .catch((error) => {
        if (process.env.DEV) {
          console.log('ERROREEEEEEEEE')
          console.log(error)
        }
        return rescodes.ERR_GENERICO
      })


    if ('indexedDB' in window) {
      await Mutations.mutations.readdbTodoData()
      if (!state.networkDataReceived) {
        console.log('From cache', state.todos)
      }
    }

    return res
  }

  async function getTodosByCategory(context, category: string) {
    let myarr = state.todos.filter((p) => {
      return p.category === category
    })

    return myarr
  }

  export const actions = {
    setConta: b.dispatch(deleteItem),
    dbSaveTodo: b.dispatch(dbSaveTodo),
    dbLoadTodo: b.dispatch(dbLoadTodo),
    getTodosByCategory: b.dispatch(getTodosByCategory)
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
