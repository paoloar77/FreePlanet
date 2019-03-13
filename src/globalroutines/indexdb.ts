import { Todos, UserStore } from '@store'
import _ from 'lodash'
import store, { GlobalStore } from '../store'

import { idbKeyval as storage } from '../js/storage.js'
import { costanti } from '../store/Modules/costanti'
import { ICfgData } from '@src/model'

function saveConfigIndexDb(context) {

  const data: ICfgData = {}
  data._id = costanti.CONFIG_ID_CFG
  data.lang = UserStore.state.lang
  data.token = UserStore.state.x_auth_token
  data.userId = UserStore.state.userId

  writeConfigIndexDb('config', data)
}

function writeConfigIndexDb(context, data) {
  // console.log('writeConfigIndexDb', data)

  storage.setdata('config', data)
    .then((ris) => {
      return true
    })

}

async function readfromIndexDbToStateTodos(context, table) {
  console.log('*** readfromIndexDbToStateTodos ***')

  return await storage.getalldata(table)
    .then((reccat) => {
      // console.log('&&&&&&& readfromIndexDbToStateTodos OK: Num RECORD: ', records.length)
      if (table === 'categories') {
        console.log('reccat', reccat)
        Todos.state.categories = []
        for (const indcat in reccat) {
          Todos.state.categories.push(reccat[indcat].valore)
        }

        console.log('ARRAY Categories', Todos.state.categories)

        return storage.getalldata('todos')
          .then((records) => {
            console.log('todos records', records)
            // console.log('&&&&&&& readfromIndexDbToStateTodos OK: Num RECORD: ', records.length)

/*
            for (const myrec in records) {
              const cat = myrec.category
              const indcat = state.categories.indexOf(cat)
              if (Todos.state.todos[indcat] === undefined) {
                Todos.state.todos[indcat] = {}
              }

              // add to the right array
              Todos.state.todos[indcat].push(myrec)

            }
*/

            console.log('************  ARRAYS SALVATI IN MEMORIA Todos.state.todos ', Todos.state.todos)
          })
      }

    }).catch((error) => {
      console.log('err: ', error)
    })

}

function consolelogpao(str, str2 = '', str3 = '') {
  console.log(str, str2, str3)
  // Todos.mutations.setTestpao(str + str2 + str3)
}

function testfunc2() {
  consolelogpao('testfunc2')

}

export default async (context, cmd, table, datakey = null, id = '') => {

  // console.log('TABLE', table, 'cmd', cmd)
  if (cmd === 'loadapp') {
    // ****** LOAD APP AL CARICAMENTO ! *******
    return saveConfigIndexDb(context)

  } else if (cmd === 'write') {
    if (GlobalStore) {
      GlobalStore.state.connData.uploading_indexeddb = 1
    }
    return await storage.setdata(table, datakey)
  } else if (cmd === 'updatefromIndexedDbToStateTodo') {
    return await readfromIndexDbToStateTodos(context, table)
  } else if (cmd === 'readall') {
    if (GlobalStore) {
      GlobalStore.state.connData.downloading_indexeddb = 1
    }
    return await storage.getalldata(table)
  } else if (cmd === 'count') {
    return await storage.count(table)
  } else if (cmd === 'read') {
    if (GlobalStore) {
      GlobalStore.state.connData.downloading_indexeddb = 1
    }
    return await storage.getdata(table, id)
  } else if (cmd === 'delete') {
    if (GlobalStore) {
      GlobalStore.state.connData.uploading_indexeddb = 1
    }
    return await storage.deletedata(table, id)
  } else if (cmd === 'clearalldata') {
    if (GlobalStore) {
      GlobalStore.state.connData.uploading_indexeddb = 1
    }
    return await storage.clearalldata(table)
  } else if (cmd === 'log') {
    consolelogpao(table)
  }
}