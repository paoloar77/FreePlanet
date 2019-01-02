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
  posts: IPost[]
}

