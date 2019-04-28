import { Todos, Projects, UserStore } from '@store'
import globalroutines from './../../globalroutines/index'
import { costanti } from './costanti'
import { translation } from './translation'
import Quasar, { date } from 'quasar'
import { IListRoutes, IMenuList, IProject, ITodo, Privacy } from '@src/model'
import * as ApiTables from '@src/store/Modules/ApiTables'
import translate from '@src/globalroutines/util'

export interface INotify {
  color?: string | 'primary'
  textColor?: string
  icon?: string | ''
}

export const tools = {
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

  NUMSEC_CHECKUPDATE: 20000,

  FIRST_PROJ: '5ca8f17fcd40dc5012f53346',

  WHAT_NOTHING: 0,
  WHAT_TODO: 1,
  WHAT_PROJECT: 2,

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

  MenuAction: {
    CUT: 71,
    PASTE: 72,
    DELETE: 100,
    TOGGLE_EXPIRING: 101,
    COMPLETED: 110,
    PROGRESS_BAR: 120,
    PRIORITY: 130,
    SHOW_TASK: 150,
    EDIT: 160,
    ADD_PROJECT: 200
  },
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
    es:
      [
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
    enUs:
      [
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
    de:
      [
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
          value: 71, // CUT
          icon: 'undo'
        },
        {
          id: 10,
          disable: false,
          label: '',
          value: 120, // PROGRESS_BAR
          icon: 'rowing',
          checked: true
        },
        {
          id: 20,
          disable: false,
          label: 'Imposta Priorità',
          value: 130, // PRIORITY
          icon: 'rowing',
          checked: false
        },
        {
          id: 30,
          disable: false,
          label: 'Completato',
          value: 110, // COMPLETED
          icon: 'check_circle',
          checked: true
        },
        {
          id: 40,
          disable: false,
          label: 'Imposta Scadenza',
          value: 101, // TOGGLE_EXPIRING
          icon: 'date_range',
          checked: true
        },
        {
          id: 50,
          disable: false,
          label: 'Elimina',
          value: 100, // DELETE
          icon: 'delete',
          checked: false
        }
      ],
      es:
        [
          {
            id: 5,
            disable: false,
            label: 'Cortar',
            value: 71, // CUT
            icon: 'undo'
          },
          {
            id: 10,
            disable: false,
            label: '',
            value: 120, // PROGRESS_BAR
            icon: 'rowing',
            checked: true
          },
          {
            id: 20,
            disable: false,
            label: 'Establecer Prioridad',
            value: 130, // PRIORITY
            icon: 'rowing',
            checked: false
          },
          {
            id: 30,
            disable: false,
            label: 'Completado',
            value: 110, // COMPLETED
            icon: 'check_circle',
            checked: true
          },
          {
            id: 40,
            disable: false,
            label: 'Establecer expiración',
            value: 101, // TOGGLE_EXPIRING
            icon: 'date_range',
            checked: true
          },
          {
            id: 50,
            disable: false,
            label: 'Borrar',
            value: 100, // DELETE
            icon: 'delete',
            checked: false
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
            label: '',
            value: 120, // PROGRESS_BAR
            icon: 'check_circle',
            checked: true
          },
          {
            id: 20,
            disable: false,
            label: 'Set Priority',
            value: 130, // PRIORITY
            icon: 'high_priority',
            checked: false
          },
          {
            id: 30,
            disable: false,
            label: 'Completed',
            value: 110, // COMPLETED
            icon: 'check_circle',
            checked: true
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

  menuPopupProj: {
    it: [
      {
        id: 5,
        disable: false,
        label: 'Taglia',
        value: 71, // CUT
        icon: 'undo'
      },
      {
        id: 10,
        disable: false,
        label: 'Modifica',
        value: 160, // EDIT
        icon: 'create'
      },
      {
        id: 40,
        disable: false,
        label: 'Imposta Scadenza',
        value: 101, // TOGGLE_EXPIRING
        icon: 'date_range',
        checked: true
      },
      {
        id: 50,
        disable: false,
        label: 'Elimina',
        value: 100, // DELETE
        icon: 'delete',
        checked: false
      }
    ],
    es:
      [
        {
          id: 5,
          disable: false,
          label: 'Cortar',
          value: 71, // CUT
          icon: 'undo'
        },
        {
          id: 10,
          disable: false,
          label: 'Editar',
          value: 160, // EDIT
          icon: 'create'
        },
        {
          id: 40,
          disable: false,
          label: 'Establecer expiración',
          value: 101, // TOGGLE_EXPIRING
          icon: 'date_range',
          checked: true
        },
        {
          id: 50,
          disable: false,
          label: 'Borrar',
          value: 100, // DELETE
          icon: 'delete',
          checked: false
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
          value: 160, // EDIT
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
      const arr = tools.selectStatus[UserStore.state.lang]
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
    // console.log('LANG in PRIOR', UserStore.state.lang)
    try {
      const arr = tools.selectPriority[UserStore.state.lang]
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

      console.log('SPLICE!')
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

  getLastListNotCompleted(nametable, cat, isproj = false, miei = false) {
    // const module = tools.getModulesByTable(nametable)
    let arr = []
    if (nametable === 'projects')
      arr = Projects.getters.projs_dacompletare(cat, miei)
    else if (nametable === 'todos')
      arr = Todos.getters.items_dacompletare(cat)

    return (arr.length > 0) ? arr[arr.length - 1] : null
  }
  ,

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
  }
  ,

  showNotif(q
              :
              any, msg, data ?: INotify | null
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

    if (UserStore.state.userId === undefined) {
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
  }
  ,

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
    const sortedList = []
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

    let i = 0
    while (sortedList.length < linkedList.length) {
      // get the item with a previous item ID referencing the current item
      const nextItem = linkedList[map.get(currentId)]
      if (nextItem === undefined) {
        break
      }
      sortedList.push(nextItem)
      // tools.logelemprj('FATTO:' + i, nextItem)
      currentId = String(nextItem._id)
      i++
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

    // console.log('DOPO sortedList', sortedList);

    return sortedList
  }
  ,

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
  }
  ,

  getstrDate(mytimestamp) {
    // console.log('getstrDate', mytimestamp)
    if (!!mytimestamp)
      return date.formatDate(mytimestamp, 'DD/MM/YYYY')
    else
      return ''
  }
  ,
  getstrYYMMDDDate(mytimestamp) {
    return date.formatDate(mytimestamp, 'YYYY-MM-DD')
  }
  ,

// mystrdate "26.04.2013"
  convertstrtoDate(mystrdate
                     :
                     string
  ) {
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
    console.log('mystrdate', mystrdate, strdate, mydate)
    return mydate
  }
  ,

  capitalize(value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },

  getDateNow() {
    const mydate = new Date()
    return mydate
  }
  ,
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

  isMainProject(idproj) {
    return idproj === process.env.PROJECT_ID_MAIN
  },

  getUrlByTipoProj(miei, name?: string) {
    if (!!name)
      return '/' + name + '/'

    if (miei)
      return '/myprojects/'
    else
      return '/projects/'
  },

  convertMenuListInListRoutes(arrlista: IMenuList[]) {
    const lista = []
    if (arrlista === undefined)
      return lista
    for (const elem of arrlista) {
      const item: IListRoutes = {
        faIcon: 'fa fa-list-alt',
        materialIcon: elem.icon,
        name: elem.nametranslate,
        text: elem.description,
        route: tools.getUrlByTipoProj(false, elem.urlroute) + elem.idelem,
        routes2: tools.convertMenuListInListRoutes(elem.routes2),
        level_parent: elem.level_parent,
        level_child: elem.level_child

      }
      lista.push(item)
    }
    return lista
  },

}
