import store from '../store'
import _ from 'lodash'
import { UserStore, Todos } from '@store'
import { i18n } from '../plugins/i18n'

import {idbKeyval as storage} from '../js/storage.js';

function saveConfigIndexDb(context) {

  let data = []
  data['_id'] = 1
  data['lang'] = UserStore.state.lang
  data['token'] = UserStore.state.idToken
  data['userId'] = UserStore.state.userId

  writeConfigIndexDb('config', data)
}

function writeConfigIndexDb(context, data) {
  // console.log('writeConfigIndexDb', data)

  storage.setdata('config', data)
    .then(ris => {
      return true
    })

}

async function readfromIndexDbToStateTodos(context, table) {
  // console.log('*** read from IndexDb to state.todos')

  return await storage.getalldata(table)
    .then(records => {
      // console.log('&&&&&&& readfromIndexDbToStateTodos OK: Num RECORD: ', records.length)
      if (table === 'todos') {
        Todos.state.todos = [...records]
        Todos.state.todos_changed++
        // console.log('Todos.state.todos_changed:', Todos.state.todos_changed)
        // setTimeout(testfunc2, 3000)
      }
    }).catch((error) => {
    console.log('err: ', error)
  })

}

function consolelogpao(str, str2 = '', str3 = '') {
  console.log(str, str2, str3)
  // Todos.mutations.setTestpao(str + str2 + str3)
}

function testfunc2 () {
  consolelogpao('testfunc2')
  Todos.mutations.setTodos_changed()
  Todos.mutations.setTestpao(Todos.state.todos_changed)
  consolelogpao('testfunc2: Todos.state.todos_changed:', Todos.state.todos_changed)
}

export default async (context, cmd, table, datakey = null, id = '') => {
  if (cmd === 'loadapp') {
    // ****** LOAD APP AL CARICAMENTO ! *******
    return saveConfigIndexDb(context, datakey)

  } else if (cmd === 'write') {
    return await storage.setdata(table, datakey)
  } else if (cmd === 'updateinMemory') {
    return await readfromIndexDbToStateTodos(context, table)
  } else if (cmd === 'readall') {
    return await storage.getalldata(table)
  } else if (cmd === 'count') {
    return await storage.count(table)
  } else if (cmd === 'read') {
    return await storage.getdata(table, id)
  } else if (cmd === 'delete') {
    return await storage.deletedata(table, id)
  } else if (cmd === 'log') {
    consolelogpao(table)
  }
}
