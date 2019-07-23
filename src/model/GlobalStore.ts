import { IAction } from '@src/model/Projects'
import { Component } from 'vue-router/types/router'

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

export interface IGlobalState {
  conta: number
  wasAlreadySubOnDb: boolean
  wasAlreadySubscribed: boolean
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  leftDrawerOpen: boolean
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
  submenu?: boolean
  // ------------------------
  faIcon?: string
  text?: string
  routes2?: IListRoutes[]
  level_parent?: number
  level_child?: number
}

export interface IPerson {
  index?: number
  tab?: string
  name: string
  sub1: string
  sub2?: string
  sub3?: string
  img: string
  cell?: string
  email?: string
  paginaweb?: string
  paginafb?: string
  intro?: string
  info?: string
  vario?: string
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
  side: string
  link_url?: string
  link_text?: IAllLang
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
}
