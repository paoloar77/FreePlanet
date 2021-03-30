import { IAction } from '@src/model/Projects'
import { Component } from 'vue-router/types/router'
import { lists } from '@src/store/Modules/lists'
import { IPaymentType } from '@src/model/UserStore'
import { ICart, IDepartment, IProducer, IProduct, IShareWithUs, IStorehouse } from '@src/model/Products'

export interface IPost {
  title: string
}

export interface IConnData {
  downloading_server: number
  downloading_indexeddb: number
  uploading_server: number
  uploading_indexeddb: number
}

export interface ICfgServer {
  chiave: string
  idapp: string
  userId: string
  valore: string
}

export interface ICfgData {
  _id?: string
  lang?: string
  token?: string
  userId?: string
}

export interface ITemplEmail {
  _id?: string
  subject?: string
  content?: string
  options?: ISettings[]
}

export interface ISettings {
  _id?: string
  idapp?: string
  key?: string
  type?: number
  value_str?: string
  value_date?: Date,
  value_num?: number
  value_bool?: boolean
  serv?: boolean
}

export interface ITeachUname {
  username?: string
}

export interface IResp {
  _id?: string
  username?: string
  name?: string
  surname?: string
}

export interface IMyPage {
  _id?: string
  author_username?: string
  lang?: string
  title?: string
  icon?: string
  order?: number
  path?: string
  keywords?: string
  description?: string
  content?: string
  active?: boolean
  inmenu?: boolean
  color?: string
  onlyif_logged?: boolean
  only_residenti?: boolean
  submenu?: boolean
  l_par?: number,
  l_child?: number,
  infooter?: boolean
}

export interface INewsToSent {
  _id: string
  idapp?: string
  label?: string
  templemail_str?: string
  numemail_tot?: number
  numemail_sent?: number
  datetoSent?: Date
  datestartJob?: Date
  datefinishJob?: Date
  lastemailsent_Job?: Date
  starting_job?: boolean
  finish_job?: boolean
  error_job?: string
}

export interface ICalZoom {
  lang?: string
  title?: string
  typeconf?: string
  date_start?: string
  date_end?: Date
  id_conf_zoom?: number
  note?: string
}

export interface IGroup {
  _id?: any
  descr?: string
}

export interface IMailinglist {
  name?: string
  surname?: string
  email: string
  lastid_newstosent?: string
}

export interface IDiscipline {
  typol_code?: string
  order?: number
  label?: string
  description?: string
  linkpage?: string
  color?: string
  icon?: string
  img_small?: string
  showinhome?: boolean
  showinnewsletter?: boolean
  img?: string
  teachers?: ITeachUname[]
}

export interface ITestp1 {
  contatore: number
  mioarray: ICfgServer[]
}

export type StateConnection = 'online' | 'offline'

export interface IConfig {
  _id: string,
  key?: string,
  value: string
}

export interface IMetaTags {
  title?: string
  keywords?: string
  description?: string
}

export interface IGlobalState {
  finishLoading: boolean
  conta: number
  wasAlreadySubOnDb: boolean
  wasAlreadySubscribed: boolean
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  leftDrawerOpen: boolean
  rightDrawerOpen: boolean
  rightCartOpen: boolean
  category: string
  stateConnection: string
  networkDataReceived: boolean
  clickcmd?: string
  cfgServer: ICfgServer[]
  testp1: ITestp1
  connData: IConnData
  posts: IPost[]
  menulinks: {}
  listatodo: IMenuList[]
  arrConfig: IConfig[]
  lastaction: IAction
  serv_settings: ISettings[],
  settings: ISettings[],
  disciplines: IDiscipline[],
  paymenttypes: IPaymentType[],
  newstosent: INewsToSent[],
  gallery: IGallery[],
  mypage: IMyPage[],
  templemail: ITemplEmail[],
  opzemail: ISettings[],
  mailinglist: IMailinglist[],
  calzoom: ICalZoom[],
  producers: IProducer[],
  storehouses: IStorehouse[],
  departments: IDepartment[],
  sharewithus: IShareWithUs[],
  groups: IGroup[],
  resps: IResp[],
  workers: IResp[],
  autoplaydisc: number
}

export interface IMenuList {
  nametranslate: string
  description?: string
  idelem?: string
  icon?: string
  name?: string
  level_parent?: number
  level_child?: number
  urlroute?: string
  routes2?: IMenuList[]
}

export interface IListRoutes {
  active?: boolean
  order: number
  path: string
  name: string
  lang?: string
  materialIcon?: string
  component?: Component
  reqauth?: boolean
  isseparator?: boolean
  inmenu?: boolean
  solotitle?: boolean
  infooter?: boolean
  submenu?: boolean
  onlyAdmin?: boolean
  onlyif_logged?: boolean
  onlyManager?: boolean
  onlySocioResidente?: boolean
  onlyDepartment?: boolean
  onlyTutor?: boolean
  color?: string
  onlyTraduttrici?: boolean
  extraclass?: string
  meta?: any
  idelem?: string
  urlroute?: string
  img?: string
  // ------------------------
  faIcon?: string
  text?: string
  routes2?: IListRoutes[]
  level_parent?: number
  level_child?: number
  separator?: boolean
}

