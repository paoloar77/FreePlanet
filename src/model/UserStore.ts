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

  idToken?: string

  tokens?: IToken[]

  verifiedEmail?: boolean
  categorySel?: string

  tokenforgot?: string

  servercode?: number
}
