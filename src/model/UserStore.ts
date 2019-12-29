import { IToken } from 'model/other'

const enum ESexType {
  None = 0,
  Male = 1,
  Female = 2
}

export interface IUserProfile {
  img?: string
  nationality?: string
  intcode_cell?: string
  iso2_cell?: string
  cell?: string
  dateofbirth?: Date
  sex?: ESexType
  email_paypal?: string
  username_telegram?: string
}

export interface IUserFields {
  _id?: string
  email?: string
  username?: string
  name?: string
  surname?: string
  password?: string
  ipaddr?: string
  perm?: number
  verified_email?: boolean
  tokens?: IToken[]
  lasttimeonline?: Date
  profile?: IUserProfile
}

/*
password?: string
 lang
 */

export interface IPerm {
  _id: number
  label: string
}

export interface IUserState {
  my: IUserFields
  lang?: string
  repeatPassword?: string

  categorySel?: string

  tokenforgot?: string

  servercode?: number
  resStatus?: number
  x_auth_token?: string
  isLogged?: boolean
  isAdmin?: boolean
  isManager?: boolean
  isTeacher?: boolean
  usersList?: IUserFields[]
  permissionsList?: IPerm[]
  countusers?: number
}
