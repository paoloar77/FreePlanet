import { IUserFields, IUserProfile } from '@src/model/UserStore'

export interface ICheckUser {
  verified_email?: boolean
  teleg_id?: number
  profile?: IUserProfile
}

export interface INotData {
  num_reg?: number
  num_passeggeri?: number
  num_imbarcati?: number
  email_non_verif?: number
  num_teleg_attivo?: number
  num_teleg_pending?: number
  num_part_zoom?: number
  num_part_accepted?: number
  num_modalita_pagamento?: number
  arr_nations?: string
  lastsreg?: IUserFields[]
  checkuser?: ICheckUser | any
  numreg_untilday?: number
  reg_daily?: string
  imbarcati_daily?: string
  imbarcati_weekly?: string
  reg_weekly?: string
}

export interface INotevoleState {
  datastat: INotData
}
