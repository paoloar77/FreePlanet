import { UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { costanti } from './costanti'
import Quasar from 'quasar'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
  EMPTY: 0,
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100,

  arrLangUsed: ['enUs', 'it', 'es'],

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

  aspettansec(numsec) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('anything')
      }, numsec)
    })
  },

  isLoggedToSystem() {
    const tok = tools.getItemLS(tools.localStorage.token)
    return !!tok
  }


}
