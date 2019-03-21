import Api from '@api'
import { ITodo } from '@src/model'
import { GlobalStore, Todos, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { costanti } from './costanti'
import Quasar from 'quasar'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
  allTables: ['todos', 'categories', 'sync_post_todos', 'sync_patch_todos', 'delete_todos', 'config', 'swmsg'],
  EMPTY: 0,
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100,

  arrLangUsed: ['enUs', 'it', 'es'],

  LIST_END: '10000000',
  LIST_START: '0',

  SERVKEY_VERS: 'vers',

  localStorage: {
    verified_email: 'vf',
    wasAlreadySubOnDb: 'sb',
    categorySel: 'cs',
    isLogged: 'ilog',
    expirationDate: 'expdate',
    leftDrawerOpen: 'ldo',
    userId: 'uid',
    token: 'tk',
    username: 'uname',
    lang: 'lg'
  },

  Todos: {
    PRIORITY_HIGH: 2,
    PRIORITY_NORMAL: 1,
    PRIORITY_LOW: 0
  },

  DB: {
    CMD_SYNC: 'sync-',
    CMD_SYNC_NEW: 'sync-new-',
    CMD_DELETE: 'sync-delete-',
    TABLE_SYNC_POST: 'sync_post_',
    TABLE_SYNC_PATCH: 'sync_patch_',
    TABLE_DELETE: 'delete_'
  },

  MenuAction: {
    DELETE: 100,
    TOGGLE_EXPIRING: 101,
    COMPLETED: 110,
    PROGRESS_BAR: 120,
    PRIORITY: 130,
    SHOW_TASK: 150
  },

  selectPriority: {
    it: [
      {
        id: 1,
        label: 'Alta',
        value: 2,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normale',
        value: 1,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Bassa',
        value: 0,
        icon: 'expand_more'
      }],
    es: [
      {
        id: 1,
        label: 'Alta',
        value: 2,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normal',
        value: 1,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Baja',
        value: 0,
        icon: 'expand_more'
      }],
    enUs: [
      {
        id: 1,
        label: 'High',
        value: 2,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normal',
        value: 1,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Low',
        value: 0,
        icon: 'expand_more'
      }],
    de: [
      {
        id: 1,
        label: 'High',
        value: 2,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normal',
        value: 1,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Low',
        value: 0,
        icon: 'expand_more'
      }]

  },

  INDEX_MENU_DELETE: 4,

  menuPopupTodo: {
    it: [
      {
        id: 10,
        label: '',
        value: 120, // PROGRESS_BAR
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        label: 'Imposta Priorità',
        value: 130, // PRIORITY
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        label: 'Completato',
        value: 110, // COMPLETED
        icon: 'check_circle',
        checked: true
      },
      {
        id: 40,
        label: 'Imposta Scadenza',
        value: 101, // TOGGLE_EXPIRING
        icon: 'date_range',
        checked: true
      },
      {
        id: 50,
        label: 'Elimina',
        value: 100, // DELETE
        icon: 'delete',
        checked: false
      }
    ],
    es: [
      {
        id: 10,
        label: '',
        value: 120, // PROGRESS_BAR
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        label: 'Establecer Prioridad',
        value: 130, // PRIORITY
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        label: 'Completado',
        value: 110, // COMPLETED
        icon: 'check_circle',
        checked: true
      },
      {
        id: 40,
        label: 'Establecer expiración',
        value: 101, // TOGGLE_EXPIRING
        icon: 'date_range',
        checked: true
      },
      {
        id: 50,
        label: 'Borrar',
        value: 100, // DELETE
        icon: 'delete',
        checked: false
      }
    ],
    enUs: [
      {
        id: 10,
        label: '',
        value: 120, // PROGRESS_BAR
        icon: 'check_circle',
        checked: true
      },
      {
        id: 20,
        label: 'Set Priority',
        value: 130, // PRIORITY
        icon: 'high_priority',
        checked: false
      },
      {
        id: 30,
        label: 'Completed',
        value: 110, // COMPLETED
        icon: 'check_circle',
        checked: true
      },
      {
        id: 40,
        label: 'Set Expiring',
        value: 101, // TOGGLE_EXPIRING
        icon: 'date_range',
        checked: true
      },
      {
        id: 50,
        label: 'Delete',
        value: 100, // DELETE
        icon: 'trash',
        checked: false
      }
    ]
  },

  menuPopupConfigTodo: {
    it: [
      {
        id: 10,
        label: 'Mostra Task',
        value: 150,  // SHOW_TASK
        icon: 'rowing'
      }
    ],
    es: [
      {
        id: 10,
        label: 'Mostrar Tareas',
        value: 150,
        icon: 'rowing'
      }
    ],
    enUs: [
      {
        id: 10,
        label: 'Show Task',
        value: 150,
        icon: 'rowing'
      }
    ]
  },

  listOptionShowTask: {
    it: [
      {
        id: 10,
        label: 'Mostra gli ultimi N completati',
        value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        label: 'Compiti da Completare',
        value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        label: 'Tutti i compiti',
        value: costanti.ShowTypeTask.SHOW_ALL,
        icon: 'check_circle',
        checked: true
      }
    ],
    es: [
      {
        id: 10,
        label: 'Mostrar los ultimos N completados',
        value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        label: 'Tareas para completar',
        value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        label: 'Todos las Tareas',
        value: costanti.ShowTypeTask.SHOW_ALL,
        icon: 'check_circle',
        checked: true
      }
    ],
    enUs: [
      {
        id: 10,
        label: 'Show last N Completed',
        value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        label: 'Task to complete',
        value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        label: 'All Tasks',
        value: costanti.ShowTypeTask.SHOW_ALL,
        icon: 'check_circle',
        checked: true
      }
    ]
  },

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src))
  },

  getItemLS(item) {
    let ris = localStorage.getItem(item)
    if ((ris == null) || (ris === '') || (ris === 'null')) {
      ris = ''
    }

    return ris
  },

  notifyarraychanged(array) {
    if (array.length > 0) {
      array.splice(array.length - 1, 1, array[array.length - 1])
    }
  },

  existArr(x) {
    return x = (typeof x !== 'undefined' && x instanceof Array) ? x : []
  },

  json2array(json) {
    const result = []
    const keys = Object.keys(json)
    keys.forEach((key) => {
      result.push(json[key])
    })
    return result
  },

  async cmdToSyncAndDb(cmd, table, method, item: ITodo, id, msg: String) {
    // Send to Server to Sync

    // console.log('cmdToSyncAndDb', cmd, table, method, item.descr, id, msg)

    let cmdSw = cmd
    if ((cmd === tools.DB.CMD_SYNC_NEW) || (cmd === tools.DB.CMD_DELETE)) {
      cmdSw = tools.DB.CMD_SYNC
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
  },

  async dbInsertSave(call, item, method) {

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
  },

  async dbdeleteItem(call, item) {

    if (!('serviceWorker' in navigator)) {
      // console.log('dbdeleteItem', item)
      if (UserStore.state.userId === '') {
        return false
      } // Login not made

      call = '/' + call

      const res = await Api.SendReq(call + item._id, 'DELETE', item)
        .then((res) => {
          console.log('dbdeleteItem to the Server')
          return res
        })
        .catch((error) => {
          UserStore.mutations.setErrorCatch(error)
          return UserStore.getters.getServerCode
        })

      return res
    }
  },

  async cmdToSyncAndDbTable(cmd, nametab: string, table, method, item: ITodo, id, msg: String) {
    // Send to Server to Sync

    console.log('cmdToSyncAndDb', cmd, table, method, item.descr, id, msg)

    const risdata = await tools.cmdToSyncAndDb(cmd, table, method, item, id, msg)

    if (cmd === tools.DB.CMD_SYNC_NEW) {
      if ((method === 'POST') || (method === 'PATCH')) {
        await tools.dbInsertSave(nametab, item, method)
      }
    } else if (cmd === tools.DB.CMD_DELETE) {
      await tools.dbdeleteItem(nametab, item)
    }

    return risdata
  },

  deleteItemToSyncAndDb(nametab: string, item, id) {
    tools.cmdToSyncAndDbTable(tools.DB.CMD_DELETE, nametab, tools.DB.TABLE_DELETE + nametab, 'DELETE', item, id, '')
  },

  async saveItemToSyncAndDb(nametab: string, method, item) {
    let table = ''
    if (method === 'POST')
      table = tools.DB.TABLE_SYNC_POST
    else if (method === 'PATCH')
      table = tools.DB.TABLE_SYNC_PATCH

    return await tools.cmdToSyncAndDbTable(tools.DB.CMD_SYNC_NEW, nametab, table + nametab, method, item, 0, '')
  },

  showNotif(q: any, msg, data?: INotify | null) {
    let myicon = data ? data.icon : 'ion-add'
    if (!myicon) {
      myicon = 'ion-add'
    }
    let mycolor = data ? data.color : 'primary'
    if (!mycolor) {
      mycolor = 'primary'
    }
    q.notify({
      message: msg,
      icon: myicon,
      classes: 'my-notif-class',
      color: mycolor,
      timeout: 3000
    })
  },

  checkLangPassed(mylang) {

    const mybrowserLang = Quasar.lang.isoName

    if (mylang !== '') {
      if ((mylang.toLowerCase() === 'enus') || (mylang.toLowerCase() === 'en-us')) {
        mylang = 'enUs'
      }
      if ((mylang.toLowerCase() === 'es') || (mylang.toLowerCase() === 'es-es') || (mylang.toLowerCase() === 'eses')) {
        mylang = 'es'
      }

      if (!(tools.arrLangUsed.includes(mylang))) {
        console.log('non incluso ', mylang)
        mylang = tools.arrLangUsed[0]

        // Metti Inglese come default
        UserStore.mutations.setlang(mylang)
      }
    }

    if (!mylang) {
      mylang = process.env.LANG_DEFAULT
    }
    console.log('mylang calc : ', mylang)

    return mylang
  },

  getimglogo() {
    return 'statics/images/' + process.env.LOGO_REG
  },

  consolelogpao(strlog, strlog2 = '', strlog3 = '') {
    globalroutines(null, 'log', strlog + ' ' + strlog2 + ' ' + strlog3, null)
  },

  async checkPendingMsg() {
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

  },

  // If something in the call of Service Worker went wrong (Network or Server Down), then retry !
  async sendSwMsgIfAvailable() {
    let something = false

    if ('serviceWorker' in navigator) {
      console.log(' -------- sendSwMsgIfAvailable')

      const count = await tools.checkPendingMsg()
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
  },

  async waitAndRefreshData() {
    return await Todos.actions.dbLoadTodo({ checkPending: false })
  },

  async waitAndcheckPendingMsg() {

    // await aspettansec(1000)

    return await tools.checkPendingMsg()
      .then((ris) => {
        if (ris) {
          // console.log('risPending = ', ris)
          return tools.sendSwMsgIfAvailable()
            .then((something) => {
              if (something) {
                if (process.env.DEBUG === '1') {
                  console.log('something')
                }
                // Refresh data
                return tools.waitAndRefreshData()
              }
            })
        }
      })
  },

  async updatefromIndexedDbToStateTodo(nametab) {
    await globalroutines(null, 'updatefromIndexedDbToStateTodo', nametab, null)
      .then(() => {
        console.log('updatefromIndexedDbToStateTodo! ')
        return true
      })
  },

  isLoggedToSystem() {
    const tok = tools.getItemLS(tools.localStorage.token)
    return !!tok
  }


}
