import { Todos, Projects, UserStore, CalendarStore, GlobalStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { costanti } from './costanti'
import { toolsext } from './toolsext'
import { translation } from './translation'
import Quasar, { colors, date, Screen } from 'quasar'
import { scroll } from 'quasar'

const { getScrollTarget, setScrollPosition } = scroll

import {
  IBookedEvent,
  ICollaborations,
  IEvents,
  IListRoutes,
  IMenuList,
  IParamDialog,
  IProject,
  ITodo,
  Privacy
} from '@src/model'
import * as ApiTables from '@src/store/Modules/ApiTables'
import translate from '@src/globalroutines/util'
import { RouteNames } from '@src/router/route-names'

import { lists } from './lists'
import { static_data } from '@src/db/static_data'
import { IColl, ITimeLineEntry, ITimeLineMain } from '@src/model/GlobalStore'
import { func_tools } from '@src/store/Modules/toolsext'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { shared_consts } from '@src/common/shared_vuejs'

import { dom } from 'quasar'

const { height, width } = dom

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
  CAN_EDIT: 'q-ce',

  listBestColor: [
    'blue',
    'green',
    'purple',
    'deep-purple',
    'indigo',
    'light-blue',
    'cyan',
    'teal',
    'lime',
    'orange',
    'deeporange',
    'grey',
    'blue-gray',
    'yellow'
  ],

  TABEVENTS: 'myevents',

  MAX_CHARACTERS: 60,
  projects: 'projects',
  todos: 'todos',
  EMPTY: 0,
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100,

  NOFIELD: 'nofield',

  TYPE_AUDIO: 1,

  NUMSEC_CHECKUPDATE: 20000,

  FIRST_PROJ: '5ca8f17fcd40dc5012f53346',

  WHAT_NOTHING: 0,
  WHAT_TODO: 1,
  WHAT_PROJECT: 2,

  languageid: 5,

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
    name: 'nm',
    surname: 'sn',
    perm: 'pm',
    lang: 'lg',
    img: 'img'
  },

  Priority: {
    PRIORITY_HIGH: 2,
    PRIORITY_NORMAL: 1,
    PRIORITY_LOW: 0
  },

  Status: {
    NONE: 0,
    OPENED: 1,
    COMPLETED: 10
  },

  FieldType: {
    boolean: 1,
    date: 2,
    string: 4,
    binary: 8,
    html: 16,
    select: 32,
    number: 64,
    typeinrec: 128,
    multiselect: 256,
  },

  FieldTypeArr: [
    { label: 'Boolean', value: 1 },
    { label: 'Date', value: 2 },
    { label: 'String', value: 4 },
    { label: 'Binary', value: 8 },
    { label: 'Html', value: 16 },
    { label: 'Select', value: 32 },
    { label: 'Number', value: 64 }
  ],

  SelectListNumPeople: [
    {
      id: 1,
      label: '1',
      value: 1
    },
    {
      id: 2,
      label: '2',
      value: 2
    },
    {
      id: 3,
      label: '3',
      value: 3
    },
    {
      id: 4,
      label: '4',
      value: 4
    },
    {
      id: 5,
      label: '5',
      value: 5
    }
  ]
  ,

  selectPhase: {
    it: [
      {
        id: 1,
        label: translation.it.fase + ' 0',
        value: 0
      },
      {
        id: 2,
        label: translation.it.fase + ' 1',
        value: 1
      },
      {
        id: 3,
        label: translation.it.fase + ' 2',
        value: 2
      },
      {
        id: 4,
        label: translation.it.fase + ' 3',
        value: 3
      }
    ],
    es: [
      {
        id: 1,
        label: translation.es.fase + ' 0',
        value: 0
      },
      {
        id: 2,
        label: translation.es.fase + ' 1',
        value: 1
      },
      {
        id: 3,
        label: translation.es.fase + ' 2',
        value: 2
      },
      {
        id: 4,
        label: translation.es.fase + ' 3',
        value: 3
      }
    ],
    enUs: [
      {
        id: 1,
        label: translation.enUs.fase + ' 0',
        value: 0
      },
      {
        id: 2,
        label: translation.enUs.fase + ' 1',
        value: 1
      },
      {
        id: 3,
        label: translation.enUs.fase + ' 2',
        value: 2
      },
      {
        id: 4,
        label: translation.enUs.fase + ' 3',
        value: 3
      }
    ]
  },

  selectPrivacy: {
    it: [
      {
        id: 1,
        label: translation.it.privacy.all,
        value: Privacy.all
      },
      {
        id: 2,
        label: translation.it.privacy.friends,
        value: Privacy.friends
      },
      {
        id: 3,
        label: translation.it.privacy.mygroup,
        value: Privacy.mygroup
      },
      {
        id: 4,
        label: translation.it.privacy.onlyme,
        value: Privacy.onlyme
      }
    ],
    es: [
      {
        id: 1,
        label: translation.es.privacy.all,
        value: Privacy.all
      },
      {
        id: 2,
        label: translation.es.privacy.friends,
        value: Privacy.friends
      },
      {
        id: 3,
        label: translation.es.privacy.mygroup,
        value: Privacy.mygroup
      },
      {
        id: 4,
        label: translation.es.privacy.onlyme,
        value: Privacy.onlyme
      }
    ],
    enUs: [
      {
        id: 1,
        label: translation.enUs.privacy.all,
        value: Privacy.all
      },
      {
        id: 2,
        label: translation.enUs.privacy.friends,
        value: Privacy.friends
      },
      {
        id: 3,
        label: translation.enUs.privacy.mygroup,
        value: Privacy.mygroup
      },
      {
        id: 4,
        label: translation.enUs.privacy.onlyme,
        value: Privacy.onlyme
      }
    ]
  },

  selectStatus: {
    it: [
      {
        id: 1,
        label: 'Nessuno',
        value: 0,  //   Status.NONE
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Aperto',
        value: 1,  //   Status.OPENED
        icon: 'expand_less'
      },
      {
        id: 3,
        label: 'Completato',
        value: 10,   //   Status.COMPLETED
        icon: 'expand_less'
      }
    ],
    es:
      [
        {
          id: 1,
          label: 'Ninguno',
          value: 0,  //   Status.NONE
          icon: 'expand_less'
        },
        {
          id: 2,
          label: 'Abierto',
          value: 1,  //   Status.OPENED
          icon: 'expand_less'
        },
        {
          id: 3,
          label: 'Completado',
          value: 10,   //   Status.COMPLETED
          icon: 'expand_less'
        }
      ],
    enUs:
      [
        {
          id: 1,
          label: 'None',
          value: 0,  //   Status.NONE
          icon: 'expand_less'
        },
        {
          id: 2,
          label: 'Opened',
          value: 1,  //   Status.OPENED
          icon: 'expand_less'
        },
        {
          id: 3,
          label: 'Completed',
          value: 10,   //   Status.COMPLETED
          icon: 'expand_less'
        }
      ]

  }
  ,

  INDEX_MENU_DELETE: 4,

  menuPopupTodo:
    {
      it: [
        {
          id: 5,
          disable: false,
          label: 'Taglia',
          value: lists.MenuAction.CUT,
          icon: 'undo'
        },
        {
          id: 10,
          disable: false,
          label: 'Modifica',
          value: lists.MenuAction.EDIT,
          icon: 'create'
        },
        {
          id: 11,
          disable: false,
          label: 'Elimina',
          value: lists.MenuAction.DELETE,
          icon: 'delete',
          checked: false
        },
        {
          id: 12,
          disable: false,
          label: '',
          value: lists.MenuAction.PROGRESS_BAR,
          icon: 'rowing',
          checked: true
        },
        {
          id: 20,
          disable: false,
          label: 'Imposta Priorità',
          value: lists.MenuAction.PRIORITY,
          icon: 'rowing',
          checked: false,
          arrlista: lists.selectPriority.it
        },
        {
          id: 21,
          disable: false,
          label: translation.it.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme
        },
        {
          id: 22,
          disable: false,
          label: translation.it.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme
        },
        {
          id: 30,
          disable: false,
          label: 'Completato',
          value: lists.MenuAction.COMPLETED,
          icon: 'check_circle',
          checked: true
        },
        {
          id: 40,
          disable: false,
          label: 'Imposta Scadenza',
          value: lists.MenuAction.TOGGLE_EXPIRING,
          icon: 'date_range',
          checked: true
        }
      ],
      es:
        [
          {
            id: 5,
            disable: false,
            label: 'Cortar',
            value: lists.MenuAction.CUT,
            icon: 'undo'
          },
          {
            id: 7,
            disable: false,
            label: 'Editar',
            value: lists.MenuAction.EDIT,
            icon: 'create'
          },
          {
            id: 8,
            disable: false,
            label: 'Borrar',
            value: lists.MenuAction.DELETE,
            icon: 'delete',
            checked: false
          },
          {
            id: 10,
            disable: false,
            label: '',
            value: lists.MenuAction.PROGRESS_BAR,
            icon: 'rowing',
            checked: true
          },
          {
            id: 20,
            disable: false,
            label: 'Establecer Prioridad',
            value: lists.MenuAction.PRIORITY,
            icon: 'rowing',
            checked: false,
            arrlista: lists.selectPriority.es
          },
          {
            id: 21,
            disable: false,
            label: translation.es.proj.themecolor,
            value: lists.MenuAction.THEME,
            icon: 'format_color_text',
            checked: false,
            arrlista: lists.selectTheme
          },
          {
            id: 22,
            disable: false,
            label: translation.es.proj.themebgcolor,
            value: lists.MenuAction.THEMEBG,
            icon: 'format_color_fill',
            checked: false,
            arrlista: lists.selectTheme
          },
          {
            id: 30,
            disable: false,
            label: 'Completado',
            value: lists.MenuAction.COMPLETED,
            icon: 'check_circle',
            checked: true
          },
          {
            id: 40,
            disable: false,
            label: 'Establecer expiración',
            value: lists.MenuAction.TOGGLE_EXPIRING,
            icon: 'date_range',
            checked: true
          }
        ],
      enUs:
        [
          {
            id: 5,
            disable: false,
            label: 'Cut',
            value: lists.MenuAction.CUT,
            icon: 'undo'
          },
          {
            id: 7,
            disable: false,
            label: 'Edit',
            value: lists.MenuAction.EDIT,
            icon: 'create'
          },
          {
            id: 8,
            disable: false,
            label: 'Delete',
            value: lists.MenuAction.DELETE,
            icon: 'trash',
            checked: false
          },
          {
            id: 10,
            disable: false,
            label: '',
            value: lists.MenuAction.PROGRESS_BAR,
            icon: 'check_circle',
            checked: true
          },
          {
            id: 20,
            disable: false,
            label: 'Set Priority',
            value: lists.MenuAction.PRIORITY,
            icon: 'high_priority',
            checked: false,
            arrlista: lists.selectPriority.enUs
          },
          {
            id: 21,
            disable: false,
            label: translation.enUs.proj.themecolor,
            value: lists.MenuAction.THEME,
            icon: 'format_color_text',
            checked: false,
            arrlista: lists.selectTheme
          },
          {
            id: 22,
            disable: false,
            label: translation.enUs.proj.themebgcolor,
            value: lists.MenuAction.THEMEBG,
            icon: 'format_color_fill',
            checked: false,
            arrlista: lists.selectTheme
          },
          {
            id: 30,
            disable: false,
            label: 'Completed',
            value: lists.MenuAction.COMPLETED,
            icon: 'check_circle',
            checked: true
          },
          {
            id: 40,
            disable: false,
            label: 'Set Expiring',
            value: lists.MenuAction.TOGGLE_EXPIRING,
            icon: 'date_range',
            checked: true
          }
        ]
    }
  ,

  menuPopupProj: {
    it: [
      {
        id: 5,
        disable: false,
        label: 'Taglia',
        value: lists.MenuAction.CUT,
        icon: 'undo'
      },
      {
        id: 10,
        disable: false,
        label: 'Modifica',
        value: lists.MenuAction.EDIT,
        icon: 'create'
      },
      {
        id: 11,
        disable: false,
        label: 'Elimina',
        value: lists.MenuAction.DELETE,
        icon: 'delete',
        checked: false
      },
      {
        id: 40,
        disable: false,
        label: 'Imposta Scadenza',
        value: lists.MenuAction.TOGGLE_EXPIRING,
        icon: 'date_range',
        checked: true
      },
      {
        id: 45,
        disable: false,
        label: translation.it.proj.themecolor,
        value: lists.MenuAction.THEME,
        icon: 'format_color_text',
        checked: false,
        arrlista: lists.selectTheme
      },
      {
        id: 46,
        disable: false,
        label: translation.it.proj.themebgcolor,
        value: lists.MenuAction.THEMEBG,
        icon: 'format_color_fill',
        checked: false,
        arrlista: lists.selectTheme
      }
    ],
    es:
      [
        {
          id: 5,
          disable: false,
          label: 'Cortar',
          value: lists.MenuAction.CUT,
          icon: 'undo'
        },
        {
          id: 10,
          disable: false,
          label: 'Editar',
          value: lists.MenuAction.EDIT,
          icon: 'create'
        },
        {
          id: 11,
          disable: false,
          label: 'Borrar',
          value: 100, // DELETE
          icon: 'delete',
          checked: false
        },
        {
          id: 40,
          disable: false,
          label: 'Establecer expiración',
          value: lists.MenuAction.TOGGLE_EXPIRING,
          icon: 'date_range',
          checked: true
        },
        {
          id: 45,
          disable: false,
          label: translation.es.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme
        },
        {
          id: 46,
          disable: false,
          label: translation.es.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme
        }
      ],
    enUs:
      [
        {
          id: 5,
          disable: false,
          label: 'Cut',
          value: 71, // CUT
          icon: 'undo'
        },
        {
          id: 10,
          disable: false,
          label: 'Edit',
          value: lists.MenuAction.EDIT,
          icon: 'create'
        },
        {
          id: 40,
          disable: false,
          label: 'Set Expiring',
          value: 101, // TOGGLE_EXPIRING
          icon: 'date_range',
          checked: true
        },
        {
          id: 45,
          disable: false,
          label: translation.enUs.proj.themecolor,
          value: lists.MenuAction.THEME,
          icon: 'format_color_text',
          checked: false,
          arrlista: lists.selectTheme
        },
        {
          id: 46,
          disable: false,
          label: translation.enUs.proj.themebgcolor,
          value: lists.MenuAction.THEMEBG,
          icon: 'format_color_fill',
          checked: false,
          arrlista: lists.selectTheme
        },
        {
          id: 50,
          disable: false,
          label: 'Delete',
          value: 100, // DELETE
          icon: 'trash',
          checked: false
        }
      ]
  }
  ,

  menuPopupConfigTodo: {
    it: [
      {
        id: 10,
        disable: false,
        label: 'Mostra Task',
        value: 150,  // SHOW_TASK
        icon: 'rowing'
      }
    ],
    es:
      [
        {
          id: 10,
          disable: false,
          label: 'Mostrar Tareas',
          value: 150,
          icon: 'rowing'
        }
      ],
    enUs:
      [
        {
          id: 10,
          disable: false,
          label: 'Show Task',
          value: 150,
          icon: 'rowing'
        }
      ]
  }
  ,

  menuPopupConfigProject: {
    it: [
      {
        id: 3,
        disable: false,
        label: translation.it.action.paste,
        value: 72,  // Action.PASTE
        icon: 'file_copy'
      },
      {
        id: 5,
        disable: false,
        label: translation.it.proj.newsubproj,
        value: 200,  // ADD_PROJECT
        icon: 'next_week'
      },
      {
        id: 10,
        disable: false,
        label: translation.it.task.showtask,
        value: 150,  // SHOW_TASK
        icon: 'rowing'
      }
    ],
    es:
      [
        {
          id: 3,
          disable: false,
          label: translation.es.action.paste,
          value: 72,  // Action.PASTE
          icon: 'file_copy'
        },
        {
          id: 5,
          disable: false,
          label: translation.es.proj.newsubproj,
          value: 200,  // ADD_PROJECT
          icon: 'next_week'
        },
        {
          id: 10,
          disable: false,
          label: translation.es.task.showtask,
          value: 150,
          icon: 'rowing'
        }
      ],
    enUs:
      [
        {
          id: 3,
          disable: false,
          label: translation.enUs.action.paste,
          value: 72,  // Action.PASTE
          icon: 'file_copy'
        },
        {
          id: 5,
          disable: false,
          label: translation.enUs.proj.newsubproj,
          value: 200,  // ADD_PROJECT
          icon: 'next_week'
        },
        {
          id: 10,
          disable: false,
          label: translation.enUs.task.showtask,
          value: 150,
          icon: 'rowing'
        }
      ]
  },

  menuPopupConfigMAINProject: {
    it: [
      {
        id: 3,
        disable: false,
        label: translation.it.action.paste,
        value: 72,  // Action.PASTE
        icon: 'file_copy'
      },
      {
        id: 5,
        disable: false,
        label: translation.it.proj.newproj,
        value: 200,  // ADD_PROJECT
        icon: 'next_week'
      }
    ],
    es:
      [
        {
          id: 3,
          disable: false,
          label: translation.es.action.paste,
          value: 72,  // Action.PASTE
          icon: 'file_copy'
        },
        {
          id: 5,
          disable: false,
          label: translation.es.proj.newproj,
          value: 200,  // ADD_PROJECT
          icon: 'next_week'
        }
      ],
    enUs:
      [
        {
          id: 3,
          disable: false,
          label: translation.enUs.action.paste,
          value: 72,  // Action.PASTE
          icon: 'file_copy'
        },
        {
          id: 5,
          disable: false,
          label: translation.enUs.proj.newproj,
          value: 200,  // ADD_PROJECT
          icon: 'next_week'
        }
      ]
  },

  listOptionShowTask: {
    it: [
      {
        id: 10,
        disable: false,
        label: 'Mostra gli ultimi N completati',
        value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
        icon: 'rowing',
        checked: true
      },
      {
        id: 20,
        disable: false,
        label: 'Compiti da Completare',
        value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
        icon: 'rowing',
        checked: false
      },
      {
        id: 30,
        disable: false,
        label: 'Tutti i compiti',
        value: costanti.ShowTypeTask.SHOW_ALL,
        icon: 'check_circle',
        checked: true
      }
    ],
    es:
      [
        {
          id: 10,
          disable: false,
          label: 'Mostrar los ultimos N completados',
          value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          icon: 'rowing',
          checked: true
        },
        {
          id: 20,
          disable: false,
          label: 'Tareas para completar',
          value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
          icon: 'rowing',
          checked: false
        },
        {
          id: 30,
          disable: false,
          label: 'Todos las Tareas',
          value: costanti.ShowTypeTask.SHOW_ALL,
          icon: 'check_circle',
          checked: true
        }
      ],
    enUs:
      [
        {
          id: 10,
          disable: false,
          label: 'Show last N Completed',
          value: costanti.ShowTypeTask.SHOW_LAST_N_COMPLETED,
          icon: 'rowing',
          checked: true
        },
        {
          id: 20,
          disable: false,
          label: 'Task to complete',
          value: costanti.ShowTypeTask.SHOW_ONLY_TOCOMPLETE,
          icon: 'rowing',
          checked: false
        },
        {
          id: 30,
          disable: false,
          label: 'All Tasks',
          value: costanti.ShowTypeTask.SHOW_ALL,
          icon: 'check_circle',
          checked: true
        }
      ]
  }
  ,

  getTitlePriority(priority) {
    let cl = ''

    if (priority === tools.Priority.PRIORITY_HIGH) {
      cl = 'high_priority'
    }
    else if (priority === tools.Priority.PRIORITY_NORMAL) {
      cl = 'medium_priority'
    }
    else if (priority === tools.Priority.PRIORITY_LOW) {
      cl = 'low_priority'
    }

    return cl + ' titlePriority'
  }
  ,

  getStatusListByInd(index) {
    try {
      const arr = tools.selectStatus[toolsext.getLocale()]
      for (const rec of arr) {
        if (rec.value === index) {
          return rec.label
        }
      }
    } catch (e) {
      console.log('Error: ', e)
    }
    return ''
  }
  ,

  getPriorityByInd(index) {
    // console.log('LANG in PRIOR', toolsext.getLocale())
    try {
      const arr = lists.selectPriority[toolsext.getLocale()]
      for (const rec of arr) {
        if (rec.value === index) {
          return rec.label
        }
      }
    } catch (e) {
      console.log('Error: ', e)
    }
    return ''
  }
  ,

  logelem(mystr, elem) {
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, ' Pr(', tools.getPriorityByInd(elem.priority), ') [', elem.id_prev, '] modif=', elem.modified)
  }
  ,

  getelemprojstr(elem) {
    return 'elem [id= ' + elem._id + '] ' + elem.descr + ' [id_prev= ' + elem.id_prev + '] '
  }
  ,

  logga_arrproj(myarr: IProject[]) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += tools.getelemprojstr(item) + '   '
    })

    return mystr
  }
  ,

  logelemprj(mystr, elem) {
    console.log(mystr, tools.getelemprojstr(elem))
  }
  ,

  getstrelem(elem) {
    return 'elem [' + elem._id + '] ' + elem.descr + ' Pr(' + tools.getPriorityByInd(elem.priority) + ') [ID_PREV=' + elem.id_prev + '] modif=' + elem.modified + ' '
  }
  ,

  logga_arr(myarr
              :
              ITodo[]
  ) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + tools.getPriorityByInd(item.priority) + ') [' + item.id_prev + '] modif=' + item.modified + '\n'
      // mystr += '[' + item.pos + '] ' + item.descr + '\n'
    })

    return mystr
  }
  ,

  touchmove(scrollable) {
    if (window) {
      window.addEventListener('touchmove', (e) => {
        // console.log('touchmove')
        if (!scrollable) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  }
  ,

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src))
  }
  ,

  getItemLS(item) {
    let ris = localStorage.getItem(item)
    if ((ris == null) || (ris === '') || (ris === 'null')) {
      ris = ''
    }

    return ris
  }
  ,

  notifyarraychanged(array) {
    if (array.length > 0) {
      array.splice(array.length - 1, 1, array[array.length - 1])
    }
  }
  ,

  isOkIndex(myarr, index) {
    return (index >= 0 && index < myarr.length)
  }
  ,

  update_idprev(myarr, indelemchange, indelemId) {
    if (tools.isOkIndex(myarr, indelemchange)) {
      const id_prev = (indelemId >= 0) ? myarr[indelemId]._id : ApiTables.LIST_START
      console.log('update_idprev [', indelemchange, ']', '[id_prev=', id_prev, ']')
      if (myarr[indelemchange].id_prev !== id_prev) {
        // tools.notifyarraychanged(myarr)
        // myarr[indelemchange].modified = true
        // console.log('update_idprev Index=', indelemchange, 'indtoget', indelemId, tools.getstrelem(myarr[indelemchange]))
        console.log('   MODIFICATO! ', myarr[indelemchange].descr, ' PRIMA:', myarr[indelemchange].id_prev, 'DOPO: ', id_prev)
        myarr[indelemchange].id_prev = id_prev
        return myarr[indelemchange]
      }
    }
    return null
  }
  ,

  async swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange) {

    if (itemdragend.field === 'priority') {
      // get last elem priority
      console.log('get last elem priority')
      itemdragend.newIndex = tools.getLastFirstElemPriority(myarr, itemdragend.prioritychosen, itemdragend.atfirst, itemdragend.idelemtochange)
      itemdragend.oldIndex = tools.getIndexById(myarr, itemdragend.idelemtochange)

      console.log('swapElems PRIORITY', itemdragend)
    }

    if (itemdragend.newIndex === itemdragend.oldIndex) {
      return
    }

    console.log('swapGeneralElem', 'new =', itemdragend.newIndex, 'Old =', itemdragend.oldIndex, itemdragend)

    if (tools.isOkIndex(myarr, itemdragend.newIndex) && tools.isOkIndex(myarr, itemdragend.oldIndex)) {

      console.log('***  SPLICE!')
      // console.log('   PRIMA!', tools.logga_arrproj(myarr))
      myarr.splice(itemdragend.newIndex, 0, myarr.splice(itemdragend.oldIndex, 1)[0])
      // console.log('   DOPO!', tools.logga_arrproj(myarr))

      // Ora inverti gli indici
      const indold = itemdragend.oldIndex
      itemdragend.oldIndex = itemdragend.newIndex
      itemdragend.newIndex = indold

      if (nametable === 'todos') {
        if (itemdragend.field !== 'priority') {
          const precind = itemdragend.newIndex - 1
          const nextind = itemdragend.newIndex + 1

          if (tools.isOkIndex(myarr, precind) && tools.isOkIndex(myarr, nextind)) {
            if ((myarr[precind].priority === myarr[nextind].priority) && (myarr[precind].priority !== myarr[itemdragend.newIndex].priority)) {
              console.log('   1)')
              myarr[itemdragend.newIndex].priority = myarr[precind].priority
              tools.notifyarraychanged(myarr)
            }
          } else {
            if (!tools.isOkIndex(myarr, precind)) {
              if ((myarr[nextind].priority !== myarr[itemdragend.newIndex].priority)) {
                console.log('   2)')
                myarr[itemdragend.newIndex].priority = myarr[nextind].priority
                tools.notifyarraychanged(myarr)
              }

            } else {
              if ((myarr[precind].priority !== myarr[itemdragend.newIndex].priority)) {
                console.log('   3)')
                myarr[itemdragend.newIndex].priority = myarr[precind].priority
                tools.notifyarraychanged(myarr)
              }
            }

          }
        }
      }

      // Update the id_prev property
      const elem1 = tools.update_idprev(myarr, itemdragend.newIndex, itemdragend.newIndex - 1)       // 0, -1
      const elem2 = tools.update_idprev(myarr, itemdragend.newIndex + 1, itemdragend.newIndex)   // 1, 0
      const elem3 = tools.update_idprev(myarr, itemdragend.oldIndex, itemdragend.oldIndex - 1)       // 1, 0
      const elem4 = tools.update_idprev(myarr, itemdragend.oldIndex + 1, itemdragend.oldIndex)   // 2, 1

      await
        ApiTables.table_ModifyRecord(nametable, elem1, listFieldsToChange, 'id_prev')
      await
        ApiTables.table_ModifyRecord(nametable, elem2, listFieldsToChange, 'id_prev')
      await
        ApiTables.table_ModifyRecord(nametable, elem3, listFieldsToChange, 'id_prev')
      await
        ApiTables.table_ModifyRecord(nametable, elem4, listFieldsToChange, 'id_prev')

      tools.notifyarraychanged(myarr)

      console.log('arr FINALE', tools.logga_arrproj(myarr))

      // Update the records:
    }
  }
  ,

  getIndexById(myarr, id) {
    if (myarr === undefined)
      return -1
    return myarr.indexOf(tools.getElemById(myarr, id))
  }
  ,

  getElemById(myarr, id) {
    if (myarr === undefined)
      return null
    // console.log('getElemById', myarr, id)
    return myarr.find((elem) => elem._id === id)
  }
  ,

  getElemPrevById(myarr, id) {
    if (myarr === undefined)
      return null
    return myarr.find((elem) => elem.id_prev === id)
  }
  ,

  getLastFirstElemPriority(myarr, priority: number, atfirst: boolean, escludiId: string) {
    if (myarr === null) {
      return -1
    }

    let trovato: boolean = false

    console.log('priority', priority)

    for (let indrec = 0; indrec < myarr.length; indrec++) {
      if ((myarr[indrec].priority === priority) && (myarr[indrec]._id !== escludiId)) {
        trovato = true
        if (atfirst) {
          return indrec - 1
        }
      } else {
        if (trovato) {
          return indrec
        }
      }
    }

    console.log('trovato?', trovato, 'indrec')

    if (trovato) {
      return myarr.length - 1
    } else {
      if (priority === tools.Priority.PRIORITY_LOW) {
        return myarr.length - 1
      }
      else if (priority === tools.Priority.PRIORITY_HIGH) {
        return 0
      }
    }
  }
  ,

  getFirstList(myarr) {
    return myarr.find((elem) => elem.id_prev === ApiTables.LIST_START)
  }
  ,

  getModulesByTable(nametable) {
    if (nametable === 'todos') {
      return Todos
    } else if (nametable === 'projects') {
      return Projects
    }
  }
  ,

  setArrayMainByTable(nametable, myarr) {
    if (nametable === 'todos') {
      Todos.state.todos = tools.jsonCopy(myarr)
      return Todos.state.todos
    } else if (nametable === 'projects') {
      Projects.state.projects = tools.jsonCopy(myarr)
      return Projects.state.projects
    }
  }
  ,

  getmyid(id) {
    return 'row' + id
  }
  ,

  getLastListNotCompleted(nametable, cat, tipoproj: string) {
    // console.log('getLastListNotCompleted')
    // const module = tools.getModulesByTable(nametable)
    let arr = []
    if (nametable === 'projects')
      arr = Projects.getters.projs_dacompletare(cat, tipoproj)
    else if (nametable === 'todos')
      arr = Todos.getters.items_dacompletare(cat)

    if (!!arr)
      return (arr.length > 0) ? arr[arr.length - 1] : null
    else
      return null
  },

  getElemByIndex(myarr, index) {
    if (index >= 0 && index < myarr.length) {
      return myarr[index]
    }
    else {
      return null
    }
  }
  ,

  existArr(x) {
    return x = (typeof x !== 'undefined' && x instanceof Array) ? x : []
  }
  ,

  json2array(json) {
    const result = []
    const keys = Object.keys(json)
    keys.forEach((key) => {
      result.push(json[key])
    })
    return result
  },

  executefunc(myself: any, table, func: number, par: IParamDialog) {
    if (func === lists.MenuAction.DELETE) {
      console.log('param1', par.param1)
      CalendarStore.actions.CancelBookingEvent({
        ideventbook: par.param1,
        notify: par.param2 === true ? '1' : '0'
      }).then((ris) => {
        if (ris) {
          tools.showPositiveNotif(myself.$q, myself.$t('cal.canceledbooking') + ' "' + par.param3 + '"')
          if (myself.bookEventpage)
            myself.bookEventpage.show = false
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('cal.cancelederrorbooking'))
      })
    } else if (func === lists.MenuAction.DELETE_EVENT) {
      console.log('param1', par.param1, 'id', par.param1._id)
      CalendarStore.actions.CancelEvent({ id: par.param1._id }).then((ris) => {
        if (ris) {
          // Remove this record from my list
          CalendarStore.state.eventlist = CalendarStore.state.eventlist.filter((event) => (event._id !== par.param1._id))
          tools.showPositiveNotif(myself.$q, myself.$t('cal.canceledevent') + ' "' + par.param1.title + '"')
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('cal.cancelederrorevent'))
      })
    } else if (func === lists.MenuAction.DELETE_RECTABLE) {
      console.log('param1', par.param1)
      GlobalStore.actions.DeleteRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param2, null)
          tools.showPositiveNotif(myself.$q, myself.$t('db.deletedrecord'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recdelfailed'))
      })
    } else if (func === lists.MenuAction.DUPLICATE_RECTABLE) {
      console.log('param1', par.param1)
      GlobalStore.actions.DuplicateRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param2, ris.data)
          tools.showPositiveNotif(myself.$q, myself.$t('db.duplicatedrecord'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recdupfailed'))
      })
    }
  },

  async askConfirm($q: any, mytitle, mytext, ok, cancel, myself: any, table, funcok: number, funccancel: number, par: IParamDialog) {
    return $q.dialog({
      message: mytext,
      ok: {
        label: ok,
        push: true
      },
      title: mytitle,
      cancel: true,
      persistent: false
    }).onOk(() => {
      console.log('OK')
      tools.executefunc(myself, table, funcok, par)
      return true
    }).onCancel(() => {
      console.log('CANCEL')
      tools.executefunc(myself, table, funccancel, par)
      return false
    })
  },

  showPositiveNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'positive', icon: 'notifications' })
  },

  showNegativeNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'negative', icon: 'notifications' })
  },

  showNeutralNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'info', icon: 'notifications' })
  },

  showNotif(q: any, msg, data ?: INotify | null
  ) {
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
  }
  ,

  isRegistered() {
    return localStorage.getItem(tools.localStorage.userId) !== ''
  }
  ,

  checkIfUserExist(mythis) {

    if (UserStore.getters.isUserInvalid) {
      tools.showNotif(mythis.$q, mythis.$t('todo.usernotdefined'))
      return false
    }

    if (!tools.isRegistered()) {
      // Not logged
      tools.showNotif(mythis.$q, mythis.$t('user.notregistered'))
      return false
    }

    return true
  }
  ,

  checkLangPassed(mylang) {
    // console.log('checkLangPassed')

    const mybrowserLang = Quasar.lang.isoName

    if (mylang !== '') {
      if ((mylang.toLowerCase() === 'enus') || (mylang.toLowerCase() === 'en-us')) {
        mylang = 'enUs'
      }
      if ((mylang.toLowerCase() === 'es') || (mylang.toLowerCase() === 'es-es') || (mylang.toLowerCase() === 'eses')) {
        mylang = 'es'
      }
      if ((mylang.toLowerCase() === 'fr') || (mylang.toLowerCase() === 'fr-fr') || (mylang.toLowerCase() === 'frfr')) {
        mylang = 'fr'
      }
      if ((mylang.toLowerCase() === 'it') || (mylang.toLowerCase() === 'it-it') || (mylang.toLowerCase() === 'itit')) {
        mylang = 'it'
      }

      if (!(static_data.arrLangUsed.includes(mylang))) {
        console.log('non incluso ', mylang)
        mylang = static_data.arrLangUsed[0]

        // Metti come default
        UserStore.mutations.setlang(mylang)
      }
    }

    if (!mylang) {
      mylang = process.env.LANG_DEFAULT
    }

    if (toolsext.getLocale(true) === '') {
      UserStore.mutations.setlang(mylang)
    }

    // console.log('mylang calc : ', mylang)

    return mylang
  },

  getimglogo() {
    return 'statics/images/' + process.env.LOGO_REG
  }
  ,

  consolelogpao(strlog, strlog2 = '', strlog3 = '') {
    globalroutines(null, 'log', strlog + ' ' + strlog2 + ' ' + strlog3, null)
  }
  ,

  /*
  get todos_vista() {
    let mystr = ''
    const arr = Todos.getters.items_dacompletare(this.categoryAtt)
    for (const ind in arr) {
      mystr += this.getstrelem(arr[ind]) + '\n'
    }

    return mystr + ''

  }

  */

  /*
    public getArrTodos() {

      let mystr = ''

      return globalroutines(null, 'readall', 'todos', null)
        .then((alldata) => {
          const myrecs = [...alldata]

          myrecs.forEach((rec) => {
            mystr = mystr + rec.descr + rec.completed + ']   ['
          })

          // this.tmpstrTodos = 'TODOS: ' + mystr
        })
    }
  */

  aspettansec(numsec) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('anything')
      }, numsec)
    })
  }
  ,

  dragula_option($service, dragname) {
    $service.options(dragname,
      {
        moves(el, source, handle, sibling) {
          return !el.classList.contains('donotdrag') // elements are always draggable by default
        },
        accepts(el, target, source, sibling) {
          return true // elements can be dropped in any of the `containers` by default
        },
        invalid(el, handle) {
          return el.classList.contains('donotdrag') // don't prevent any drags from initiating by default
        },
        direction: 'vertical'
      })
  }
  ,

