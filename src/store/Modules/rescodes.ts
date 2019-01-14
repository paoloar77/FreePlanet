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
    PRIORITY_HIGH: 10,
    PRIORITY_LOW: -10
  },


  selectPriority: {
    'it': [
      {
        label: 'Alta',
        value: 1
      },
      {
        label: 'Normale',
        value: 0
      },
      {
        label: 'Bassa',
        value: -1
      }],
    'enUk': [
      {
        label: 'High',
        value: 1
      },
      {
        label: 'Normal',
        value: 0
      },
      {
        label: 'Low',
        value: -1
      }]

  }


}
