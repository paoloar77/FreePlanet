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
  country_pay?: string
  email_paypal?: string
  username_telegram?: string
  teleg_id?: number
  teleg_checkcode?: number
  my_dream?: string
  paymenttypes?: IPaymentType[]
  manage_telegram?: boolean
  saw_zoom_presentation?: boolean
  saw_and_accepted?: boolean
}

export interface IPaymentType {
  key: string
  label: string
}

export interface IDashboard {
  myself?: IUserFields
  aportador?: IUserFields,
  numpeople_aportador?: number
  downline: any[],
  downnotreg: any[],
  downbyuser: any[]
  arrimbarchi?: any[]
  arrposizioni?: any[]
  navi_partenza?: any[]
  lastnave?: any
  arrusers?: any[]
}

export interface ICalcStat {
  numinvitati?: number
  numinvitati_attivi?: number
}

export interface IUserFields {
  _id?: string
  ind_order?: number
  email?: string
  username?: string
  name?: string
  surname?: string
  password?: string
  ipaddr?: string
  perm?: number
  verified_email?: boolean
  aportador_solidario?: string

  made_gift?: boolean
  tokens?: IToken[]
  lasttimeonline?: Date
  profile?: IUserProfile
  downline?: IUserFields[]
  calcstat?: ICalcStat
  dashboard?: IDashboard
  qualified?: boolean
  numinvitati?: number
  numinvitatiattivi?: number
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
  msg?: string
  resStatus?: number
  x_auth_token?: string
  isLogged?: boolean
  isAdmin?: boolean
  isManager?: boolean
  isTutor?: boolean
  isTraduttrici?: boolean
  isTeacher?: boolean
  usersList?: IUserFields[]
  countusers?: number
  lastparamquery?: any
}
