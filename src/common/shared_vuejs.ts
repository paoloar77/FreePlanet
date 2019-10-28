export const shared_consts = {

  Permissions: {
    Normal: {
      value: 0,
      label: '[None]'
    },
    Admin: {
      value: 1,
      label: 'Admin'
    },
    Manager: {
      value: 2,
      label: 'Manager'
    },
    Teacher: {
      value: 4,
      label: 'Teacher'
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
