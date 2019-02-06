export const rescodes = {
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

  localStorage: {
    verifiedEmail: 'vf',
    categorySel: 'cs',
    isLogged: 'ilog',
    expirationDate: 'expdate',
    leftDrawerOpen: 'ldo',
    userId: 'uid',
    token: 'tk',
    username: 'uname'
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
    TABLE_SYNC_TODOS : 'sync_todos',
    TABLE_SYNC_TODOS_PATCH : 'sync_todos_patch',
    TABLE_DELETE_TODOS : 'delete_todos'
  },

  MenuAction: {
    DELETE: 100,
    TOGGLE_EXPIRING: 101,
    COMPLETED: 110,
    PROGRESS_BAR: 120,
    PRIORITY: 130
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
    'enUk': [
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

  INDEX_MENU_DELETE: 3,

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
    'enUk': [
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



}
