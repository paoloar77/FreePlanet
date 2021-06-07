import { IUserProfile } from '@src/model/UserStore'

export interface ISignupOptions {
  email?: string
  username: string
  name?: string
  surname?: string
  password?: string
  lang?: string
  repeatPassword?: string
  terms?: boolean
  aportador_solidario?: string
  profile?: IUserProfile
  // already_registered: boolean
}

export interface ISignupIscrizioneConacreisOptions {
  userId?: string
  name?: string
  surname?: string
  email?: string
  fiscalcode?: string
  residency_address?: string
  residency_city?: string
  residency_province?: string
  residency_country?: string
  residency_zipcode?: string
  dateofbirth?: Date
  dateofreg?: Date
  dateofapproved?: Date
  born_city?: string
  born_province?: string
  born_country?: string
  cell_phone?: string
  newsletter_on?: boolean
  accetta_carta_costituzionale_on?: boolean
  metodo_pagamento?: number
  iscrizione_compilata?: boolean
  ha_pagato?: boolean
  codiceConacreis?: string
  annoTesseramento?: number
  numTesseraInterna?: number
  motivazioni?: string
  competenze_professionalita?: string
  cosa_potrei_offrire?: string
  cosa_vorrei_ricevere?: string
  altre_comunicazioni?: string
  come_ci_hai_conosciuto?: string
  terms?: boolean
  note?: string
}
