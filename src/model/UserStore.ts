import { IToken } from 'model/other'

export const DefaultUser = <IUserState>{
  email: '',
  username: '',
  name: '',
  surname: '',
  password: '',
  lang: 'it'
}

export interface IUserState {
  userId?: string
  email?: string
  username?: string
  name?: string
  surname?: string
  password?: string
  lang?: string
  repeatPassword?: string

  tokens?: IToken[]

  verified_email?: boolean
  categorySel?: string

  tokenforgot?: string

  servercode?: number
  resStatus?: number
  x_auth_token?: string
  isLogged?: boolean
  isAdmin?: boolean
  usersList?: IUserList[]
}

export interface IUserList {
  userId: string
  username: string
  name?: string
  surname?: string
}
