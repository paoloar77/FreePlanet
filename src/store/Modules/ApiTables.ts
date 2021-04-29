import Api from '@api'
import { ITodo } from '@src/model'
import { GlobalStore, Todos, Projects, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { tools } from '@src/store/Modules/tools'
import { toolsext } from '@src/store/Modules/toolsext'

export const OtherTables = ['config', 'swmsg']
// export const MainTables = ['todos', 'projects']
export const MainTables = []
export const allMethod = ['sync_post_', 'sync_patch_', 'delete_', 'hide_']

export function getLinkByTableName(nametable) {
  if (nametable === 'todos') {
    return 'todos'
  } else if (nametable === 'projects') {
    return 'projects'
  }
}

export const LIST_START = null

export const DB = {
  CMD_SYNC: 'sync',
  CMD_SYNC_NEW: 'sync-new',
  CMD_DELETE: 'sync-delete',
  CMD_HIDE: 'sync-hide',
  TABLE_SYNC_POST: 'sync_post_',
  TABLE_SYNC_PATCH: 'sync_patch_',
  TABLE_DELETE: 'delete_',
  TABLE_HIDE: 'hide_'
}

export function allTables() {
  const myarr = OtherTables
  for (const tab of MainTables) {
    for (const method of allMethod) {
      myarr.push(method + tab)
    }
  }
  return myarr
}

async function dbInsertSave(call, item, method) {

  let ret = true
  if (!useServiceWorker()) {

    console.log('dbInsertSave', item, method)

    if (UserStore.getters.isUserInvalid) {
      return false
    } // Login not made

    call = '/' + call
    if (method !== 'POST') {
      call += '/' + item._id
    }

    console.log('SAVE: ', item)

    ret = await Api.SendReq(call, method, item)
      .then((res) => {
        console.log('dbInsertSave ', call, 'to the Server', res.data)

        return (res.status === 200)
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return false
      })
  }

  return ret
}

async function dbDeleteItem(call, item) {

  let res = true
  if (!useServiceWorker()) {
    // console.log('dbdeleteItem', item)
    if (UserStore.getters.isUserInvalid) {
      return false
    } // Login not made

    call = '/' + call

    res = await Api.SendReq(call + '/' + item._id, 'DELETE', null)
      .then((myres) => {
        console.log('dbdeleteItem to the Server')
        // tools.showPositiveNotif(this.$q, 'Riga cancellata')
        return myres
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return res
  }

  return res
}

async function dbHideItem(call, item) {

  if (!useServiceWorker()) {
    // console.log('dbdeleteItem', item)
    if (UserStore.getters.isUserInvalid) {
      return false
    } // Login not made

    item = {
      ...item,
      hide: true
    }

    console.log('dbHideItem', item)

    call = '/' + call

    const res = await Api.SendReq(call + item._id + '/true', 'DELETE', null)
      .then((myres) => {
        console.log('dbHideItem to the Server')
        return myres
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return res
  }
}

async function Sync_Execute(cmd, tablesync, nametab, method, item: ITodo, id, msg: String) {
  // Send to Server to Sync

  console.log('Sync_Execute', cmd, tablesync, nametab, method, id, msg)
  if (nametab === 'todos') {
    console.log('   TODO: ', item.descr)
  }

  let cmdSw = cmd
  if ((cmd === DB.CMD_SYNC_NEW) || (cmd === DB.CMD_DELETE) || (cmd === DB.CMD_HIDE)) {
    cmdSw = DB.CMD_SYNC
  }

  // console.log('cmdSw', cmdSw)

  // if ('serviceWorker' in navigator) {
  //   console.log('serviceWorker PRESENTE')
  // } else {
  //   console.log('serviceWorker NON PRESENTE !')
  // }

  if (useServiceWorker()) {
    return await navigator.serviceWorker.ready
      .then((sw) => {
        // console.log('----------------------      navigator.serviceWorker.ready')

        return globalroutines(null, 'write', tablesync, item, id)
          .then((ris) => {
            console.log('ris write:', ris)
            const sep = '|'

            const multiparams = cmdSw + sep + tablesync + sep + nametab + sep + method + sep + UserStore.state.x_auth_token + sep + toolsext.getLocale()
            const mymsgkey = {
              _id: multiparams,
              value: multiparams
            }
            // console.log('*** swmsg')
            return globalroutines(null, 'write', 'swmsg', mymsgkey, multiparams)
              .then((ris) => {
                // if ('SyncManager' in window) {
                //   console.log('   SENDING... sw.sync.register', multiparams)
                //   return sw.sync.register(multiparams)
                // } else {
                // #Todo ++ Alternative 2 to SyncManager
                return Api.syncAlternative(multiparams)
                // }
              })
              .then(() => {
                let data = null
                if (msg !== '') {
                  data = { message: msg, position: 'bottom', timeout: 3000 }
                }
                return data
              })
              .catch((err) => {
                console.error('Errore in globalroutines', tablesync, nametab, err)
              })
          })
          .catch((err) => {
            console.error('Errore catch in globalroutines write', tablesync, nametab, err)
          })
      })
  }
}

async function Sync_ExecuteCmd(cmd, nametab: string, method, item: ITodo, id, msg: string) {
  // Send to Server to Sync

  let tablesync = ''
  if (method === 'POST') {
    tablesync = DB.TABLE_SYNC_POST + nametab
  } else if (method === 'PATCH') {
    tablesync = DB.TABLE_SYNC_PATCH + nametab
  } else if (method === 'DELETE') {
    tablesync = DB.TABLE_DELETE + nametab
  } else if (method === 'HIDE') {
    tablesync = DB.TABLE_HIDE + nametab
  }

  const risdata = await Sync_Execute(cmd, tablesync, nametab, method, item, id, msg)

  let ris = false
  if (cmd === DB.CMD_SYNC_NEW) {
    if ((method === 'POST') || (method === 'PATCH')) {
      ris = await dbInsertSave(nametab, item, method)
    }
  } else if (cmd === DB.CMD_DELETE) {
    ris = await dbDeleteItem(nametab, item)
  } else if (cmd === DB.CMD_HIDE) {
    ris = await dbHideItem(nametab, item)
  }

  return ris
}

export async function Sync_SaveItem(nametab: string, method, item) {
  return await Sync_ExecuteCmd(DB.CMD_SYNC_NEW, nametab, method, item, 0, '')
}

export function Sync_DeleteItem(nametab: string, item, id) {
  Sync_ExecuteCmd(DB.CMD_DELETE, nametab, 'DELETE', item, id, '')
}

export function Sync_HideItem(nametab: string, item, id) {
  Sync_ExecuteCmd(DB.CMD_HIDE, nametab, 'HIDE', item, id, '')
}

export async function aftercalling(ris, checkPending: boolean, nametabindex: string) {

  if (ris.status !== 200) {
    if (process.env.DEBUG === '1') {
      console.log('ris.status', ris.status)
    }
    if (ris.status === serv_constants.RIS_CODE__HTTP_FORBIDDEN_INVALID_TOKEN) {
      tools.consolelogpao('UNAUTHORIZING... TOKEN EXPIRED... !! ')
    } else {
      tools.consolelogpao('NETWORK UNREACHABLE ! (Error in fetch)', UserStore.getters.getServerCode, ris.status)
    }
    if (useServiceWorker()) {
      // Read all data from IndexedDB Store into Memory
      await updatefromIndexedDbToState(nametabindex)
    }
  } else {
    if (ris.status === tools.OK && checkPending) {
      waitAndcheckPendingMsg()
    }
  }
}

async function checkPendingMsg() {
  // console.log('checkPendingMsg')

  const config = await globalroutines(null, 'read', 'config', null, '1')
  // console.log('config', config)

  try {
    if (config) {
      if (!!config[1].stateconn) {
        console.log('config.stateconn', config[1].stateconn)

        if (config[1].stateconn !== GlobalStore.state.stateConnection) {
          GlobalStore.mutations.setStateConnection(config[1].stateconn)
        }

      }
    }
  } catch (e) {
    // ...
  }

  return new Promise((resolve, reject) => {
    // Check if there is something
    return globalroutines(null, 'count', 'swmsg')
      .then((count) => {
        if (count > 0) {
          // console.log('count = ', count)
          return resolve(true)
        } else {
          return resolve(false)
        }
      })
      .catch((e) => {
        return reject()
      })
  })

}

function useServiceWorker() {
  return false
  // return 'serviceWorker' in navigator
}

// If something in the call of Service Worker went wrong (Network or Server Down), then retry !
async function sendSwMsgIfAvailable() {
  let something = false

  if (useServiceWorker()) {
    console.log(' -------- sendSwMsgIfAvailable')

    const count = await checkPendingMsg()
    if (count > 0) {
      return await navigator.serviceWorker.ready
        .then((sw) => {

          return globalroutines(null, 'readall', 'swmsg')
            .then((arr_recmsg) => {
              if (arr_recmsg.length > 0) {

                // console.log('----------------------  2)    navigator (2) .serviceWorker.ready')
                let promiseChain = Promise.resolve()

                for (const rec of arr_recmsg) {
                  // console.log('             .... sw.sync.register ( ', rec._id)
                  // if ('SyncManager' in window) {
                  //   sw.sync.register(rec._id)
                  // } else {

                  // #Alternative to SyncManager
                  promiseChain = promiseChain.then(() => {
                    return Api.syncAlternative(rec._id)
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

  return new Promise((resolve, reject) => {
    resolve(something)
  })
}

export async function waitAndRefreshData() {
  // #Todo++ waitAndRefreshData: Check if is OK
  await Projects.actions.dbLoad({ checkPending: false, onlyiffirsttime: false })
  return await Todos.actions.dbLoad({ checkPending: false })
}

export async function waitAndcheckPendingMsg() {

  // await aspettansec(1000)

  return await checkPendingMsg()
    .then((ris) => {
      if (ris) {
        if (!GlobalStore.getters.isOnline) {   // If is Offline, then check

        }

        // console.log('risPending = ', ris)
        return sendSwMsgIfAvailable()
          .then((something) => {
            if (something) {
              if (process.env.DEBUG === '1') {
                console.log('something')
              }
              // Refresh data
              return waitAndRefreshData()
            }
          })
      }
    })
}

async function updatefromIndexedDbToState(nametab) {
  await globalroutines(null, 'updatefromIndexedDbToState', nametab, null)
    .then(() => {
      console.log('updatefromIndexedDbToState! ')
      return true
    })
}

export function removeitemfromarray(myarray, ind) {
  // console.log('PRIMA state.todos', state.todos)
  // Delete Item in to Array
  if (ind >= 0) {
    myarray.splice(ind, 1)
  }
  // console.log('DOPO state.todos', state.todos, 'ind', ind)
}

/*
export async functionfunction testfunc() {
  while (true) {
    tools.consolelogpao('testfunc')
    // console.log('Todos.state.todos_changed:', Todos.state.todos_changed)
    await tools.aspettansec(5000)
  }
}
*/

/*
sendMessageToSW(recdata, method) {

  navigator.serviceWorker.controller.postMessage({
    type: 'sync',
    recdata,
    method,
    cmd: 'sync-new-todos',
    token: UserStore.state.idToken,
    lang: UserStore.state.lang
  })
}
*/

function setmodifiedIfchanged(recOut, recIn, field) {
  if (String(recOut[field]) !== String(recIn[field])) {
    console.log('***************  CAMPO ', field, 'MODIFICATO!', recOut[field], recIn[field])
    recOut.modified = true
    recOut[field] = recIn[field]
    return true
  }
  return false
}

export async function table_ModifyRecord(nametable, myitem, listFieldsToChange, field) {
  // console.log('table_ModifyRecord ... ', nametable)
  if (myitem === null) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  console.log('--> table_ModifyRecord', nametable, myitem)

  if ((field === 'status') && (nametable === 'todos') && (myitem.status === tools.Status.COMPLETED)) {
    myitem.completed_at = tools.getDateNow()
  }

  const myobjsaved = tools.jsonCopy(myitem)

  let miorec = null
  if (useServiceWorker()) {
    // get record from IndexedDb
    miorec = await globalroutines(null, 'read', nametable, null, myobjsaved._id)
    if (miorec === undefined) {
      console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobjsaved._id)

      // Prova cmq a salvarlo sul server
      return Sync_SaveItem(nametable, 'PATCH', miorec)
    }
    listFieldsToChange.forEach((myfield) => {
      setmodifiedIfchanged(miorec, myobjsaved, myfield)
    })

  } else {
    miorec = myitem
    miorec.modified = true
  }

  console.log( ' ... 4 ')

  if (miorec.modified) {
    console.log('    ' + nametable + ' MODIFICATO! ', miorec.descr, miorec.pos, 'SALVALO SULLA IndexedDB')
    miorec.modify_at = tools.getDateNow()
    miorec.modified = false

    // 1) Permit to Update the Views
    tools.notifyarraychanged(miorec)

    if (useServiceWorker()) {
      // 2) Modify on IndexedDb
      console.log('// 2) Modify on IndexedDb', miorec)
      return globalroutines(null, 'write', nametable, miorec)
        .then((ris) => {

          // 3) Modify on the Server (call)
          return Sync_SaveItem(nametable, 'PATCH', miorec)

        })
      // } else {
      //   console.log('      ', miorec.descr, 'NON MODIF!')
    } else {
      return Sync_SaveItem(nametable, 'PATCH', miorec)
    }
  }
}

export function table_DeleteRecord(nametable, myobjtrov, id) {

  const mymodule = tools.getModulesByTable(nametable)

  // 1) Delete from the Todos Array
  mymodule.mutations.deletemyitem(myobjtrov)

  // 2) Delete from the IndexedDb
  globalroutines(null, 'delete', nametable, null, id)

  // 3) Delete from the Server (call)
  Sync_DeleteItem(nametable, myobjtrov, id)

}

export function table_HideRecord(nametable, myobjtrov, id) {

  const mymodule = tools.getModulesByTable(nametable)

  // 1) Delete from the Todos Array
  mymodule.mutations.deletemyitem(myobjtrov)

  // 2) Delete from the IndexedDb
  globalroutines(null, 'delete', nametable, null, id)

  // 3) Hide  from the Server (call)
  Sync_DeleteItem(nametable, myobjtrov, id)

}
