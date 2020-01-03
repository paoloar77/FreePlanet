import { IColGridTable } from '../../model'
import { lists } from './lists'
import { tools } from '@src/store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'
import { GlobalStore, UserStore } from '@store'

const DeleteRec = {
  name: 'deleterec',
  label_trans: 'newsletter.reset',
  align: 'right',
  field: tools.NOFIELD,
  sortable: false,
  icon: 'fas fa-trash-alt',
  action: lists.MenuAction.DELETE_RECTABLE,
  askaction: 'db.deletetherecord',
  required: true,
  visuonlyEditVal: true
}

const DuplicateRec = {
  name: 'copyrec',
  label_trans: 'event.duplicate',
  align: 'right',
  field: tools.NOFIELD,
  sortable: false,
  icon: 'fas fa-copy',
  action: lists.MenuAction.DUPLICATE_RECTABLE,
  askaction: 'db.duplicatedrecord',
  visuonlyEditVal: true,
  visible: true
}

function AddCol(params: IColGridTable) {
  return {
    name: params.name,
    required: (params.required === undefined) ? false : params.required,
    label: (params.label === undefined) ? '' : params.label,
    label_trans: (params.label_trans === undefined) ? '' : params.label_trans,
    align: (params.align === undefined) ? 'left' : params.align,
    field: (params.field === undefined) ? params.name : params.field,
    subfield: (params.subfield === undefined) ? '' : params.subfield,
    sortable: (params.sortable === undefined) ? true : params.sortable,
    disable: (params.disable === undefined) ? false : params.disable,
    titlepopupedit: (params.titlepopupedit === undefined) ? '' : params.titlepopupedit,
    visible: (params.visible === undefined) ? true : params.visible,
    icon: (params.icon === undefined) ? '' : params.icon,
    action: (params.action === undefined) ? '' : params.action,
    foredit: (params.foredit === undefined) ? true : params.foredit,
    fieldtype: (params.fieldtype === undefined) ? tools.FieldType.string : params.fieldtype,
    visuonlyEditVal: (params.visuonlyEditVal === undefined) ? false : params.visuonlyEditVal,
    askaction: (params.askaction === undefined) ? '' : params.askaction,
    jointable: (params.jointable === undefined) ? '' : params.jointable
  }
}

export const colmailinglist = [
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'email', label_trans: 'reg.email' }),
  AddCol({ name: 'statesub', label_trans: 'newsletter.statesub', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'wrongerr', label_trans: 'newsletter.wrongerr', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'lastid_newstosent', label_trans: 'reg.lastid_newstosent', fieldtype: tools.FieldType.string }),
  AddCol(DeleteRec)
]

export const colgallery = [
  AddCol({ name: 'author_username', label_trans: 'gallery.author_username' }),
  AddCol({ name: 'title', label_trans: 'gallery.title' }),
  AddCol({ name: 'directory', label_trans: 'gallery.directory' }),
  AddCol({
    name: 'list',
    label_trans: 'gallery.list',
    fieldtype: tools.FieldType.listimages,
    jointable: ''
  }),
]

