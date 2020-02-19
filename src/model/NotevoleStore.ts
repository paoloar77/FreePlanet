import { IUserFields, IUserProfile } from '@src/model/UserStore'

export interface ICheckUser {
  verified_email?: boolean
  teleg_id?: number
  profile?: IUserProfile
}

export interface INotData {
  num_tot_lista?: number
  num_reg_lista?: number
  num_reg?: number
  email_non_verif?: number
  num_teleg_attivo?: number
  num_teleg_pending?: number
  num_part_zoom?: number
  num_part_accepted?: number
  num_qualificati?: number
  num_requisiti?: number
  num_modalita_pagamento?: number
  num_users_dream?: number
  arr_nations?: string
  lastsreg?: IUserFields[]
  checkuser?: ICheckUser | any
  reg_daily?: string
}

export interface INotevoleState {
  datastat: INotData
}
