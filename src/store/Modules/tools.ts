import { ITodo } from '@src/model'
import { costanti } from './costanti'
import globalroutines from './../../globalroutines/index'
import { Todos, UserStore } from '@store'
import Api from '@api'

export const tools = {
  EMPTY: 0,
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100,

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
    CMD_SYNC_TODOS: 'sync-todos',
    CMD_SYNC_NEW_TODOS: 'sync-new-todos',
    CMD_DELETE_TODOS: 'sync-delete-todos',
    TABLE_SYNC_TODOS: 'sync_todos',
    TABLE_SYNC_TODOS_PATCH: 'sync_todos_patch',
    TABLE_DELETE_TODOS: 'delete_todos'
  },

  MenuAction: {
    DELETE: 100,
    TOGGLE_EXPIRING: 101,
    COMPLETED: 110,
    PROGRESS_BAR: 120,
    PRIORITY: 130,
    SHOW_TASK: 150,
  },


  selectPriority: {
    'it': [
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
    'esEs': [
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
    'enUs': [
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
    'de': [
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
    'it': [
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
    'esEs': [
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
    'enUs': [
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
    'it': [
      {
        id: 10,
        label: 'Mostra Task',
        value: 150,  // SHOW_TASK
        icon: 'rowing',
      },
    ],
    'esEs': [
      {
        id: 10,
        label: 'Mostrar Tareas',
        value: 150,
        icon: 'rowing',
      },
    ],
    'enUs': [
      {
        id: 10,
        label: 'Show Task',
        value: 150,
        icon: 'rowing',
      },
    ]
  },

  listOptionShowTask: {
    'it': [
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
    'esEs': [
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
    'enUs': [
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
    if ((ris == null) || (ris === '') || (ris === 'null'))
      ris = ''

    return ris
  },

  notifyarraychanged(array) {
    if (array.length > 0)
      array.splice(array.length - 1, 1, array[array.length - 1])
  },

  existArr(x) {
    return x = (typeof x !== 'undefined' && x instanceof Array) ? x : []
  },

  json2array(json) {
    let result = []
    let keys = Object.keys(json)
    keys.forEach(function (key) {
      result.push(json[key])
    })
    return result
  },

  async cmdToSyncAndDb(cmd, table, method, item: ITodo, id, msg: String) {
    // Send to Server to Sync

    console.log('cmdToSyncAndDb', cmd, table, method, item.descr, id, msg)

    let cmdSw = cmd
    if ((cmd === tools.DB.CMD_SYNC_NEW_TODOS) || (cmd === tools.DB.CMD_DELETE_TODOS)) {
      cmdSw = tools.DB.CMD_SYNC_TODOS
    }

    if ('serviceWorker' in navigator) {
      return await navigator.serviceWorker.ready
        .then(function (sw) {
          // console.log('----------------------      navigator.serviceWorker.ready')

          return globalroutines(null, 'write', table, item, id)
            .then(function (id) {
              // console.log('id', id)
              const sep = '|'

              let multiparams = cmdSw + sep + table + sep + method + sep + UserStore.state.x_auth_token + sep + UserStore.state.lang
              let mymsgkey = {
                _id: multiparams,
                value: multiparams
              }
              return globalroutines(null, 'write', 'swmsg', mymsgkey, multiparams)
                .then(ris => {
                  // if ('SyncManager' in window) {
                  //   console.log('   SENDING... sw.sync.register', multiparams)
                  //   return sw.sync.register(multiparams)
                  // } else {
                  // #Todo ++ Alternative 2 to SyncManager
                  return Api.syncAlternative(multiparams)
                  // }
                })
                .then(function () {
                  let data = null
                  if (msg !== '') {
                    data = { message: msg, position: 'bottom', timeout: 3000 }
                  }
                  return data
                })
                .catch(function (err) {
                  console.error('Errore in globalroutines', table, err)
                })
            })
        })
    }

  }



}