export const colmypage = [
  AddCol({ name: 'title', label_trans: 'pages.title' }),
  AddCol({ name: 'lang', label_trans: 'pages.lang' }),
  AddCol({ name: 'path', label_trans: 'pages.path' }),
  AddCol({ name: 'icon', label_trans: 'pages.icon' }),
  AddCol({ name: 'order', label_trans: 'pages.order', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'keywords', label_trans: 'pages.keywords' }),
  AddCol({ name: 'description', label_trans: 'pages.description' }),
  AddCol({ name: 'heightimg', label_trans: 'pages.heightimg', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'imgback', label_trans: 'pages.imgback', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'content', label_trans: 'pages.content', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'active', label_trans: 'pages.active', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'inmenu', label_trans: 'pages.inmenu', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'submenu', label_trans: 'pages.submenu', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'l_par', label_trans: 'pages.l_par', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'l_child', label_trans: 'pages.l_child', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'infooter', label_trans: 'pages.infooter', fieldtype: tools.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colopzemail = [
  AddCol({ name: 'key', label_trans: 'col.key' }),
  AddCol({ name: 'label_it', label_trans: 'col.label' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const coltemplemail = [
  AddCol({ name: 'subject', label_trans: 'templemail.subject' }),
  AddCol({ name: 'testoheadermail', label_trans: 'templemail.testoheadermail', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'content', label_trans: 'templemail.content', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'img', label_trans: 'templemail.img' }),
  AddCol({ name: 'content2', label_trans: 'templemail.content2', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'img2', label_trans: 'templemail.img2' }),
  AddCol({
    name: 'options',
    label_trans: 'templemail.options',
    fieldtype: tools.FieldType.multiselect,
    jointable: 'opzemail'
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]
// SHOW_LAST_N_EV
export const colnewstosent = [
  AddCol({ name: 'label', label_trans: 'event.title' }),
  AddCol({ name: 'templemail_str', label_trans: 'newsletter.templemail' }),
  AddCol({ name: 'datetoSent', label_trans: 'newsletter.datetoSent', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'activate', label_trans: 'newsletter.activate', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'numemail_tot', label_trans: 'newsletter.numemail_tot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'numemail_sent', label_trans: 'newsletter.numemail_sent', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'datestartJob', label_trans: 'newsletter.datestartJob', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'datefinishJob', label_trans: 'newsletter.datefinishJob', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'lastemailsent_Job', label_trans: 'newsletter.lastemailsent_Job', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'starting_job', label_trans: 'newsletter.starting_job', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'finish_job', label_trans: 'newsletter.finish_job', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'processing_job', label_trans: 'newsletter.processing_job', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'error_job', label_trans: 'newsletter.error_job', fieldtype: tools.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colTableWhere = [
  AddCol({ name: 'code', label_trans: 'where.code' }),
  AddCol({ name: 'placename', label_trans: 'cal.where' }),
  AddCol({ name: 'whereicon', label_trans: 'where.whereicon' }),
  AddCol(DeleteRec)
]

const colcontribtype = [
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'showprice', label_trans: 'event.showprice', fieldtype: tools.FieldType.boolean }),
  AddCol(DeleteRec)
]

const colpaymenttype = [
  AddCol({ name: 'key', label_trans: 'reg.key' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec)
]

const coldisciplines = [
  AddCol({ name: 'typol_code', label_trans: 'disc.typol_code' }),
  AddCol({ name: 'order', label_trans: 'disc.order', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'label', label_trans: 'event.title' }),
  AddCol({ name: 'description', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'linkpage', label_trans: 'event.linkpage' }),
  AddCol({ name: 'color', label_trans: 'event.color' }),
  AddCol({ name: 'icon', label_trans: 'event.icon' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'img_small', label_trans: 'event.img_small' }),
  AddCol({ name: 'showinhome', label_trans: 'event.showinhome', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'showinnewsletter', label_trans: 'event.showinnewsletter', fieldtype: tools.FieldType.boolean }),
  AddCol({
    name: 'teachers',
    label_trans: 'event.teacher',
    fieldtype: tools.FieldType.multiselect,
    jointable: 'operators'
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colTablePermission = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec)
]


const colTableOperator = [
  AddCol({ name: 'username', label_trans: 'reg.username' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'email', label_trans: 'reg.email' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'cell', label_trans: 'reg.cell' }),
  AddCol({ name: 'usertelegram', label_trans: 'op.usertelegram' }),
  AddCol({ name: 'qualification', label_trans: 'op.qualification' }),
  AddCol({ name: 'disciplines', label_trans: 'op.disciplines' }),
  AddCol({ name: 'certifications', label_trans: 'op.certifications' }),
  AddCol({ name: 'intro', label_trans: 'op.intro', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'info', label_trans: 'op.info', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'webpage', label_trans: 'op.webpage' }),
  AddCol({ name: 'days_working', label_trans: 'op.days_working' }),
  AddCol({ name: 'facebook', label_trans: 'op.facebook' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colTableEvents = [
  AddCol({ name: '_id', label_trans: 'event._id' }),
  AddCol({ name: 'typol', label_trans: 'event.typol', fieldtype: tools.FieldType.select, jointable: 'disciplines' }),
  AddCol({ name: 'short_tit', label_trans: 'event.short_tit' }),
  AddCol({ name: 'title', label_trans: 'event.title' }),
  AddCol({ name: 'details', label_trans: 'event.details', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'bodytext', label_trans: 'event.bodytext', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'dateTimeStart', label_trans: 'event.dateTimeStart', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'dateTimeEnd', label_trans: 'event.dateTimeEnd', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'bgcolor', label_trans: 'event.bgcolor' }),
  AddCol({ name: 'icon', label_trans: 'event.icon' }),
  AddCol({ name: 'img_small', label_trans: 'event.img_small' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'wherecode', label_trans: 'event.where', fieldtype: tools.FieldType.select, jointable: 'wheres' }),
  AddCol({
    name: 'contribtype',
    label_trans: 'event.contribtype',
    fieldtype: tools.FieldType.select,
    jointable: 'contribtype'
  }),
  AddCol({ name: 'price', label_trans: 'event.price' }),
  AddCol({ name: 'infoafterprice', label_trans: 'event.infoafterprice' }),
  AddCol({ name: 'teacher', label_trans: 'event.teacher', fieldtype: tools.FieldType.select, jointable: 'operators' }),
  AddCol({
    name: 'teacher2',
    label_trans: 'event.teacher2',
    fieldtype: tools.FieldType.select,
    jointable: 'operators'
  }),
  AddCol({ name: 'infoextra', label_trans: 'event.infoextra' }),
  AddCol({ name: 'linkpage', label_trans: 'event.linkpage' }),
  AddCol({ name: 'linkpdf', label_trans: 'event.linkpdf' }),
  AddCol({ name: 'nobookable', label_trans: 'event.nobookable', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'news', label_trans: 'event.news', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'canceled', label_trans: 'event.canceled', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'deleted', label_trans: 'event.deleted', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'dupId', label_trans: 'event.dupId' }),
  AddCol({ name: 'modified', label_trans: 'event.modified', fieldtype: tools.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const fields = {
  colSettings: [
    AddCol({ name: 'key', label_trans: 'col.label' }),
    AddCol({ name: 'type', label_trans: 'col.type', fieldtype: tools.FieldType.select, jointable: 'fieldstype' }),
    AddCol({ name: 'value_str', label_trans: 'col.value', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'value_date', label_trans: 'cal.data', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'value_num', label_trans: 'cal.num', fieldtype: tools.FieldType.number }),
    AddCol({ name: 'value_bool', label_trans: 'cal.bool', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'serv', label_trans: 'cal.serv', fieldtype: tools.FieldType.boolean }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec)
  ]

}

export const fieldsTable = {
  getArrStrByValueBinary(mythis, col: IColGridTable, val) {
    const arr = this.getArrByValueBinary(mythis, col, val)
    if (arr.length > 0)
      return arr.join(' - ')
    else
      return '[---]'
  },

  getArrByValueBinary(mythis, col: IColGridTable, val) {
    if (col.jointable) {
      const mylist = this.getTableJoinByName(col.jointable)
      const key = this.getKeyByTable(col.jointable)
      const myres = []
      mylist.forEach((myrec) => {
        if (tools.isBitActive(val, myrec[key]))
          myres.push(mythis.$t(myrec.label))
      })

      return myres
    } else {
      return []
    }
  },

  getValueByTable(col: IColGridTable, val) {
    if (col.jointable) {
      const mylist = this.getTableJoinByName(col.jointable)
      const key = this.getKeyByTable(col.jointable)
      const collab = this.getLabelByTable(col.jointable)

      // console.table(mylist)
      let risultato = ''

      if (tools.isObject(collab)) {
        risultato = mylist.filter((myrec) => myrec.username === val).map(collab)
      } else {
        const myris = mylist.find((myrec) => myrec[key] === val)
        risultato = myris[collab]
      }


      if (key === 'username') {
        console.log('key=', key, 'collab', collab, 'val', val)
        console.log('myris', risultato)
      }

      return risultato

    } else {
      return ''
    }
  },

  getMultiValueByTable(col: IColGridTable, arrval) {
    // console.log('getMultiValueByTable')
    if (col.jointable) {
      const mylist = this.getTableJoinByName(col.jointable)
      const key = this.getKeyByTable(col.jointable)
      const collab = this.getLabelByTable(col.jointable)

      // console.table(mylist)
      // console.log('key=', key, 'collab', collab, 'val', collab)

      const myris = mylist.filter((myrec) => arrval.includes(myrec[key]))
      // console.log('myris', myris)
      if (myris) {
        console.log('collab', collab)
        if (tools.isObject(collab))
          return myris.map(collab)
        else
          return myris.map((rec) => rec[collab])
      } else {
        return ''
      }

    } else {
      return ''
    }
  },

  getColByTable(table) {
    if (table === 'permissions') {
      return ['value', 'label']
    }
  },
  getTableJoinByName(table) {
    if (table === 'permissions')
      return [shared_consts.Permissions.Admin, shared_consts.Permissions.Manager, shared_consts.Permissions.Teacher]
    else if (table === 'fieldstype')
      return tools.FieldTypeArr
    else
      return GlobalStore.getters.getListByTable(table)

  },
  getrecTableList(mytable) {
    return this.tablesList.find((rec) => rec.value === mytable)
  },
  getKeyByTable(mytable): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec)
      return ((myrec.colkey) ? myrec.colkey : '_id')
    else
      return '_id'
  },
  getLabelByTable(mytable): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec)
      return ((myrec.collabel) ? myrec.collabel : 'label')
    else
      return 'label'
  },
  getTitleByTable(mytable): string {
    const myrec = this.getrecTableList(mytable)
    if (!!myrec)
      return myrec.label
    else
      return ''
  },
  getIconByTable(mytable): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec)
      return ((myrec.icon) ? myrec.icon : '')
    else
      return ''
  },

  // IColGridTable
  colTableUsers: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'username', label_trans: 'reg.username' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality', fieldtype: tools.FieldType.nationality }),
    AddCol({ name: 'profile.intcode_cell', field: 'profile', subfield: 'intcode_cell', label_trans: 'reg.intcode_cell', fieldtype: tools.FieldType.intcode }),
    AddCol({ name: 'profile.iso2_cell', field: 'profile', subfield: 'iso2_cell', label_trans: 'reg.iso2_cell' }),
    AddCol({ name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell', fieldtype: tools.FieldType.intcode }),
    AddCol({ name: 'profile.email_paypal', field: 'profile', subfield: 'email_paypal', label_trans: 'reg.email_paypal' }),
    AddCol({ name: 'profile.country_pay', field: 'profile', subfield: 'country_pay', label_trans: 'reg.country_pay', fieldtype: tools.FieldType.nationality }),
    AddCol({ name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id' }),
    AddCol({ name: 'profile.teleg_checkcode', field: 'profile', subfield: 'teleg_checkcode', label_trans: 'reg.teleg_checkcode' }),
    AddCol({ name: 'profile.manage_telegram', field: 'profile', subfield: 'manage_telegram', label_trans: 'reg.manage_telegram', fieldtype: tools.FieldType.boolean  }),
    AddCol({ name: 'profile.paymenttypes', field: 'profile', subfield: 'paymenttypes', label_trans: 'reg.paymenttype', fieldtype: tools.FieldType.multiselect, jointable: 'paymenttypes' }),
    AddCol({ name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    // AddCol({ name: 'idapp', label_trans: 'reg.idapp', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'perm', label_trans: 'reg.perm', fieldtype: tools.FieldType.binary, jointable: 'permissions' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec)
  ],

  tablesList: [
    {
      value: 'operators',
      label: 'Insegnanti',
      columns: colTableOperator,
      colkey: 'username',
      collabel: (rec) => rec.name + ' ' + rec.surname
    },
    {
      value: 'wheres',
      label: 'Luoghi',
      columns: colTableWhere,
      colkey: 'code',
      collabel: 'placename'
    },
    {
      value: tools.TABEVENTS,
      label: 'Eventi',
      columns: colTableEvents,
      colkey: '_id',
      collabel: 'title'
    },
    {
      value: 'contribtype',
      label: 'Tipi di Contributi',
      columns: colcontribtype,
      colkey: '_id',
      collabel: 'label'
    },
    {
      value: 'paymenttypes',
      label: 'Tipi di Pagamenti',
      columns: colpaymenttype,
      colkey: '_id',
      collabel: 'label'
    },
    {
      value: 'disciplines',
      label: 'Discipline',
      columns: coldisciplines,
      colkey: 'typol_code',
      collabel: 'label'
    },

    {
      value: 'newstosent',
      label: 'Newsletter da Inviare',
      columns: colnewstosent,
      colkey: '_id',
      collabel: 'label',
      onlyAdmin: true
    },
    {
      value: 'gallery',
      label: 'Gallerie',
      columns: colgallery,
      colkey: '_id',
      collabel: 'title',
    },
    {
      value: 'templemail',
      label: 'Template Email',
      columns: coltemplemail,
      colkey: '_id',
      collabel: 'subject',
      onlyAdmin: true
    },
    {
      value: 'opzemail',
      label: 'Opzioni Email',
      columns: colopzemail,
      colkey: 'key',
      collabel: (rec) => rec.label_it,
      onlyAdmin: true
    },
    {
      value: 'mailinglist',
      label: 'MailingList',
      columns: colmailinglist,
      colkey: '_id',
      collabel: (rec) => rec.name + ' ' + rec.surname
    },
    {
      value: 'permissions',
      label: 'Permessi',
      columns: colTablePermission,
      colkey: 'value',
      collabel: 'label',
      colicon: 'icon',
      noshow: true,
    },
    {
      value: 'fieldstype',
      label: 'Tipi di Campi',
      colkey: 'value',
      collabel: 'label',
      noshow: true,
    },
    {
      value: 'settings',
      label: 'Impostazioni',
      columns: fields.colSettings,
      colkey: 'key',
      collabel: 'key'
    }
  ]
}

export const func = {
  gettablesList() {
    return fieldsTable.tablesList.filter((rec) => (rec.onlyAdmin === UserStore.state.isAdmin) || (!rec.onlyAdmin) && (!rec.noshow))
  }
}
