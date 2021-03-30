import { tools } from './tools'
import { IColGridTable } from '../../model'
import { lists } from './lists'
import { shared_consts } from '@src/common/shared_vuejs'
import { GlobalStore, UserStore } from '@store'

const DeleteRec = {
  name: 'deleterec',
  label_trans: 'reg.elimina',
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
    jointable: (params.jointable === undefined) ? '' : params.jointable,
    notShowInNewRec: (params.notShowInNewRec === undefined) ? false : params.notShowInNewRec
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
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colmsg_templates = [
  AddCol({ name: 'title', label_trans: 'pages.title' }),
  AddCol({ name: 'typemsg', label_trans: 'TypeMsg', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'title_it', label_trans: 'Tit Ita', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_it', label_trans: 'ITA', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'title_si', label_trans: 'Tit SLO', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_si', label_trans: 'SLO', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'title_enUs', label_trans: 'Tit ENG', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_enUs', label_trans: 'ENG', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'title_es', label_trans: 'Tit ESP', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_es', label_trans: 'ESP', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'title_pt', label_trans: 'Tit POR', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_pt', label_trans: 'POR', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'title_fr', label_trans: 'Tit FRA', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'msg_fr', label_trans: 'FRA', fieldtype: tools.FieldType.html })
]

export const colmypage = [
  AddCol({ name: 'title', label_trans: 'pages.title' }),
  AddCol({ name: 'content', label_trans: 'pages.contentfield', fieldtype: tools.FieldType.html }),
  AddCol({ name: 'lang', label_trans: 'pages.lang' }),
  AddCol({ name: 'path', label_trans: 'pages.path' }),
  AddCol({ name: 'icon', label_trans: 'pages.icon' }),
  AddCol({ name: 'order', label_trans: 'pages.order', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'keywords', label_trans: 'pages.keywords' }),
  AddCol({ name: 'description', label_trans: 'pages.description' }),
  AddCol({ name: 'heightimg', label_trans: 'pages.heightimg', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'color', label_trans: 'pages.color', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'onlyif_logged', label_trans: 'pages.onlyif_logged', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'only_residenti', label_trans: 'pages.only_residenti', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'imgback', label_trans: 'pages.imgback', fieldtype: tools.FieldType.string }),
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

export const colTableProducer = [
  AddCol({ name: 'name', label_trans: 'producer.name' }),
  AddCol({ name: 'description', label_trans: 'producer.description' }),
  AddCol({ name: 'referent', label_trans: 'producer.referent' }),
  AddCol({ name: 'username', label_trans: 'producer.username' }),
  AddCol({ name: 'region', label_trans: 'producer.region' }),
  AddCol({ name: 'city', label_trans: 'producer.city' }),
  AddCol({ name: 'img', label_trans: 'producer.img' }),
  AddCol({ name: 'website', label_trans: 'producer.website' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const getcolorderscart = [
  AddCol({ name: 'numorder', label_trans: 'order.numorder' }),
  AddCol({ name: 'created_at', label_trans: 'order.created_at', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'status', label_trans: 'order.status' }),
  AddCol({ name: 'items', label_trans: 'order.items' }),
  AddCol({ name: 'userId', label_trans: 'order.users', fieldtype: tools.FieldType.select, jointable: 'users' }),
  AddCol({ name: 'note', label_trans: 'order.note' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTableShareWithUs = [
  AddCol({ name: 'description', label_trans: 'share.description' }),
  AddCol({ name: 'numshared', label_trans: 'share.numshared', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'rating', label_trans: 'share.rating', fieldtype: tools.FieldType.number }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTableHours = [
  // AddCol({ name: 'userId', label_trans: 'hours.userId' }),
  // AddCol({ name: 'todoId', label_trans: 'hours.todoId' }),
  AddCol({ name: 'date', label_trans: 'hours.date', fieldtype: tools.FieldType.onlydate }),
  AddCol({ name: 'hours', label_trans: 'hours.hours', fieldtype: tools.FieldType.hours }),
  AddCol({ name: 'time_start', label_trans: 'hours.time_start', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'time_end', label_trans: 'hours.time_end', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'descr', label_trans: 'hours.note' }),
  AddCol({ name: 'username', label_trans: 'reg.username_short', notShowInNewRec: true }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTablegroups = [
  AddCol({ name: 'descr', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'resp', label_trans: 'reg.resp' }),
  AddCol({ name: 'viceResp', label_trans: 'reg.viceResp' }),
  AddCol({
    name: 'assignedToUsers',
    label_trans: 'reg.userslist',
    fieldtype: tools.FieldType.multiselect,
    jointable: 'workers'
  }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTabledepartments = [
  AddCol({ name: 'name', label_trans: 'store.name' }),
  AddCol({ name: 'username', label_trans: 'store.username' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTableStorehouse = [
  AddCol({ name: 'name', label_trans: 'store.name' }),
  AddCol({ name: 'description', label_trans: 'store.description' }),
  AddCol({ name: 'referent', label_trans: 'store.referent' }),
  AddCol({ name: 'address', label_trans: 'store.address' }),
  AddCol({ name: 'city', label_trans: 'store.city' }),
  AddCol({ name: 'region', label_trans: 'store.region' }),
  AddCol({ name: 'img', label_trans: 'store.img' }),
  AddCol({ name: 'website', label_trans: 'store.website' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

export const colTableProducts = [
  AddCol({ name: 'code', label_trans: 'products.code' }),
  AddCol({ name: 'name', label_trans: 'products.name' }),
  AddCol({ name: 'description', label_trans: 'products.description' }),
  AddCol({ name: 'icon', label_trans: 'products.icon' }),
  AddCol({ name: 'img', label_trans: 'products.img' }),
  // AddCol({ name: 'idProducer', label_trans: 'products.idProducer' }),
  AddCol({
    name: 'idProducer',
    label_trans: 'products.producer',
    fieldtype: tools.FieldType.select,
    jointable: 'producers'
  }),
  AddCol({
    name: 'idStorehouses',
    label_trans: 'storehouses.name',
    fieldtype: tools.FieldType.multiselect,
    jointable: 'storehouses'
  }),
  AddCol({
    name: 'department',
    label_trans: 'products.department',
    fieldtype: tools.FieldType.select,
    jointable: 'departments'
  }),
  // AddCol({ name: 'department', label_trans: 'products.department' }),
  AddCol({ name: 'category', label_trans: 'products.category' }),
  AddCol({ name: 'price', label_trans: 'products.price', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'color', label_trans: 'products.color' }),
  AddCol({ name: 'size', label_trans: 'products.size' }),
  AddCol({ name: 'quantityAvailable', label_trans: 'products.quantityAvailable', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'canBeShipped', label_trans: 'products.canBeShipped', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'canBeBuyOnline', label_trans: 'products.canBeBuyOnline', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'weight', label_trans: 'products.weight', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'stars', label_trans: 'products.stars', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'date', label_trans: 'products.date', fieldtype: tools.FieldType.date }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colcontribtype = [
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol({ name: 'showprice', label_trans: 'event.showprice', fieldtype: tools.FieldType.boolean }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colpaymenttype = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'key', label_trans: 'reg.key' }),
  AddCol({ name: 'label', label_trans: 'proj.longdescr' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colworkers = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'username', label_trans: 'reg.username' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colflotte = [
  AddCol({ name: 'index', label_trans: 'others.value' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col_prima', label_trans: 'ColPrima' }),
  AddCol({ name: 'col_ultima', label_trans: 'ColUltima' }),
]
const colnavi = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'idListaIngresso', label_trans: 'idListaIngresso' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col', label_trans: 'reg.col' }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'created', label_trans: 'cal.data', fieldtype: tools.FieldType.date }),
  // AddCol({ name: 'date_start', label_trans: 'date_start', fieldtype: tools.FieldType.date }),
  // AddCol({ name: 'date_gift_chat_open', label_trans: 'date_gift_chat_open', fieldtype: tools.FieldType.date }),
  // AddCol({ name: 'link_chat', label_trans: 'reg.link_chat' }),
  AddCol({ name: 'parent_id', label_trans: 'parent_id' }),
  AddCol({
    name: 'sent_msg_howto_make_gift',
    label_trans: 'sent_msg_howto_make_gift',
    fieldtype: tools.FieldType.boolean
  }),
  // AddCol({ name: 'provvisoria', label_trans: 'reg.provvisoria', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'received_gift', label_trans: 'reg.received_gift', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'date_made_gift', label_trans: 'date_made_gift', fieldtype: tools.FieldType.date }),
  // AddCol({ name: 'received_gift', label_trans: 'received_gift', fieldtype: tools.FieldType.boolean }),
  // AddCol({ name: 'date_received_gift', label_trans: 'date_received_gift', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'offerta_al_fondo', label_trans: 'offerta_al_fondo', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'note', label_trans: 'note', fieldtype: tools.FieldType.string }),
  // AddCol({ name: 'note_interne', label_trans: 'note_interne', fieldtype: tools.FieldType.string }),
  // AddCol({ name: 'tutor', label_trans: 'tutor', fieldtype: tools.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]
const colnavepersistente = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'riga', label_trans: 'reg.riga' }),
  AddCol({ name: 'col', label_trans: 'reg.col' }),
  AddCol({ name: 'date_gift_chat_open', label_trans: 'dashboard.nave_in_partenza', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'date_start', label_trans: 'dashboard.nave_in_chiusura', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'link_chat', label_trans: 'reg.link_chat' }),
  AddCol({ name: 'provvisoria', label_trans: 'reg.provvisoria', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'DoniAttesaDiConferma', label_trans: 'note_bot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'DoniMancanti', label_trans: 'note_bot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'DoniConfermati', label_trans: 'note_bot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'DoniConfermati', label_trans: 'note_bot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'DoniTotali', label_trans: 'note_bot', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'note_interne', label_trans: 'note_interne', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'tutor', label_trans: 'tutor', fieldtype: tools.FieldType.string }),
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const collistaingresso = [
  AddCol({ name: '_id', label_trans: 'others.value' }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'invitante_username', label_trans: 'reg.aportador_solidario' }),
  AddCol({ name: 'date_added', label_trans: 'date_added', fieldtype: tools.FieldType.date }),
  AddCol({ name: 'added', label_trans: 'Aggiunto', fieldtype: tools.FieldType.boolean }),
  AddCol({ name: 'navestr', label_trans: 'Nave', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'note', label_trans: 'reg.note', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: tools.FieldType.boolean }),
  AddCol(DuplicateRec),
  AddCol(DeleteRec)
]

const colgraduatoria = [
  AddCol({ name: 'index', label_trans: 'index' }),
  AddCol({ name: 'punteggio', label_trans: 'Punt', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'ind_order', label_trans: 'ind_order' }),
  AddCol({ name: 'num_tess', label_trans: 'num_tess', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
  AddCol({ name: 'name', label_trans: 'reg.name' }),
  AddCol({ name: 'surname', label_trans: 'reg.surname' }),
  AddCol({ name: 'numNaviEntrato', label_trans: 'Navi', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'indimbarco', label_trans: 'Imbarco', fieldtype: tools.FieldType.number }),
  // AddCol({ name: 'numinvitati', label_trans: 'Inv.', fieldtype: tools.FieldType.number }),
  // AddCol({ name: 'numinvitatiattivi', label_trans: 'Att.', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'numinvitatiTot', label_trans: 'Inv (Tot)', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'numinvitatiattiviTot', label_trans: 'Att. Tot', fieldtype: tools.FieldType.number }),
  AddCol({ name: 'invitante_username', label_trans: 'reg.aportador_solidario' }),
  AddCol({ name: 'navestr', label_trans: 'Nave', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'note', label_trans: 'note', fieldtype: tools.FieldType.string }),
  AddCol({ name: 'date_added', label_trans: 'date_added', fieldtype: tools.FieldType.date }),
  AddCol(DuplicateRec),
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
  AddCol(DeleteRec),
  AddCol(DuplicateRec)
]

const colTableOperator = [
  AddCol({ name: 'username', label_trans: 'reg.username_short' }),
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
  AddCol({ name: 'internal', label_trans: 'event.internal', fieldtype: tools.FieldType.boolean }),
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

  getTableJoinByName(table) {
    if (table === 'permissions')
      return [shared_consts.Permissions.Admin, shared_consts.Permissions.Manager, shared_consts.Permissions.Teacher, shared_consts.Permissions.Tutor, shared_consts.Permissions.Traduttrici, shared_consts.Permissions.Zoomeri, shared_consts.Permissions.Department]
    else if (table === 'accepted')
      return [shared_consts.Accepted.CHECK_READ_GUIDELINES, shared_consts.Accepted.CHECK_SEE_VIDEO_PRINCIPI]
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

  colTableCalZoom: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'title', label_trans: 'event.title' }),
    AddCol({ name: 'lang', label_trans: 'pages.lang' }),
    AddCol({ name: 'typeconf', label_trans: 'zoom.typeconf' }),
    AddCol({ name: 'date_start', label_trans: 'event.dateTimeStart', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'date_end', label_trans: 'event.dateTimeEnd', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'benvenuto', label_trans: 'event.benvenuto', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'icon', label_trans: 'event.icon', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'color', label_trans: 'event.color', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'id_conf_zoom', label_trans: 'zoom.id_conf_zooom' }),
    AddCol({ name: 'note', label_trans: 'zoom.note' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec)
  ],

  colTableUsersBase: [
    AddCol({ name: 'index', label_trans: 'reg.index' }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality' }),
    AddCol({ name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell' }),
    AddCol({ name: 'perm', label_trans: 'reg.perm', fieldtype: tools.FieldType.binary, jointable: 'permissions' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec),
  ],

  // IColGridTable
  colTableUsers: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'index', label_trans: 'reg.index', fieldtype: tools.FieldType.number }),
    // AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'old_order', label_trans: 'old_order' }),
    AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'subaccount', label_trans: 'SubAccount', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'navinonpresenti', label_trans: 'Navi Non Presenti', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'non_voglio_imbarcarmi', label_trans: 'non_voglio_imbarcarmi', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: tools.FieldType.boolean }),
    AddCol({
      name: 'profile.resplist',
      field: 'profile',
      subfield: 'resplist',
      label_trans: 'reg.resplist',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.workerslist',
      field: 'profile',
      subfield: 'workerslist',
      label_trans: 'reg.workerslist',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({ name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id' }),
    AddCol({
      name: 'profile.saw_and_accepted',
      field: 'profile',
      subfield: 'saw_and_accepted',
      label_trans: 'reg.saw_and_accepted',
      fieldtype: tools.FieldType.binary,
      jointable: 'accepted'
    }),
    AddCol({
      name: 'profile.saw_zoom_presentation',
      field: 'profile',
      subfield: 'saw_zoom_presentation',
      label_trans: 'reg.saw_zoom_presentation',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.ask_zoom_partecipato',
      field: 'profile',
      subfield: 'ask_zoom_partecipato',
      label_trans: 'reg.ask_zoom_partecipato',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.qualified',
      field: 'profile',
      subfield: 'qualified',
      label_trans: 'reg.qualified',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.qualified_2invitati',
      field: 'profile',
      subfield: 'qualified_2invitati',
      label_trans: '2_Inv',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({ name: 'profile.my_dream', field: 'profile', subfield: 'my_dream', label_trans: 'reg.my_dream' }),
    AddCol({
      name: 'profile.email_paypal',
      field: 'profile',
      subfield: 'email_paypal',
      label_trans: 'reg.email_paypal'
    }),
    AddCol({
      name: 'profile.payeer_id',
      field: 'profile',
      subfield: 'payeer_id',
      label_trans: 'reg.payeer_id'
    }),
    AddCol({
      name: 'profile.advcash_id',
      field: 'profile',
      subfield: 'advcash_id',
      label_trans: 'reg.advcash_id'
    }),
    AddCol({
      name: 'profile.revolut',
      field: 'profile',
      subfield: 'revolut',
      label_trans: 'revolut'
    }),
    AddCol({
      name: 'profile.link_payment',
      field: 'profile',
      subfield: 'link_payment',
      label_trans: 'reg.link_payment'
    }),
    AddCol({
      name: 'profile.note_payment',
      field: 'profile',
      subfield: 'note_payment',
      label_trans: 'reg.note_payment'
    }),
    AddCol({
      name: 'profile.paymenttypes',
      field: 'profile',
      subfield: 'paymenttypes',
      label_trans: 'reg.paymenttype',
      fieldtype: tools.FieldType.multiselect,
      jointable: 'paymenttypes'
    }),
    // AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    // AddCol({ name: 'aportador_solidario_ind_order', label_trans: 'reg.aportador_solidario_ind_order' }),
    // AddCol({ name: 'aportador_solidario_nome_completo', label_trans: 'reg.aportador_solidario_nome_completo' }),
    AddCol({ name: 'aportador_solidario', label_trans: 'reg.aportador_solidario' }),
    AddCol({
      name: 'profile.special_req',
      field: 'profile',
      subfield: 'special_req',
      label_trans: 'reg.special_req',
      fieldtype: tools.FieldType.boolean
    }),
    // AddCol({ name: 'profile.vuole_ritessersi', field: 'profile', subfield: 'vuole_ritessersi', label_trans: 'reg.vuole_ritessersi', fieldtype: tools.FieldType.boolean  }),
    AddCol({ name: 'lang', field: 'lang', label_trans: 'reg.lang' }),
    AddCol({ name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality' }),
    AddCol({
      name: 'profile.intcode_cell',
      field: 'profile',
      subfield: 'intcode_cell',
      label_trans: 'reg.intcode_cell'
    }),
    AddCol({ name: 'profile.iso2_cell', field: 'profile', subfield: 'iso2_cell', label_trans: 'reg.iso2_cell' }),
    AddCol({ name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell' }),
    AddCol({ name: 'profile.country_pay', field: 'profile', subfield: 'country_pay', label_trans: 'reg.country_pay' }),
    AddCol({
      name: 'profile.teleg_id_old',
      field: 'profile',
      subfield: 'teleg_id_old',
      label_trans: 'reg.teleg_id_old'
    }),
    AddCol({
      name: 'profile.teleg_checkcode',
      field: 'profile',
      subfield: 'teleg_checkcode',
      label_trans: 'reg.teleg_checkcode'
    }),
    AddCol({
      name: 'profile.manage_telegram',
      field: 'profile',
      subfield: 'manage_telegram',
      label_trans: 'reg.manage_telegram',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.myshares',
      field: 'profile',
      subfield: 'myshares',
      label_trans: 'reg.myshares'
    }),
    AddCol({ name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'lasttimeonline', label_trans: 'reg.lasttimeonline', fieldtype: tools.FieldType.date }),
    // AddCol({ name: 'idapp', label_trans: 'reg.idapp', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'perm', label_trans: 'reg.perm', fieldtype: tools.FieldType.binary, jointable: 'permissions' }),
    AddCol({ name: 'ipaddr', label_trans: 'reg.ipaddr' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec)
  ],

  colTableUsersCNM: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'sospeso', label_trans: 'reg.sospeso', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'deleted', label_trans: 'reg.deleted', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'email', label_trans: 'reg.email' }),
    AddCol({ name: 'made_gift', label_trans: 'reg.made_gift', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    // AddCol({ name: 'aportador_solidario', label_trans: 'reg.aportador_solidario' }),
    AddCol({ name: 'verified_email', label_trans: 'reg.verified_email', fieldtype: tools.FieldType.boolean }),
    AddCol({
      name: 'profile.resplist',
      field: 'profile',
      subfield: 'resplist',
      label_trans: 'reg.resplist',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.workerslist',
      field: 'profile',
      subfield: 'workerslist',
      label_trans: 'reg.workerslist',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.special_req',
      field: 'profile',
      subfield: 'special_req',
      label_trans: 'reg.special_req',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.saw_and_accepted',
      field: 'profile',
      subfield: 'saw_and_accepted',
      label_trans: 'reg.saw_and_accepted',
      fieldtype: tools.FieldType.binary,
      jointable: 'accepted'
    }),
    AddCol({ name: 'profile.my_dream', field: 'profile', subfield: 'my_dream', label_trans: 'reg.my_dream' }),
    AddCol({ name: 'lang', field: 'lang', label_trans: 'reg.lang' }),
    AddCol({ name: 'profile.nationality', field: 'profile', subfield: 'nationality', label_trans: 'reg.nationality' }),
    AddCol({
      name: 'profile.intcode_cell',
      field: 'profile',
      subfield: 'intcode_cell',
      label_trans: 'reg.intcode_cell'
    }),
    AddCol({ name: 'profile.iso2_cell', field: 'profile', subfield: 'iso2_cell', label_trans: 'reg.iso2_cell' }),
    AddCol({ name: 'profile.cell', field: 'profile', subfield: 'cell', label_trans: 'reg.cell' }),
    AddCol({
      name: 'profile.email_paypal',
      field: 'profile',
      subfield: 'email_paypal',
      label_trans: 'reg.email_paypal'
    }),
    AddCol({
      name: 'profile.payeer_id',
      field: 'profile',
      subfield: 'payeer_id',
      label_trans: 'reg.payeer_id'
    }),
    AddCol({
      name: 'profile.advcash_id',
      field: 'profile',
      subfield: 'advcash_id',
      label_trans: 'reg.advcash_id'
    }),
    AddCol({
      name: 'profile.revolut',
      field: 'profile',
      subfield: 'revolut',
      label_trans: 'revolut'
    }),
    AddCol({ name: 'profile.teleg_id', field: 'profile', subfield: 'teleg_id', label_trans: 'reg.teleg_id' }),
    AddCol({
      name: 'profile.teleg_id_old',
      field: 'profile',
      subfield: 'teleg_id_old',
      label_trans: 'reg.teleg_id_old'
    }),
    AddCol({
      name: 'profile.teleg_checkcode',
      field: 'profile',
      subfield: 'teleg_checkcode',
      label_trans: 'reg.teleg_checkcode'
    }),
    AddCol({
      name: 'profile.manage_telegram',
      field: 'profile',
      subfield: 'manage_telegram',
      label_trans: 'reg.manage_telegram',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.socio',
      field: 'profile',
      subfield: 'socio',
      label_trans: 'reg.socio',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({
      name: 'profile.socioresidente',
      field: 'profile',
      subfield: 'socioresidente',
      label_trans: 'reg.socioresidente',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({ name: 'profile.chisei', field: 'profile', subfield: 'chisei', label_trans: 'reg.chisei' }),
    AddCol({
      name: 'profile.iltuoimpegno',
      field: 'profile',
      subfield: 'iltuoimpegno',
      label_trans: 'reg.iltuoimpegno'
    }),
    AddCol({
      name: 'profile.come_aiutare',
      field: 'profile',
      subfield: 'come_aiutare',
      label_trans: 'reg.come_aiutare'
    }),
    AddCol({
      name: 'profile.paymenttypes',
      field: 'profile',
      subfield: 'paymenttypes',
      label_trans: 'reg.paymenttype',
      fieldtype: tools.FieldType.multiselect,
      jointable: 'paymenttypes'
    }),
    AddCol({ name: 'profile.img', field: 'profile', subfield: 'img', label_trans: 'reg.img', sortable: false }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'lasttimeonline', label_trans: 'reg.lasttimeonline', fieldtype: tools.FieldType.date }),
    // AddCol({ name: 'idapp', label_trans: 'reg.idapp', fieldtype: tools.FieldType.string }),
    AddCol({ name: 'perm', label_trans: 'reg.perm', fieldtype: tools.FieldType.binary, jointable: 'permissions' }),
    AddCol({ name: 'ipaddr', label_trans: 'reg.ipaddr' }),
    AddCol(DeleteRec),
    AddCol(DuplicateRec)
  ],

  colTableExtraList: [
    // AddCol({ name: '_id', label_trans: 'reg.id' }),
    AddCol({ name: 'username', label_trans: 'reg.username_short' }),
    AddCol({ name: 'registered', label_trans: 'reg.registered', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'ind_order', label_trans: 'reg.ind_order' }),
    AddCol({ name: 'date_reg', label_trans: 'reg.date_reg', fieldtype: tools.FieldType.date }),
    AddCol({ name: 'name_complete', label_trans: 'reg.name_complete' }),
    AddCol({ name: 'name', label_trans: 'reg.name' }),
    AddCol({ name: 'surname', label_trans: 'reg.surname' }),
    AddCol({ name: 'note', label_trans: 'reg.note' }),
    AddCol({ name: 'contacted', label_trans: 'reg.contacted', fieldtype: tools.FieldType.boolean }),
    AddCol({
      name: 'saw_zoom_presentation',
      label_trans: 'reg.saw_zoom_presentation',
      fieldtype: tools.FieldType.boolean
    }),
    AddCol({ name: 'num_invitati', label_trans: 'reg.num_invitati', fieldtype: tools.FieldType.number }),
    AddCol({ name: 'is_in_whatsapp', label_trans: 'reg.is_in_whatsapp', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'is_in_telegram', label_trans: 'reg.is_in_telegram', fieldtype: tools.FieldType.boolean }),
    AddCol({ name: 'cell_complete', label_trans: 'reg.cell_complete' }),
    AddCol({ name: 'nationality', label_trans: 'reg.nationality', fieldtype: tools.FieldType.nationality }),
    AddCol({ name: 'aportador_solidario_name_surname', label_trans: 'reg.aportador_solidario_nome_completo' }),
    AddCol({ name: 'aportador_solidario_ind_order', label_trans: 'reg.aportador_solidario_ind_order' }),
    AddCol({
      name: 'aportador_solidario_originale_name_surname',
      label_trans: 'reg.aportador_solidario_nome_completo_orig'
    }),
    AddCol({ name: 'col_b', label_trans: 'reg.col_b', fieldtype: tools.FieldType.number }),
    AddCol({ name: 'col_h', label_trans: 'reg.col_h', fieldtype: tools.FieldType.number }),
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
      value: 'products',
      label: 'Prodotti',
      columns: colTableProducts,
      colkey: '_id',
      collabel: 'name'
    },
    {
      value: 'producers',
      label: 'Produttori',
      columns: colTableProducer,
      colkey: '_id',
      collabel: 'name'
    },
    {
      value: 'departments',
      label: 'Uffici',
      columns: colTabledepartments,
      colkey: 'username',
      collabel: 'name'
    },
    {
      value: 'storehouses',
      label: 'Magazzini',
      columns: colTableStorehouse,
      colkey: '_id',
      collabel: (rec) => rec.name + ' (' + rec.city + ')'
    },
    {
      value: 'sharewithus',
      label: 'Condividi con Noi',
      columns: colTableShareWithUs,
      colkey: '_id',
      collabel: 'description'
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
      colkey: 'key',
      collabel: 'label'
    },
    {
      value: 'workers',
      label: 'Lavoratori Attivi',
      columns: colworkers,
      colkey: '_id',
      collabel: (rec) => rec.name + ' ' + rec.surname
    },
    {
      value: 'navi',
      label: 'Navi',
      columns: colnavi,
      colkey: '_id',
      collabel: (rec) => rec.riga + '.' + rec.col
    },
    {
      value: 'flotte',
      label: 'Flotte',
      columns: colflotte,
      colkey: '_id',
      collabel: (rec) => rec.riga + '.' + rec.col_prima + ' ' + rec.riga + '.' + rec.col_ultima
    },
    {
      value: 'navepersistente',
      label: 'Navi Persistenti',
      columns: colnavepersistente,
      colkey: '_id',
      collabel: (rec) => rec.riga + '.' + rec.col
    },
    {
      value: 'listaingressos',
      label: 'Lista Ingresso',
      columns: collistaingresso,
      colkey: '_id',
      collabel: 'ind_order'
    },
    {
      value: 'graduatorias',
      label: 'Graduatoria',
      columns: colgraduatoria,
      colkey: '_id',
      collabel: 'index',
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
      value: 'accepted',
      label: 'Condizioni',
      colkey: 'value',
      collabel: 'label',
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
