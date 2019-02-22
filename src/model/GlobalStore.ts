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
  valore: string
}

export type StateConnection = 'online' | 'offline'

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
  connData: IConnData
  posts: IPost[]
  listatodo: ITodoList[]
}


export interface ITodoList {
  namecat: string
  description: string
}

