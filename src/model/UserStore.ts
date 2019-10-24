import { IToken } from 'model/other'
import { IMessage } from '@src/model/Calendar'

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
  ipaddr?: string
  perm?: number
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
  isManager?: boolean
  usersList?: IUserList[]
  countusers?: number
  msgs?: IMessage[]
}

export interface IUserList {
  _id: string
  username: string
  name?: string
  surname?: string
}