// _.cloneDeep(  Per clonare un oggetto

  isLoggedToSystem() {
    const tok = tools.getItemLS(tools.localStorage.token)
    return !!tok
  }
  ,

  mapSort(linkedList) {
    console.log('mapSort')
    let sortedList = []
    const map = new Map()
    let currentId = null

    // console.log('linkedList', linkedList)

    // index the linked list by previous_item_id
    for (let i = 0; i < linkedList.length; i++) {
      const item = linkedList[i]
      // tools.logelemprj(i, item)
      if (item.id_prev === ApiTables.LIST_START) {
        // first item
        currentId = String(item._id)
        // console.log('currentId', currentId);
        sortedList.push(item)
      } else {
        map.set(item.id_prev, i)
      }
    }

    // let i2 = 0
    while (sortedList.length < linkedList.length) {
      // get the item with a previous item ID referencing the current item
      const nextItem = linkedList[map.get(currentId)]
      if (nextItem === undefined) {
        break
      }
      sortedList.push(nextItem)
      // tools.logelemprj('FATTO:' + i, nextItem)
      currentId = String(nextItem._id)
      // i2++
    }

    if (sortedList.length < linkedList.length) {
      console.log('!!!!! NON CI SONO TUTTI !!!!!', sortedList.length, linkedList.length)
      // Forget something not in a List !
      for (const itemlinked of linkedList) {
        const elemtrov = sortedList.find((item) => item._id === itemlinked._id)
        if (elemtrov === undefined) {
          sortedList.push(itemlinked)
        }
      }
    }

    // Now Order by Priority
    if (!!sortedList) {
      if (sortedList.length > 0) {
        if (sortedList[0].priority !== undefined) {
          const sortednew = []
          let myarr = []
          for (const priorelem of lists.selectPriority.it) {
            const myprior = priorelem.value
            myarr = sortedList.filter((item) => item.priority === myprior)
            if (myarr !== undefined)
              sortednew.push(...myarr)
          }

          sortedList = sortednew
        }
      }
    }

    // console.log('DOPO sortedList', sortedList)

    return sortedList
  },

  getProgressClassColor(progress) {
    if (progress > 66) {
      return 'highperc'
    } else if (progress > 33) {
      return 'medperc'
    } else {
      return 'lowperc'
    }
  }
  ,

  getProgressColor(progress) {
    if (progress > 66) {
      return 'green'
    } else if (progress > 33) {
      return 'blue'
    } else {
      return 'red'
    }
  },
  hasManyDays(mydatestart, mydateend) {
    if (mydateend)
      return tools.getstrDate(mydatestart) !== tools.getstrDate(mydateend)
    else
      return false
  },

  isManager() {
    return UserStore.state.isManager
  },

  getstrDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY')
    else
      return ''
  },

  getstrTime(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'HH:mm')
    else
      return ''
  },

  getstrShortDate(mydate) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
      // timeZone: 'UTC'
    })
    try {
      if (DateFormatter) {
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }

  },
  getstrVeryShortDate(mydate) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      // timeZone: 'UTC'
    })
    try {
      if (DateFormatter) {
        const date1 = new Date(mydate)
        return DateFormatter.format(date1)
      }
      return mydate
    } catch (e) {
      return ''
    }

  },

  getstrDateTimeEvent(mythis, myevent, withhtml) {
    let mystr = ''
    // is same day?
    if (tools.getstrDate(myevent.dateTimeStart) === tools.getstrDate(myevent.dateTimeEnd)) {
      if (withhtml) {
        mystr += `<span class="cal__where-content">${tools.getstrDate(myevent.dateTimeStart)}</span>
                    <span class="cal__hours-content">${mythis.$t('cal.starttime')} ${ tools.getstrTime(myevent.dateTimeStart) }
                    ${ mythis.$t('cal.endtime')} ${ tools.getstrTime(myevent.dateTimeEnd) }`
      } else {
        mystr = `${tools.getstrDate(myevent.dateTimeStart)}
                 ${mythis.$t('cal.starttime')} ${ tools.getstrTime(myevent.dateTimeStart) }          
                 ${ mythis.$t('cal.endtime')} ${ tools.getstrTime(myevent.dateTimeEnd) }`
      }
    } else {
      mystr = `<span class="cal__where-content">${tools.getstrDate(myevent.dateTimeStart)}</span>
                 <span class="cal__hours-content">${mythis.$t('cal.starttime')} ${ tools.getstrTime(myevent.dateTimeStart) } </span>
                  ${ mythis.$t('cal.enddate')} ${tools.getstrDate(myevent.dateTimeEnd)}
                  <span class="cal__hours-content">${ mythis.$t('cal.endtime')} ${ tools.getstrTime(myevent.dateTimeEnd) } </span>`
    }

    if (myevent.infoextra) {
      mystr += `<span class="cal__hours">
                  <span class="cal__hours-title">${mythis.$t('cal.hours')}: </span>
                  <span class="cal__hours-content">${ myevent.infoextra }  </span>
              </span>
            </span>`
    }
    return mystr
  },

  getstrDateTimeEventSimple(mythis, myevent) {
    let mystr = ''
    // is same day?
    if (tools.getstrShortDate(myevent.dateTimeStart) === tools.getstrShortDate(myevent.dateTimeEnd)) {
      mystr = `${tools.getstrShortDate(myevent.dateTimeStart)}
                 h. ${ tools.getstrTime(myevent.dateTimeStart) }`
    } else {
      mystr = `${tools.getstrShortDate(myevent.dateTimeStart)} - ${ tools.getstrShortDate(myevent.dateTimeEnd) }`

    }

    return mystr
  },

  getstrDateTimeEventShort(mythis, myevent) {
    let mystr = ''
    // is same day?
    if (tools.getstrShortDate(myevent.dateTimeStart) === tools.getstrShortDate(myevent.dateTimeEnd)) {
      mystr = `${tools.getstrVeryShortDate(myevent.dateTimeStart)}
                 h. ${ tools.getstrTime(myevent.dateTimeStart) }`
    } else {
      mystr = `${tools.getstrVeryShortDate(myevent.dateTimeStart)} - ${ tools.getstrVeryShortDate(myevent.dateTimeEnd) }`

    }

    return mystr
  },

  getstrDateTime(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY HH:mm')
    else
      return ''
  },

  getstrDateTimeShort(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM HH:mm')
    else
      return ''
  },

  getstrDateEmailTime(mythis, mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY') + ' ' + mythis.$t('cal.starttime') + ' ' + date.formatDate(mytimestamp, 'HH:mm')
    else
      return ''
  }
  ,
  getstrMMMDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD MMM YYYY')
    else
      return ''
  }
  ,
  getstrYYMMDDDate(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD')
  }
  ,
  getstrYYMMDDDateTime(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm')
  },

  getstrYYMMDDDateTimeAll(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm:ss')
  },

