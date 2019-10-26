import { IColGridTable } from '../../model'
import { lists } from './lists'
import { tools } from '@src/store/Modules/tools'

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
    sortable: (params.sortable === undefined) ? true : params.sortable,
    disable: (params.disable === undefined) ? false : params.disable,
    titlepopupedit: (params.titlepopupedit === undefined) ? '' : params.titlepopupedit,
    visible: (params.visible === undefined) ? true : params.visible,
    icon: (params.icon === undefined) ? '' : params.icon,
    action: (params.action === undefined) ? '' : params.action,
    foredit: (params.foredit === undefined) ? true : params.foredit,
    fieldtype: (params.fieldtype === undefined) ? 'string' : params.fieldtype,
    visuonlyEditVal: (params.visuonlyEditVal === undefined) ? false : params.visuonlyEditVal,
    askaction: (params.askaction === undefined) ? '' : params.askaction
  }
}

const colTableWhere = [
  AddCol({ name: 'code', label_trans: 'where.code' }),
  AddCol({ name: 'placename', label_trans: 'where.placename' }),
  AddCol({ name: 'whereicon', label_trans: 'where.whereicon' }),
  AddCol(DeleteRec)
]

const colcontribtype = [
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'showprice', label_trans: 'event.showprice', fieldtype: 'boolean' }),
  AddCol(DeleteRec)
]

const colTableOperator = [
  AddCol({ name: 'username', label_trans: 'reg.username' }),
  // AddCol({ name: 'name', label_trans: 'reg.name' }),
  // AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  // AddCol({ name: 'webpage', label_trans: 'reg.webpage' }),
  // AddCol({ name: 'email', label_trans: 'reg.email' }),
  // AddCol({ name: 'cell', label_trans: 'reg.cell' }),
  // AddCol({ name: 'img', label_trans: 'reg.img' }),
  AddCol(DeleteRec)]

const colTableEvents = [
  AddCol({ name: '_id', label_trans: 'event._id' }),
  AddCol({ name: 'typol', label_trans: 'event.typol' }),
  AddCol({ name: 'short_tit', label_trans: 'event.short_tit' }),
  AddCol({ name: 'title', label_trans: 'event.title' }),
  AddCol({ name: 'details', label_trans: 'event.details' }),
  AddCol({ name: 'dateTimeStart', label_trans: 'event.dateTimeStart', fieldtype: 'date' }),
  AddCol({ name: 'dateTimeEnd', label_trans: 'event.dateTimeEnd' }),
  AddCol({ name: 'bgcolor', label_trans: 'event.bgcolor' }),
  AddCol({ name: 'icon', label_trans: 'event.icon' }),
  AddCol({ name: 'img_small', label_trans: 'event.img_small' }),
  AddCol({ name: 'img', label_trans: 'event.img' }),
  AddCol({ name: 'wherecode', label_trans: 'event.where' }),
  AddCol({ name: 'contribtype', label_trans: 'event.contribtype' }),
  AddCol({ name: 'price', label_trans: 'event.price' }),
  AddCol({ name: 'infoafterprice', label_trans: 'event.infoafterprice' }),
  AddCol({ name: 'teacher', label_trans: 'event.teacher' }),
  AddCol({ name: 'teacher2', label_trans: 'event.teacher2' }),
  AddCol({ name: 'infoextra', label_trans: 'event.infoextra' }),
  AddCol({ name: 'linkpage', label_trans: 'event.linkpage' }),
  AddCol({ name: 'linkpdf', label_trans: 'event.linkpdf' }),
  AddCol({ name: 'nobookable', label_trans: 'event.nobookable', fieldtype: 'boolean' }),
  AddCol({ name: 'news', label_trans: 'event.news', fieldtype: 'boolean' }),
  AddCol({ name: 'canceled', label_trans: 'event.canceled', fieldtype: 'boolean' }),
  AddCol({ name: 'deleted', label_trans: 'event.deleted', fieldtype: 'boolean' }),
  AddCol({ name: 'dupId', label_trans: 'event.dupId' }),
  AddCol({ name: 'modified', label_trans: 'event.modified', fieldtype: 'boolean' }),
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
  tablesList: [
    {
      value: 'operators',
      label: 'Insegnanti',
      columns: colTableOperator,
      colkey: '_id'
    },
    {
      value: 'wheres',
      label: 'Luoghi',
      columns: colTableWhere,
      colkey: '_id'
    },
    {
      value: tools.TABEVENTS,
      label: 'Eventi',
      columns: colTableEvents,
      colkey: '_id'
    },
    {
      value: 'contribtype',
      label: 'Tipi di Contributi',
      columns: colcontribtype,
      colkey: '_id'
    }
  ],

  // IColGridTable
  colTableUsers: [
    AddCol({ name: 'username', label_trans: 'reg.username' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: 'date' }),
    AddCol({ name: 'perm', label_trans: 'reg.perm' }),
    AddCol({ name: 'img', label_trans: 'reg.img', sortable: false }),
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
