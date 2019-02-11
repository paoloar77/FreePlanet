export interface IToken {
  access: string
  token: string
  data_login: Date
}


export interface ILinkReg {
  idlink: string
}

export interface IIdToken {
  idToken: string
}

export interface IResult {
  status: number
  statusText: string
}
