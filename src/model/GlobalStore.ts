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
  listatodo: ITodoList[]
  arrConfig: IConfig[]
}


export interface ITodoList {
  namecat: string
  description: string
}

