export interface IPost {
  title: string
}

export type StateConnection = 'online' | 'offline'

export interface IGlobalState {
  conta: number
  isSubscribed: boolean
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  leftDrawerOpen: boolean
  category: string
  stateConnection: StateConnection
  posts: IPost[]
  listatodo: ITodoList[]
}


export interface ITodoList {
  namecat: string
  description: string
}

