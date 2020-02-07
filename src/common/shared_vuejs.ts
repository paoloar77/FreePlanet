export const shared_consts = {
  Accepted: {
    CHECK_READ_GUIDELINES: 1,
    CHECK_SEE_VIDEO_PRINCIPI: 2,
  },

  ALL_SAW_AND_ACCEPTED: 3,

  FILTER_EXTRALIST_NOT_REGISTERED: 1,
  FILTER_EXTRALIST_NOT_CONTACTED: 2,
  FILTER_EXTRALIST_WITH_NOTE: 4,
  FILTER_USER_NO_ZOOM: 8,
  FILTER_USER_NO_INVITANTE: 16,
  FILTER_USER_NO_TELEGRAM_ID: 32,
  FILTER_USER_CODICE_AUTH_TELEGRAM: 64,
  FILTER_USER_NO_EMAIL_VERIFICATA: 128,
  FILTER_USER_NO_DREAM: 256,

  Permissions: {
    Admin: {
      value: 1,
      label: 'pages.Admin',
      icon: 'fas fa-user-shield',
      color: 'red'
    },
    Manager: {
      value: 2,
      label: 'otherpages.manage.manager',
      icon: 'fas fa-tools',
      color: 'green'
    },
    Teacher: {
      value: 4,
      label: 'event.teacher',
      icon: 'fas fa-user-tie',
      color: 'blue'
    }
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4
  },

  fieldsUserToChange() {
    return ['_id', 'username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'img', 'ipaddr', 'lasttimeonline', 'profile', 'news_on']
  }

}
