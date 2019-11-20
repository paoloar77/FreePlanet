import { IColGridTable } from '../../model'
import { lists } from './lists'
import { tools } from '@src/store/Modules/tools'
import { shared_consts } from '@src/common/shared_vuejs'
import { GlobalStore } from '@store'

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

const colnewstosent = [
  AddCol({ name: 'label', label_trans: 'event.title' }),
  AddCol({ name: 'datetoSent', label_trans: 'news.datetoSent', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'activate', label_trans: 'news.activate', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'numemail_tot', label_trans: 'news.numemail_tot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'numemail_sent', label_trans: 'news.numemail_sent', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'datestartJob', label_trans: 'news.datestartJob', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'datefinishJob', label_trans: 'news.datefinishJob', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'lastemailsent_Job', label_trans: 'news.lastemailsent_Job', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'starting_job', label_trans: 'news.starting_job', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'finish_job', label_trans: 'news.finish_job', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'error_job', label_trans: 'news.error_job', fieldtype: tools.FieldType.string }),
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
  AddCol(DeleteRec)
]

const colsettings = [
  AddCol({ name: 'key', label_trans: 'col.label' }),
  AddCol({ name: 'type', label_trans: 'col.type', fieldtype: tools.FieldType.select, jointable: 'fieldstype' }),
  AddCol({ name: 'value_str', label_trans: 'col.value', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'value_date', label_trans: 'cal.data', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'value_num', label_trans: 'cal.num', fieldtype: tools.FieldType.number }),
  AddCol(DeleteRec)
]

const colTablePermission = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec)
]

const colmailinglist = [
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'email', label_trans: 'reg.email' }),
  AddCol({ name: 'lastid_newstosent', label_trans: 'reg.lastid_newstosent', fieldtype: tools.FieldType.string } ),
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
  AddCol(DeleteRec)]

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
  AddCol({
    name: 'copyrec',
    label_trans: 'event.duplicate',
    align: 'right',
    field: tools.NOFIELD,
    sortable: false,
    icon: 'fas fa-copy',
    action: lists.MenuAction.DUPLICATE_RECTABLE,
    askaction: 'db.duplicatedrecord',
    visuonlyEditVal: true,
    required: true,
    visible: true
  })
]

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
      // console.log('key=', key, 'collab', collab, 'val', val)

      const myris = mylist.find((myrec) => myrec[key] === val)
      // console.log('myris', myris)
      if (myris) {
        return myris[collab]
      } else {
        return ''
      }

    } else {
      return ''
    }
  },

  getMultiValueByTable(col: IColGridTable, arrval) {
    if (col.jointable) {
      const mylist = this.getTableJoinByName(col.jointable)
      const key = this.getKeyByTable(col.jointable)
      const collab = this.getLabelByTable(col.jointable)

      // console.table(mylist)
      // console.log('key=', key, 'collab', collab, 'val', val)

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
    return myrec.label
  },
  getIconByTable(mytable): string {
    const myrec = this.getrecTableList(mytable)
    if (myrec)
      return ((myrec.icon) ? myrec.icon : '')
    else
      return ''
  },
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
      collabel: 'label'
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
      colicon: 'icon'
    },
    {
      value: 'fieldstype',
      label: 'Tipi di Campi',
      colkey: 'value',
      collabel: 'label'
    },
    {
      value: 'settings',
      label: 'Impostazioni',
      columns: colsettings,
      colkey: 'key',
      collabel: 'key'
    }
  ],

  // IColGridTable
  colTableUsers: [
    AddCol({ name: 'username', label_trans: 'reg.username' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'cell', label_trans: 'reg.cell' }),
    AddCol({ name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'perm', label_trans: 'reg.perm', fieldtype: tools.FieldType.binary, jointable: 'permissions' }),
    AddCol(DeleteRec),
    AddCol({
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
    })
  ]
}
