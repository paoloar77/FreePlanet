export const shared_consts = {

  Permissions: {
    Admin: {
      value: 1,
      label: 'pages.Admin',
      icon: 'fas fa-user-shield'
    },
    Manager: {
      value: 2,
      label: 'otherpages.manage.manager',
      icon: 'fas fa-tools'
    },
    Teacher: {
      value: 4,
      label: 'event.teacher',
      icon: 'fas fa-user-tie'
    }
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4
  },

  fieldsUserToChange() {
    return ['username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'img', 'ipaddr', 'lasttimeonline']
  }

}