export interface IOperators {
  username: string
  name: string
  surname: string
  email?: string
  qualification?: string
  disciplines?: string
  certifications?: string
  img?: string
  cell?: string
  usertelegram?: string
  paginaweb?: string
  paginafb?: string
  intro?: string
  info?: string
  vario?: string
  tab?: string
}

export interface IPreloadImages {
  imgname: string
  alt: string
  mobile: boolean
}

export interface ILang {
  label: string
  icon: string
  value: string
  image: string
  short: string
}

export interface IAllLang {
  es?: string
  enUs?: string
  fr?: string
  de?: string
  it?: string
}

export interface ITimeLineEntry {
  date: string
  title: string
  description: IAllLang
  description2?: IAllLang
  description3?: IAllLang
  icon: string
  image: string
  image2?: string
  image3?: string
  image4?: string
  video?: string
  side: string
  link_url?: string
  link_url_lang?: IAllLang
  link_text?: IAllLang
  ingallery?: boolean
}

export interface ITimeLineMain {
  titlemain: IAllLang
  body: ITimeLineEntry[]
}

export interface IImgGallery {
  _id?: string
  imagefile: string
  order?: number
  alt?: string
  description?: string
}

export interface IGallery {
  _id?: string
  author_username?: string
  title?: string
  directory?: string
  list?: IImgGallery[]
}

export interface IColl {
  title: IAllLang
  date?: string
  subtitle?: IAllLang
  img: string
  img2?: string
  linkagg?: string
  linkagg_type?: number
  width?: number
  height?: number
  ingallery?: boolean
  inexibitions?: boolean
}

export interface ICollaborations {
  withwhom_title: IAllLang
  list: IColl[]
}

export interface IParamDialog {
  param1?: any
  param2?: any
  param3?: any
}

export interface IFunctionality {
  PWA?: boolean
  ENABLE_REGISTRATION?: boolean
  SHOW_REG_BUTTON?: boolean
  SHOW_PROFILE?: boolean
  SHOW_USER_MENU?: boolean
  SHOW_IF_IS_SERVER_CONNECTION?: boolean
  ENABLE_TODOS_LOADING?: boolean
  ENABLE_PROJECTS_LOADING?: boolean
  ENABLE_ECOMMERCE?: boolean
  SHOW_NEWSLETTER?: boolean
  SHOW_ONLY_POLICY?: boolean
  SHOW_MESSAGES?: boolean
  BOOKING_EVENTS?: boolean
  ENABLE_REG_AYNI?: boolean
  ENABLE_REG_SIP?: boolean
  ENABLE_REG_CNM?: boolean
}

export interface IParamsQuery {
  table: string
  startRow: number
  endRow: number
  filter: string
  filterand: string
  sortBy: any
  descending: number
  userId: string
  codeId?: string
  lk_tab?: string,
  af_objId_tab?: string,
  lk_LF?: string,
  lk_FF?: string,
  lk_as?: string,
  lk_proj?: string,
  lk_col2?: string,
}

export interface IColGridTable {
  name: string
  subfield?: string
  required?: boolean
  label?: string
  label_trans?: string
  align?: string
  field?: string
  sortable?: boolean
  disable?: boolean
  titlepopupedit?: string
  visible?: boolean
  icon?: string
  action?: any
  askaction?: string
  foredit?: boolean
  fieldtype?: number
  jointable?: string
  resultjoin?: string[]
  visuonlyEditVal?: boolean
  notShowInNewRec?: boolean
}

export interface ITableRec {
  label: string
  value: string
  columns: IColGridTable[]
  colkey: string
  collabel: string
  colicon?: string
  onlyAdmin?: boolean
  noshow: boolean
}

export interface IFilter {
  label: string
  value: string
  hide?: boolean
  default?: boolean
}

export interface IDataPass {
  id: string
  table: string
  fieldsvalue: object
}

export interface INewsState {
  lastnewstosent: INewsToSent
  nextnewstosent: INewsToSent
  totemail: number
  totsubscribed: number
  totunsubscribed: number
  totsentlastid: number
}

export const DefaultNewsState: INewsState = {
  lastnewstosent: null,
  nextnewstosent: null,
  totemail: 0,
  totsubscribed: 0,
  totunsubscribed: 0,
  totsentlastid: 0
}

export interface IPagination {
  sortBy: string,
  descending: boolean
  rowsNumber: number
  page: number,
  rowsPerPage: number // specifying this determines pagination is server-side
}
