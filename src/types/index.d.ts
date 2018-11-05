export interface IToken {
  access: string
  token: string
}

export interface IUserState {
  _id?: string
  email?: string
  username: string
  idapp?: any
  password?: string
  lang?: string
  repeatPassword?: string

  idToken?: string
  userId?: number

  tokens?: IToken[]

  verifiedEmail?: boolean

  tokenforgot?: string
}

export interface IGlobState {
  conta: number
  isLoginPage: boolean
  layoutNeeded: boolean
  mobileMode: boolean
  menuCollapse: boolean
  posts: string[]
}

export interface ILinkReg {
  idLink: string
}

export interface IIdToken {
  idToken: string
}

export interface IResult {
  status: number
  statusText: string
}
