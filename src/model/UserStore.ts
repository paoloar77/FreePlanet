import { IToken } from 'model/other'

export const DefaultUser = <IUserState>{
  email: '',
  username: '',
  password: '',
  lang: 'it'
}

export interface IUserState {
  userId?: string
  email?: string
  username?: string
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
}
