import { Todos, Projects, UserStore, CalendarStore, GlobalStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { costanti } from './costanti'
import { toolsext } from './toolsext'
import { translation } from './translation'
import Quasar, { colors, date, Screen } from 'quasar'
import { scroll } from 'quasar'

import { copyToClipboard } from 'quasar'

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
  Privacy, TipoVisu
} from '@src/model'
import * as ApiTables from '@src/store/Modules/ApiTables'
import translate from '@src/globalroutines/util'
import { RouteNames } from '@src/router/route-names'

import { lists } from './lists'
import { preloadedimages, static_data } from '@src/db/static_data'
import { IColl, ITimeLineEntry, ITimeLineMain } from '@src/model/GlobalStore'
import { func_tools } from '@src/store/Modules/toolsext'
import { serv_constants } from '@src/store/Modules/serv_constants'
import { shared_consts } from '@src/common/shared_vuejs'

import { dom } from 'quasar'

const printf = require('util').format

const { height, width } = dom

import Cookies from 'js-cookie'
import { forEachComment } from 'tslint'
import messages from '@src/statics/i18n'

const TokenKey = 'Admin-Token'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
  CAN_EDIT: 'q-ce',
  TABBED_DASHBOARD: 't-db',
  TABBED_HOME: 't-home',
  TABBED_NAVE: 't-nave',

  getprefCountries: ['it', 'es', 'us'],

  APORTADOR_NONE: '------',

  TYPECONF_ZOOM: 'zoom',
  TYPECONF_JITSI: 'jitsi',

  APORTADOR_SOLIDARIO: 'apsol',

  IDAPP_AYNI: '7',
  IDAPP_SIP: '9',
  IDAPP_CNM: '10',

  TipoMsg: {
    SEND_LINK_CHAT_DONATORI: 1,
    SEND_MSG: 2,
    SEND_MSG_SINGOLO: 3,
    SEND_TO_ALL: 10,
    SEND_MSG_EFFETTUA_IL_DONO: 1000,
    SEND_MSG_SOLLECITO_DONATORI_NO_DONO: 1005,
    SEND_MSG_A_MEDIATORI: 1010,
    SEND_MSG_A_SOGNATORE: 1020,
    SEND_MSG_A_UTENTE_SOSTITUITO: 1030,
    SEND_MSG_DONO_RICEVUTO_CORRETTAMENTE: 1040
  },

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

  TABUSER: 'users',
  TABNAVI: 'navi',
  TABLISTAINGRESSO: 'listaingressos',
  TABGRADUATORIA: 'graduatorias',
  TABEVENTS: 'myevents',
  TABEXTRALIST: 'extralist',
  TABNEWSLETTER: 'newstosent',
  TABGALLERY: 'gallery',
  TABMAILINGLIST: 'mailinglist',
  TABMYPAGE: 'mypage',
  TABCALZOOM: 'calzoom',
  TABGROUPS: 'groups',
  TABTEMPLEMAIL: 'templemail',
  TABOPZEMAIL: 'opzemail',
  TABSHAREWITHUS: 'sharewithus',

  MAX_CHARACTERS: 60,
  projects: 'projects',
  todos: 'todos',
  EMPTY: 0,
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  ERR_SERVERFETCH: -2,
  ERR_AUTHENTICATION: -5,

  NOFIELD: 'nofield',

  TYPE_AUDIO: 1,

  NUMSEC_CHECKUPDATE: 20000,

  FIRST_PROJ: '5ca8f17fcd40dc5012f53346',

  WHAT_NOTHING: 0,
  WHAT_TODO: 1,
  WHAT_PROJECT: 2,

  languageid: 5,

  peopleWhere: {
    participants: 1,
    lunch: 2,
    dinner: 3,
    dinnerShared: 4
  },

  SERVKEY_VERS: 'vers',

  localStorage: {
    teleg_id: 'ti',
    verified_email: 'vf',
    made_gift: 'mg',
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
    password: 512,
    listimages: 1024,
    exact: 2048,
    image: 3000,
    nationality: 4096,
    intcode: 5000,
    multioption: 6000,
    onlydate: 7000,
    hours: 8000
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

  SelectHours: [
    {
      id: 0,
      label: '0',
      value: 0
    },
    {
      id: 5,
      label: '0.5',
      value: 0.5
    },
    {
      id: 10,
      label: '1',
      value: 1
    },
    {
      id: 15,
      label: '1.5',
      value: 1.5
    },
    {
      id: 20,
      label: '2',
      value: 2
    },
    {
      id: 25,
      label: '2.5',
      value: 2.5
    },
    {
      id: 30,
      label: '3',
      value: 3
    },
    {
      id: 35,
      label: '3.5',
      value: 3.5
    },
    {
      id: 40,
      label: '4',
      value: 4
    },
    {
      id: 45,
      label: '4.5',
      value: 4.5
    },
    {
      id: 50,
      label: '5',
      value: 5
    },
    {
      id: 60,
      label: '6',
      value: 6
    },
    {
      id: 70,
      label: '7',
      value: 7
    },
    {
      id: 80,
      label: '8',
      value: 8
    },
    {
      id: 90,
      label: '9',
      value: 9
    },
    {
      id: 100,
      label: '10',
      value: 10
    },
    {
      id: 110,
      label: '11',
      value: 11
    },
    {
      id: 120,
      label: '12',
      value: 12
    },
  ],

  SelectMetodiPagamento: [
    {
      id: 0,
      label: '[Nessuno]',
      value: 0
    },
    {
      id: 1,
      label: 'Bonifico Bancario',
      value: 1
    },
    {
      id: 2,
      label: 'Paypal',
      value: 2
    },
    {
      id: 3,
      label: 'In Contanti alla CNM',
      value: 3
    },
  ],

  SelectListNumPeople: [
    {
      id: 0,
      label: '0',
      value: 0
    },
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
    },
    {
      id: 6,
      label: '6',
      value: 6
    },
    {
      id: 7,
      label: '7',
      value: 7
    },
    {
      id: 8,
      label: '8',
      value: 8
    },
    {
      id: 9,
      label: '9',
      value: 9
    },
    {
      id: 10,
      label: '10',
      value: 10
    },
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
      },
      {
        id: 5,
        label: translation.it.privacy.inherited,
        value: Privacy.inherited
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
      },
      {
        id: 5,
        label: translation.es.privacy.inherited,
        value: Privacy.inherited
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
      },
      {
        id: 5,
        label: translation.enUs.privacy.inherited,
        value: Privacy.inherited
      }
    ]
  },

  selectTipoVisu: {
    it: [
      {
        id: 1,
        label: translation.it.privacy.inherited,
        value: TipoVisu.inherited
      },
      {
        id: 2,
        label: translation.it.tipovisu.simplelist,
        value: TipoVisu.simplelist
      },
      {
        id: 3,
        label: translation.it.tipovisu.taskProgress,
        value: TipoVisu.taskProgress
      },
      {
        id: 4,
        label: translation.it.tipovisu.responsabili,
        value: TipoVisu.responsabili
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
      },
      {
        id: 15,
        disable: false,
        label: translation.it.task.showposiz,
        value: 155,  // SHOW_POSIZ
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
    } else if (priority === tools.Priority.PRIORITY_NORMAL) {
      cl = 'medium_priority'
    } else if (priority === tools.Priority.PRIORITY_LOW) {
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
    console.log(mystr, 'elem [', elem._id, '] ', elem.descr, 'pos', elem.pos, ' Pr(', tools.getPriorityByInd(elem.priority), ')  modif=', elem.modified)
  }
  ,

  getelemprojstr(elem) {
    return elem.descr + ' [id= ' + elem._id + '] ' + 'pos: ' + elem.pos + ']\n'
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
    return 'elem [' + elem._id + '] ' + elem.descr + ' Pr(' + tools.getPriorityByInd(elem.priority) + ') modif=' + elem.modified + ' '
  }
  ,

  logga_arr(myarr
              :
              ITodo[]
  ) {
    let mystr = '\n'
    myarr.forEach((item) => {
      mystr += '[' + item.pos + '] ' + item.descr + ' Pr(' + tools.getPriorityByInd(item.priority) + ')' + ' modif=' + item.modified + '\n'
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
    if ((ris == null) || (ris === '') || (ris === 'null') || !ris) {
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

  /* update_idprev(myarr, indelemchange, indelemId) {
    if (tools.isOkIndex(myarr, indelemchange)) {
      // const id_prev = (indelemId >= 0) ? myarr[indelemId]._id : ApiTables.LIST_START
      const id_prevnew = myarr[indelemchange].id_prevnew
      console.log('update_idprev [', indelemchange, ']', myarr[indelemchange].descr, '[id_prev=', myarr[indelemchange].id_prev, ']', '[id_prevnew=', id_prevnew, ']')
      if (myarr[indelemchange].id_prev !== id_prevnew) {
        // tools.notifyarraychanged(myarr)
        // myarr[indelemchange].modified = true
        // console.log('update_idprev Index=', indelemchange, 'indtoget', indelemId, tools.getstrelem(myarr[indelemchange]))
        console.log('   MODIFICATO! ', myarr[indelemchange].descr, ' PRIMA:', myarr[indelemchange].id_prev, 'DOPO: ', id_prevnew)
        myarr[indelemchange].id_prev = id_prevnew
        return myarr[indelemchange]
      }
    }
    return null
  }, */


  async swapGeneralElem(nametable, myarr, itemdragend, listFieldsToChange) {

    const arrprec = [...myarr]

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
      console.log('   PRIMA!', tools.logga_arrproj(myarr))
      myarr.splice(itemdragend.newIndex, 0, myarr.splice(itemdragend.oldIndex, 1)[0])
      console.log('   DOPO!', tools.logga_arrproj(myarr))

      // Ora inverti gli indici
      const indold = itemdragend.oldIndex
      itemdragend.oldIndex = itemdragend.newIndex
      itemdragend.newIndex = indold

      /*
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
      } */

      let status = 0

      // const arr = lists.selectPriority[toolsext.getLocale()]
      // for (const priority of arr) {
      for (let i = 0; i < myarr.length; ++i) {
        if (nametable === 'todos') {
          status = myarr[i].statustodo
        } else if (nametable === 'projects') {
          status = myarr[i].statusproj
        }
        if (status !== tools.Status.COMPLETED) {
          myarr[i].pos = i

          const findelem = arrprec.find((rec) => rec._id === myarr[i]._id)

          if (findelem !== myarr[i].pos) {
            myarr[i].modified = true
            await ApiTables.table_ModifyRecord(nametable, myarr[i], listFieldsToChange, 'pos')
          }
        }

      }
      for (let i = 0; i < myarr.length; ++i) {
        if (nametable === 'todos') {
          status = myarr[i].statustodo
        } else if (nametable === 'projects') {
          status = myarr[i].statusproj
        }
        // (myarr[i].priority === priority.value)
        if ((status === tools.Status.COMPLETED)) {
          myarr[i].pos = 1000 + i

          const findelem = arrprec.find((rec) => rec._id === myarr[i]._id)

          if (findelem !== myarr[i].pos) {
            myarr[i].modified = true
            await ApiTables.table_ModifyRecord(nametable, myarr[i], listFieldsToChange, 'pos')
          }
        }

      }
      // }

      /*

       console.table(myarr)

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


       */

      tools.notifyarraychanged(myarr)

      // console.log('arr FINALE', tools.logga_arrproj(myarr))

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
  },


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
      } else if (priority === tools.Priority.PRIORITY_HIGH) {
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
  },

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
    } else {
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

  visumenu(elem) {  // : IListRoutes
    let visu = ((elem.onlyAdmin && UserStore.state.isAdmin) || (elem.onlyManager && UserStore.state.isManager)
      || (elem.onlySocioResidente && UserStore.state.my.profile.socioresidente)
      || (elem.onlyConsiglio && UserStore.state.my.profile.consiglio)
      || (elem.onlyNotSoci && !UserStore.state.my.profile.socio)
      || (elem.onlyTutor && UserStore.state.isTutor)
      || (elem.onlyEditor && UserStore.state.isEditor)
      || (elem.onlyDepartment && UserStore.state.isDepartment)
      || ((!elem.onlyAdmin) && (!elem.onlyManager) && (!elem.onlyTutor) && (!elem.onlyEditor) && (!elem.onlyDepartment)
        && (!elem.onlySocioResidente) && (!elem.onlyConsiglio) && (!elem.onlyNotSoci))) && elem.active

    if (!tools.isLoggedToSystem()) {
      if (elem.onlyif_logged)
        visu = false
    }

    if (elem.meta && elem.meta.requiresAuth) {
      visu = visu && tools.isLoggedToSystem()
    }
    return visu
  },

  executefunc(myself: any, table, func: number, par: IParamDialog) {
    if (func === lists.MenuAction.DELETE) {
      // console.log('param1', par.param1)
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
      // console.log('param1', par.param1, 'id', par.param1._id)
      CalendarStore.actions.CancelEvent({ id: par.param1._id }).then((ris) => {
        if (ris) {
          // Remove this record from my list
          CalendarStore.state.eventlist = CalendarStore.state.eventlist.filter((event) => (event._id !== par.param1._id))
          tools.showPositiveNotif(myself.$q, myself.$t('cal.canceledevent') + ' "' + par.param1.title + '"')
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('cal.cancelederrorevent'))
      })
    } else if (func === lists.MenuAction.DELETE_EXTRALIST) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      GlobalStore.actions.DeleteRec({ table: tools.TABEXTRALIST, id: par.param1._id }).then((ris) => {
        if (ris) {
          myself.update_username()
          tools.showPositiveNotif(myself.$q, myself.$t('reg.cancella_invitato') + ' "' + par.param1.name + ' ' + par.param1.surname + '"')
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.DELETE_USERLIST) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      GlobalStore.actions.DeleteRec({ table: tools.TABUSER, id: par.param1._id }).then((ris) => {
        if (ris) {
          myself.update_username()
          tools.showPositiveNotif(myself.$q, myself.$t('reg.cancella_invitato') + ' "' + par.param1.name + ' ' + par.param1.surname + '"')
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.ZOOM_GIA_PARTECIPATO) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      const mydatatosave = {
        id: par.param1._id,
        ind_order: par.param1.ind_order,
        myfunc: func,
        data: par.param2,
        username: par.param2.username,
        notifBot: null
      }

      // if (par.param2.notifBot)
      //  mydatatosave.notifBot = { un: par.param2.notifBot, txt: par.param3 }

      // myself.EseguiCallServer()

      GlobalStore.actions.callFunz({ mydata: mydatatosave }).then((ris) => {
        if (ris) {
          myself.Callback(func)
          tools.showPositiveNotif(myself.$q, par.param3)
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.REGALA_INVITATO) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      let mydatatosave = {
        id: null,
        username: '',
        table: '',
        fieldsvalue: {},
        notifBot: {}
      }

      if (!!par.param1.invitante_username) {
        mydatatosave = {
          id: par.param1._id,
          username: par.param1.username,
          table: tools.TABLISTAINGRESSO,
          fieldsvalue: { invitante_username: par.param2.aportador_solidario },
          notifBot: null
        }
      } else {
        mydatatosave = {
          id: par.param1._id,
          username: '',
          table: tools.TABUSER,
          fieldsvalue: { aportador_solidario: par.param2.aportador_solidario },
          notifBot: null
        }
      }

      console.log('** par.param1', par.param1)
      console.log('** id', par.param1._id)

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2.aportador_solidario, txt: par.param3 }
      }

      GlobalStore.actions.saveFieldValue(mydatatosave).then((ris) => {
        console.log('ris saveFieldValue', ris)
        if (ris) {
          tools.showPositiveNotif(myself.$q, myself.$t('reg.invitato_regalato') + ' "' + par.param1.name + ' ' + par.param1.surname + '"')
          myself.update_username()
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.REGALA_INVITANTE) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      const mydatatosave = {
        id: par.param1,
        table: tools.TABLISTAINGRESSO,
        fieldsvalue: { invitante_username: par.param2.invitante_username, ind_order_ingr: par.param2.ind_order_ingr },
        notifBot: null
      }

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2.invitante_username, txt: par.param3 }
      }

      GlobalStore.actions.saveFieldValue(mydatatosave).then((ris) => {
        console.log('ris saveFieldValue', ris)
        if (ris) {
          tools.showPositiveNotif(myself.$q, myself.$t('reg.invitante_regalato') + ' "' + par.param2.name + ' ' + par.param2.surname + '"')
          myself.update_username()
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if ((func === lists.MenuAction.AGGIUNGI_NUOVO_IMBARCO) || (func === lists.MenuAction.CANCELLA_IMBARCO)) {
      const mydatatosave = {
        username: par.param1.username,
        invitante_username: '',
        ind_order: -1,
        num_tess: 0,
        myfunc: func,
        data: par.param2,
        notifBot: null
      }

      if (func === lists.MenuAction.CANCELLA_IMBARCO) {
        mydatatosave.ind_order = par.param1.ind_order
        mydatatosave.num_tess = par.param1.num_tess
        mydatatosave.data.id = par.param2.rec._id
      }
      if (func === lists.MenuAction.AGGIUNGI_NUOVO_IMBARCO) {
        mydatatosave.invitante_username = par.param1.invitante_username
      }

      myself.loading = true

      mydatatosave.notifBot = { un: par.param2, txt: par.param3 }

      GlobalStore.actions.callFunz({ mydata: mydatatosave }).then((ris) => {
        myself.loading = false
        if (ris) {
          myself.update_username()
          if (func === lists.MenuAction.AGGIUNGI_NUOVO_IMBARCO)
            tools.showPositiveNotif(myself.$q, myself.$t('steps.sei_stato_aggiunto'))
          else if (func === lists.MenuAction.CANCELLA_IMBARCO)
            tools.showPositiveNotif(myself.$q, myself.$t('event.deleted'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.SOSTITUISCI) {
      // console.log('param1', par.param1, 'id', par.param1._id)
      const mydatatosave = {
        id: par.param1._id,
        ind_order: par.param1.ind_order,
        myfunc: func,
        data: par.param2,
        username: par.param2.username,
        notifBot: null,
        inviaemail: par.param2.inviaemail,
      }

      if (par.param2.notifBot)
        mydatatosave.notifBot = { un: par.param2.notifBot, txt: par.param3 }

      myself.EseguiCallServer()

      GlobalStore.actions.callFunz({ mydata: mydatatosave }).then((ris) => {
        if (ris) {
          myself.update_nave()
          myself.Callback()
          tools.showPositiveNotif(myself.$q, par.param3 + '\n' + ' e inviato messaggio per aprire la Gift Chat!')
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.DELETE_RECTABLE) {
      // console.log('param1', par.param1)
      GlobalStore.actions.DeleteRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param2, null)
          tools.showPositiveNotif(myself.$q, myself.$t('db.deletedrecord'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recdelfailed'))
      })
    } else if (func === lists.MenuAction.DUPLICATE_RECTABLE) {
      // console.log('param1', par.param1)
      GlobalStore.actions.DuplicateRec({ table, id: par.param1 }).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param2, ris.data)
          tools.showPositiveNotif(myself.$q, myself.$t('db.duplicatedrecord'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recdupfailed'))
      })
    } else if (func === lists.MenuAction.INVIA_MSG_A_DONATORI) {
      // console.log('param1', par.param1)
      GlobalStore.actions.InviaMsgADonatori({
        msgobj: par.param1,
        navemediatore: par.param2,
        tipomsg: par.param1.tipomsg
      }).then((ris) => {
        if (ris) {
          if (par.param1.inviareale)
            tools.showPositiveNotif(myself.$q, myself.$t('dashboard.msg_donatori_ok'))
          tools.askConfirm(myself.$q, '', ris.strout, translate('dialog.yes'), translate('dialog.no'), this, '', 0, 0, {})
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.INVIA_MSG_A_FLOTTA) {
      // console.log('param1', par.param1)
      myself.loading = true
      GlobalStore.actions.InviaMsgAFlotta({
        flotta: par.param1,
        inviareale: par.param2.inviareale,
        inviaemail: par.param2.inviaemail,
        tipomsg: par.param3
      }).then((ris) => {
        myself.loading = false
        if (ris) {
          if (par.param1.inviareale)
            tools.showPositiveNotif(myself.$q, myself.$t('dashboard.msg_donatori_ok'))
          tools.askConfirm(myself.$q, '', ris.strout, translate('dialog.yes'), translate('dialog.no'), this, '', 0, 0, {})
          myself.Callback()
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.INVIA_MSG_A_SINGOLO) {
      // console.log('param1', par.param1)
      GlobalStore.actions.InviaMsgADonatori({
        msgobj: par.param1,
        navemediatore: par.param2,
        tipomsg: par.param1.tipomsg
      })
        .then((ris) => {
          if (ris) {
            tools.showPositiveNotif(myself.$q, myself.$t('cal.sendmsg_sent'))
          } else
            tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
        })
    } else if (func === lists.MenuAction.DONO_INVIATO) {
      const mydatatosave = {
        id: par.param1._id,
        table: tools.TABNAVI,
        fieldsvalue: {
          date_made_gift: par.param1.date_made_gift,
          riga: par.param1.riga,
          col: par.param1.col,
          commento_al_sognatore: par.param1.commento_al_sognatore
        },
        notifBot: null
      }

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2, txt: par.param3 }
      }

      GlobalStore.actions.saveFieldValue(mydatatosave).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param1, par.param2)
          tools.showPositiveNotif(myself.$q, myself.$t('dashboard.fatto_dono'))
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    } else if (func === lists.MenuAction.DONO_RICEVUTO) {
      let mydatatosave = {
        id: par.param1._id,
        table: tools.TABNAVI,
        fieldsvalue: {},
        unset: null,
        notifBot: null,
        tipomsg: tools.TipoMsg.SEND_MSG_DONO_RICEVUTO_CORRETTAMENTE
      }

      if (!!par.param1.date_made_gift) {
        mydatatosave.fieldsvalue = {
          made_gift: par.param1.made_gift,
          riga: par.param1.riga,
          col: par.param1.col,
          date_made_gift: par.param1.date_made_gift
        }
      } else {
        mydatatosave.fieldsvalue = { made_gift: par.param1.made_gift, riga: par.param1.riga, col: par.param1.col }
      }

      if (!!par.param1.annulla) {
        if (par.param1.annulla) {
          mydatatosave.fieldsvalue = { made_gift: false, riga: par.param1.riga, col: par.param1.col }
          mydatatosave.unset = { date_made_gift: 1, received_gift: 1 }
        }
      }

      if (par.param3) {
        mydatatosave.notifBot = { un: par.param2, txt: par.param3 }
      }

      GlobalStore.actions.saveFieldValue(mydatatosave).then((ris) => {
        if (ris) {
          myself.ActionAfterYes(func, par.param1, par.param2)
          let msg = myself.$t('dashboard.ricevuto_dono_ok')
          if (!!par.param1.annulla) {
            if (par.param1.annulla)
              msg = 'Dono Annullato'
          }
          tools.showPositiveNotif(myself.$q, msg)
        } else
          tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      })
    }
  },

  async saveFieldToServer(myself: any, table, id, mydata, notif = true) {
    const mydatatosave = {
      id,
      table,
      fieldsvalue: mydata,
      notifBot: null
    }

    GlobalStore.actions.saveFieldValue(mydatatosave).then((ris) => {
      if (ris) {
        if (notif)
          tools.showPositiveNotif(myself.$q, myself.$t('db.recupdated'))
      } else {
        tools.showNegativeNotif(myself.$q, myself.$t('db.recfailed'))
      }
    })

  },

  async askConfirm($q: any, mytitle, mytext, ok, cancel, myself: any, table, funcok: number, funccancel: number, par: IParamDialog) {
    return $q.dialog({
      message: mytext,
      html: true,
      ok: {
        label: ok,
        push: true
      },
      title: mytitle,
      cancel: true,
      persistent: false
    }).onOk(() => {
      // console.log('OK')
      tools.executefunc(myself, table, funcok, par)
      return true
    }).onCancel(() => {
      // console.log('CANCEL')
      tools.executefunc(myself, table, funccancel, par)
      return false
    })
  },

  showPositiveNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'positive', icon: 'notifications' })
  },

  showNegativeNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'negative', icon: 'notifications' }, 10000)
  },

  showNeutralNotif(q: any, msg) {
    tools.showNotif(q, msg, { color: 'info', icon: 'notifications' }, 10000)
  },

  showNotif(q: any, msg, data ?: INotify | null, time?) {
    let myicon = data ? data.icon : 'ion-add'
    if (!myicon) {
      myicon = 'ion-add'
    }
    let mycolor = data ? data.color : 'primary'
    if (!mycolor) {
      mycolor = 'primary'
    }
    q.notify({
      // group: '',
      message: msg,
      icon: myicon,
      classes: 'my-notif-class',
      color: mycolor,
      timeout: time || 4000
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
    // console.log('checkLangPassed ', mylang)

    const mybrowserLang = Quasar.lang.isoName

    if (mylang !== '') {
      if ((mylang.toLowerCase() === 'enus') || (mylang.toLowerCase() === 'en-us') || (mylang.toLowerCase() === 'uk')
        || (mylang.toLowerCase() === 'uk-uk') || (mylang.toLowerCase() === 'en-uk') || (mylang.toLowerCase() === 'en-gb')
        || (mylang.toLowerCase() === 'gb-gb')) {
        mylang = 'enUs'
      }
      if ((mylang.toLowerCase() === 'es') || (mylang.toLowerCase() === 'es-es') || (mylang.toLowerCase() === 'eses')) {
        mylang = 'es'
      }
      if ((mylang.toLowerCase() === 'pt') || (mylang.toLowerCase() === 'pt-pt') || (mylang.toLowerCase() === 'ptpt')) {
        mylang = 'pt'
      }
      if ((mylang.toLowerCase() === 'fr') || (mylang.toLowerCase() === 'fr-fr') || (mylang.toLowerCase() === 'frfr')) {
        mylang = 'fr'
      }
      if ((mylang.toLowerCase() === 'it') || (mylang.toLowerCase() === 'it-it') || (mylang.toLowerCase() === 'itit')) {
        mylang = 'it'
      }
      if ((mylang.toLowerCase() === 'si') || (mylang.toLowerCase() === 'si-si') || (mylang.toLowerCase() === 'sisi')) {
        mylang = 'si'
      }

      if (!(static_data.arrLangUsed.includes(mylang))) {
        // console.log('non incluso ', mylang)
        // mylang = static_data.arrLangUsed[0]
        mylang = 'it'

        // Metti come default
        UserStore.mutations.setlang(mylang)
      }
    }

    if (!mylang) {
      mylang = process.env.LANG_DEFAULT
      console.log('LANG DEFAULT: ', mylang)
    }

    if (toolsext.getLocale(true) === '') {
      UserStore.mutations.setlang(mylang)
    }

    // console.log('mylang calc : ', mylang)

    return mylang
  },

  getlang() {
    return toolsext.getLocale()
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

  isSocioResidente() {
    return !!UserStore.state.my.profile ? UserStore.state.my.profile.socioresidente : false
  },

  isConsiglio() {
    return !!UserStore.state.my.profile ? UserStore.state.my.profile.consiglio : false
  },

  isSocio() {
    return !!UserStore.state.my.profile ? UserStore.state.my.profile.socio : false
  },

  isResp() {
    return UserStore.state.my.profile.resplist
  },

  isWorkers() {
    return UserStore.state.my.profile.workerslist
  },

  isDepartment() {
    return UserStore.state.isDepartment
  },

  isAdmin() {
    return UserStore.state.isAdmin
  },

  isTutor() {
    return UserStore.state.isTutor
  },

  isZoomeri() {
    return UserStore.state.isZoomeri
  },

  isEditor() {
    return UserStore.state.isEditor
  },

  getstrDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY')
    else
      return ''
  },

  getstrDateLong(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    const dayofweek = this.getDayOfWeek(mytimestamp)
    if (!!mytimestamp)
      return dayofweek + ' ' + date.formatDate(mytimestamp, 'DD/MM/YYYY')
    else
      return ''
  },

  getstrshortDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM')
    else
      return ''
  },

  getstrshortDateTime(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM HH:mm')
    else
      return ''
  },

  getstrshortDayDateTime(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD HH:mm')
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

  getstrVeryVeryShortDate(mydate) {
    const DateFormatter = new Intl.DateTimeFormat(func_tools.getLocale() || void 0, {
      weekday: 'long',
      day: 'numeric',
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
        mystr += `<span class="cal__where-content">${tools.getstrDateLong(myevent.dateTimeStart)}</span>
                    <span class="cal__hours-content">${mythis.$t('cal.starttime')} ${tools.getstrTime(myevent.dateTimeStart)}
                    ${mythis.$t('cal.endtime')} ${tools.getstrTime(myevent.dateTimeEnd)}`
      } else {
        mystr = `${tools.getstrDateLong(myevent.dateTimeStart)}
                 ${mythis.$t('cal.starttime')} ${tools.getstrTime(myevent.dateTimeStart)}
                 ${mythis.$t('cal.endtime')} ${tools.getstrTime(myevent.dateTimeEnd)}`
      }
    } else {
      mystr = `<span class="cal__where-content">${tools.getstrDateLong(myevent.dateTimeStart)}</span>
                 <span class="cal__hours-content">${mythis.$t('cal.starttime')} ${tools.getstrTime(myevent.dateTimeStart)} </span>
                  ${mythis.$t('cal.enddate')} ${tools.getstrDateLong(myevent.dateTimeEnd)}
                  <span class="cal__hours-content">${mythis.$t('cal.endtime')} ${tools.getstrTime(myevent.dateTimeEnd)} </span>`
    }

    if (myevent.infoextra) {
      mystr += `<span class="cal__hours">
                  <span class="cal__hours-title">${mythis.$t('cal.hours')}: </span>
                  <span class="cal__hours-content">${myevent.infoextra}  </span>
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
                 - ${tools.getstrTime(myevent.dateTimeStart)}`
    } else {
      mystr = `${tools.getstrVeryVeryShortDate(myevent.dateTimeStart)} - ${tools.getstrShortDate(myevent.dateTimeEnd)}`

    }

    return mystr
  },

  getstrDateTimeEventShort(mythis, myevent) {
    let mystr = ''
    // is same day?
    if (tools.getstrShortDate(myevent.dateTimeStart) === tools.getstrShortDate(myevent.dateTimeEnd)) {
      mystr = `${tools.getstrVeryShortDate(myevent.dateTimeStart)}
                 h. ${tools.getstrTime(myevent.dateTimeStart)}`
    } else {
      mystr = `${tools.getstrVeryShortDate(myevent.dateTimeStart)} - ${tools.getstrVeryShortDate(myevent.dateTimeEnd)}`

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

  getstrDateTimeAll(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY HH:mm:ss')
    else
      return ''
  },

  getstrTimeAll(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'HH:mm:ss')
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

  getstrDateMonthTimeShort(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD MMM HH:mm')
    else
      return ''
  },

  getstrDateMonthWeekTimeShort(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return this.getDayOfWeek(mytimestamp) + ' ' + date.formatDate(mytimestamp, 'DD MMM - HH:mm')
    else
      return ''
  },

  getstrDateEmailTime(mythis, mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY') + ' ' + mythis.$t('cal.starttime') + ' ' + date.formatDate(mytimestamp, 'HH:mm')
    else
      return ''
  },
  getstrMMMDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD MMM YYYY')
    else
      return ''
  },
  getstrYYMMDDDate(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD')
  },
  getstrYYMMDDDateTime(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm')
  },

  getstrYYMMDDDateTimeAll(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD HH:mm:ss')
  },

  gettimestampstrDate(mydatestr) {
    if (!!mydatestr) {
      const mydate = new Date(mydatestr)
      if (!!mydate)
        return mydate.getTime()
    }
    return 0
  },

// mystrdate "26.04.2013"
  convertstrtoDate(mystrdate: string) {
    if (mystrdate.length < 10) {
      return null
    }

    console.log('mystrdate', mystrdate)

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
  },

  capitalize(value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },

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

  firstchars_onedot(value, numchars = 200) {
    if (!value) {
      return ''
    }
    try {
      let mycar = value.substring(0, numchars)
      if (value.length > numchars)
        mycar += '.'
      return mycar
    } catch (e) {
      return value
    }
  },

  getDateNow() {
    const mydate = new Date()
    return mydate
  },

  isDateArrived(mydate) {
    const datenow = tools.getDateNow()
    const diff = date.getDateDiff(datenow, mydate)
    // console.log('diff = ' + diff)
    if (diff >= -1) {
      return true
    }
    return false
  },

  getDayOfWeek(mydate) {
    const dayOfWeek = new Date(mydate).getDay()

    const mylang = this.getLocale()

    const myday = {
      it: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      enUs: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      fr: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      pt: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      si: ['Nedelja', 'Ponedeljek', 'Torek', 'Sreda', 'četrtek', 'Petek', 'Sobota'],
    }

    return isNaN(dayOfWeek) ? '' : myday[mylang][dayOfWeek].substring(0, 3)
  },

  isSunday(mydate) {
    const dayOfWeek = new Date(mydate).getDay()
    return dayOfWeek === 0
  },

  getDateNowEvent() {
    return tools.addMinutes(tools.getDateNow(), -60 * 4)
  },
  getDateNull() {
    return new Date(0)
  },
  getTimeNow() {
    return new Date().getTime()
  },
  getTimestampsNow() {
    return new Date().valueOf()
  },

  gettimestampByDate(mydate) {
    return mydate.toString()
  },

  isMainProject(idproj) {
    return idproj === process.env.PROJECT_ID_MAIN
  },

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
      return Privacy.inherited
    else
      return Privacy.all
  }
  ,

  getprivacywritebytipoproj(tipoproj) {
    return Privacy.inherited
  },

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

  askfornotification(mythis) {
    console.log('askfornotification')
    tools.showNotif(mythis.$q, mythis.$t('notification.waitingconfirm'), { color: 'positive', icon: 'notifications' })

    Notification.requestPermission((result) => {
      console.log('User Choice', result)
      if (result === 'granted') {
        tools.showNotif(mythis.$q, mythis.$t('notification.confirmed'), { color: 'positive', icon: 'notifications' })
      } else {
        tools.showNotif(mythis.$q, mythis.$t('notification.denied'), { color: 'negative', icon: 'notifications' })

        // displayConfirmNotification();
      }
    })

  }
  ,

  heightgallery(coeff) {
    // console.log('heightgallery')
    return tools.heightGallVal(coeff).toString() + 'px'
  },

  heightGallVal(coeff = 1.33) {
    let maxh2 = 0

    let myw = Screen.width
    if (!this.isMobile())
      if (GlobalStore.state.leftDrawerOpen)
        myw -= 300
    if (!this.isMobile())
      if (GlobalStore.state.rightDrawerOpen)
        myw -= 300

    maxh2 = (myw / coeff) + 20
    if (maxh2 > 500)
      maxh2 = 500

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
    if (Screen.width < 410) {
      return '337'
    } else if (Screen.width < 600) {
      return '450'
    } else if (Screen.width < 800) {
      return '550'
    } else if (Screen.width < 900) {
      return '700'
    } else if (Screen.width < 1000) {
      return '800'
    } else if (Screen.width < 1100) {
      return '900'
    } else {
      return Screen.width - 200
    }
  },

  styles_imgtitle(sized ?: string) {
    if (!!sized) {
      return sized
    } else {
      if (Screen.width < 410) {
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
    if (Screen.width < 410) {
      return 'max-width: 250px'
    } else {
      return 'max-width: 350px'
    }
  }
  ,

  isMobile() {
    return (Screen.width < 450)
  }
  ,

  mywidth_imgtitle() {
    if (Screen.width < 450) {
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
    if (Screen.width < 410) {
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
  },
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

  },

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
    if (this.isMobile() && (preloadedimages().map((a) => a.imgname).includes(myimage))) {
      ris = dir + 'mobile/' + file
    } else {
      ris = myimage
    }

    // console.log('getimgbysize', ris)

    return ris
  },

  getaltimg(dir: string, file: string, alt?: string) {
    const myimage = dir + file
    const myrec = static_data.preLoadImages.find((rec) => rec.imgname === myimage)
    if (myrec)
      return (myrec) ? myrec.alt : 'my image'
    else
      return alt
  },

  getimgFullpathbysize(fileimg: string) {
    if (!fileimg)
      return { path: '', file: fileimg }
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

  getlangforQuasar(mylang) {
    if (mylang === 'enUs')
      return 'en-us'
    else
      return mylang
  },

  setLangAtt(mylang) {
    console.log('setLangAtt =', mylang)
    // console.log('PRIMA this.$q.lang.isoName', this.$q.lang.isoName)

    // dynamic import, so loading on demand only
    import(`quasar/lang/${this.getlangforQuasar(mylang)}`).then((lang) => {
      console.log('   Import dinamically lang =', lang)
      Quasar.lang.set(this.getlangforQuasar(lang.default))
      import(`../../statics/i18n`).then(() => {
        console.log('   *** MY LANG DOPO=', Quasar.lang.isoName)
      })
    })

    GlobalStore.actions.addDynamicPages()

    // this.$q.lang.set(mylang)

  },

  getappname(mythis, short) {
    if (mythis === undefined)
      return ''
    if (mythis.$t === undefined)
      return ''
    if (short) {
      return mythis.$t('ws.siteshortname')
    } else {
      return mythis.$t('ws.sitename')
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
    // if (process.env.DEBUG) {
    //   msg += ' ' + process.env.MONGODB_HOST
    // }
    mythis.$q.loading.show({ message: msg })
  }
  ,

  getUrlSite() {
    const url = window.location.href
    const arr = url.split('/')
    return arr[0] + '//' + arr[2]
  },

  SignIncheckErrors(mythis, riscode, ispageLogin ?: boolean) {
    // console.log('SignIncheckErrors: ', riscode)
    try {
      if (riscode === tools.OK) {
        tools.showNotif(mythis.$q, mythis.$t('login.completato'), { color: 'positive', icon: 'check' })
        console.log('mythis.$router.name', mythis.$router.name)
        if (ispageLogin) {
          if (mythis.$router.name !== '/')
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
            // console.log('HIDE...')
            mythis.$q.loading.hide()
          }, 500)
          tools.showNotif(mythis.$q, mythis.$t('login.errato'), { color: 'negative', icon: 'notifications' })
          mythis.iswaitingforRes = false
          if (ispageLogin) {
            GlobalStore.state.rightDrawerOpen = true
            // mythis.$router.push('/signin')
          }
        })

      } else if (riscode === serv_constants.RIS_CODE_LOGIN_ERR_SUBACCOUNT) {

        // Wait N seconds to avoid calling many times...
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('anything')
          }, 1000)
        }).then(() => {
          setTimeout(() => {
            // console.log('HIDE...')
            mythis.$q.loading.hide()
          }, 500)
          tools.showNotif(mythis.$q, mythis.$t('login.subaccount'), { color: 'negative', icon: 'notifications' })
          mythis.iswaitingforRes = false
          if (ispageLogin) {
            GlobalStore.state.rightDrawerOpen = true
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
  },

  SignUpcheckErrors(mythis, riscode: number, msg: string) {
    console.log('SignUpcheckErrors', riscode)
    let endload = true

    if (riscode === serv_constants.RIS_CODE_EMAIL_ALREADY_EXIST) {
      tools.showNotif(mythis.$q, mythis.$t('reg.err.duplicate_email'))
    } else if (riscode === serv_constants.RIS_CODE_USER_ALREADY_EXIST) {
      tools.showNegativeNotif(mythis.$q, mythis.$t('reg.err.user_already_exist'))
    } else if (riscode === serv_constants.RIS_CODE_USER_EXTRALIST_NOTFOUND) {

      tools.showNegativeNotif(mythis.$q, mythis.$t('reg.err.user_extralist_not_found') + ' ' + msg)
    } else if (riscode === serv_constants.RIS_CODE_USER_NOT_THIS_APORTADOR) {

      tools.showNegativeNotif(mythis.$q, mythis.$t('reg.err.user_not_this_aportador') + ' ' + msg)

    } else if (riscode === serv_constants.RIS_CODE_USERNAME_NOT_VALID) {
      tools.showNotif(mythis.$q, mythis.$t('reg.err.username_not_valid'))
    } else if (riscode === serv_constants.RIS_CODE_USERNAME_ALREADY_EXIST) {
      tools.showNotif(mythis.$q, mythis.$t('reg.err.duplicate_username'))
    } else if (riscode === tools.ERR_SERVERFETCH) {
      tools.showNotif(mythis.$q, mythis.$t('fetch.errore_server'))
    } else if (riscode === tools.ERR_GENERICO) {
      const msg = mythis.$t('fetch.errore_generico') + UserStore.mutations.getMsgError(riscode)
      tools.showNotif(mythis.$q, msg)
    } else if (riscode === tools.OK) {
      mythis.$router.push('/regok')
      tools.showNotif(mythis.$q, mythis.$t('components.authentication.email_verification.link_sent', { botname: mythis.$t('ws.botname') }), {
        color: 'green',
        textColor: 'black'
      })
    } else if (riscode === serv_constants.RIS_ISCRIZIONE_OK) {
      mythis.$router.push('/')
      tools.showNotif(mythis.$q, mythis.$t('components.authentication.iscrizione_ok', { botname: mythis.$t('ws.botname') }), {
        color: 'green',
        textColor: 'black'
      })
    } else {
      tools.showNotif(mythis.$q, 'Errore num ' + riscode)
    }

    return endload
  },
  isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
  },
  displayClasses(eventparam) {
    return {
      // [`bg-${eventparam.bgcolor}`]: !tools.isCssColor(eventparam.bgcolor),
      'text-white': !tools.isCssColor(eventparam.bgcolor)
    }
  },
  displayStyles(eventparam) {
    const s = { color: '' }

    let mycol = eventparam.bgcolor
    if (!tools.isCssColor(eventparam.bgcolor)) {
      mycol = this.colourNameToHex(mycol)
    }

    if (tools.isCssColor(mycol)) {
      // s['background-color'] = eventparam.bgcolor
      s.color = colors.luminosity(mycol) > 0.5 ? 'black' : 'white'
    }
    return s
  },
  CancelBookingEvent(mythis, eventparam: IEvents, bookeventid: string, notify: boolean) {
    console.log('CancelBookingEvent ', eventparam)
    tools.askConfirm(mythis.$q, translate('cal.titlebooking'), translate('cal.cancelbooking') + ' ' + tools.gettextevent(mythis, eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, '', lists.MenuAction.DELETE, 0, {
      param1: bookeventid,
      param2: notify,
      param3: eventparam.title
    })
  },
  CancelEvent(mythis, eventparam: IEvents) {
    console.log('CancelEvent ', eventparam)
    tools.askConfirm(mythis.$q, translate('cal.event'), translate('cal.cancelevent') + ' ' + tools.gettextevent(mythis, eventparam) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, '', lists.MenuAction.DELETE_EVENT, 0, {
      param1: eventparam,
      param2: true
    })
  },
  AskGiaPartecipatoZoom(mythis, user) {
    console.log('AskGiaPartecipatoZoom', user.username)
    tools.askConfirm(mythis.$q, translate('steps.zoom_gia_partecipato'), translate('steps.zoom_gia_partecipato'), translate('dialog.yes'), translate('dialog.no'), mythis, '', lists.MenuAction.ZOOM_GIA_PARTECIPATO, 0, {
      param1: user,
      param2: user,
      param3: 'Confermato',
    })
  },
  ActionRecTable(mythis, action, table, id, item, askaction) {
    // console.log('ActionRecTable', id)
    return tools.askConfirm(mythis.$q, 'Action', translate(askaction) + '?', translate('dialog.yes'), translate('dialog.no'), mythis, table, action, 0, {
      param1: id,
      param2: item
    })
  },

  async createNewRecord(mythis, table, data, withnotif = true) {

    const mydata = {
      table,
      data
    }

    return await
      GlobalStore.actions.saveTable(mydata)
        .then((record) => {
          if (withnotif) {
            if (record) {
              tools.showPositiveNotif(mythis.$q, mythis.$t('db.recupdated'))
            } else {
              tools.showNegativeNotif(mythis.$q, mythis.$t('db.recfailed'))
            }
          }
          return record
        })
  },
  getheight(mythis) {
    // return height()
    return mythis.$q.screen.height
  },
  getwidth(mythis, withright = false, withleft = true) {
    // return height()
    let myw = mythis.$q.screen.width
    if (withleft) {
      if (GlobalStore.state.leftDrawerOpen)
        myw -= 300
    }

    if (withright)
      if (GlobalStore.state.rightDrawerOpen)
        myw -= 300
    return myw

  },

  getwidthscale(mythis, mywidth, maxwidth) {
    if (this.isMobile()) {
      // if (mywidth > this.getwidth(mythis) - 20)
      mywidth = this.getwidth(mythis, false, false) - 32

      // console.log('mywidth', mywidth)
      return mywidth
    } else {
      // console.log('this.getwidth(mythis) = ', this.getwidth(mythis))
      let myw = mywidth + ((this.getwidth(mythis, true) - mywidth) * 0.6)
      // console.log('myw1 = ', myw)
      if (myw > maxwidth)
        myw = maxwidth
      if (myw > this.getwidth(mythis) - 24)
        myw = this.getwidth(mythis) - 24

      // console.log('myw = ', myw)
      return myw
    }
  },

  getheightbywidth(mythis, mywidth, myheight, maxwidth) {
    // console.log('getheightbywidth')
    const myw = this.getwidthscale(mythis, mywidth, maxwidth)
    return myw * (myheight / mywidth)
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
      // tslint:disable-next-line:no-bitwise
      return ((bit & whattofind) === whattofind)
    else
      return false
  },

  SetBit(myval, bit) {
    // tslint:disable-next-line:no-bitwise
    myval |= bit
    return myval
  },
  UnSetBit(myval, bit) {
    // tslint:disable-next-line:no-bitwise
    myval &= ~bit
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
  getCookie(mytok, def?) {
    const ris = Cookies.get(mytok)
    // console.log('getCookie', ris)
    if (!!ris) {
      return ris
    } else {
      return def
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
    const intcode = GlobalStore.getters.getValueSettingsByKey('INT_CODE', false)
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
  getsuffisso() {
    if (tools.isTest())
      return 'TEST: '
    else
      return ''
  },
  metafunc(mythis) {
    return {
      title: mythis.$t('ws.sitename'),
      titleTemplate: (title) => `${tools.getsuffisso()} ${mythis.mymeta.title} - ${mythis.$t('ws.sitename')}`,
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
    // Object.create(null) instanceof Object → false
    return Object(anything) === anything
  },
  isDebug() {
    return process.env.DEV
  },

  isTest() {
    return process.env.ISTEST === '1'
  },

  geturlupload() {
    return process.env.MONGODB_HOST + '/upload'
  },
  getheaders() {
    return [{ name: 'x-auth', value: UserStore.state.x_auth_token }]
  },

  getextfile(filename) {
    return filename.split('.').pop().toLowerCase()
  },

  getelembylang(arr) {
    const mylang = toolsext.getLocale()
    for (const elem in arr) {
      if (arr[elem][mylang])
        return arr[elem][mylang]
    }
  },
  isChristmasHoliday() {
    const now = new Date()
    return ((now.getMonth() === 11 && now.getDate() > 20) || (now.getMonth() === 0 && now.getDate() < 8))
  },

  CapitalizeAllWords(str) {
    const splitStr = str.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(' ')
  },

  getValDb(keystr, serv, def?, table?, subkey?, id?, idmain?) {
    if (table === 'users') {
      if (keystr === 'profile') {
        return UserStore.state.my.profile[subkey]
      } else {
        return UserStore.state.my[keystr]
      }
    } else if (table === 'todos') {
      // console.log('id', id, 'idmain', idmain)
      const indcat = Todos.state.categories.indexOf(idmain)
      console.log('indcat', indcat)
      if (indcat >= 0) {
        const myrec = Todos.state.todos[indcat].find((rec) => rec._id === id)
        console.log('myrec', myrec)
        let ris = null
        if (myrec) {
          ris = myrec[keystr]
        }
        console.log('ris', ris)
        return ris
      }

      return ''
    } else {
      const ris = GlobalStore.getters.getValueSettingsByKey(keystr, serv)

      if (ris === '')
        if (def !== undefined)
          return def
        else
          return ''
      else
        return ris
    }

  },

  getkey(youtube, title, isnum) {
    let mykey = 'MP4'
    if (youtube)
      mykey = 'YT'

    if (isnum) {
      mykey += '_NUM'
    } else {
      if (title)
        mykey += '_TITLE_'
      else
        mykey += '_VIDEO_'
    }

    return mykey
  },

  heightgallvideo() {
    const h = this.heightgallery(this.getValDb('YT_W', false) / this.getValDb('YT_H', false))
    return h
  },

  getvideourl(index, youtube) {
    const myvideo = this.getValDb(this.getkey(youtube, false, false) + index, false)
    if (myvideo)
      if (youtube)
        return myvideo
      else
        return this.getpath(myvideo)
    else
      return ''
  },

  getvideonum(youtube) {
    return this.getValDb(this.getkey(youtube, false, true), false)
  },

  getvideomp4yt(index) {
    return [{ src: 'https://www.youtube.com/embed/' + this.getvideourl(index, true), type: 'video/mp4' }
    ]
  },
  getvideomp4src(index) {
    return [{ src: this.getvideourl(index, false), type: 'video/mp4' }
    ]
  },

  getvideoyt(index) {
    return 'https://www.youtube.com/embed/' + this.getvideourl(index, true)
  },

  getvideobyidyoutube(key) {
    return 'https://www.youtube.com/embed/' + key
  },

  getpath(myvideo) {
    return 'statics/video/' + func_tools.getLocale() + '/' + myvideo
  },
  mygetarrValDb(keystr, serv) {
    const myval = GlobalStore.getters.getValueSettingsByKey(keystr, serv)
    // console.log('AA: myval', myval)
    try {
      if (myval) {
        // console.log('   Entro')
        const myrec = JSON.parse(myval)
        // console.log('*************** getarrValDb')
        // console.table(myrec)
        return myrec
      } else {
        // console.log('NO MYVAL')
        return []
      }
    } catch (e) {
      console.log('Errore: ', e)
      return []
    }
  },

  getvideotitle(index, youtube) {

    const mykey = this.getkey(youtube, true, false) + index
    const ris = this.mygetarrValDb(mykey, false)

    return this.getelembylang(ris)
  },

  getvideoposter(index) {
    return ''
  },
  clone(obj) {
    if (null === obj || 'object' !== typeof obj) return obj
    const copy = obj.constructor()
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
    }
    return copy
  },

  geticon(langin) {
    if (langin === '')
      return ''
    try {
      const lang = langin.toUpperCase()

      const arrlang = ['IT', 'ES', 'PT', 'BR', 'US', 'GB', 'UK', 'DE', 'FR', 'SI', 'MD', 'IE', 'KE', 'AU', 'ML', 'DO',
        'NG', 'SK', 'CH', 'CM', 'CO', 'CG', 'PE', 'MS', 'SM', 'HR', 'RO', 'VE', 'CL', 'PL', 'EG', 'AR', 'MX', 'SN', 'PK', 'AT', 'NP',
        'CU', 'MA', 'PH', 'BA', 'UA', 'BE', 'NL', 'CI', 'BF']

      const flag = arrlang.find((mylang) => mylang === lang)
      if (!!flag) {
        return 'fa-flag-' + flag.toLowerCase()
      }

      return ''

    } catch (e) {
      return ''
    }
  },

  removespaces(mystr) {
    return mystr.replace(/\s+/g, '')
  },

  copyStringToClipboard(mythis, mystr, show) {
    copyToClipboard(mystr).then(() => {
      let msg = mythis.$t('dialog.copyclipboard')
      if (show)
        msg += ' \'' + mystr + '\''

      tools.showNotif(mythis.$q, msg)
    })

  },

  getlinkhref(mylink, text) {
    return '<a href="' + mylink + '" target="_blank">' + text + '</a>'
  },

  getNationsByNationality(nat) {
    if (!nat)
      return ''

    nat = nat.toUpperCase()

    if (nat === 'IT') {
      return 'Italy'
    } else if (nat === 'SI') {
      return 'Slovenia'
    } else if (nat === 'SK') {
      return 'Slovakia'
    } else if (nat === 'NG') {
      return 'Nigeria'
    } else if (nat === 'MD') {
      return 'Moldova'
    } else if (nat === 'ES') {
      return 'Spain'
    } else if (nat === 'DE') {
      return 'Germany'
    } else if (nat === 'FR') {
      return 'France'
    } else if (nat === 'US') {
      return 'United States'
    } else if (nat === 'CA') {
      return 'Canada'
    } else if (nat === 'MA') {
      return 'Morocco'
    } else if (nat === 'LT') {
      return 'Lithuania'
    } else if (nat === 'HR') {
      return 'Croatia'
    } else if (nat === 'HU') {
      return 'Hungary'
    } else if (nat === 'CH') {
      return 'Switzerland'
    } else if (nat === 'CM') {
      return 'Cameroon'
    } else if (nat === 'CO') {
      return 'Colombia'
    } else if (nat === 'PE') {
      return 'Peru'
    } else if (nat === 'PL') {
      return 'Poland'
    } else if (nat === 'SM') {
      return 'San Marino'
    } else if (nat === 'PT') {
      return 'Portugal'
    } else if ((nat === 'UK') || (nat === 'GB')) {
      return 'United Kingdom'
    } else if (nat === 'UA') {
      return 'Ukraine'
    } else if (nat === 'RO') {
      return 'Romania'
    } else if (nat === 'VE') {
      return 'Venezuela'
    } else if (nat === 'CL') {
      return 'Chile'
    } else if (nat === 'PL') {
      return 'Poland'
    } else if (nat === 'EG') {
      return 'Egypt'
    } else if (nat === 'BR') {
      return 'Brazil'
    } else if (nat === 'CG') {
      return 'Congo'
    } else if (nat === 'AR') {
      return 'Argentina'
    } else if (nat === 'MX') {
      return 'Mexico'
    } else if (nat === 'SN') {
      return 'Senegal'
    } else if (nat === 'PK') {
      return 'Pakistan'
    } else if (nat === 'AT') {
      return 'Austria'
    } else if (nat === 'NP') {
      return 'Nepal'
    } else if (nat === 'CU') {
      return 'Cuba'
    } else if (nat === 'MA') {
      return 'Morocco'
    } else if (nat === 'PH') {
      return 'Philippines'
    } else if (nat === 'BA') {
      return 'Bosnia and Herzegovina'
    } else if (nat === 'BE') {
      return 'Belgium'
    } else if (nat === 'NL') {
      return 'Netherlands'
    } else if (nat === 'MS') {
      return 'Montserrat'
    } else if (nat === 'CI') {
      return 'Cote d\'Ivoire'
    } else if (nat === 'BF') {
      return 'Burkina Faso'
    } else if (nat === 'IE') {
      return 'Ireland'
    } else if (nat === 'KE') {
      return 'Kenya'
    } else if (nat === 'AU') {
      return 'Australia'
    } else if (nat === 'ML') {
      return 'Mali'
    } else if (nat === 'DO') {
      return 'Dominican Republic'
    }
  },

  getGroupById(myid) {
    const group = GlobalStore.state.groups.find((rec) => rec._id === myid)
    if (group) {
      return group.descr
    }
    return ''
  },

  getLinkZoom() {
    let id = ''
    if (GlobalStore.state.calzoom.length > 0) {
      id = GlobalStore.state.calzoom.slice(-1)[0].id_conf_zoom.toString()
    } else {
      id = '6668882000'
    }
    return 'https://zoom.us/j/' + id
  },

  myprintf(val, params: any[]) {

    params.forEach((par) => {
      val = val.replace('{' + par.strin + '}', par.strout)
    })
    return val
  },

  translate(params, options?) {
    const msg = params.split('.')
    const lang = toolsext.getLocale()

    const stringa = messages[lang]

    let ris = stringa
    if (!!ris) {
      msg.forEach((param) => {
        ris = ris[param]
      })

      if (!!options) {
        ris = this.myprintf(ris, options)
      }

    } else {
      console.log('ERRORE IN TRANSLATE! ', params, ' NON ESISTE!')
      return params
    }

    return ris
  },

  isSel2Metodi(user) {
    if (user.profile.paymenttypes) {
      return user.profile.paymenttypes.length > 1
    }
    return false

  },

  getnumrequisiti(user) {
    let req = 0

    req += user.verified_email ? 1 : 0
    req += user.profile.teleg_id > 0 ? 1 : 0
    req += this.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_READ_GUIDELINES.value) ? 1 : 0
    req += this.isBitActive(user.profile.saw_and_accepted, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI.value) ? 1 : 0
    // req += user.profile.saw_zoom_presentation ? 1 : 0
    // if (!!user.profile.my_dream)
    //   req += user.profile.my_dream.length >= 10 ? 1 : 0
    req += this.isSel2Metodi(user) ? 1 : 0

    return req
  },

  Is7ReqOk(user) {
    return this.getnumrequisiti(user) === 7
  },

  getRiganave(riga) {
    let ris = riga - 3
    if (ris <= 1)
      ris = 1

    return ris
  },

  getColnave(col) {
    let ris = Math.ceil(col / (2 * 4))
    if (ris <= 1)
      ris = 1
    return ris
  },

  getrigacolstr(mianave) {
    return this.getRiganave(mianave.riga) + '.' + this.getColnave(mianave.col)
  },

  getlastnavestr(lastnave) {
    return lastnave.riga + '.' + lastnave.col
  },

  getmaxcol(riga) {

    return Math.pow(2, riga - 1)
  },

  getrigaNaveByPosiz(riga) {
    let ris = riga + 3
    if (ris <= 1)
      ris = 1
    return ris

  },

  getcolNaveByPosiz(col) {
    let ris = Math.ceil(col * Math.pow(2, 3))
    if (ris <= 1)
      ris = 1
    return ris
  },

  getfirstnaveSognatore(riga, col) {
    const myriga = this.getrigaNaveByPosiz(riga)
    const mycol = this.getcolNaveByPosiz(col)

    // console.log(`${riga}.${col} => ${myriga}.${mycol}`)
    return { riga: myriga, col: mycol }
  },

  getnumnavi_finoa(naveorig, navedest, lastnave) {
    let contaattuale = 0
    let contatot = 0

    const indrigaattuale = lastnave.riga
    const indcolattuale = lastnave.col

    if (navedest.riga < indrigaattuale) {
      return { perc: 100, totale: 0, contaattuale: 0 }
    }

    for (let indriga = naveorig.riga; indriga <= navedest.riga; indriga++) {

      let startcol = 0
      if (indriga === naveorig.riga) {
        startcol = naveorig.col
      }
      let endcol = this.getmaxcol(indriga)
      if (indriga === navedest.riga) {
        endcol = navedest.col
      }

      if (indriga <= navedest.riga) {
        contatot += (endcol - startcol)
      }

      if (indriga < indrigaattuale) {
        contaattuale += (endcol - startcol)
      } else if (indriga === indrigaattuale) {
        contaattuale += indcolattuale
      }
    }

    let perc = 0
    if (contatot > 0)
      perc = (contaattuale / contatot) * 100

    if (perc > 100)
      perc = 100

    // console.log('naveorig', naveorig.riga, '.', naveorig.col, 'dest', navedest.riga, ',', navedest.col)
    // console.log('lastnave', lastnave.riga, '.', lastnave.col)
    // console.log('contaattuale', contaattuale, 'contatot', contatot, 'perc', perc)

    return { perc, totale: contatot, contaattuale }
  },

  sito_online(pertutti) {

    let ris = true
    const online = this.getValDb('SITO_ONLINE', false, true)
    ris = UserStore.state.isAdmin && !pertutti ? true : online
    // console.log('isadmin', UserStore.state.isAdmin)
    return ris
  },

  getsize() {
    if (this.isMobile()) {
      return '0.85rem'
    } else {
      return '1rem'
    }
  },

  getsizesmall() {
    if (this.isMobile()) {
      return '0.75rem'
    } else {
      return '0.85rem'
    }
  },

  convertiTagHTMLPerBOT(msg) {

    msg = msg.replace(/<strong>/g, '<b>')
    msg = msg.replace(/<\/strong>/g, '</b>')

    return msg
  },

  getlinkstd(link) {
    let mylink = link
    if (!!link) {
      if (!link.startsWith('http')) {
        mylink = 'https://' + link
      }
    }

    return mylink
  },

  isselectPaypal() {
    if (UserStore.state.my.profile) {
      if (UserStore.state.my.profile.paymenttypes) {
        if (UserStore.state.my.profile.paymenttypes.includes('paypal')) {
          return true
        }
      }

      return false
    }
  },

  isselectPayeer() {
    if (UserStore.state.my.profile) {
      if (UserStore.state.my.profile.paymenttypes) {
        if (UserStore.state.my.profile.paymenttypes.includes('payeer')) {
          return true
        }
      }

      return false
    }
  },

  isselectRevolut() {
    if (UserStore.state.my.profile) {
      if (UserStore.state.my.profile.paymenttypes) {
        if (UserStore.state.my.profile.paymenttypes.includes('revolut')) {
          return true
        }
      }

      return false
    }
  },

  isselectAdvCash() {
    if (UserStore.state.my.profile) {
      if (UserStore.state.my.profile.paymenttypes) {
        if (UserStore.state.my.profile.paymenttypes.includes('advcash')) {
          return true
        }
      }

      return false
    }
  },

  getGroupList() {

    // console.log('GlobalStore.state.groups', GlobalStore.state.groups)
    const mylist = {
      it: [],
      es: [],
      enUs: []
    }

    let myrec = {}

    for (const mygroup of GlobalStore.state.groups) {
      myrec = {
        id: mygroup._id,
        label: mygroup.descr,
        value: mygroup._id
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  getRespList() {

    // console.log('GlobalStore.state.groups', GlobalStore.state.groups)
    const mylist = {
      it: [],
      es: [],
      enUs: []
    }

    let myrec = {}

    for (const myresp of GlobalStore.state.resps) {
      myrec = {
        id: myresp._id,
        label: myresp.name + ' ' + myresp.surname,
        value: myresp.username
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  getWorkersList() {

    // console.log('GlobalStore.state.groups', GlobalStore.state.groups)
    const mylist = {
      it: [],
      es: [],
      enUs: []
    }

    let myrec = {}

    for (const myresp of GlobalStore.state.workers) {
      myrec = {
        id: myresp._id,
        label: myresp.name + ' ' + myresp.surname,
        value: myresp.username
      }
      mylist.it.push(myrec)

    }

    return mylist
  },

  IsLogged() {
    if (!!UserStore)
      return UserStore.state.isLogged
    else
      return false
  },

  formatDate(mydate: any) {
    let d = void 0

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    const month = '' + (d.getMonth() + 1)
    const day = '' + d.getDate()
    const year = d.getFullYear()

    return [year, tools.padTime(month), tools.padTime(day)].join('-')
  },

  firstDayOfDate(mydate: any) {
    let d = void 0

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    const month = d.getMonth()
    const day = 1
    const year = d.getFullYear()

    return new Date(year, month, day)
  },

  LastDayOfDate(mydate: any) {
    let d = void 0

    if (mydate !== void 0) {
      d = new Date(mydate)
    } else {
      d = new Date()
    }
    let month = d.getMonth()
    if (month === 11)
      month = 0
    else
      month++
    const year = d.getFullYear()

    return new Date(year, month, 0)
  },

  formatTime(mydate) {
    const d = mydate !== void 0 ? new Date(mydate) : new Date(),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes()

    return [tools.padTime(hours), tools.padTime(minutes)].join(':')
  },
  colourNameToHex(colour) {
    const colours = {
      'aliceblue': '#f0f8ff',
      'antiquewhite': '#faebd7',
      'aqua': '#00ffff',
      'aquamarine': '#7fffd4',
      'azure': '#f0ffff',
      'beige': '#f5f5dc',
      'bisque': '#ffe4c4',
      'black': '#000000',
      'blanchedalmond': '#ffebcd',
      'blue': '#0000ff',
      'blueviolet': '#8a2be2',
      'brown': '#a52a2a',
      'burlywood': '#deb887',
      'cadetblue': '#5f9ea0',
      'chartreuse': '#7fff00',
      'chocolate': '#d2691e',
      'coral': '#ff7f50',
      'cornflowerblue': '#6495ed',
      'cornsilk': '#fff8dc',
      'crimson': '#dc143c',
      'cyan': '#00ffff',
      'darkblue': '#00008b',
      'darkcyan': '#008b8b',
      'darkgoldenrod': '#b8860b',
      'darkgray': '#a9a9a9',
      'darkgreen': '#006400',
      'darkkhaki': '#bdb76b',
      'darkmagenta': '#8b008b',
      'darkolivegreen': '#556b2f',
      'darkorange': '#ff8c00',
      'darkorchid': '#9932cc',
      'darkred': '#8b0000',
      'darksalmon': '#e9967a',
      'darkseagreen': '#8fbc8f',
      'darkslateblue': '#483d8b',
      'darkslategray': '#2f4f4f',
      'darkturquoise': '#00ced1',
      'darkviolet': '#9400d3',
      'deeppink': '#ff1493',
      'deepskyblue': '#00bfff',
      'dimgray': '#696969',
      'dodgerblue': '#1e90ff',
      'firebrick': '#b22222',
      'floralwhite': '#fffaf0',
      'forestgreen': '#228b22',
      'fuchsia': '#ff00ff',
      'gainsboro': '#dcdcdc',
      'ghostwhite': '#f8f8ff',
      'gold': '#ffd700',
      'goldenrod': '#daa520',
      'gray': '#808080',
      'green': '#008000',
      'greenyellow': '#adff2f',
      'honeydew': '#f0fff0',
      'hotpink': '#ff69b4',
      'indianred ': '#cd5c5c',
      'indigo': '#4b0082',
      'ivory': '#fffff0',
      'khaki': '#f0e68c',
      'lavender': '#e6e6fa',
      'lavenderblush': '#fff0f5',
      'lawngreen': '#7cfc00',
      'lemonchiffon': '#fffacd',
      'lightblue': '#add8e6',
      'lightcoral': '#f08080',
      'lightcyan': '#e0ffff',
      'lightgoldenrodyellow': '#fafad2',
      'lightgrey': '#d3d3d3',
      'lightgreen': '#90ee90',
      'lightpink': '#ffb6c1',
      'lightsalmon': '#ffa07a',
      'lightseagreen': '#20b2aa',
      'lightskyblue': '#87cefa',
      'lightslategray': '#778899',
      'lightsteelblue': '#b0c4de',
      'lightyellow': '#ffffe0',
      'lime': '#00ff00',
      'limegreen': '#32cd32',
      'linen': '#faf0e6',
      'magenta': '#ff00ff',
      'maroon': '#800000',
      'mediumaquamarine': '#66cdaa',
      'mediumblue': '#0000cd',
      'mediumorchid': '#ba55d3',
      'mediumpurple': '#9370d8',
      'mediumseagreen': '#3cb371',
      'mediumslateblue': '#7b68ee',
      'mediumspringgreen': '#00fa9a',
      'mediumturquoise': '#48d1cc',
      'mediumvioletred': '#c71585',
      'midnightblue': '#191970',
      'mintcream': '#f5fffa',
      'mistyrose': '#ffe4e1',
      'moccasin': '#ffe4b5',
      'navajowhite': '#ffdead',
      'navy': '#000080',
      'oldlace': '#fdf5e6',
      'olive': '#808000',
      'olivedrab': '#6b8e23',
      'orange': '#ffa500',
      'orangered': '#ff4500',
      'orchid': '#da70d6',
      'palegoldenrod': '#eee8aa',
      'palegreen': '#98fb98',
      'paleturquoise': '#afeeee',
      'palevioletred': '#d87093',
      'papayawhip': '#ffefd5',
      'peachpuff': '#ffdab9',
      'peru': '#cd853f',
      'pink': '#ffc0cb',
      'plum': '#dda0dd',
      'powderblue': '#b0e0e6',
      'purple': '#800080',
      'rebeccapurple': '#663399',
      'red': '#ff0000',
      'rosybrown': '#bc8f8f',
      'royalblue': '#4169e1',
      'saddlebrown': '#8b4513',
      'salmon': '#fa8072',
      'sandybrown': '#f4a460',
      'seagreen': '#2e8b57',
      'seashell': '#fff5ee',
      'sienna': '#a0522d',
      'silver': '#c0c0c0',
      'skyblue': '#87ceeb',
      'slateblue': '#6a5acd',
      'slategray': '#708090',
      'snow': '#fffafa',
      'springgreen': '#00ff7f',
      'steelblue': '#4682b4',
      'tan': '#d2b48c',
      'teal': '#008080',
      'thistle': '#d8bfd8',
      'tomato': '#ff6347',
      'turquoise': '#40e0d0',
      'violet': '#ee82ee',
      'wheat': '#f5deb3',
      'white': '#ffffff',
      'whitesmoke': '#f5f5f5',
      'yellow': '#ffff00',
      'yellowgreen': '#9acd32'
    }

    if (typeof colours[colour.toLowerCase()] != 'undefined')
      return colours[colour.toLowerCase()]

    return false
  }

// getLocale() {
  //   if (navigator.languages && navigator.languages.length > 0) {
  //     return navigator.languages[0]
  //   } else {
  //     return navigator.userLanguages || navigator.language || navigator.browserLanguages || 'it-IT'
  //   }
  // }
}
