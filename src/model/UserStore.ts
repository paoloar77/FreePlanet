import { IToken } from 'model/other'

export const DefaultUser = <IUserState>{
  email: '',
  username: '',
  idapp: process.env.APP_ID,
  password: '',
  lang: 'it'
}

export interface IUserState {
  userId?: string
  email?: string
  username: string
  idapp?: any
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