// mystrdate "26.04.2013"
  convertstrtoDate(mystrdate: string) {
    if (mystrdate.length < 10) {
      return null
    }

    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
    const strdate = mystrdate.replace(pattern, '$3-$2-$1')
    let mydate = null
    if (date.isValid(strdate)) {
      mydate = new Date(strdate)
    } else {
      return null
    }
    // console.log('mystrdate', mystrdate, strdate, mydate)
    return mydate
  }
  ,

  capitalize(value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  ,

  firstchars(value, numchars = 200) {
    if (!value) {
      return ''
    }
    try {
      let mycar = value.substring(0, numchars)
      if (value.length > numchars)
        mycar += '...'
      return mycar
    } catch (e) {
      return value
    }
  }
  ,

  getDateNow() {
    const mydate = new Date()
    return mydate
  },
  getDateNowEvent() {
    return tools.addDays(tools.getDateNow(), -1)
  },
  getDateNull() {
    return new Date(0)
  }
  ,
  getTimeNow() {
    return new Date().getTime()
  }
  ,
  getTimestampsNow() {
    return new Date().valueOf()
  },

  gettimestampByDate(mydate) {
    return mydate.toString()
  },

  isMainProject(idproj) {
    return idproj === process.env.PROJECT_ID_MAIN
  }
  ,

  getUrlByTipoProj(tipoproj, name ?: string) {
    if (!!name)
      return '/' + name + '/'
    else
      return '/' + tipoproj + '/'
  }
  ,

  // convertMenuListInListRoutes(arrlista: IMenuList[]) {
  //   const lista = []
  //   if (arrlista === undefined)
  //     return lista
  //   for (const elem of arrlista) {
  //     const item: IListRoutes = {
  //       faIcon: 'fa fa-list-alt',
  //       materialIcon: elem.icon,
  //       name: elem.nametranslate,
  //       text: elem.description,
  //       path: tools.getUrlByTipoProj(false, elem.urlroute) + elem.idelem,
  //       routes2: tools.convertMenuListInListRoutes(elem.routes2),
  //       level_parent: elem.level_parent,
  //       level_child: elem.level_child
  //
  //     }
  //     lista.push(item)
  //   }
  //   return lista
  // },

  getprivacyreadbytipoproj(tipoproj) {
    if (tipoproj === RouteNames.myprojects)
      return Privacy.onlyme
    else
      return Privacy.all
  }
  ,

  getprivacywritebytipoproj(tipoproj) {
    return Privacy.onlyme
  }
  ,

  addRoute(myarr, values) {
    myarr.push(values)
  }
  ,
  displayConfirmNotification() {
    let options = null
    if ('serviceWorker' in navigator) {
      options = {
        body: 'You successfully subscribed to our Notification service!',
        icon: '/statics/icons/app-icon-96x96.png',
        image: '/statics/images/sf-boat.jpg',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/statics/icons/app-icon-96x96.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: 'Okay', icon: '/statics/icons/app-icon-96x96.png' },
          { action: 'cancel', title: 'Cancel', icon: '/statics/icons/app-icon-96x96.png' }
        ]
      }

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
          .then((swreg) => {
            swreg.showNotification('Successfully subscribed!', options)
          })
      }
    }
  }
  ,

  dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    const blob = new Blob([ab], { type: mimeString })
    return blob
  }
  ,

  showNotificationExample() {
    let options = null
    const mythis = this
    if ('serviceWorker' in navigator) {
      options = {
        body: mythis.$t('notification.subscribed'),
        icon: '/statics/icons/android-chrome-192x192.png',
        image: '/statics/images/imglogonotif.png',
        dir: 'ltr',
        lang: 'enUs', // BCP 47,
        vibrate: [100, 50, 200],
        badge: '/statics/icons/android-chrome-192x192.png',
        tag: 'confirm-notification',
        renotify: true,  // if it's already sent, will Vibrate anyway
        actions: [
          { action: 'confirm', title: mythis.$t('dialog.ok'), icon: '/statics/icons/android-chrome-192x192.png' }
          // { action: 'cancel', title: 'Cancel', icon: '/statics/icons/android-chrome-192x192.png', }
        ]
      }

      navigator.serviceWorker.ready
        .then((swreg) => {
          swreg.showNotification('aaa', options)
        })
    }
  }
  ,

  getemailto(text) {
    return 'mailto:' + text
  }
  ,

  askfornotification() {
    tools.showNotif(this.$q, this.$t('notification.waitingconfirm'), { color: 'positive', icon: 'notifications' })

    Notification.requestPermission((result) => {
      console.log('User Choice', result)
      if (result === 'granted') {
        tools.showNotif(this.$q, this.$t('notification.confirmed'), { color: 'positive', icon: 'notifications' })
      } else {
        tools.showNotif(this.$q, this.$t('notification.denied'), { color: 'negative', icon: 'notifications' })

        // displayConfirmNotification();
      }
    })

  }
  ,

  heightgallery() {
    return tools.heightGallVal().toString() + 'px'
  }
  ,

  heightGallVal() {
    let maxh2 = 0

    if (Screen.width < 400) {
      maxh2 = 350
    } else if (Screen.width < 600) {
      maxh2 = 400
    } else if (Screen.width < 700) {
      maxh2 = 450
    } else if (Screen.width < 800) {
      maxh2 = 550
    } else if (Screen.width < 1000) {
      maxh2 = 650
    } else if (Screen.width < 1200) {
      maxh2 = 700
    } else {
      maxh2 = 750
    }

    return maxh2
  }
  ,

  myheight_imgtitle(myheight ?, myheightmobile ?) {
    let maxheight = 0
    if (!!myheight) {
      maxheight = myheight
      if (myheight > 0) {
        if (myheight > 1000) {
          maxheight = 1000
        } else {
          maxheight = parseInt(myheight, 10)
        }
      }
    } else {
      maxheight = 500
    }

    const maxh2 = this.heightGallVal()

    // console.log('maxh2', maxh2)
    // console.log('maxheight', maxheight)

    let ris = 0

    if (maxh2 < maxheight)
      ris = maxh2
    else
      ris = maxheight

    if (!!myheightmobile) {
      if (this.isMobile() && maxh2 > myheightmobile)
        ris = parseInt(myheightmobile, 10)
    }

    // console.log('ris', ris)
    return ris
  }
  ,

  myheight_dialog() {
    if (Screen.width < 400) {
      return '337'
    } else if (Screen.width < 600) {
      return '400'
    } else {
      return '500'
    }
  },

  styles_imgtitle(sized ?: string) {
    if (!!sized) {
      return sized
    } else {
      if (Screen.width < 400) {
        return 'max-height: 250px'
      } else {
        return 'max-height: 350px'
      }
    }
  }
  ,

  /*
      <q-img
        src="https://cdn.quasar.dev/img/image-src.png"
        srcset="https://cdn.quasar.dev/img/image-1x.png 400w,
                https://cdn.quasar.dev/img/image-2x.png 800w,
                https://cdn.quasar.dev/img/image-3x.png 1200w,
                https://cdn.quasar.dev/img/image-4x.png 1600w"
        sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
        style="height: 280px; max-width: 300px"
      >
        <div class="absolute-bottom text-body1 text-center">
          With srcset & sizes
        </div>
      </q-img>
  */

  getsizes() {
    return '(max-width: 400px) 400w, ' +
      '(min-width: 400px) and (max-width: 800px) 800w, ' +
      '(min-width: 800px) and (max-width: 1200px) 1200w, ' +
      '(min-width: 1200px) 1600w'
  }
  ,

  maxwidth_imgtitle() {
    if (Screen.width < 400) {
      return 'max-width: 250px'
    } else {
      return 'max-width: 350px'
    }
  }
  ,

  isMobile() {
    return (Screen.width < 400)
  }
  ,

  mywidth_imgtitle() {
    if (Screen.width < 400) {
      return '250'
    } else if (Screen.width < 600) {
      return '350'
    } else {
      return '350'
    }
  }
  ,

  mymargin_imgtitle() {
    return 'auto'
  }
  ,

  showthumbnails() {
    if (Screen.width < 400) {
      return false
    } else if (Screen.width < 600) {
      return true
    } else {
      return true
    }
  }
  ,

  padTime(val) {
    val = Math.floor(val)
    if (val < 10) {
      return '0' + val
    }
    return val + ''
  }
  ,

  getLocale(vero ?: boolean) {
    if (UserStore) {
      if (UserStore.state) {
        return UserStore.state.lang
      }
    }
    if (!vero)
      return process.env.LANG_DEFAULT
    else
      return ''
  }
  ,

  addDays(mydate, days) {
    return date.addToDate(mydate, { days })
  }
  ,

  addMinutes(mydate, minutes) {
    return date.addToDate(mydate, { minutes })
  }
  ,

  gettitlemain(datamain: ITimeLineMain) {
    if (datamain.titlemain[toolsext.getLocale()])
      return datamain.titlemain[toolsext.getLocale()]
    else {
      return datamain.titlemain[static_data.arrLangUsed[0]]
    }

  }
  ,
  getwwithwhocoll(datamain: ICollaborations) {
    if (datamain.withwhom_title[toolsext.getLocale()])
      return datamain.withwhom_title[toolsext.getLocale()]
    else {
      return datamain.withwhom_title[static_data.arrLangUsed[0]]
    }

  }
  ,
  gettextcoll(data: IColl) {
    if (data.subtitle[toolsext.getLocale()])
      return data.subtitle[toolsext.getLocale()]
    else {
      return data.subtitle[static_data.arrLangUsed[0]]
    }
  }
  ,
  gettitlecoll(data: IColl) {
    if (data.title[toolsext.getLocale()])
      return data.title[toolsext.getLocale()]
    else {
      return data.title[static_data.arrLangUsed[0]]
    }
  }
  ,
  gettextdescr(data: ITimeLineEntry, numdescr = 'description'
  ) {
    if (!!data[numdescr]) {
      if (data[numdescr][toolsext.getLocale()])
        return data[numdescr][toolsext.getLocale()]
      else {
        return data[numdescr][static_data.arrLangUsed[0]]
      }
    } else {
      return ''
    }
  }
  ,

  getlink(data: ITimeLineEntry) {
    if (data.link_text[toolsext.getLocale()])
      return data.link_text[toolsext.getLocale()]
    else {
      return data.link_text[static_data.arrLangUsed[0]]
    }

  }
  ,

  getlinkurl(data: ITimeLineEntry) {
    if (data.link_url_lang) {
      if (data.link_url_lang[toolsext.getLocale()]) {
        return data.link_url_lang[toolsext.getLocale()]
      } else {
        return data.link_url
      }
    } else {
      return data.link_url
    }

  },

  appid() {
    return process.env.APP_ID
  },

  getLabelByItem(item, mythis) {
    if (!!item.name)
      return mythis.$t(item.name)
    else
      return item.text

  },

  getimgev(ev) {
    if (!!ev.img_small)
      return `statics/` + ev.img_small
    else if (!!ev.img)
      return `statics/` + ev.img
    else
      return ''
  },

  getimgbysize(dir: string, file: string) {
    const myimage = dir + file
    // console.log('includes = ', static_data.preLoadImages.map((a) => a.imgname).includes(myimage), myimage)
    let ris = ''
    if (this.isMobile() && (static_data.preLoadImages.map((a) => a.imgname).includes(myimage))) {
      ris = dir + 'mobile/' + file
    } else {
      ris = myimage
    }

    // console.log('getimgbysize', ris)

    return ris
  },

  getimgFullpathbysize(fileimg: string) {
    const ind = fileimg.lastIndexOf('/')
    if (ind > 0) {
      return { path: fileimg.substring(0, ind + 1), file: fileimg.substring(ind + 1) }
    } else {
      return { path: '', file: fileimg }
    }

  }
  ,

  convertHTMLtoText(myhtml) {
    let msg = myhtml
    msg = msg.replace('&quot;', '"')
    msg = msg.replace('&gt;', '>')
    msg = msg.replace('&lt;', '<')
    msg = msg.replace('&amp;', '&')
    msg = msg.replace('<br>', '\n')

    return msg
  }
  ,
  gettextevent(mythis, myevent: IEvents) {
    // return '"' + myevent.title + '" (' + func_tools.getDateStr(myevent.date) + ') - ' + myevent.time
    return '"' + myevent.title + '" (' + tools.getstrDateEmailTime(mythis, myevent.dateTimeStart) + ')'
  },

  setLangAtt(mylang) {
    console.log('setLangAtt =', mylang)
    // console.log('PRIMA this.$q.lang.isoName', this.$q.lang.isoName)

    // dynamic import, so loading on demand only
    import(`quasar/lang/${mylang}`).then((lang) => {
      console.log('   Import dinamically lang =', lang)
      Quasar.lang.set(lang.default)
      import(`../../statics/i18n`).then(() => {
        console.log('   *** MY LANG DOPO=', Quasar.lang.isoName)
      })
    })

    // this.$q.lang.set(mylang)

  }
  ,
  getappname(mythis) {
    if (mythis === undefined)
      return ''
    if (mythis.$t === undefined)
      return ''
    if (Screen.width < 400) {
      return mythis.$t('msg.myAppNameShort')
    } else {
      return mythis.$t('msg.myAppName')
    }
  },

  loginOk(mythis, ispageLogin: boolean) {
    // console.log('loginOk')

    if (toolsext.getLocale() !== '') {
      mythis.$i18n.locale = toolsext.getLocale()
    }    // Set Lang
    else {
      UserStore.mutations.setlang(mythis.$i18n.locale)
    }     // Set Lang

    if (process.env.DEBUG) {
      console.log('LANG ORA=', toolsext.getLocale())
    }

    globalroutines(mythis, 'loadapp', '')

    tools.SignIncheckErrors(mythis, tools.OK, ispageLogin)
  }
  ,

  loginInCorso(mythis) {
    // console.log('loginInCorso')

    let msg = mythis.$t('login.incorso')
    if (process.env.DEBUG) {
      msg += ' ' + process.env.MONGODB_HOST
    }
    mythis.$q.loading.show({ message: msg })
  }
  ,

  SignIncheckErrors(mythis, riscode, ispageLogin ?: boolean) {
    // console.log('SignIncheckErrors: ', riscode)
    try {
      if (riscode === tools.OK) {
        tools.showNotif(mythis.$q, mythis.$t('login.completato'), { color: 'positive', icon: 'check' })
        if (ispageLogin) {
          mythis.$router.push('/')
        }
      } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR) {

        // Wait N seconds to avoid calling many times...
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('anything')
          }, 3000)
        }).then(() => {
          setTimeout(() => {
            console.log('HIDE...')
            mythis.$q.loading.hide()
          }, 500)
          tools.showNotif(mythis.$q, mythis.$t('login.errato'), { color: 'negative', icon: 'notifications' })
          mythis.iswaitingforRes = false
          if (ispageLogin) {
            GlobalStore.state.RightDrawerOpen = true
            // mythis.$router.push('/signin')
          }
        })

      } else if (riscode === tools.ERR_SERVERFETCH) {
        tools.showNotif(mythis.$q, mythis.$t('fetch.errore_server'), { color: 'negative', icon: 'notifications' })
      } else if (riscode === tools.ERR_GENERICO) {
        const msg = mythis.$t('fetch.errore_generico') + UserStore.mutations.getMsgError(riscode)
        tools.showNotif(mythis.$q, msg, { color: 'negative', icon: 'notifications' })
      } else {
        tools.showNotif(mythis.$q, 'Errore num ' + riscode, { color: 'negative', icon: 'notifications' })
      }

      if (riscode !== serv_constants.RIS_CODE_LOGIN_ERR) {
        mythis.iswaitingforRes = false
        setTimeout(() => {
          mythis.$q.loading.hide()
        }, 200)
      }

    } finally {
      // ...
    }
  }
  ,

  SignUpcheckErrors(mythis, riscode: number) {
    console.log('SignUpcheckErrors', riscode)
    if (riscode === tools.DUPLICATE_EMAIL_ID) {
      tools.showNotif(mythis.$q, mythis.$t('reg.err.duplicate_email'))
    } else if (riscode === tools.DUPLICATE_USERNAME_ID) {
      tools.showNotif(mythis.$q, mythis.$t('reg.err.duplicate_username'))
    } else if (riscode === tools.ERR_SERVERFETCH) {
      tools.showNotif(mythis.$q, mythis.$t('fetch.errore_server'))
    } else if (riscode === tools.ERR_GENERICO) {
      const msg = mythis.$t('fetch.errore_generico') + UserStore.mutations.getMsgError(riscode)
      tools.showNotif(mythis.$q, msg)
    } else if (riscode === tools.OK) {
      mythis.$router.push('/signin')
      tools.showNotif(mythis.$q, mythis.$t('components.authentication.email_verification.link_sent'), {
        color: 'info',
        textColor: 'black'
      })
    } else {
      tools.showNotif(mythis.$q, 'Errore num ' + riscode)
    }

  }
  ,
  isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
  }
  ,
  displayClasses(eventparam) {
    return {
      // [`bg-${eventparam.bgcolor}`]: !tools.isCssColor(eventparam.bgcolor),
      'text-white': !tools.isCssColor(eventparam.bgcolor)
    }
  }
  ,
  displayStyles(eventparam) {
    const s = { color: '' }
    if (tools.isCssColor(eventparam.bgcolor)) {
      // s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(eventparam.bgcolor) > 0.5 ? 'black' : 'white'
    }
    return s
  }
  ,
  CancelBookingEvent(mythis, eventparam: IEvents, bookeventid: string, notify: boolean) {
    console.log('CancelBookingEvent ', eventparam)
    tools.askConfirm(mythis.$q, translate('cal.titlebooking'), translate('cal.cancelbooking') + ' ' + tools.gettextevent(mythis, eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, '', lists.MenuAction.DELETE, 0, {
      param1: bookeventid,
      param2: notify,
      param3: eventparam.title
    })
  }
  ,
  CancelEvent(mythis, eventparam: IEvents) {
    console.log('CancelEvent ', eventparam)
    tools.askConfirm(mythis.$q, translate('cal.event'), translate('cal.cancelevent') + ' ' + tools.gettextevent(mythis, eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, '', lists.MenuAction.DELETE_EVENT, 0, {
      param1: eventparam,
      param2: true
    })
  }
  ,
  ActionRecTable(mythis, action, table, id, item, askaction) {
    console.log('ActionRecTable', id)
    return tools.askConfirm(mythis.$q, 'Action', translate(askaction) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, table, action, 0, {
      param1: id,
      param2: item
    })
  }
  ,

  async createNewRecord(mythis, table, data) {

    const mydata = {
      table,
      data
    }

    return await
      GlobalStore.actions.saveTable(mydata)
        .then((record) => {
          if (record) {
            tools.showPositiveNotif(mythis.$q, mythis.$t('db.recupdated'))
          } else {
            tools.showNegativeNotif(mythis.$q, mythis.$t('db.recfailed'))
          }
          return record
        })
  },
  getheight(mythis) {
    // return height()
    return mythis.$q.screen.height
  },
  getwidth(mythis) {
    // return height()
    let myw = mythis.$q.screen.width
    if (GlobalStore.state.leftDrawerOpen)
      myw -= 300
    // if (GlobalStore.state.RightDrawerOpen)
    //   myw -= 300
    return myw

  },

  getwidthscale(mythis, mywidth, maxwidth) {
    if (this.isMobile()) {
      return mywidth
    } else {
      let myw = mywidth + ((this.getwidth(mythis) - mywidth) * 0.4)
      if (myw > maxwidth)
        myw = maxwidth

      return myw
    }
  },

  getheightbywidth(mythis, mywidth, myheight, maxwidth) {
    const myw = this.getwidthscale(mythis, mywidth, maxwidth)
    return myw * (myheight / mywidth)
  },

  getheightscale(mythis, myheight, maxheight) {
    if (this.isMobile()) {
      return myheight
    } else {
      let myh = myheight + ((this.getheight(mythis) - myheight) * 0.3)
      if (myh > maxheight)
        myh = maxheight

      return myh
    }
  },

  isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false
    const d = new Date(str)
    return d.toISOString() === str
  },

  getLastDateReadReset() {
    return new Date(1999, 1, 1, 0, 0, 0)
  },

  isBitActive(bit, whattofind) {
    if (whattofind > 0)
      return ((bit & whattofind) === whattofind)
    else
      return false
  },

  SetBit(myval, bit) {
    myval = myval | bit
    return myval
  },
  getUnique(arr, comp) {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e])

    return unique
  },

  getColorByIndexBest(index) {
    if (index < this.listBestColor.length - 1)
      return this.listBestColor[index]
    else
      return 'primary'
  },
  getCookie(mytok, oldval?) {
    const ris = Cookies.get(mytok)
    console.log('getCookie', ris)
    if (!!ris) {
      return ris
    } else {
      return oldval
    }
  },

  setCookie(mytok, value: string) {
    return Cookies.set(mytok, value)
  },

  removeCookie(mytok) {
    return Cookies.remove(mytok)
  },
  notshowPwd(payload) {
    const mypay = { ...payload }
    try {
      if (!!mypay.password) {
        mypay.password = '**********'
      }
    } catch (e) {
      console.log('error', e)
    }
    return mypay
  },
  scrollToTop() {
    const element = document.getElementById('mypage')
    this.scrollToElement(element)
  },
  scrollToElementId(myid) {
    const element = document.getElementById(myid)
    this.scrollToElement(element)
  },
  scrollToElement(el) {
    const target = getScrollTarget(el)
    const offset = el.offsetTop
    const duration = 500
    console.log('target', target, 'offset', offset, 'duration', duration)
    setScrollPosition(target, offset, duration)
  },
  getCellForWhatsapp(numbercell) {
    if (!numbercell)
      return ''
    let mynum = numbercell.replace(/\-/g, '')
    const intcode = GlobalStore.getters.getValueSettingsByKey('INT_CODE')
    if (numbercell.substring(0, 1) !== '+')
      mynum = intcode + mynum
    else
      mynum = mynum.substring(1)

    return mynum
  },

  getHttpForWhatsapp(numbercell) {
    if (!numbercell)
      return ''
    const mynum = this.getCellForWhatsapp(numbercell)
    if (mynum)
      return 'https://wa.me/' + mynum
    else
      return ''
  },

  getHttpForTelegram(usertelegram) {
    if (usertelegram)
      return 'https://t.me/' + usertelegram
    else
      return ''
  },
  metafunc(mythis) {
    return {
      title: mythis.$t('msg.myAppName'),
      titleTemplate: (title) => `${mythis.mymeta.title} - ${mythis.$t('msg.myAppName')}`,
      meta: {
        keywords: {
          name: 'keywords',
          content: mythis.mymeta.keywords
        },
        description: {
          name: 'description',
          content: mythis.mymeta.description
        },
        equiv: { 'http-equiv': 'Content-Type', 'content': 'text/html; charset=UTF-8' }
      }
    }
  },
  isObject(anything) {
    //Object.create(null) instanceof Object → false
    return Object(anything) === anything
  }

// getLocale() {
  //   if (navigator.languages && navigator.languages.length > 0) {
  //     return navigator.languages[0]
  //   } else {
  //     return navigator.userLanguages || navigator.language || navigator.browserLanguages || 'it-IT'
  //   }
  // }
}
