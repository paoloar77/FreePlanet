export const rescodes = {
  CALLING: 10,
  OK: 20,
  ERR_GENERICO: -1,
  DUPLICATE_EMAIL_ID: 11000,
  DUPLICATE_USERNAME_ID: 11100,

  localStorage: {
    verifiedEmail: 'vf',
    isLogged: 'ilog',
    expirationDate: 'expdate',
    leftDrawerOpen: 'ldo',
    userId: 'uid',
    token: 'tk',
    username: 'uname'
  },

  Todos: {
    PRIORITY_NORMAL: 0,
    PRIORITY_HIGH: 1,
    PRIORITY_LOW: -1
  },


  selectPriority: {
    'it': [
      {
        id: 1,
        label: 'Alta',
        value: 1,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normale',
        value: 0,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Bassa',
        value: -1,
        icon: 'expand_more'
      }],
    'enUk': [
      {
        id: 1,
        label: 'High',
        value: 1,
        icon: 'expand_less'
      },
      {
        id: 2,
        label: 'Normal',
        value: 0,
        icon: 'remove'
      },
      {
        id: 3,
        label: 'Low',
        value: -1,
        icon: 'expand_more'
      }]

  }


}
