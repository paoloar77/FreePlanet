export const shared_consts = {

  Permissions: {
    Normal: 0,
    Admin: 1,
    Manager: 2,
  },

  MessageOptions: {
    Notify_ByEmail: 2,
    Notify_ByPushNotification: 4
  },

  fieldsUserToChange() {
    return ['username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'img', 'ipaddr', 'lasttimeonline']
  }

}
