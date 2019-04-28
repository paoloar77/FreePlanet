import { costanti } from "@src/store/Modules/costanti"
import { UserStore } from "@store"
import { tools } from '@src/store/Modules/tools'
import { IAction } from '@src/model/Projects'

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
  route: string
  faIcon?: string
  materialIcon?: string
  name: string
  text?: string
  routes2?: IListRoutes[]
  level_parent?: number
  level_child?: number
}
