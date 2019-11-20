import { IAction } from '@src/model/Projects'
import { Component } from 'vue-router/types/router'
import { lists } from '@src/store/Modules/lists'

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
  userId: string
  valore: string
}

export interface ICfgData {
  _id?: string
  lang?: string
  token?: string
  userId?: string
}

export interface ISettings {
  key?: string
  type?: number
  value_str?: string
  value_date?: Date,
  value_num?: number
}

export interface ITeachUname {
  username?: string
}

export interface INewsToSent {
  _id: string
  idapp?: string
  label?: string
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
  RightDrawerOpen: boolean
  category: string
  stateConnection: string
  networkDataReceived: boolean
  cfgServer: ICfgServer[]
  testp1: ITestp1
  connData: IConnData
  posts: IPost[]
  menulinks: {}
  listatodo: IMenuList[]
  arrConfig: IConfig[]
  lastaction: IAction
  settings: ISettings[],
  disciplines: IDiscipline[],
  newstosent: INewsToSent[],
  mailinglist: IMailinglist[],
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
  path: string
  name: string
  materialIcon?: string
  component?: Component
  reqauth?: boolean
  inmenu?: boolean
  solotitle?: boolean
  infooter?: boolean
  submenu?: boolean
  onlyAdmin?: boolean
  onlyManager?: boolean
  extraclass?: string
  meta?: any
  idelem?: string
  urlroute?: string
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

export interface IGallery {
  title: string
  subtitle?: IAllLang
  img: string
  width?: number
  height?: number
  ingallery?: boolean
  inexibitions?: boolean
}

export interface IColl {
  title: IAllLang
  date: string
  subtitle?: IAllLang
  img: string
  img2?: string
  linkagg?: string
  linkagg_type?: number
  width?: number
  height?: number
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
  SHOW_USER_MENU?: boolean
  SHOW_IF_IS_SERVER_CONNECTION?: boolean
  ENABLE_TODOS_LOADING?: boolean
  ENABLE_PROJECTS_LOADING?: boolean
  SHOW_NEWSLETTER?: boolean
  SHOW_ONLY_POLICY?: boolean
  SHOW_MESSAGES?: boolean
  BOOKING_EVENTS?: boolean
}

export interface IParamsQuery {
  table: string
  startRow: number
  endRow: number
  filter: string
  sortBy: any
  descending: number
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
}

export interface ITableRec {
  label: string
  value: string
  columns: IColGridTable[]
  colkey: string
  collabel: string
  colicon?: string
}

export interface IDataPass {
  id: string
  table: string
  fieldsvalue: object
}
