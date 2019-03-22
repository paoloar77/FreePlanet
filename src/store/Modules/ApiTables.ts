import Api from '@api'
import { ITodo } from '@src/model'
import { GlobalStore, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { tools } from '@src/store/Modules/tools'

export const allTables = ['todos', 'categories', 'sync_post_todos', 'sync_patch_todos', 'delete_todos', 'config', 'swmsg']

export const LIST_START = '0'

export const Priority = {
  PRIORITY_HIGH: 2,
  PRIORITY_NORMAL: 1,
  PRIORITY_LOW: 0
}

export const DB = {
  CMD_SYNC: 'sync-',
  CMD_SYNC_NEW: 'sync-new-',
  CMD_DELETE: 'sync-delete-',
  TABLE_SYNC_POST: 'sync_post_',
  TABLE_SYNC_PATCH: 'sync_patch_',
  TABLE_DELETE: 'delete_'
}

export async function dbInsertSave(call, item, method) {

  let ret = true
  if (!('serviceWorker' in navigator)) {

    console.log('dbInsertSave', item, method)

    if (UserStore.state.userId === '') {
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

export async function dbDeleteItem(call, item) {

  if (!('serviceWorker' in navigator)) {
    // console.log('dbdeleteItem', item)
    if (UserStore.state.userId === '') {
      return false
    } // Login not made

    call = '/' + call

    const res = await Api.SendReq(call + item._id, 'DELETE', item)
      .then((myres) => {
        console.log('dbdeleteItem to the Server')
        return myres
      })
      .catch((error) => {
        UserStore.mutations.setErrorCatch(error)
        return UserStore.getters.getServerCode
      })

    return res
  }
}

export async function Sync_Execute(cmd, table, method, item: ITodo, id, msg: String) {
  // Send to Server to Sync

  // console.log('Sync_Execute', cmd, table, method, item.descr, id, msg)

  let cmdSw = cmd
  if ((cmd === DB.CMD_SYNC_NEW) || (cmd === DB.CMD_DELETE)) {
    cmdSw = DB.CMD_SYNC
  }

  if ('serviceWorker' in navigator) {
    return await navigator.serviceWorker.ready
      .then((sw) => {
        // console.log('----------------------      navigator.serviceWorker.ready')

        return globalroutines(null, 'write', table, item, id)
          .then((id) => {
            // console.log('id', id)
            const sep = '|'

            const multiparams = cmdSw + sep + table + sep + method + sep + UserStore.state.x_auth_token + sep + UserStore.state.lang
            const mymsgkey = {
              _id: multiparams,
              value: multiparams
            }
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
                console.error('Errore in globalroutines', table, err)
              })
          })
      })
  }
}

export async function Sync_ExecuteCmd(cmd, nametab: string, table, method, item: ITodo, id, msg: String) {
  // Send to Server to Sync

  console.log('Sync_Execute', cmd, table, method, item.descr, id, msg)

  const risdata = await Sync_Execute(cmd, table, method, item, id, msg)

  if (cmd === DB.CMD_SYNC_NEW) {
    if ((method === 'POST') || (method === 'PATCH')) {
      await dbInsertSave(nametab, item, method)
    }
  } else if (cmd === DB.CMD_DELETE) {
    await dbDeleteItem(nametab, item)
  }

  return risdata
}

export async function Sync_SaveItem(nametab: string, method, item) {
  let table = ''
  if (method === 'POST') {
    table = DB.TABLE_SYNC_POST
  }
  else if (method === 'PATCH') {
    table = DB.TABLE_SYNC_PATCH
  }

  return await Sync_ExecuteCmd(DB.CMD_SYNC_NEW, nametab, table + nametab, method, item, 0, '')
}

export function Sync_DeleteItem(nametab: string, item, id) {
  Sync_ExecuteCmd(DB.CMD_DELETE, nametab, DB.TABLE_DELETE + nametab, 'DELETE', item, id, '')
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
    if ('serviceWorker' in navigator) {
      // Read all data from IndexedDB Store into Memory
      await updatefromIndexedDbToStateTodo(nametabindex)
    }
  } else {
    if (ris.status === tools.OK && checkPending) {
      waitAndcheckPendingMsg()
    }
  }
}

export async function checkPendingMsg() {
  // console.log('checkPendingMsg')

  const config = await globalroutines(null, 'read', 'config', null, '1')
  // console.log('config', config)

  try {
    if (config) {
      if (!!config[1].stateconn) {
        // console.log('config.stateconn', config[1].stateconn)

        if (config[1].stateconn !== GlobalStore.state.stateConnection) {
          GlobalStore.mutations.setStateConnection(config[1].stateconn)
        }

      }
    }
  } catch (e) {
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

// If something in the call of Service Worker went wrong (Network or Server Down), then retry !
export async function sendSwMsgIfAvailable() {
  let something = false

  if ('serviceWorker' in navigator) {
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
  return await Todos.actions.dbLoadTodo({ checkPending: false })
}

export async function waitAndcheckPendingMsg() {

  // await aspettansec(1000)

  return await checkPendingMsg()
    .then((ris) => {
      if (ris) {
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

export async function updatefromIndexedDbToStateTodo(nametab) {
  await globalroutines(null, 'updatefromIndexedDbToStateTodo', nametab, null)
    .then(() => {
      console.log('updatefromIndexedDbToStateTodo! ')
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

export function setmodifiedIfchanged(recOut, recIn, field) {
  if (String(recOut[field]) !== String(recIn[field])) {
    // console.log('***************  CAMPO ', field, 'MODIFICATO!', recOut[field], recIn[field])
    recOut.modified = true
    recOut[field] = recIn[field]
    return true
  }
  return false
}

export async function table_ModifyRecord(nametable, myitem, fieldtochange) {

  if (myitem === null) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
  const myobjsaved = tools.jsonCopy(myitem)

  // get record from IndexedDb
  const miorec = await globalroutines(null, 'read', nametable, null, myobjsaved._id)
  if (miorec === undefined) {
    console.log('~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!!!!!  Record not Found !!!!!! id=', myobjsaved._id)
    return
  }

  if (nametable === 'todos') {
    if (setmodifiedIfchanged(miorec, myobjsaved, 'completed')) {
      miorec.completed_at = new Date().getDate()
    }
  }

  fieldtochange.forEach((myfield) => {
    setmodifiedIfchanged(miorec, myobjsaved, myfield)
  })

  if (miorec.modified) {
    console.log('Todo MODIFICATO! ', miorec.descr, miorec.pos, 'SALVALO SULLA IndexedDB todos')
    miorec.modify_at = new Date().getDate()
    miorec.modified = false

    // 1) Permit to Update the Views
    tools.notifyarraychanged(miorec)

    // 2) Modify on IndexedDb
    return globalroutines(null, 'write', nametable, miorec)
      .then((ris) => {

        // 3) Modify on the Server (call)
        Sync_SaveItem(nametable, 'PATCH', miorec)

      })
  }
}

export function table_DeleteRecord(nametable, myobjtrov, id) {

  // 1) Delete from the Todos Array
  Todos.mutations.deletemyitem(myobjtrov)

  // 2) Delete from the IndexedDb
  globalroutines(null, 'delete', nametable, null, id)

  // 3) Delete from the Server (call)
  Sync_DeleteItem(nametable, myobjtrov, id)

}

export function isLoggedToSystem() {
  const tok = tools.getItemLS(tools.localStorage.token)
  return !!tok
}
