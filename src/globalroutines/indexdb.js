import store from '../store'
import _ from 'lodash'
import { UserStore } from '@modules'
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
  console.log('writeConfigIndexDb', data)

  storage.setdata('config', data)
    .then(ris => {
      return true
    })

}

async function readfromIndexDbToStateTodos(context) {
  console.log('*** read from IndexDb to state.todos')

  return await storage.getalldata('todos')
    .then(ristodos => {
      console.log('&&&&&&& readfromIndexDbToStateTodos OK: Num RECORD: ', ristodos.length)
      UserStore.state.todos = ristodos
    }).catch((error) => {
    console.log('err: ', error)
  })

}

export default async (context, cmd, table, datakey) => {
  if (cmd === 'loadapp') {
    // ****** LOAD APP AL CARICAMENTO ! *******
    return saveConfigIndexDb(context, datakey)


    if ('indexedDB' in window) {
      if (!UserStore.state.networkDataReceived) {
        return await readfromIndexDbToStateTodos(context)
      }
    }

  } else if (cmd === 'write') {
    return await storage.setdata(table, datakey)
  } else if (cmd === 'readall') {
    return await storage.getalldata(table)
  } else if (cmd === 'read') {
    return await storage.getdata(table, datakey)
  } else if (cmd === 'delete') {
    return await storage.deletedata(table, datakey)
  }
}
