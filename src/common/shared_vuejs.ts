export const shared_consts = {

  Permissions: {
    Normal: 0,
    Admin: 1,
    Manager: 2,
  },

  fieldsUserToChange() {
    return ['username', 'email', 'name', 'surname', 'perm', 'date_reg', 'verified_email', 'img', 'ipaddr']
  }

}
