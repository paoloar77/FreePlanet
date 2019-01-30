export interface IPost {
  title: string
}

export interface IGlobalState {
  conta: number
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  leftDrawerOpen: boolean
  category: string
  posts: IPost[]
  listatodo: ITodoList[]
}


export interface ITodoList {
  namecat: string
  description: string
}

