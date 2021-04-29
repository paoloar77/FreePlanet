import { Projects, Todos, UserStore } from '@store'
import _ from 'lodash'
import { GlobalStore } from '../store/Modules'

import { idbKeyval as storage } from '../js/storage.js'
import { costanti } from '../store/Modules/costanti'
import { ICfgData, IGlobalState } from '@src/model'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'


function saveConfigIndexDb(context) {

  const data: ICfgData = {
    _id: costanti.CONFIG_ID_CFG,
    lang: toolsext.getLocale(),
    token: UserStore.state.x_auth_token,
    userId: UserStore.state.my._id
  }

  writeConfigIndexDb('config', data)
}

function writeConfigIndexDb(context, data) {
  // console.log('writeConfigIndexDb', data)

  storage.setdata('config', data)
}

async function readfromIndexDbToState(context, table) {
  console.log('*** readfromIndexDbToState ***', table)

  return await storage.getalldata(table)
    .then((reccat) => {
      // console.log('&&&&&&& readfromIndexDbToState OK: Num RECORD: ', records.length)
      if (table === 'categories') {
        console.log('reccat', reccat)
        Todos.state.categories = []
        for (const elem of reccat) {
          Todos.state.categories.push(elem.valore)
        }

        console.log('ARRAY Categories', Todos.state.categories)
        table = 'todos'

        return storage.getalldata(table)
          .then((records) => {
            console.log(table + ' records', records)
            // console.log('&&&&&&& readfromIndexDbToState OK: Num RECORD: ', records.length)

            const arrinit = []

            for (const mytodo of records) {
              const cat = mytodo.category
              const indcat = Todos.state.categories.indexOf(cat)
              if (arrinit.indexOf(indcat) < 0) {
                Todos.state.todos[indcat] = []
                arrinit.push(indcat)
              }

              Todos.state.todos[indcat].push(mytodo)

            }

            console.log('************  ARRAYS SALVATI IN MEMORIA ', table, records)
          })

      } else {
        const arrris = tools.setArrayMainByTable(table, reccat)
        console.log('************  ARRAYS SALVATI IN MEMORIA ', table, arrris)

      }

    }).catch((error) => {
      console.log('err readfromIndexDbToState: ', error)
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

  try {
    // console.log('TABLE', table, 'cmd', cmd)
    if (cmd === 'loadapp') {
      // ****** LOAD APP AL CARICAMENTO ! *******
      return saveConfigIndexDb(context)

    } else if (cmd === 'write') {
      if (GlobalStore) {
        GlobalStore.state.connData.uploading_indexeddb = 1
      }
      return await storage.setdata(table, datakey)
    } else if (cmd === 'updatefromIndexedDbToState') {
      return await readfromIndexDbToState(context, table)
    } else if (cmd === 'readall') {
      if (GlobalStore) {
        GlobalStore.state.connData.downloading_indexeddb = 1
        console.log('getalldata table', table)
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
  } catch (e) {
    console.error('error INDEXdb', e);
  }
}
